import $ from 'jquery'

import { handleAddressNodeListCopy } from '@common/scripts/copy-address'

const genCopyAddressBtn = async () => {
  const addressTags = $("a[href*='/btc/address' i]").toArray()
  handleAddressNodeListCopy(addressTags)
}

export default genCopyAddressBtn
