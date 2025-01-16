import { type FC, useRef, useState } from 'react'
import { chromeEvent } from '@common/event'
import { QUERY_PRIVATE_VARIABLE } from '@common/constants'
import type {
  PrivateVariableArgument,
  PrivateVariable
} from '@common/api/types'

import styles from './index.module.less'
import TitleBox from './TitleBox'
import Form from './Form'
import ButtonGroup from './ButtonGroup'
import Result from './Result'
import META_SUITES_CLASS from '../../constant/metaSuites'

interface Props {
  id: string
  chain: string
  address: string
  implAddress?: string
  data: PrivateVariable
  utc2locale: boolean
}

const ReadContractAccordionItem: FC<Props> = ({
  chain,
  address,
  id,
  utc2locale,
  implAddress,
  data
}) => {
  const parentDomRef = useRef<HTMLDivElement>(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [queryResult, setQueryResult] = useState<PrivateVariableArgument>()

  const getInputValue = () => {
    const inputs: string[] = []
    let valid = true
    parentDomRef.current
      ?.querySelectorAll(META_SUITES_CLASS.contractInput)
      .forEach(inputEl => {
        const val = (inputEl as HTMLInputElement).value
        if (!val) {
          valid = false
          return
        }
        inputs.push(val)
      })
    return valid ? inputs : null
  }

  const onQuery = async () => {
    setErrorMsg('')
    const inputs = getInputValue()
    if (!inputs) {
      setErrorMsg(
        'Please complete all fields to see the logs of that variable.'
      )
      return
    }
    const res = await chromeEvent.emit<
      typeof QUERY_PRIVATE_VARIABLE,
      PrivateVariableArgument
    >(QUERY_PRIVATE_VARIABLE, {
      chain,
      address,
      variableName: data.name,
      inputs: inputs,
      implAddress
    })
    if (res?.success && res?.data) {
      setQueryResult(res.data)
    }
    setErrorMsg(res?.success ? '' : res?.message ?? '')
  }
  return (
    <div ref={parentDomRef} className={styles.wrapper}>
      <TitleBox id={id} data={data} />
      <div className={styles.children}>
        <Form data={data} />
        {!data.inputs?.length && <Result data={data} />}
        <ButtonGroup
          data={data}
          onQuery={onQuery}
          implementation={implAddress}
          variableName={data.name}
          parentDomRef={parentDomRef}
          address={address}
          utc2locale={utc2locale}
        />
        {errorMsg && <div className={styles.error}>{errorMsg}</div>}
        {!!data.inputs?.length && queryResult && (
          <Result data={data} queryResult={queryResult} />
        )}
      </div>
    </div>
  )
}

export default ReadContractAccordionItem
