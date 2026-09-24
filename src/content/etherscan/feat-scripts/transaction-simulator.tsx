import { createRoot } from 'react-dom/client'
import $ from 'jquery'

import { pickAddress } from '@common/utils'
import { ChainFeature } from '@common/config/chain-feature'
import { DrawerSimulation } from '@common/components'
import type { ReadableInputData } from '@common/components/DrawerSimulation/types'

import { SimulateBtn } from '../components'

interface RenderSimulateState {
  chain: string
  address: string
  id?: string
  isProxy?: boolean
  signature?: string
  container?: JQuery<HTMLElement>
}

const processInputArray = (newArray: ReadableInputData[]) => {
  const newCtrl: ReadableInputData[] = []
  const tupleData: string[] = []
  newArray.forEach(item => {
    if (item.id.indexOf('tuple') !== -1) {
      if (newArray.length > 1) {
        if (item.value.indexOf('[') !== -1) {
          let tmp = item.value
            .toString()
            .replace('[', '')
            .replace(']', '')
            .replace('"', '')
            .replace("'", '')
            .replace('"', '')
            .replace("'", '')
            .split(',')
          // handle empty array
          if (tmp.length == 1) {
            if (tmp[0].toString() == '') {
              tmp = []
            }
          }
          tupleData.push(tmp)
        } else {
          tupleData.push(item.value)
        }
        item.value = JSON.stringify(tupleData)
      } else {
        // single field tuple
        tupleData.push(item.value)
        item.value = tupleData
      }
      newCtrl.push(item)
    } else {
      newCtrl.push(item)
    }
  })
  return Object.values(
    newCtrl.reduce(
      (acc: Record<ReadableInputData['id'], ReadableInputData>, cur) => {
        if (!cur.value) return acc
        if (cur.dataGrp) {
          const isArray =
            cur.dataType.indexOf('[') !== -1 &&
            cur.dataType.indexOf(']') !== -1 &&
            cur.value.startsWith('[') &&
            cur.value.endsWith(']')
          let value = ''
          try {
            value = isArray ? JSON.parse(cur.value) : cur.value
          } catch (e) {
            value = ''
          }
          if (acc[cur.dataGrp]) {
            acc[cur.dataGrp] = {
              ...cur,
              value: JSON.stringify([
                ...JSON.parse(acc[cur.dataGrp].value),
                value
              ])
            }
          } else {
            acc[cur.dataGrp] = {
              ...cur,
              value: JSON.stringify([value])
            }
          }
        } else {
          acc[cur.id] = cur
        }
        return acc
      },
      {}
    )
  )
}

const setupInputData = (container?: JQuery<HTMLElement>) => {
  const newArray: ReadableInputData[] = []
  if (container) {
    container.find('input[data-bs-type]').each(function () {
      const object = {} as ReadableInputData
      object.id = $(this).attr('id')!
      object.name = $(this).attr('name')!
      object.value = ($(this).val() as string) ?? ''
      object.dataType = $(this).attr('data-bs-type')!
      object.dataGrp = $(this).attr('data-bs-grp')
      object.argumentName = ($(this).attr('placeholder') ?? '').split(' ')[0]
      newArray.push(object)
    })
  }
  return processInputArray(newArray)
}

const renderDrawer = ({
  id,
  isProxy = false,
  address,
  chain,
  container,
  signature
}: RenderSimulateState) => {
  const func = $(`#${id}`).contents().find('#connectStatus').attr('onclick')
  const sender = func ? pickAddress(func) : undefined

  const gasPrice = $('#spanGasTooltip .gasPricePlaceHolder').text().trim()

  const readableInputs = setupInputData(container)

  const rootEl = $('<div></div>')
  createRoot(rootEl[0]).render(
    <DrawerSimulation
      chain={chain}
      gasPrice={gasPrice}
      receiver={address}
      sender={sender}
      isProxy={isProxy}
      signature={signature}
      readableInputs={readableInputs}
    />
  )
  $('body').append()
}

const renderUnverifiedSimulateButton = (chain: string, address: string) => {
  const isReInit = !!document.querySelector<HTMLElement>(
    "#ContentPlaceHolder1_li_contracts font[color='brown']"
  )
  const dividcode = $('#dividcode')
  if (isReInit) {
    const pre = dividcode?.find('pre')
    pre.css('margin-top', '0')
  }
  const root = $('<span></span>')
  root.css('float', 'right')
  root.insertBefore(dividcode)
  createRoot(root[0]).render(
    <SimulateBtn
      className="items-center md-flex"
      style={{ boxShadow: 'none' }}
      onClick={() => {
        renderDrawer({ chain, address })
      }}
    />
  )
}

const renderVerifiedSimulateButton = async (chain: string, address: string) => {
  const writeContractIframes = $(
    '#writecontractiframe, #writeproxycontractiframe'
  )

  writeContractIframes.each(function () {
    const id = $(this).attr('id')!
    const isWriteProxy = id === 'writeproxycontractiframe'
    const implementation = pickAddress(
      $('#ContentPlaceHolder1_readProxyMessage').find('a').text()
    )
    const contract = isWriteProxy ? implementation : address
    const isProxy = !isWriteProxy && !!implementation

    const renderSimulateButtons = () => {
      const headerBtnGroup = $(this).contents().find('#connectStatus').parent()
      if (headerBtnGroup.length) {
        const rootEl = document.createElement('span')
        headerBtnGroup.prepend(rootEl)
        createRoot(rootEl).render(
          <SimulateBtn
            style={{ boxShadow: 'none' }}
            onClick={() => {
              renderDrawer({ chain, address, id, isProxy })
            }}
          />
        )
      }

      $(this)
        .contents()
        .find('.accordion-body')
        .each(function () {
          const accordionBody = $(this)
          const accordionEl = accordionBody.closest('.accordion')
          const clipboardText =
            accordionEl
              .find('.js-clipboard[aria-label="Copy Method Name"]')
              .attr('data-clipboard-text') ?? ''
          const [, funcName, selector] =
            clipboardText.match(/(\S+)\s*\((\S+)\)/) ?? []
          const writeBtnContainer = accordionBody.find('.mt-3')
          if (!writeBtnContainer.length) return
          const rootEl = document.createElement('span')
          writeBtnContainer.find('.write-btn').after(rootEl)
          createRoot(rootEl).render(
            <SimulateBtn
              className="py-2 px-4 ms-2"
              chain={chain}
              contract={contract}
              selector={selector}
              funcName={funcName}
              onClick={signature =>
                renderDrawer({
                  chain,
                  address,
                  id,
                  isProxy,
                  signature,
                  container: accordionEl
                })
              }
            />
          )
        })
    }

    const iframeContentsExist = !!$(this)
      .contents()
      .find('#js-write-contract-function-container')
      .children('.accordion').length

    if (iframeContentsExist) {
      renderSimulateButtons()
      return
    }

    $(this).on('load', async () => {
      renderSimulateButtons()
    })
  })
}

export const genSimulateBtn = async (chain: string) => {
  if (!ChainFeature.supports('txSimulator', chain)) return
  const address = pickAddress(window.location.pathname)
  if (!address) return

  const isVerified = !!$('#ContentPlaceHolder1_contractCodeDiv').length

  if (!isVerified) {
    renderUnverifiedSimulateButton(chain, address)
    return
  }

  return renderVerifiedSimulateButton(chain, address)
}
