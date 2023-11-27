import cls from 'classnames'
import { type FC, useState } from 'react'
import $ from 'jquery'
import Big from 'big.js'
import { isAddress } from 'ethers'

import { chromeEvent } from '@common/event'
import {
  QUERY_PRIVATE_VARIABLE,
  ContractVariableMutability,
  VARIABLE_LOG_SUPPORT_LIST
} from '@common/constants'
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

  const supportVariableLogs = VARIABLE_LOG_SUPPORT_LIST.includes(chain)

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
    const isProxy = window.location.hash === '#readProxyContract'
    const readContractIframe = $(
      isProxy ? '#readproxycontractiframe' : '#readcontractiframe'
    )
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

  return (
    <div className={cls('card shadow-none mb-3')}>
      <div className="card-header bg-light card-collapse p-0">
        <a
          className="btn btn-link btn-block text-dark d-flex justify-between align-items-center py-2 collapsed"
          data-toggle="collapse"
          aria-expanded="false"
          href={`#${id}`}
          aria-controls={id}
          onClick={resizeIframe}
        >
          <div className="align-center">
            <span>
              {id.split('-')[1]}. {name} ({' '}
            </span>
            <TokenSymbol size={12} className="mx-1" />
            <span>
              Private
              {mutability === ContractVariableMutability.IMMUTABLE
                ? ' Immutable '
                : ' '}
              Variable )
            </span>
          </div>
          <span className="accordion-arrow">
            <i className="fas fa-arrow-down small"></i>
          </span>
        </a>
      </div>
      <div id={id} className={cls('readContractFunction collapse')}>
        <div className="card-body p-3">
          <form>
            {inputs.length > 0 ? (
              <>
                <div className="form-group">
                  <div className="form-group">
                    {inputs.map((item, index) => (
                      <div key={index}>
                        <label>
                          {item.name} ({item.type})
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-xs"
                          placeholder={`  ${item.name} (${item.type})`}
                          onChange={e =>
                            setFormData({
                              ...formData,
                              [item.name]: e.target.value
                            })
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    id="btn_1"
                    className="btn btn-xs btn-light border"
                    onClick={onQuery}
                  >
                    Query
                  </button>
                  {options.variableLogs && supportVariableLogs && (
                    <ContractVariableLogBtn
                      className="ml-2"
                      onClick={errorCallback => {
                        const _inputs = inputs.map(i => ({
                          ...i,
                          value: formData[i.name]
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
                <div className="mb-3">
                  <img
                    src="/images/svg/shapes/shape-1.svg"
                    className="mt-n1"
                    width="8"
                  />
                  <i>
                    <span className="text-monospace text-muted mx-1">
                      {outputs.map((o, oIndex) => (
                        <span key={oIndex}>
                          <span className="text-secondary mr-2">{o.name}</span>
                          <i>{o.type}</i>
                          {oIndex !== outputs.length - 1 && (
                            <span className="text-secondary mr-2">,</span>
                          )}
                        </span>
                      ))}
                    </span>
                  </i>
                </div>
                <div className="text-secondary mt-3">
                  <span
                    id="myanswer"
                    className={cls({ ['text-danger']: errorMsg })}
                  >
                    {errorMsg ? (
                      errorMsg
                    ) : queryResult ? (
                      <div className="align-center">
                        <br />
                        {typeof queryResult.value === 'string' ? (
                          <div>
                            <strong className="mr-2">
                              {queryResult?.name}
                            </strong>
                            <span className="text-monospace text-muted">
                              <i>{queryResult?.type}</i>
                            </span>
                            <b>: </b>
                            {renderValue(queryResult)}
                          </div>
                        ) : (
                          <div className="mt-4">
                            <b>[ information method Response ]</b>
                            {queryResult.value.length > 0 ? (
                              queryResult.value.map((v, i) => (
                                <div key={i} className="mt-2">
                                  <span className="text-success">
                                    <i className="fa fa-angle-double-right" />
                                  </span>
                                  <strong className="mx-2">{v?.name}</strong>
                                  <span className="text-monospace text-muted">
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
                        )}
                      </div>
                    ) : null}
                  </span>
                </div>
              </>
            ) : (
              <div>
                <span className="form-group mr-2">{renderValue(value)}</span>
                <i>
                  <span className="text-monospace text-muted">
                    {value?.type}
                  </span>
                </i>
                {options.variableLogs && supportVariableLogs && (
                  <div className="mt-4">
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
