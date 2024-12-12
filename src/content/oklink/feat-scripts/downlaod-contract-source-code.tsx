import { createRoot } from 'react-dom/client'

import { VARIABLE_LOG_SUPPORT_LIST } from '@src/common/constants';
import { DownloadSourceCodeBtn } from '../components'
import CHAIN from '../constant/chain';
import { createTimerFn } from '../utils';
import { getContractVerifiedHeaderDom } from '../utils/dom';

/** download contract source code as zip */
const genDownloadSourceCodeBtn = (address: string) => {
  const chain = CHAIN.chain;
  if (!VARIABLE_LOG_SUPPORT_LIST.includes(chain)) return
  createTimerFn(async () => {
    const headerDom = getContractVerifiedHeaderDom();
    if (!headerDom) { return };
    const buttonBox =document.createElement('div');
    headerDom.prepend(buttonBox)
    createRoot(buttonBox).render(
      <DownloadSourceCodeBtn chain={chain} address={address} />
    )
  })()
}

export default genDownloadSourceCodeBtn
