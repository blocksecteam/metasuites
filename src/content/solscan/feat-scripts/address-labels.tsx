import { createRoot, type Root } from 'react-dom/client'

import { getSubStr, mergeAddressLabels } from '@common/utils'
import { chromeEvent } from '@common/event'
import type { AddressLabel } from '@common/api/types'
import { GET_ADDRESS_LABELS, ChainType } from '@common/constants'
import { TokenSymbol } from '@common/components'

import { getSolscanAccountAddress } from '../account-link'

interface LabelState {
  address: string
  label: HTMLSpanElement
  symbol: HTMLSpanElement
  root: Root
  texts: { node: Text; original: string }[]
  ellipses: { node: HTMLElement; display: string; priority: string }[]
}

const states = new WeakMap<HTMLAnchorElement, LabelState>()
const requests = new Map<string, number>()
const scannedAnchors = new Map<string, Set<HTMLAnchorElement>>()

const collectText = (anchor: HTMLAnchorElement) => {
  const texts: Text[] = []
  const ellipses: HTMLElement[] = []
  let unsupported = false
  const visit = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.textContent?.trim()) texts.push(node as Text)
      return
    }
    if (!(node instanceof HTMLElement)) return
    if (
      node.hasAttribute('data-metasuites-label') ||
      node.hasAttribute('data-metasuites-symbol') ||
      node.getAttribute('aria-hidden') === 'true' ||
      node.hidden ||
      node.style.fontSize === '0px' ||
      node.style.opacity === '0' ||
      node.classList.contains('text-transparent') ||
      ['IMG', 'BUTTON', 'INPUT'].includes(node.tagName)
    ) {
      return
    }
    if (
      Array.from(node.classList).some(name => name.includes("content-['...']"))
    ) {
      ellipses.push(node)
      return
    }
    // Only traverse text wrappers we can identify; don't rewrite arbitrary controls.
    if (node !== anchor && node.tagName !== 'SPAN') {
      unsupported = true
      return
    }
    node.childNodes.forEach(visit)
  }
  visit(anchor)
  return unsupported ? null : { texts, ellipses }
}

const release = (anchor: HTMLAnchorElement, state: LabelState) => {
  state.root.unmount()
  state.symbol.remove()
  state.label.remove()
  state.texts.forEach(({ node, original }) => {
    if (anchor.contains(node) && node.textContent === '')
      node.textContent = original
  })
  state.ellipses.forEach(({ node, display, priority }) => {
    if (!anchor.contains(node) || node.style.display !== 'none') return
    if (display) node.style.setProperty('display', display, priority)
    else node.style.removeProperty('display')
  })
  states.delete(anchor)
}

const renderLabel = (
  anchor: HTMLAnchorElement,
  address: string,
  item?: AddressLabel
) => {
  let state = states.get(anchor)
  if (
    state &&
    (state.address !== address ||
      !anchor.contains(state.label) ||
      !anchor.contains(state.symbol) ||
      collectText(anchor)?.texts.length !== 0 ||
      state.texts.some(
        ({ node }) => !anchor.contains(node) || node.textContent !== ''
      ))
  ) {
    release(anchor, state)
    state = undefined
  }
  if (!item?.label) {
    if (state) release(anchor, state)
    return
  }
  if (!state) {
    const target = collectText(anchor)
    if (!target?.texts.length) return
    const label = document.createElement('span')
    label.setAttribute('data-metasuites-label', '')
    const symbol = document.createElement('span')
    symbol.setAttribute('data-metasuites-symbol', '')
    symbol.style.display = 'contents'
    state = {
      address,
      label,
      symbol,
      root: createRoot(symbol),
      texts: target.texts.map(node => ({
        node,
        original: node.textContent || ''
      })),
      ellipses: target.ellipses.map(node => ({
        node,
        display: node.style.getPropertyValue('display'),
        priority: node.style.getPropertyPriority('display')
      }))
    }
    const first = target.texts[0]
    first.parentNode!.insertBefore(label, first)
    state.texts.forEach(({ node }) => {
      node.textContent = ''
    })
    state.ellipses.forEach(({ node }) => {
      node.style.display = 'none'
    })
    anchor.prepend(symbol)
    states.set(anchor, state)
  }
  state.label.title = item.label
  state.label.textContent = getSubStr(item.label, [8, 6])
  state.root.render(
    <TokenSymbol style={{ display: 'inline' }} size={16} logo={item.logo} />
  )
}

export const renderAddressLabels = async (selector: string) => {
  const requestId = (requests.get(selector) || 0) + 1
  requests.set(selector, requestId)
  const pageUrl = window.location.href
  const anchors = Array.from(
    document.querySelectorAll<HTMLAnchorElement>(selector)
  )
  const currentAnchors = new Set(anchors)
  const previous = scannedAnchors.get(selector) || new Set<HTMLAnchorElement>()
  new Set([...previous, ...currentAnchors]).forEach(anchor => {
    const state = states.get(anchor)
    if (
      state &&
      (!anchor.isConnected ||
        !currentAnchors.has(anchor) ||
        getSolscanAccountAddress(anchor.getAttribute('href'), pageUrl) !==
          state.address)
    ) {
      release(anchor, state)
    }
  })
  const candidates = anchors
    .map(anchor => ({
      anchor,
      address: getSolscanAccountAddress(anchor.getAttribute('href'), pageUrl)
    }))
    .filter(
      (item): item is { anchor: HTMLAnchorElement; address: string } =>
        !!item.address
    )
  scannedAnchors.set(selector, new Set(candidates.map(item => item.anchor)))
  const addresses = new Set(candidates.map(item => item.address))
  if (!addresses.size) return

  const res = await chromeEvent.emit<typeof GET_ADDRESS_LABELS, AddressLabel[]>(
    GET_ADDRESS_LABELS,
    {
      chain: 'solana',
      addresses: Array.from(addresses)
    }
  )
  if (!res?.success || !Array.isArray(res.data)) return
  const labels = await mergeAddressLabels(ChainType.SOLANA, res.data, item =>
    addresses.has(item.address)
  )
  if (requests.get(selector) !== requestId || window.location.href !== pageUrl)
    return
  const byAddress = new Map(labels.map(item => [item.address, item]))
  candidates.forEach(({ anchor, address }) => {
    const currentAddress = getSolscanAccountAddress(
      anchor.getAttribute('href'),
      pageUrl
    )
    if (!anchor.isConnected || currentAddress !== address) {
      const state = states.get(anchor)
      if (state && (!anchor.isConnected || state.address !== currentAddress)) {
        release(anchor, state)
      }
      return
    }
    renderLabel(anchor, address, byAddress.get(address))
  })
}
