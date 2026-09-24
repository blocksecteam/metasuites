import cls from 'classnames'
import { type FC, useState } from 'react'
import $ from 'jquery'
import Big from 'big.js'
import { isAddress } from 'ethers'

import { chromeEvent } from '@common/event'
import {
  QUERY_PRIVATE_VARIABLE,
  ContractVariableMutability
} from '@common/constants'
import { ChainFeature } from '@common/config/chain-feature'
import type {
  PrivateVariableArgument,
  PrivateVariable
} from '@common/api/types'
import { TokenSymbol } from '@common/components'
import { useStore } from '@common/hooks'

import { ContractVariableLogBtn } from '../../components'
import { renderModalVariableLogs } from '../../feat-scripts'

interface Props {
  id: string
  chain: string
  address: string
  implAddress?: string
  data: PrivateVariable
}

const ReadContractAccordionItem: FC<Props> = ({
  chain,
  address,
  id,
  implAddress,
  data: { name, inputs, value, outputs, mutability }
}) => {
  const [errorMsg, setErrorMsg] = useState('')
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [queryResult, setQueryResult] = useState<PrivateVariableArgument>()
  const [options] = useStore('options')

  const supportVariableLogs = ChainFeature.supports('variableLog', chain)

  const onQuery = async () => {
    const res = await chromeEvent.emit<
      typeof QUERY_PRIVATE_VARIABLE,
      PrivateVariableArgument
    >(QUERY_PRIVATE_VARIABLE, {
      chain,
      address,
      variableName: name,
      inputs: Object.values(formData),
      implAddress
    })
    if (res?.success && res?.data) {
      setQueryResult(res.data)
    }
    setErrorMsg(res?.success ? '' : res?.message ?? '')
    resizeIframe()
  }

  const resizeIframe = () => {
    const readContractIframe = $('#readcontractiframe')
    setTimeout(() => {
      const iframeHeight = readContractIframe.contents().find('body').height()
      if (iframeHeight) {
        readContractIframe.height(iframeHeight)
      }
    }, 800)
  }

  const renderValue = (v?: PrivateVariableArgument) => {
    if (v) {
      if (isAddress(v.value)) {
        return (
          <a href={`/address/${v.value}`} target="_parent">
            {v.value}
          </a>
        )
      }
      if (typeof v.value === 'string') {
        if (v.type.startsWith('uint')) {
          if (new Big(v.value).gte(new Big(1000000000))) {
            return (
              <a href={`/unitconverter?wei=${v.value}`} target="_parent">
                {v.value}
              </a>
            )
          }
        }
        return v.value
      } else {
        return JSON.stringify(v.value)
      }
    }
    return null
  }

  const idx = id.split('-')[1]
  const label = `${idx}. ${name}`
  const mutabilityLabel =
    mutability === ContractVariableMutability.IMMUTABLE
      ? 'Private Immutable Variable'
      : 'Private Variable'

  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button bg-white link-dark collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#${id}`}
          aria-expanded="false"
          aria-controls={id}
          onClick={resizeIframe}
        >
          <div className="contract-fn-header d-flex flex-wrap align-items-center justify-content-between gap-2 w-100">
            <div className="contract-fn-main d-flex flex-wrap align-items-center gap-1">
              <span className="contract-fn-title small py-1.5 me-1">
                {label}
              </span>
              <span className="d-inline-flex align-items-center gap-1 badge bg-light border border-dark border-opacity-10 text-dark fw-normal py-1.5">
                <TokenSymbol size={12} />
                {mutabilityLabel}
              </span>
            </div>
            <div className="contract-fn-actions d-flex align-items-center gap-1">
              <div className="js-accordion-arrow link-dark transition-all rounded p-1.5 me-n1">
                <i className="far fa-chevron-up fa-fw fa-sm"></i>
              </div>
            </div>
          </div>
        </button>
      </h2>
      <div
        id={id}
        className="js-read-contract-function accordion-collapse collapse"
      >
        <div className="accordion-body bg-light border-top small rounded-bottom-2">
          <form>
            {inputs.length > 0 ? (
              <>
                <div className="form-group">
                  {inputs.map((item, index) => (
                    <div key={index} className="mb-2">
                      <label className="mb-1">
                        {item.name} ({item.type})
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder={`${item.name} (${item.type})`}
                        onChange={e =>
                          setFormData({
                            ...formData,
                            [item.id]: e.target.value
                          })
                        }
                      />
                    </div>
                  ))}
                  <div className="d-flex align-items-center gap-2 mt-2">
                    <button
                      type="button"
                      className="btn btn-sm btn-white border-secondary border-opacity-50 p-2 px-4"
                      onClick={onQuery}
                    >
                      Query
                    </button>
                    {options.variableLogs && supportVariableLogs && (
                      <ContractVariableLogBtn
                        onClick={errorCallback => {
                          const _inputs = inputs.map(i => ({
                            ...i,
                            value: formData[i.id]
                          }))
                          if (_inputs.findIndex(i => !i.value?.trim()) !== -1) {
                            return errorCallback()
                          }
                          renderModalVariableLogs({
                            chain,
                            address,
                            variableName: name,
                            implementation: implAddress,
                            returnType: outputs.map(i => i.type).join(','),
                            inputs: _inputs
                          })
                        }}
                      />
                    )}
                  </div>
                </div>
                {(queryResult || errorMsg) && (
                  <div className="mt-3">
                    <span className={cls({ 'text-danger': errorMsg })}>
                      {errorMsg ? (
                        errorMsg
                      ) : queryResult ? (
                        typeof queryResult.value === 'string' ? (
                          <div>
                            <strong className="me-2">{queryResult.name}</strong>
                            <span className="text-muted">
                              <i>{queryResult.type}</i>
                            </span>
                            <b>: </b>
                            {renderValue(queryResult)}
                          </div>
                        ) : (
                          <div>
                            <b>[ information method Response ]</b>
                            {queryResult.value.length > 0 ? (
                              queryResult.value.map((v, i) => (
                                <div key={i} className="mt-2">
                                  <strong className="me-2">{v?.name}</strong>
                                  <span className="text-muted">
                                    <i>{v?.type}</i>
                                  </span>
                                  <b>: </b>
                                  {renderValue(v)}
                                </div>
                              ))
                            ) : (
                              <div>[ ]</div>
                            )}
                          </div>
                        )
                      ) : null}
                    </span>
                  </div>
                )}
              </>
            ) : (
              <div>
                <span className="me-2">{renderValue(value)}</span>
                <span className="badge bg-white border text-muted text-nowrap fw-medium py-1 px-1.5">
                  {value?.type}
                </span>
                {options.variableLogs && supportVariableLogs && (
                  <div className="mt-3">
                    <ContractVariableLogBtn
                      onClick={() => {
                        renderModalVariableLogs({
                          chain,
                          address,
                          variableName: name,
                          implementation: implAddress,
                          returnType: value?.type ?? '',
                          inputs: []
                        })
                      }}
                    />
                  </div>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default ReadContractAccordionItem
