import { createRoot } from 'react-dom/client'
import $ from 'jquery'

import { DEBANK_SUPPORT_LIST } from '@common/constants'
import { pickAddress } from '@common/utils'

import { DeBankBtn } from '../components'

const genDeBankBtn = async (chain: string, container: JQuery<HTMLElement>) => {
  if (!DEBANK_SUPPORT_LIST.includes(chain)) return
  const mainAddress = pickAddress(window.location.href)
  if (!mainAddress) return

  const rootEl = $('<div></div>')
  container.append(rootEl)
  createRoot(rootEl[0]).render(<DeBankBtn mainAddress={mainAddress} />)
}

export default genDeBankBtn
