import { type FC, useState, useRef } from 'react'
import cls from 'classnames'

import { ModalContractVariableLogs, TokenSymbol } from '@common/components'
import type { BaseComponent } from '@common/types'
import styles from './index.module.less'
import CHAIN from '../../constant/chain'
import META_SUITES_CLASS from '../../constant/metaSuites'
import GLOBAL from '../../constant/global'

interface Props extends BaseComponent {
  itemBox: Element | null;
  address: string;
  implementation?: string;
  variableName: string;
  utc2locale: boolean;
}

type Inputs = {
  name?: string
  type: string
  value: string
}[]

const ContractVariableLogBtn: FC<Props> = ({ itemBox, address, implementation, variableName, utc2locale }) => {
  const [visible, setVisible] = useState(false)
  const [error, setError] = useState(false)
  const timer = useRef<NodeJS.Timeout>();
  const [inputs, setInputs] = useState<Inputs>([])
  const formatUrl = (url: string) => {
    return GLOBAL.prefixPathWithChain + url.toLocaleLowerCase();
  }

  const alertError = () => {
    clearTimeout(timer.current);
    setError(true);
    timer.current = setTimeout(() => {
      setError(false)
    }, 3000)
  }

  const handleClick = () => {
    const inputs: Inputs = []
    let valid = true;
    const labelDoms = itemBox?.querySelectorAll('label');
    itemBox?.querySelectorAll(META_SUITES_CLASS.contractInput).forEach((inputEl, index) => {
      const val = (inputEl as HTMLInputElement).value;
      if (!val) {
        valid = false;
        return;
      }

      const matches = labelDoms?.[index]?.textContent?.match(/\((.*?)\)/);
      if (matches) {
        inputs.push({
          type: matches[1],
          value: val
        })
      }
    });
    setInputs(inputs);
    if (!valid) {
      alertError();
      return;
    }
    setVisible(true);
  }


  return (
    <>
      <button
        type="button"
        className={cls(styles.button)}
        onClick={handleClick}
      >
        <TokenSymbol size={14.4} mr={4} color="#fff" />
        Logs
      </button>
      {error && (
        <span className={styles.error}>
          Please complete all fields to see the logs of that variable.
        </span>
      )}
      {visible && <ModalContractVariableLogs
        chain={CHAIN.chain}
        address={address}
        implementation={implementation}
        inputs={inputs}
        variableName={variableName}
        returnType=''
        utc2locale={utc2locale}
        formatUrl={formatUrl}
        onClose={() => { setTimeout(() => {setVisible(false)} , 100) }}
      />}
    </>
  )
}

export default ContractVariableLogBtn
