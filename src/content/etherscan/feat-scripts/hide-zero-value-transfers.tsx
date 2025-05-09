import React from 'react'
import { createRoot } from 'react-dom/client'

import { ETHERSCAN_PAGES } from '@common/constants'
import { validOrigin } from '@common/utils'

import { HideZeroValueTransfersBtn } from '../components'

function addToggleButton(
  tableHeader: Element,
  table: HTMLElement,
  className?: string
): void {
  const btnRootEl = document.createElement('div')
  btnRootEl.style.display = 'inline-block'
  tableHeader.prepend(btnRootEl)

  createRoot(btnRootEl).render(
    <HideZeroValueTransfersBtn table={table} className={className} />
  )
}

const hideZeroValueTransfers = async (pageName: string) => {
  const tableEl = document.querySelector<HTMLElement>(
    '.table-responsive > table'
  )
  if (!tableEl) return

  switch (pageName) {
    case ETHERSCAN_PAGES.TOKENTXNS.name:
      {
        const containerEl = document.querySelector<HTMLElement>(
          "nav[aria-label='table navigation']"
        )
        if (containerEl) {
          containerEl.style.display = 'flex'
          addToggleButton(containerEl, tableEl, 'me-2')
        }
      }
      break
    case ETHERSCAN_PAGES.ADDRESS.name:
      {
        const processedIframes = new Set<HTMLIFrameElement>()

        const handleIframe = () => {
          const iframe =
            document.querySelector<HTMLIFrameElement>('#tokenpageiframe')
          if (!iframe) return

          if (processedIframes.has(iframe)) return
          if (!validOrigin(iframe.src)) return

          processedIframes.add(iframe)

          const processIframeContent = () => {
            try {
              if (iframe.dataset.hideZeroProcessed === 'true') return

              const _document = iframe?.contentWindow?.document
              if (!_document) return

              const divTokenStatusContainer =
                _document.querySelector<HTMLElement>('#divTokenStatus + div')

              const datatableContainer = _document.querySelector<HTMLElement>(
                '#datatable_wrapper .datainfo'
              )

              let containerEl: HTMLElement | null = null

              if (divTokenStatusContainer) {
                containerEl = divTokenStatusContainer
              } else if (datatableContainer) {
                containerEl = datatableContainer
                containerEl.setAttribute(
                  'class',
                  'justify-between w100 md-flex'
                )
              }

              if (!containerEl) return
              if (containerEl.querySelector('.hide-zero-value-transfers-btn'))
                return

              const tableEl = _document.querySelector<HTMLElement>('table')
              if (containerEl && tableEl) {
                addToggleButton(containerEl, tableEl)
                iframe.dataset.hideZeroProcessed = 'true'
              }
            } catch (e) {
              console.error('Failed to process iframe content:', e)
            }
          }

          let processingTimeout: number | null = null
          const debouncedProcess = () => {
            if (processingTimeout) clearTimeout(processingTimeout)
            processingTimeout = window.setTimeout(() => {
              processIframeContent()
              processingTimeout = null
            }, 200)
          }

          if (iframe.contentWindow?.document?.readyState === 'complete') {
            debouncedProcess()
          }

          const loadHandler = () => debouncedProcess()
          iframe.addEventListener('load', loadHandler, { once: true })

          const iframeObserver = new MutationObserver(mutations => {
            for (const mutation of mutations) {
              if (
                mutation.type === 'attributes' &&
                mutation.attributeName === 'src'
              ) {
                iframe.dataset.hideZeroProcessed = 'false'
                setTimeout(debouncedProcess, 500)
              }
            }
          })

          iframeObserver.observe(iframe, {
            attributes: true,
            attributeFilter: ['src']
          })
        }

        handleIframe()

        let observerDebounceTimer: number | null = null
        const debouncedHandleIframe = () => {
          if (observerDebounceTimer) clearTimeout(observerDebounceTimer)
          observerDebounceTimer = window.setTimeout(() => {
            handleIframe()
            observerDebounceTimer = null
          }, 300)
        }

        const bodyObserver = new MutationObserver(mutations => {
          const hasNewIframe = mutations.some(
            mutation =>
              mutation.type === 'childList' &&
              Array.from(mutation.addedNodes).some(
                node =>
                  node.nodeType === Node.ELEMENT_NODE &&
                  ((node as Element).id === 'tokenpageiframe' ||
                    (node as Element).querySelector?.('#tokenpageiframe'))
              )
          )

          if (hasNewIframe) {
            debouncedHandleIframe()
          }
        })

        bodyObserver.observe(document.body, { childList: true, subtree: true })
      }
      break
  }
}

export default hideZeroValueTransfers
