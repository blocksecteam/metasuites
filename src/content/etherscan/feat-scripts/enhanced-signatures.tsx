import { isMethod } from '@common/utils'
import { chromeEvent } from '@common/event'
import type { MethodLabel } from '@common/api/types'
import {
  GET_ADDRESS_METHODS,
  TABLE_LIST_METHOD_SELECTORS_V2
} from '@common/constants'

const handleReplace = async (
  chain: string,
  elements: HTMLElement[],
  queryList: string[]
) => {
  const res = await chromeEvent.emit<typeof GET_ADDRESS_METHODS, MethodLabel[]>(
    GET_ADDRESS_METHODS,
    { codeHash: queryList }
  )

  if (res?.success && res?.data?.length) {
    const resultLabels: MethodLabel[] = res.data
    resultLabels.forEach(item => {
      elements.forEach(el => {
        const innerText = el.innerText
        if (item.codeHash === innerText) {
          el.innerText = item.function
        }
      })
    })
  }
}

const genEnhancedSignatures = async (
  chain: string,
  selector = TABLE_LIST_METHOD_SELECTORS_V2
) => {
  const methodsTags = document.querySelectorAll<HTMLElement>(selector)
  // const dropdownMethodBtnEl =
  //   document.querySelector<HTMLElement>('#dropdownMethod')
  const methodList: string[] = []
  const tagsList: HTMLElement[] = []

  for (let i = 0; i < methodsTags.length; ++i) {
    const el = methodsTags[i]
    const innerText = el.innerText
    if (isMethod(innerText)) {
      if (!methodList.includes(innerText)) {
        methodList.push(innerText)
      }
      tagsList.push(el)
    }
  }

  // if (dropdownMethodBtnEl) {
  //   dropdownMethodBtnEl.onclick = () => {
  //     genEnhancedSignatures(
  //       chain,
  //       '#ContentPlaceHolder1_divMethodFilter > li.aFilterTransfer > a > h6 > span.hash-tag.text-truncate'
  //     )
  //   }
  // }

  if (methodList.length) handleReplace(chain, tagsList, methodList)
}

export default genEnhancedSignatures
