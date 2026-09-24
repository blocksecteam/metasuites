import { createRoot } from 'react-dom/client'
import $ from 'jquery'

import { pickAddress } from '@common/utils'
import { ModalContractVariableLogs } from '@common/components'
import { store } from '@src/store'
import { chromeEvent } from '@common/event'
import { GET_CONTRACT_VARIABLE_LIST } from '@common/constants'
import { ChainFeature } from '@common/config/chain-feature'
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
  if (!ChainFeature.supports('variableLog', chain)) return

  const readContractIframes = $('#readcontractiframe')

  readContractIframes.each(function () {
    let executed = false
    const handleLoad = async () => {
      if (executed) return

      const mainAddress = pickAddress(window.location.pathname)
      if (!mainAddress) return

      const container = $(this)
        .contents()
        .find('#js-read-contract-function-container')
      if (!container.find('a[data-counter]').length) return

      executed = true

      const supportedVariableList: ContractVariableListItem[] = []
      const res = await chromeEvent.emit<
        typeof GET_CONTRACT_VARIABLE_LIST,
        ContractVariableListItem[]
      >(GET_CONTRACT_VARIABLE_LIST, { chain, address: mainAddress })
      if (res?.success && res?.data) {
        supportedVariableList.push(...res.data)
      }

      container
        .children('.accordion')
        // exclude private variable items injected by genContractPrivateVariables
        .filter(function () {
          return (
            $(this).find('button[data-bs-target^="#readFunction"]').length > 0
          )
        })
        .each(function () {
          const titleEl = $(this).find('.contract-fn-title')
          const titleText = titleEl.text()
          const match = titleText.match(/\d+\.\s+([^(]+)/)
          const variableName = match ? match[1].trim() : titleText

          const variable = supportedVariableList.find(
            i => i.name === variableName
          )
          if (!variable) return

          const badgeEl = $('<span></span>')[0]
          $(this).find('.contract-fn-title').after(badgeEl)
          createRoot(badgeEl).render(
            <ContractVariableAttributes
              originalText={titleText}
              visibility={variable.visibility}
              mutability={variable.mutability}
              variant="badge"
            />
          )

          const accordionBody = $(this).find('.accordion-body')
          const returnType: string[] = []
          accordionBody
            .find('div[id^="type_myanswer_"] .badge')
            .each(function () {
              returnType.push($(this).text().trim())
            })

          const queryBtn = accordionBody.find('button[id^="btn_"]')
          const rootEl = $('<span></span>')
          if (queryBtn.length) {
            rootEl.css('display', 'inline-block')
            queryBtn.after(rootEl)
          } else {
            rootEl.css('display', 'block')
            accordionBody.append(rootEl)
          }

          createRoot(rootEl[0]).render(
            <ContractVariableLogBtn
              variant="primary"
              className={queryBtn.length ? 'ms-2' : 'mt-2'}
              onClick={errorCallback => {
                const inputs: Inputs = []
                let valid = true
                accordionBody.find('.row.g-3 .col-12').each(function () {
                  const val = $(this).find('input').val()
                  if (!val) {
                    valid = false
                    return
                  }
                  const matches = $(this)
                    .find('label')
                    .text()
                    .match(/\((.*?)\)/)
                  if (matches) {
                    inputs.push({ type: matches[1], value: val as string })
                  }
                })
                if (!valid) return errorCallback()
                renderModalVariableLogs({
                  chain,
                  address: mainAddress,
                  variableName,
                  inputs,
                  returnType: returnType.join(',')
                })
              }}
            />
          )
        })
    }

    $(this).on('load', handleLoad)
    if (
      (this as HTMLIFrameElement).contentDocument?.readyState === 'complete'
    ) {
      handleLoad()
    }
  })
}
