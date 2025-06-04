import { createRoot } from 'react-dom/client'
import $ from 'jquery'

import { pickAddress } from '@common/utils'
import { ModalContractVariableLogs } from '@common/components'
import { store } from '@src/store'
import { chromeEvent } from '@common/event'
import {
  GET_CONTRACT_VARIABLE_LIST,
  VARIABLE_LOG_SUPPORT_LIST
} from '@common/constants'
import type { ContractVariableListItem } from '@common/api/types'

import {
  ContractVariableLogBtn,
  ContractVariableAttributes
} from '../components'

type Inputs = {
  name?: string
  type: string
  value: string
}[]

interface RenderModalLogsState {
  chain: string
  address: string
  variableName: string
  inputs: Inputs
  implementation?: string
  returnType: string
}

export const renderModalVariableLogs = async ({
  chain,
  inputs,
  address,
  implementation,
  variableName,
  returnType
}: RenderModalLogsState) => {
  const { utc2locale } = await store.get('options')
  const rootEl = $('<div></div>')
  createRoot(rootEl[0]).render(
    <ModalContractVariableLogs
      chain={chain}
      address={address}
      implementation={implementation}
      inputs={inputs}
      variableName={variableName}
      returnType={returnType}
      utc2locale={utc2locale}
    />
  )
  $('body').append()
}

export const genContractVariableLogsBtn = async (chain: string) => {
  if (!VARIABLE_LOG_SUPPORT_LIST.includes(chain)) return
  const address = pickAddress(window.location.pathname)
  if (!address) return

  const readContractIframes = $('#readcontractiframe, #readproxycontractiframe')

  readContractIframes.each(function () {
    $(this).on('load', async () => {
      const isProxy = $(this).attr('id') === 'readproxycontractiframe'
      const mainAddress = pickAddress(window.location.pathname)
      const implAddress = isProxy
        ? pickAddress(
            $('#ContentPlaceHolder1_readProxyMessage').find('a').text()
          )
        : undefined
      if (!mainAddress || (isProxy && !implAddress)) return

      const supportedVariableList: ContractVariableListItem[] = []
      const res = await chromeEvent.emit<
        typeof GET_CONTRACT_VARIABLE_LIST,
        ContractVariableListItem[]
      >(GET_CONTRACT_VARIABLE_LIST, {
        chain,
        address: mainAddress,
        implAddress
      })
      if (res?.success && res?.data) {
        supportedVariableList.push(...res.data)
      }

      $(this)
        .contents()
        .find('#readContractAccordion .card')
        .each(function () {
          const variableNameEl = $(this).find(
            ".card-header > a[href^='#readCollapse'] > div:first-child"
          )
          const variableNameText = variableNameEl.text()
          const match = variableNameText.match(/\d+\.\s+([^(]+)/)
          const variableName = match ? match[1].trim() : variableNameText

          const variable = supportedVariableList.find(
            i => i.name === variableName
          )
          if (!variable) return

          // Create a container for the React component
          const containerDiv = $('<div></div>')[0]
          variableNameEl.empty().append(containerDiv)

          // Render React component into the container
          createRoot(containerDiv).render(
            <ContractVariableAttributes
              originalText={variableNameText}
              visibility={variable.visibility}
              mutability={variable.mutability}
            />
          )

          $(this)
            .find('.collapse .card-body > form')
            .each(function () {
              const returnType: string[] = []
              $(this)
                .find('i')
                .each(function () {
                  returnType.push($(this).text().trim())
                })
              $(this)
                .find('> .form-group')
                .each(function () {
                  const queryBtn = $(this).find('button')
                  const rootEl = $('<span></span>')
                  let cls = ''
                  if (queryBtn.length) {
                    rootEl.css('display', 'inline-block')
                    cls = 'ms-2'
                    queryBtn.after(rootEl)
                  } else {
                    $(this).after(rootEl)
                  }
                  createRoot(rootEl[0]).render(
                    <ContractVariableLogBtn
                      className={cls}
                      onClick={errorCallback => {
                        const inputs: Inputs = []
                        let valid = true
                        $(this)
                          .find('.form-group label')
                          .each(function () {
                            const val = $(this).next('input').val()
                            if (!val) {
                              valid = false
                              return
                            }
                            const matches = $(this)
                              .text()
                              .match(/\((.*?)\)/)
                            if (matches) {
                              inputs.push({
                                type: matches[1],
                                value: val as string
                              })
                            }
                          })
                        if (!valid) return errorCallback()
                        renderModalVariableLogs({
                          chain,
                          address: mainAddress,
                          variableName,
                          inputs,
                          implementation: implAddress,
                          returnType: returnType.join(',')
                        })
                      }}
                    />
                  )
                })
            })
        })
    })
  })
}
