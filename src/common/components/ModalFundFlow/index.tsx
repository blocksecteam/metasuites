import React, {
  type FC,
  type ChangeEvent,
  useEffect,
  useRef,
  useMemo,
  useState
} from 'react'
import cls from 'classnames'
import { graphviz } from 'd3-graphviz'
import ReactDOM from 'react-dom'
import { Select, Input, Checkbox, ConfigProvider, Button, Tooltip } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import { debounce, isNil } from 'lodash-es'

import { GET_ADDRESS_FUND_FLOW, SLEUTH_SUPPORT_LIST } from '@common/constants'
import { chromeEvent } from '@common/event'
import type { FundFlowRes, FundFlowEdge, FundFlowNode } from '@common/api/types'
import { getImageUrl, getSubStr, unique, ChainUtils } from '@common/utils'
import {
  IconDownload,
  Switch,
  IconClose,
  IconMetaDock
} from '@common/components'
import { SLEUTH_DOMAIN } from '@common/config/uri'

import styles from './index.module.less'
import genDotStr from './dot'
import {
  initNodes,
  onDownload,
  toggleShowAddressIdx,
  getFundFlowImages
} from './graph'

interface Props {
  visible: boolean
  mainAddress: string
  chain: string
  onClose: () => void
}

const ModalFundFlowGraph: FC<Props> = ({
  visible,
  mainAddress,
  chain,
  onClose
}) => {
  const graphvizRef = useRef<any>(null)
  const graphContainerRef = useRef<HTMLDivElement>(null)
  const [fundFlow, setFundFlow] = useState<FundFlowRes>()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [addressKeywords, setAddressKeywords] = useState('')
  const [tokenKeywords, setTokenKeywords] = useState('')
  const [addressOptions, setAddressOptions] = useState<FundFlowNode[]>([])
  const [tokenOptions, setTokenOptions] = useState<FundFlowEdge[]>([])
  const [addressSelectorVisible, setAddressSelectorVisible] = useState<
    boolean | undefined
  >()
  const [tokenSelectorVisible, setTokenSelectorVisible] = useState(false)
  const [enableWatermark, setEnableWatermark] = useState(true)

  /** when the params.addrOpts is not empty, it is filtering */
  const getFundFlow = async () => {
    setLoading(true)
    const res = await chromeEvent.emit<
      typeof GET_ADDRESS_FUND_FLOW,
      FundFlowRes
    >(GET_ADDRESS_FUND_FLOW, {
      chain: chain,
      address: mainAddress
    })
    setLoading(false)
    if (res?.success && res?.data) {
      setError(false)
      const nodes =
        res.data?.nodes.map((node, index) => {
          const opt = addressOptions.find(item => item.id === node.id)
          let selected = true
          if (opt) selected = !!opt.selected
          return {
            ...node,
            index,
            selected: selected
          }
        }) ?? []
      setFundFlow({
        edges:
          res.data?.edges.map(edge => {
            const opt = tokenOptions.find(item => item.token === edge.token)
            let selected = true
            if (opt) selected = !!opt.selected
            return {
              ...edge,
              selected: selected
            }
          }) ?? [],
        nodes
      })

      setAddressOptions([...nodes])
      setTokenOptions(
        unique(
          [
            ...tokenOptions,
            ...res.data.edges.map(edge => ({
              ...edge,
              selected: true
            }))
          ],
          'token'
        )
      )
    } else {
      setError(true)
    }
  }

  const onAddressFilter = (node: FundFlowNode, checked: boolean) => {
    setAddressOptions(
      addressOptions.map(item => ({
        ...item,
        selected: item.id === node.id ? checked : item.selected
      }))
    )
  }

  const onTokenFilter = (token: string, checked: boolean) => {
    setTokenOptions(
      tokenOptions.map(item => ({
        ...item,
        selected: item.token === token ? checked : item.selected
      }))
    )
  }

  const onAddressKeywordsChange = debounce(
    (e: ChangeEvent<HTMLInputElement>) => {
      setAddressKeywords(e.target.value.trim())
    },
    500
  )

  const onTokenKeywordsChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    setTokenKeywords(e.target.value.trim())
  }, 500)

  const displayAddressOptions: FundFlowNode[] = useMemo(() => {
    return addressOptions.filter(
      item =>
        item.address.toLowerCase().indexOf(addressKeywords.toLowerCase()) !==
          -1 ||
        item.label.toLowerCase().indexOf(addressKeywords.toLowerCase()) !== -1
    )
  }, [addressKeywords, addressOptions])

  const displayTokenOptions: FundFlowEdge[] = useMemo(() => {
    return tokenOptions.filter(
      item =>
        item.token.toLowerCase().indexOf(tokenKeywords.toLowerCase()) !== -1 ||
        item.tokenLabel.toLowerCase().indexOf(tokenKeywords.toLowerCase()) !==
          -1
    )
  }, [tokenKeywords, tokenOptions])

  const onSelectAll = (checked: boolean, isToken?: boolean) => {
    if (isToken) {
      setTokenOptions(
        tokenOptions.map(item => ({
          ...item,
          selected: checked
        }))
      )
    } else {
      setAddressOptions(
        addressOptions.map(item => {
          const selected =
            item.address.toLowerCase() === mainAddress.toLowerCase() &&
            item.chain === chain
              ? true
              : checked
          return {
            ...item,
            selected: selected
          }
        })
      )
    }
  }

  const onConfirmFilter = () => {
    getFundFlow()
    /** set addressSelectorVisible undefined to prevent execution of following effect script */
    setAddressSelectorVisible(undefined)
    setTokenSelectorVisible(false)
  }

  useEffect(() => {
    if (visible) getFundFlow()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  useEffect(() => {
    if (fundFlow?.nodes.length && fundFlow.edges.length) {
      graphvizRef.current = graphviz(`#graph`)
        // @ts-ignore
        .width('100%')
        // @ts-ignore
        .height('100%')
        .options({
          zoom: true,
          fit: true,
          useWorker: false
        })
        .on('end', () => {
          initNodes(fundFlow)
        })

      const imgList = getFundFlowImages(fundFlow)
      imgList.forEach(v => {
        graphvizRef.current.addImage(v, '32px', '32px')
      })
      graphvizRef.current.renderDot(genDotStr(chain, mainAddress, fundFlow))
    }
  }, [fundFlow, chain, mainAddress])

  useEffect(() => {
    document.body.style.overflow = visible ? 'hidden' : 'unset'
  }, [visible])

  useEffect(() => {
    if (isNil(addressSelectorVisible)) return
    /** When the address Selector visible, the address options item display serial number */
    toggleShowAddressIdx(addressSelectorVisible, displayAddressOptions)
    if (!addressSelectorVisible) {
      /** reset to previous confirmed addressOptions */
      const originNodes = fundFlow?.nodes ?? []
      const addrOpts = originNodes.map(item => ({
        ...item,
        selected: item.selected
      }))
      setAddressOptions(addrOpts)
    }
  }, [addressSelectorVisible])

  useEffect(() => {
    if (tokenSelectorVisible) {
      const originEdges = fundFlow?.edges ?? []
      setTokenOptions(
        unique<FundFlowEdge>(originEdges, 'token').map(item => ({
          ...item,
          selected: item.selected
        }))
      )
    }
  }, [tokenSelectorVisible])

  return ReactDOM.createPortal(
    <ConfigProvider
      prefixCls="metadock"
      theme={{
        token: {
          colorPrimary: '#00A54C'
        }
      }}
    >
      <div className={cls(styles.modalFundFlow, { [styles.show]: visible })}>
        <div className={styles.container}>
          <header className={styles.header}>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#00A54C',
                  controlOutlineWidth: 0
                }
              }}
            >
              <div className={styles.basicInfo}>
                <img
                  className={styles.tokenLogo}
                  src={ChainUtils.getChainLogo(chain)}
                  alt=""
                />
                <div className={styles.mainAddress} title={mainAddress}>
                  {mainAddress}
                </div>
                <div className={styles.tipContainer}>
                  <img
                    className={styles.iconImg}
                    src={getImageUrl('info')}
                    alt=""
                  />
                  <div className={styles.content}>
                    This chart provides the most valuable relevant transactions
                    and addresses for analysis (not all), and the results are
                    for reference only. For a detailed fund flow map, click
                    &ldquo;Try Enhanced Version&rdquo;, or go to MetaSleuth.
                  </div>
                </div>
                {SLEUTH_SUPPORT_LIST.includes(chain) && (
                  <Button
                    className={styles.msButton}
                    type="primary"
                    onClick={() =>
                      window.open(
                        `${SLEUTH_DOMAIN}/result/${chain}/${mainAddress}`
                      )
                    }
                  >
                    <img
                      className="mr-1"
                      style={{ width: '18px' }}
                      src="https://assets.blocksec.com/image/1677135239463-4.png"
                      alt=""
                    />
                    Try Enhanced Version
                  </Button>
                )}
              </div>
              <div
                id="__metadock-fundflow-options-wrapper__"
                className="align-center"
              >
                {fundFlow?.nodes && (
                  <Select
                    open={!!addressSelectorVisible}
                    placement="bottomRight"
                    className={styles.selector}
                    getPopupContainer={() =>
                      document.getElementById(
                        '__metadock-fundflow-options-wrapper__'
                      )!
                    }
                    popupMatchSelectWidth={false}
                    dropdownStyle={{ width: 249, padding: '10px 0 0' }}
                    placeholder="Address / Entity"
                    onDropdownVisibleChange={(visible: boolean) => {
                      setAddressSelectorVisible(visible)
                    }}
                    dropdownRender={() => (
                      <div className={styles.dropdownWrapper}>
                        <Input
                          className={styles.input}
                          suffix={
                            <img
                              style={{ width: 14 }}
                              src={getImageUrl('search')}
                            />
                          }
                          placeholder="Address / Entity"
                          onChange={onAddressKeywordsChange}
                        />
                        <div className={styles.addressList}>
                          {displayAddressOptions.map(node => (
                            <p key={node.id}>
                              <Checkbox
                                disabled={
                                  mainAddress.toLowerCase() ===
                                    node.address.toLowerCase() &&
                                  chain === node.chain
                                }
                                checked={node.selected}
                                onChange={(e: CheckboxChangeEvent) =>
                                  onAddressFilter(node, e.target.checked)
                                }
                              >
                                {`${node.index} ${
                                  chain !== node.chain ? `${node.chain} ` : ''
                                }${
                                  !node.label
                                    ? getSubStr(node.address, [9, 6])
                                    : node.label
                                }`}
                              </Checkbox>
                            </p>
                          ))}
                        </div>
                        <div className={styles.dropdownFooter}>
                          <Checkbox
                            defaultChecked={true}
                            onChange={(e: CheckboxChangeEvent) =>
                              onSelectAll(e.target.checked)
                            }
                          >
                            All
                          </Checkbox>
                          <Button
                            type="primary"
                            className={styles.confirmBtn}
                            onClick={onConfirmFilter}
                          >
                            Confirm
                          </Button>
                        </div>
                      </div>
                    )}
                  />
                )}

                {fundFlow?.edges && (
                  <Select
                    open={tokenSelectorVisible}
                    placement="bottomRight"
                    className={styles.selector}
                    getPopupContainer={() =>
                      document.getElementById(
                        '__metadock-fundflow-options-wrapper__'
                      )!
                    }
                    popupMatchSelectWidth={false}
                    dropdownStyle={{ width: 296, padding: '10px 0 0' }}
                    placeholder="Token"
                    onDropdownVisibleChange={(visible: boolean) => {
                      setTokenSelectorVisible(visible)
                    }}
                    dropdownRender={() => (
                      <div className={styles.dropdownWrapper}>
                        <Input
                          className={styles.input}
                          suffix={
                            <img
                              style={{ width: 14 }}
                              src={getImageUrl('search')}
                            />
                          }
                          placeholder="Token"
                          onChange={onTokenKeywordsChange}
                        />
                        <div className={styles.addressList}>
                          {displayTokenOptions.map(edge => (
                            <p key={edge.token}>
                              <Checkbox
                                checked={edge.selected}
                                onChange={(e: CheckboxChangeEvent) =>
                                  onTokenFilter(edge.token, e.target.checked)
                                }
                              >{`${edge.tokenLabel}(${getSubStr(
                                edge.token,
                                [9, 6]
                              )})`}</Checkbox>
                            </p>
                          ))}
                        </div>
                        <div className={styles.dropdownFooter}>
                          <Checkbox
                            defaultChecked={true}
                            onChange={(e: CheckboxChangeEvent) =>
                              onSelectAll(e.target.checked, true)
                            }
                          >
                            All
                          </Checkbox>
                          <Button
                            type="primary"
                            className={styles.confirmBtn}
                            onClick={onConfirmFilter}
                          >
                            Confirm
                          </Button>
                        </div>
                      </div>
                    )}
                  />
                )}
                <div className={styles.watermarkSwitchContainer}>
                  Watermark
                  <Switch
                    checked={enableWatermark}
                    onChange={enable => setEnableWatermark(enable)}
                  />
                </div>
                <Tooltip
                  getPopupContainer={() =>
                    document.getElementById(
                      '__metadock-fundflow-options-wrapper__'
                    )!
                  }
                  color="#fff"
                  placement="bottom"
                  title={
                    <div className={styles.downloadPopoverContainer}>
                      <p
                        onClick={() =>
                          onDownload('png', mainAddress, enableWatermark)
                        }
                      >
                        PNG
                      </p>
                      <p
                        onClick={() =>
                          onDownload('svg', mainAddress, enableWatermark)
                        }
                      >
                        SVG
                      </p>
                    </div>
                  }
                >
                  <div className={cls(styles.btn, styles.download)}>
                    <IconDownload />
                  </div>
                </Tooltip>
                <div className={styles.btn} onClick={onClose}>
                  <IconClose />
                </div>
              </div>
            </ConfigProvider>
          </header>
          <div className={styles.body}>
            {loading && (
              <div className={styles.loading}>
                <IconMetaDock className={styles.iconMetaDock} />
              </div>
            )}
            {error && (
              <div className={styles.errorBoundary}>
                <img src={getImageUrl('oops-service-error')} alt="" />
                <p>Something went wrong. Please try again later.</p>
                <div className={styles.tryBtn} onClick={getFundFlow}>
                  Try Again
                </div>
              </div>
            )}
            {!loading && !error ? (
              fundFlow?.edges.length ? (
                <div
                  id="graph"
                  ref={graphContainerRef}
                  className={styles.graphContainer}
                />
              ) : (
                <div className={styles.errorBoundary}>
                  <img src={getImageUrl('oops-no-txn')} alt="" />
                  <p>No relevant transactions were found!</p>
                  <div>
                    This chart provides the relevant transactions and addresses
                    for analysis (not all of them), and the results are for
                    reference only.
                  </div>
                </div>
              )
            ) : null}
            {enableWatermark && (
              <a
                className={styles.watermark}
                href="https://blocksec.com/metadock"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="https://assets.blocksec.com/image/1692101500475-4.png"
                  alt=""
                />
              </a>
            )}
          </div>
        </div>
      </div>
    </ConfigProvider>,
    document.body
  )
}

export default ModalFundFlowGraph
