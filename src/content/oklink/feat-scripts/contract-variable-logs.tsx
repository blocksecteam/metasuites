import { createRoot } from 'react-dom/client'
import { store } from '@src/store'
import { chromeEvent } from '@common/event'
import {
  GET_CONTRACT_VARIABLE_LIST,
  VARIABLE_LOG_SUPPORT_LIST
} from '@common/constants'
import type { ContractVariableListItem } from '@common/api/types'

import { ContractVariable, ContractVariableLogBtn } from '../components'
import CHAIN from '../constant/chain'
import { getReadContractBoxDom } from '../utils/dom'
import { createTimerFn } from '../utils'
import { PROXY_ADDRESS_ATTR } from '../constant/enum'
import META_SUITES_CLASS from '../constant/metaSuites'

const genContractVariableLogsBtn = (address: string) => {
  const chain = CHAIN.chain;
  if (!VARIABLE_LOG_SUPPORT_LIST.includes(chain)) return
  createTimerFn(async () => {
    const readContractBox = getReadContractBoxDom();
    
    if (!readContractBox) { return };
    const { utc2locale } = await store.get('options')
    const proxyAddressDom = document.querySelector(`[${PROXY_ADDRESS_ATTR}]`);
    const implAddress = proxyAddressDom?.getAttribute(PROXY_ADDRESS_ATTR) || undefined;
    const isProxy = !!proxyAddressDom;
    if(isProxy && !implAddress) { return };
    const supportedVariableList: ContractVariableListItem[] = []
    const res = await chromeEvent.emit<
      typeof GET_CONTRACT_VARIABLE_LIST,
      ContractVariableListItem[]
    >(GET_CONTRACT_VARIABLE_LIST, {
      chain,
      address: address,
      implAddress,
    })
    if (res?.success && res?.data) {
      supportedVariableList.push(...res.data)
    }
    const itemBoxList = [...readContractBox.querySelectorAll(META_SUITES_CLASS.contractItem)];
    supportedVariableList.forEach(async (variable) => {
      const itemBox = itemBoxList.find((itemEl) => {
        const itemTitleBox = itemEl.querySelector(META_SUITES_CLASS.contractTitle);
        const title = itemTitleBox?.textContent?.replace(/^(\d+\.\s*)/, "");
        return title?.startsWith(variable.name);
      });
      if (itemBox) {
        const itemTitleBox = itemBox.querySelector(META_SUITES_CLASS.contractTitle);
        const variableNameEl = document.createElement('span');
        itemTitleBox?.append(variableNameEl);
        createRoot(variableNameEl).render(<ContractVariable variable={variable} />)
        const childBox = itemBox.querySelector(META_SUITES_CLASS.contractChild);
        if (!childBox) { return }
        const buttonBox = document.createElement('span');
        buttonBox.style.display = 'inline-flex';
        buttonBox.style.verticalAlign = 'middle';
        if (childBox.querySelector('input')) {
          buttonBox.style.marginLeft = '12px';
          childBox.append(buttonBox);
        } else {
          buttonBox.style.marginTop = '8px';
          childBox.parentElement?.append(buttonBox);
        }

        createRoot(buttonBox).render(
          <ContractVariableLogBtn
            itemBox={itemBox}
            address={address}
            implementation={implAddress}
            variableName={variable.name}
            utc2locale={utc2locale}
          />
        )
      }
    })
  })()
}

export default genContractVariableLogsBtn;