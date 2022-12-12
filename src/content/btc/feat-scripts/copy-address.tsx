import { handleAddressNodeListCopy } from '@common/scripts/copy-address'

const genCopyAddressBtn = async () => {
  const addressTags = document.querySelectorAll<HTMLElement>(
    "a[href*='/btc/address' i]"
  )
  handleAddressNodeListCopy(addressTags)
}

export default genCopyAddressBtn
