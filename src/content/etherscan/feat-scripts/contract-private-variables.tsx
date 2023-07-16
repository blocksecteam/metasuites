import { createRoot } from 'react-dom/client'
import $ from 'jquery'

import { chromeEvent } from '@common/event'
import { GET_PRIVATE_VARIABLES } from '@common/constants'
import { pickAddress } from '@common/utils'
import type {
  PrivateVariablesRes,
  PostPrivateVariablesParams
} from '@common/api/types'

import { ReadContractAccordionItem } from '../components'

/** Show private variables */
const genContractPrivateVariables = async (chain: string) => {
  const readContractIframes = $('#readcontractiframe, #readproxycontractiframe')

  readContractIframes.each(function () {
    $(this).contents().find('body').css('height', 'fit-content')

    $(this).on('load', async () => {
      const isProxy = $(this).attr('id') === 'readproxycontractiframe'
      const mainAddress = pickAddress(window.location.pathname)
      const implAddress = isProxy
        ? pickAddress(
            $('#ContentPlaceHolder1_readProxyMessage').find('a').text()
          )
        : undefined
      if (!mainAddress || (isProxy && !implAddress)) return

      const params: PostPrivateVariablesParams = {
        chain: chain,
        address: mainAddress,
        implAddress
      }

      const res = await chromeEvent.emit<
        typeof GET_PRIVATE_VARIABLES,
        PrivateVariablesRes
      >(GET_PRIVATE_VARIABLES, params)
      if (res?.success && res?.data) {
        const readContractAccordion = $(this)
          .contents()
          .find('#readContractAccordion')
        const lastIdx = readContractAccordion
          .children(':last-child')
          .find("a.btn[data-bs-toggle='collapse'] > .text-left")
          .text()
          .split('.')[0]

        if (res.data.length) {
          const expandBtn = $(this).contents().find('a.expandCollapseAllButton')
          if (expandBtn.text().indexOf('Expand') !== -1) {
            expandBtn.bind('click', () => {
              setTimeout(() => {
                const iframeHeight = $(this).contents().find('body').height()
                if (iframeHeight) {
                  $(this).height(iframeHeight)
                }
              }, 1000)
            })
          }
        }

        res.data.forEach((item, index) => {
          const rootEl = document.createElement('div')
          readContractAccordion.append(rootEl)
          createRoot(rootEl).render(
            <ReadContractAccordionItem
              chain={chain}
              implAddress={implAddress}
              address={mainAddress}
              data={item}
              id={`accordion-${Number(lastIdx) + 1 + index}`}
            />
          )
        })

        requestIdleCallback(() => {
          const iframeHeight = $(this).contents().find('body').height()
          if (iframeHeight) {
            $(this).height(iframeHeight)
          }
        })
      }
    })
  })
}

export default genContractPrivateVariables
