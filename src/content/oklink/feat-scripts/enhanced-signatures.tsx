import { isMethod } from '@common/utils'
import { chromeEvent } from '@common/event'
import type { MethodLabel } from '@common/api/types'
import { GET_ADDRESS_METHODS } from '@common/constants'
import { createRoot } from 'react-dom/client'
import OverflowTip from '@src/common/components/OverflowTip'
import { TokenSymbol } from '@src/common/components'
import CHAIN from '../constant/chain'
import { createTimerFn } from '../utils'
import { getMethodsDom } from '../utils/dom'

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
          createRoot(el).render(
            <div className="text-ellipsis flex-center">
              <TokenSymbol size={14.4} mr={4} />
              <OverflowTip>{item.function}</OverflowTip>
            </div>
          )
        }
      })
    })
  }
}

const genEnhancedSignatures = () => {
  const chain = CHAIN.chain
  createTimerFn(() => {
    const methodsTags = getMethodsDom()
    if (!methodsTags?.length) return
    const methodList: string[] = []
    const tagsList: HTMLElement[] = []
    methodsTags.forEach(el => {
      const innerText = el.innerText
      if (isMethod(innerText)) {
        if (!methodList.includes(innerText)) {
          methodList.push(innerText)
        }
        tagsList.push(el)
      }
    })
    if (methodList.length) {
      handleReplace(chain, tagsList, methodList)
    }
  })()
}

export default genEnhancedSignatures
