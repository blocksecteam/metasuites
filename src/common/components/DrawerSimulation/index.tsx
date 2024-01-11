import React, { type FC, useEffect, useState } from 'react'
import {
  Form,
  Input,
  Button,
  Select,
  Radio,
  Switch,
  Tooltip,
  Drawer,
  notification
} from 'antd'
import cls from 'classnames'
import { debounce, isObject } from 'lodash-es'
import isMobile from 'is-mobile'
import { ethers } from 'ethers'
import { QuestionCircleOutlined } from '@ant-design/icons'
import BigIntJSON from 'json-bigint'

import { getImageUrl, getPhalconSimulationURL } from '@common/utils'
import {
  PATTERN_EVM_ADDRESS_EXAC,
  PATTERN_INPUT_DATA,
  SIMULATE_SUPPORT_LIST,
  GET_CONTRACT_BY_ADDRESS,
  GET_CONTRACT_BY_ABI,
  GET_LATEST_BLOCK,
  SIMULATE_TRANSACTION
} from '@common/constants'
import { CopyButton, IconClose } from '@common/components'
import { chromeEvent } from '@common/event'
import type {
  VerifiedContractData,
  Arguments,
  SimulateTxParams
} from '@common/api/types'
import { PHALCON_EXPLORER_DOMAIN } from '@common/config/uri'

import styles from './index.module.less'
import type {
  FormattedContractData,
  FormData,
  ReadableInputData
} from './types'
import { formatContractData } from './utils'
import { FUNC_SPLIT } from './constants'
import { TokenSymbol } from '../../components'

const { TextArea } = Input

interface Props {
  chain: string
  sender?: string
  receiver: string
  isProxy: boolean
  signature?: string
  gasPrice: string
  readableInputs?: ReadableInputData[]
}

const DrawerSimulation: FC<Props> = ({
  chain,
  receiver,
  sender,
  isProxy,
  gasPrice,
  readableInputs = [],
  signature
}) => {
  const [form] = Form.useForm<FormData>()

  const [visible, setVisible] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [initialValues] = useState({
    chain,
    receiver,
    sender,
    isPrerun: true,
    useABI: false
  })
  const [loading, setLoading] = useState(false)
  const [nativeSymbol, setNativeSymbol] = useState<string | undefined>(
    SIMULATE_SUPPORT_LIST.find(i => i.chain === chain)?.nativeCurrency.name
  )
  const [latestBlockNum, setLatestBlockNum] = useState(123455)
  const [formattedContractData, setFormattedContractData] =
    useState<FormattedContractData>({
      methodsOptions: [],
      methods: [],
      abi: {
        proxyABI: '',
        implementationABI: ''
      }
    })

  const estimatedGas = Number.isNaN(gasPrice)
    ? '100'
    : Math.ceil(Number(gasPrice) * (1 + 0.2)).toString()

  const handleOk = debounce(() => {
    form.validateFields().then(values => {
      const params: SimulateTxParams = {
        isPrerun: values.isPrerun,
        sender: values.sender,
        chain: values.chain,
        inputData: values.inputData,
        value: values.value || '0',
        gasLimit: Number(values.gasLimit) || 1000000,
        gasPrice: values.gasPrice || estimatedGas,
        receiver: values.receiver || ''
      }
      if (!values.isPrerun) {
        params.blockNumber = Number(values.blockNumber) || latestBlockNum
        params.position = Number(values.position) || 0
      }
      if (values.useABI) {
        const inputData = getInputData()
        if (!inputData) return
        params.inputData = inputData
      }
      handleSimulate(params)
    })
  }, 500)

  const onValuesChange = debounce((changedValues: any, values: FormData) => {
    if (Object.keys(changedValues).includes('chain')) {
      const symbol = SIMULATE_SUPPORT_LIST.find(i => i.chain === values.chain)
        ?.nativeCurrency.name
      setNativeSymbol(symbol)
      getContractByAddress()
    }
    if (Object.keys(changedValues).includes('receiver')) {
      getContractByAddress()
    }
    if (Object.keys(changedValues).includes('inputData') && values.receiver) {
      getContractByAddress()
    }
    if (Object.keys(changedValues).includes('localABI')) {
      getContractByABI()
    }
    if (Object.keys(changedValues).includes('function')) {
      form.resetFields(['parameters'])
    }
  }, 300)

  const getContractByABI = async () => {
    const res = await chromeEvent.emit<
      typeof GET_CONTRACT_BY_ABI,
      VerifiedContractData
    >(GET_CONTRACT_BY_ABI, {
      abi: form.getFieldValue('localABI'),
      callData: form.getFieldValue('inputData')
    })
    if (res?.success) {
      updateFormFields(res.data)
    }
  }

  const getContractByAddress = async () => {
    const res = await chromeEvent.emit<
      typeof GET_CONTRACT_BY_ADDRESS,
      VerifiedContractData
    >(GET_CONTRACT_BY_ADDRESS, {
      chain: form.getFieldValue('chain') ?? chain,
      address: form.getFieldValue('receiver') ?? receiver,
      callData: form.getFieldValue('inputData') ?? ''
    })
    if (res?.success) {
      updateFormFields(res.data)
    }
  }

  const getLatestBlock = async () => {
    const res = await chromeEvent.emit<
      typeof GET_LATEST_BLOCK,
      { latestBlockNumber: number }
    >(GET_LATEST_BLOCK, chain)
    if (res?.success) {
      setLatestBlockNum(res.data.latestBlockNumber ?? 0)
    }
  }

  const handleSimulate = async (params: SimulateTxParams) => {
    setLoading(true)
    const res = await chromeEvent.emit<
      typeof SIMULATE_TRANSACTION,
      { key: string }
    >(SIMULATE_TRANSACTION, params)
    setLoading(false)
    if (res?.success) {
      window.open(getPhalconSimulationURL(chain, res.data.key, params.isPrerun))
    } else {
      notification.error({ message: res?.message })
    }
  }

  const updateFormFields = (data: VerifiedContractData) => {
    const { methods, methodsOptions, abi } = formatContractData(data)
    setFormattedContractData({
      methods,
      methodsOptions,
      abi
    })

    if (!data.unpacked) {
      if (!mounted && signature) {
        setMounted(true)
        const functionValue = `${
          isProxy ? 'proxy' : 'implementation'
        }${FUNC_SPLIT}${signature}`
        const flag = methods.findIndex(i => i.value === functionValue) !== -1
        if (flag) {
          form.setFieldValue('useABI', true)
          form.setFieldValue('function', functionValue)
          const parameters: Record<string, any> = {}

          const funcName = signature.replace(/\([^)]*\)/g, '')

          readableInputs.forEach(item => {
            if (funcName === item.argumentName) {
              form.setFieldValue('value', item.value)
            } else {
              parameters[`${functionValue}_${item.argumentName}`] = item.value
            }
          })
          form.setFieldValue('parameters', parameters)
        }
      } else {
        form.resetFields(['function', 'parameters'])
      }
      return
    }

    const method = methods.find(
      item =>
        item.value ===
        `${
          data?.proxyMatch
            ? `proxy${FUNC_SPLIT}${data?.unpackedCallData?.signature}`
            : `implementation${FUNC_SPLIT}${data?.unpackedCallData?.signature}`
        }`
    )

    const obj: any = {}
    method?.argumentsIn.forEach((item, index) => {
      const value = data?.unpackedCallData?.params?.[index]
      // method.value => signature, item.name => parameter name
      obj[`${method.value}_${item.name}`] = isObject(value)
        ? JSON.stringify(value)
        : value
    })

    form.setFieldValue(
      'function',
      `${
        data?.proxyMatch
          ? `proxy${FUNC_SPLIT}${data?.unpackedCallData?.signature}`
          : `implementation${FUNC_SPLIT}${data?.unpackedCallData?.signature}`
      }`
    )
    form.setFieldValue('parameters', obj)
  }

  const getInputData = () => {
    const [contractType, signature] = form
      .getFieldValue('function')
      .split(FUNC_SPLIT)
    const params = form.getFieldValue('parameters') as FormData['parameters']
    const parameters: Record<string, any> = {}
    Object.keys(params ?? {}).forEach(key => {
      try {
        parameters[key] = BigIntJSON({ storeAsString: true }).parse(params[key])
      } catch (error) {
        parameters[key] = params[key]
      }
    })

    try {
      let abi = formattedContractData.abi.implementationABI
      if (contractType === 'proxy') {
        abi = formattedContractData.abi.proxyABI
      }
      const iface = new ethers.Interface(abi)
      return iface.encodeFunctionData(signature, Object.values(parameters))
    } catch (error) {
      notification.error({ message: 'encode function data error' })
      return ''
    }
  }

  const resetContract = () => {
    setFormattedContractData({
      methodsOptions: [],
      methods: [],
      abi: {
        proxyABI: '',
        implementationABI: ''
      }
    })
    form.setFieldValue('function', '')
  }

  useEffect(() => {
    document.body.style.overflow = visible ? 'hidden' : 'unset'
  }, [visible])

  useEffect(() => {
    notification.config({
      getContainer: () =>
        document.querySelector(`.${styles.container}`) as HTMLElement
    })
    getContractByAddress()
    getLatestBlock()
  }, [])

  return (
    <Drawer
      zIndex={2147483647}
      rootClassName={styles.root}
      maskClosable
      width={isMobile() ? '100%' : 530}
      closable={false}
      title={
        <div className="align-center">
          <IconClose mr={16} onClick={() => setVisible(false)} />
          <span>Simulator</span>
          <Tooltip
            title={
              <span>
                Simulate transactions without signing or on-chain execution,
                previewing the result. Feature provided by the Phalcon team.{' '}
                <a
                  href="https://docs.blocksec.com/phalcon-explorer/user-manual#transaction-simulation"
                  target="_blank"
                  rel="noreferrer"
                >
                  Manual
                </a>
              </span>
            }
            getPopupContainer={node => node}
          >
            <QuestionCircleOutlined
              style={{
                color: '#929292',
                marginLeft: 4,
                display: 'flex',
                alignItems: 'baseline'
              }}
            />
          </Tooltip>
        </div>
      }
      footer={null}
      destroyOnClose
      extra={
        <Button
          className="align-center"
          type="primary"
          onClick={() => window.open(PHALCON_EXPLORER_DOMAIN)}
        >
          <img
            style={{ width: '18px', marginRight: 6 }}
            src="https://assets.blocksec.com/image/1665197794474-3.png"
            alt=""
          />
          Try Enhanced Version
        </Button>
      }
      onClose={() => setVisible(false)}
      open={visible}
    >
      <div className={styles.container}>
        <Form
          className={styles.form}
          form={form}
          layout="vertical"
          labelAlign="left"
          initialValues={initialValues}
          disabled={loading}
          onValuesChange={onValuesChange}
        >
          <Form.Item name="chain" label="Network" rules={[{ required: true }]}>
            <Select
              disabled
              getPopupContainer={() =>
                document.querySelector(`.${styles.container}`)!
              }
            >
              {SIMULATE_SUPPORT_LIST.map(item => (
                <Select.Option key={item.chain} value={item.chain}>
                  <div className="align-center" style={{ fontSize: 12 }}>
                    <TokenSymbol logo={item.logo} mr={4} size={14} />
                    {item.name}
                  </div>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="sender"
            label="Sender"
            rules={[
              { required: true, message: 'Please enter Sender' },
              {
                pattern: PATTERN_EVM_ADDRESS_EXAC,
                message: 'Please enter a valid Sender'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="receiver"
            label="Receiver"
            rules={[
              {
                required: true,
                message: (
                  <span>
                    The &apos;Receiver&apos; is empty. To deploy a contract, we
                    recommend you visit the
                    <a
                      className="letter-space-lr-1"
                      href="https://phalcon.blocksec.com/explorer"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Phalcon Simulator
                    </a>
                    or
                    <a
                      className="letter-space-lr-1"
                      href="https://phalcon.blocksec.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Phalcon Fork
                    </a>
                    for a superior user experience.
                  </span>
                )
              },
              {
                pattern: PATTERN_EVM_ADDRESS_EXAC,
                message: 'Please enter a valid Receiver'
              }
            ]}
          >
            <Input />
          </Form.Item>
          {/*======================================================================*/}
          <Form.Item noStyle shouldUpdate>
            {({ getFieldValue, getFieldError }) => {
              const error = getFieldError('receiver')
              const receiver = getFieldValue('receiver')
              const useABI = getFieldValue('useABI') ?? false

              const renderRadioGroup = () => (
                <Form.Item name="useABI" style={{ marginBottom: 6 }}>
                  <Radio.Group
                    options={[
                      { label: 'rawdata', value: false },
                      {
                        label: 'ABI',
                        value: true,
                        disabled: !receiver || !!error.length
                      }
                    ]}
                  />
                </Form.Item>
              )

              return useABI ? (
                <>
                  {/**
                   method value 通过合约类型 + 分隔符 + method signature 拼接而成
                   method 参数的 Form name 为 method value + '_' + 参数名拼接而成
                   */}
                  <Form.Item
                    label={<span className={styles.labelIcon}>Function</span>}
                  >
                    <div className="justify-between">
                      {renderRadioGroup()}
                      <div>
                        <Form.Item
                          name="useLocalABI"
                          noStyle
                          valuePropName="checked"
                        >
                          <Switch
                            size="small"
                            onChange={checked => {
                              if (checked) {
                                resetContract()
                              } else {
                                getContractByAddress()
                              }
                            }}
                          />
                        </Form.Item>
                        <span style={{ paddingLeft: 5 }}>Use Local ABI</span>
                      </div>
                    </div>
                    <Form.Item noStyle dependencies={['useLocalABI']}>
                      {({ getFieldValue }) => {
                        const useLocalABI = getFieldValue('useLocalABI')

                        return useLocalABI ? (
                          <Form.Item name="localABI" preserve={false}>
                            <TextArea />
                          </Form.Item>
                        ) : null
                      }}
                    </Form.Item>

                    <Form.Item
                      name="function"
                      rules={[
                        {
                          required: true,
                          message: 'Please select a Function'
                        }
                      ]}
                    >
                      <Select
                        getPopupContainer={node => node}
                        notFoundContent={
                          <>
                            Contract unverified. Open &quot;Use Local ABI&quot;
                            option if you have the ABI
                          </>
                        }
                        placeholder={
                          formattedContractData?.methodsOptions?.length
                            ? 'Please select a function'
                            : `Contract unverified. Open "Use Local ABI" option if you have the ABI`
                        }
                        optionLabelProp="name"
                        options={formattedContractData.methodsOptions}
                        defaultActiveFirstOption
                      />
                    </Form.Item>
                  </Form.Item>

                  <Form.Item dependencies={['function']} noStyle>
                    {({ getFieldValue }) => {
                      const funcValue = getFieldValue('function')

                      const method = formattedContractData.methods.find(
                        item => item.value === funcValue
                      )

                      return method ? (
                        <div>
                          {method?.argumentsIn.map(
                            (item: Arguments, index: number) => {
                              return (
                                <div
                                  key={index}
                                  className="justify-between align-center"
                                  style={{ marginLeft: 30 }}
                                >
                                  <span
                                    className={styles.help}
                                    style={{
                                      paddingBottom: 10,
                                      paddingLeft: 0,
                                      width: 140,
                                      whiteSpace: 'pre-wrap',
                                      display: 'inline-flex',
                                      alignItems: 'center'
                                    }}
                                  >
                                    {item.name}{' '}
                                    <Tooltip
                                      title={item.type}
                                      getPopupContainer={() =>
                                        document.querySelector(
                                          `.${styles.container}`
                                        )!
                                      }
                                    >
                                      <img
                                        style={{ width: 16 }}
                                        src={getImageUrl('question')}
                                        alt=""
                                      />
                                    </Tooltip>
                                  </span>
                                  <Form.Item
                                    rules={[
                                      {
                                        required: true,
                                        message: `${
                                          item.name ?? 'field'
                                        } is required`
                                      }
                                    ]}
                                    tooltip={item.type}
                                    style={{ flex: 1 }}
                                    name={[
                                      'parameters',
                                      `${funcValue}_${item.name}`
                                    ]}
                                  >
                                    <TextArea
                                      placeholder={item.type}
                                      autoSize={{ minRows: 1, maxRows: 4 }}
                                    />
                                  </Form.Item>
                                  <div
                                    style={{
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      paddingLeft: 2,
                                      paddingBottom: 8
                                    }}
                                  >
                                    <CopyButton
                                      text={() =>
                                        form.getFieldValue([
                                          'parameters',
                                          `${funcValue}_${item.name}`
                                        ])
                                      }
                                    />
                                  </div>
                                </div>
                              )
                            }
                          )}
                          <CopyButton
                            ml={4}
                            className={styles.copyCallDataBtn}
                            text={() =>
                              new Promise((resolve, reject) => {
                                form
                                  .validateFields(
                                    method?.argumentsIn.map(item => [
                                      'parameters',
                                      `${funcValue}_${item.name}`
                                    ])
                                  )
                                  .then(() => {
                                    resolve(getInputData())
                                  })
                                  .catch(e => {
                                    reject(e)
                                  })
                              })
                            }
                          >
                            Copy Calldata
                          </CopyButton>
                        </div>
                      ) : null
                    }}
                  </Form.Item>
                </>
              ) : (
                <Form.Item
                  label={<span className={styles.labelIcon}>Calldata</span>}
                >
                  {renderRadioGroup()}
                  <Form.Item
                    name="inputData"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter Input Data'
                      },
                      {
                        pattern: PATTERN_INPUT_DATA,
                        message: 'Please enter a valid Input Data'
                      }
                    ]}
                  >
                    <TextArea
                      style={{ height: 120 }}
                      className={cls({
                        // [styles.hide]: ABILoading
                      })}
                    />
                  </Form.Item>
                </Form.Item>
              )
            }}
          </Form.Item>
          {/*======================================================================*/}
          <Form.Item
            name="value"
            label="Value"
            getValueFromEvent={(e: any) => {
              const { value } = e.target
              return value.replace(/[^\d{1,}\\.\d{1,}|\d{1,}]/g, '')
            }}
          >
            <Input suffix={nativeSymbol} placeholder="Default is 0" />
          </Form.Item>
          <Form.Item>
            <div>
              <Form.Item name="isPrerun" valuePropName="checked" noStyle>
                <Switch size="small" />
              </Form.Item>
              <span style={{ paddingLeft: 10 }} className={styles.help}>
                Use Pending Block
              </span>
            </div>
          </Form.Item>
          <Form.Item noStyle dependencies={['isPrerun']}>
            {({ getFieldValue }) => {
              const isPrerun = getFieldValue('isPrerun')

              return isPrerun ? null : (
                <>
                  <Form.Item label="Block Number">
                    <Form.Item
                      name="blockNumber"
                      getValueFromEvent={(e: any) => {
                        const { value } = e.target
                        return value.replace(/[^\d{1,}\\.\d{1,}|\d{1,}]/g, '')
                      }}
                      rules={[
                        {
                          validator: (rule, value, callback) => {
                            if (value === '0') {
                              callback('0 is invalid')
                            } else {
                              callback()
                            }
                          }
                        }
                      ]}
                    >
                      <Input
                        placeholder={`${
                          latestBlockNum
                            ? `Current block: ${latestBlockNum}`
                            : 'Please enter Block Number'
                        }`}
                      />
                    </Form.Item>
                  </Form.Item>
                  <Form.Item
                    name="position"
                    label="Position in Block"
                    getValueFromEvent={(e: any) => {
                      const { value } = e.target
                      return value.replace(/[^\d{1,}\\.\d{1,}|\d{1,}]/g, '')
                    }}
                  >
                    <Input placeholder="Default on position 0" />
                  </Form.Item>
                </>
              )
            }}
          </Form.Item>
          <Form.Item
            name="gasLimit"
            label="Gas Limit"
            getValueFromEvent={(e: any) => {
              const { value } = e.target
              return value.replace(/[^\d{1,}\\.\d{1,}|\d{1,}]/g, '')
            }}
          >
            <Input placeholder="Default is 1,000,000" />
          </Form.Item>
          <Form.Item
            name="gasPrice"
            label="Gas Price"
            getValueFromEvent={(e: any) => {
              const { value } = e.target
              return value.replace(/[^\d{1,}\\.\d{1,}|\d{1,}]/g, '')
            }}
          >
            <Input suffix="Gwei" placeholder={`Default is ${estimatedGas}`} />
          </Form.Item>
        </Form>
        <Button
          type="primary"
          className={styles.simulateBtn}
          loading={loading}
          onClick={handleOk}
        >
          Simulate
        </Button>
      </div>
    </Drawer>
  )
}

export default DrawerSimulation
