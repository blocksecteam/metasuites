import type { CallbackResponse } from 'chrome-extension-core/lib/event'
import { createRoot } from 'react-dom/client'
import $ from 'jquery'

import { chromeEvent } from '@common/event'
import type { AddressLabel } from '@common/api/types'
import { GET_IMPL_LABELS } from '@common/constants'

import { MainAddressLabel } from '../components'

const getSiblingEl = () => {
  const lastTag = $(
    '[data-component="EntityTags"] [data-component="Tag"]:last-of-type'
  )

  if (lastTag.length > 0) {
    return lastTag
  }

  const pageTitle = $('[data-component="PageTitle__title"]')

  return pageTitle
}

/** enhanced address label */
const genMainAddressLabel = async (chain: string) => {
  const mainAddress = $('#meta-suites__main-address').text().trim()

  if (!mainAddress) return

  await chromeEvent
    .emit(GET_IMPL_LABELS, { chain: chain, addresses: [mainAddress] })
    .then((res: CallbackResponse<AddressLabel[]> | undefined) => {
      console.log('__>__', res)
      if (res?.success && res.data.length) {
        const sibling = getSiblingEl()

        const label = res.data[0].label
        if (
          label
          // TODO @tom2drum check if there is no similar tags
          // &&
          // label !== getEtherscanNameTag() &&
          // label !== getEtherscanEnsName() &&
          // !getEtherscanTags().includes(label)
        ) {
          const labelRootEl = $('<div></div>')
          sibling.after(labelRootEl)
          createRoot(labelRootEl[0]).render(
            <MainAddressLabel data={res.data[0]} />
          )
        }
      }
    })
}

export default genMainAddressLabel
