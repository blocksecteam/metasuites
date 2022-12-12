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
import { Select, Input, Checkbox, ConfigProvider, Button } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import { debounce, isNil } from 'lodash-es'
import Big from 'big.js'

import { SUPPORT_WEB_LIST, GET_ADDRESS_FUND_FLOW } from '@common/constants'
import { chromeEvent } from '@common/event'
import type {
  FundFlowResponse,
  FundFlowEdge,
  FundFlowNode
} from '@common/api/types'
import { getImageUrl, getSubStr, unique } from '@common/utils'
import { DownloadIcon } from '@common/components'

import styles from './index.module.less'
import genDotStr from './dot'

interface Props {
  visible: boolean
  mainAddress: string
  chain: string
  onClose: () => void
}

type FundFlowFilterParams = { addrOpts?: FundFlowNode[]; open: boolean }

const GRAPH_DEFAULT_WITH = 800
const GRAPH_DEFAULT_HEIGHT = 600

const ModalFundFlow: FC<Props> = ({ visible, mainAddress, chain, onClose }) => {
  const graphvizRef = useRef<unknown>(null)
  const graphContainerRef = useRef<HTMLDivElement>(null)
  const [fundFlow, setFundFlow] = useState<FundFlowResponse>()
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

  const onDownload = () => {
    const svg = document
      .querySelector<HTMLElement>('#graph > svg')
      ?.cloneNode(true)

    /** download as svg with watermark */
    if (svg) {
      const watermarkWidth = 262
      const watermarkHeight = 57
      const polygonEl = (svg as HTMLElement).getElementsByTagName('polygon')[0]
      const viewBoxWidth =
        (svg as HTMLElement).getAttribute('viewBox')?.split(' ')?.[2] ??
        GRAPH_DEFAULT_WITH
      let imagePosX = viewBoxWidth
      try {
        imagePosX = new Big(viewBoxWidth).sub(watermarkWidth).toFixed()
      } catch (e) {
        console.log(e)
      }
      if (polygonEl) {
        polygonEl.insertAdjacentHTML(
          'afterend',
          `<a id="watermark" xlink:href="https://blocksec.com/metadock" target="_blank">
            <image x="${imagePosX}" y="-60" style="opacity: 0.2" xlink:href="https://assets.blocksec.com/image/1669950517632-2.png" width="${watermarkWidth}" height="${watermarkHeight}"/>
        </a>`
        )
      }
      const data = new XMLSerializer().serializeToString(svg)
      const svgBlob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' })
      const url = URL.createObjectURL(svgBlob)
      const a = document.createElement('a')
      a.setAttribute('download', `${mainAddress}.svg`)
      a.setAttribute('href', url)
      a.setAttribute('target', '_blank')
      a.click()
    }
  }

  /** when the params.addrOpts is not empty, it is filtering */
  const getFundFlow = async (params?: FundFlowFilterParams) => {
    setLoading(true)
    const res = await chromeEvent.emit<
      typeof GET_ADDRESS_FUND_FLOW,
      FundFlowResponse
    >(GET_ADDRESS_FUND_FLOW, {
      chain: chain,
      address: mainAddress
    })
    setLoading(false)
    if (res?.success && res?.data) {
      setError(false)
      const nodes =
        res.data?.nodes.map((node, index) => {
          const opt = (params?.addrOpts ?? addressOptions).find(
            item => item.id === node.id
          )
          let selected = true
          if (opt) selected = !!opt.selected
          return {
            ...node,
            index,
            selected: selected,
            showIndex: params?.open
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

  const icon = useMemo(() => {
    const network = SUPPORT_WEB_LIST.find(item => item.chain === chain)?.name
    return network ? getImageUrl(network) : ''
  }, [chain])

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
      const width = graphContainerRef.current?.offsetWidth ?? GRAPH_DEFAULT_WITH
      const height =
        graphContainerRef.current?.offsetHeight ?? GRAPH_DEFAULT_HEIGHT
      graphvizRef.current = graphviz(`#graph`)
        .width(width)
        .height(height)
        .options({
          zoom: true,
          fit: true,
          useWorker: false
        })
        .renderDot(genDotStr(chain, mainAddress, fundFlow))
    }
  }, [fundFlow, chain, mainAddress])

  useEffect(() => {
    document.body.style.overflow = visible ? 'hidden' : 'unset'
  }, [visible])

  useEffect(() => {
    if (isNil(addressSelectorVisible)) return
    if (addressSelectorVisible) {
      getFundFlow({
        open: addressSelectorVisible
      })
    } else {
      /** reset to previous confirmed addressOptions */
      const originNodes = fundFlow?.nodes ?? []
      const addrOpts = originNodes.map(item => ({
        ...item,
        selected: item.selected
      }))
      getFundFlow({
        addrOpts,
        open: addressSelectorVisible
      })
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
    <div className={cls(styles.modalFundFlow, { [styles.show]: visible })}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className="align-center">
            <img className={styles.tokenLogo} src={icon} alt="" />
            <span className={styles.mainAddress}>{mainAddress}</span>
            <div className={styles.tipContainer}>
              <img
                className={styles.iconImg}
                src={getImageUrl('info')}
                alt=""
              />
              <div className={styles.content}>
                This chart provides the most valuable relevant transactions and
                addresses for analysis (not all), and the results are for
                reference only.
              </div>
            </div>
          </div>
          <div
            id="__metadock-fundflow-options-wrapper__"
            className="align-center"
          >
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#00A54C',
                  controlOutlineWidth: 0
                }
              }}
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
                  dropdownMatchSelectWidth={false}
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
                  dropdownMatchSelectWidth={false}
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
                          <p key={edge.id}>
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
            </ConfigProvider>
            <div
              className={cls(styles.btn, styles.download)}
              onClick={onDownload}
            >
              <DownloadIcon />
            </div>
            <div className={styles.btn} onClick={onClose}>
              <img src={getImageUrl('close')} alt="" />
            </div>
          </div>
        </header>
        <div className={styles.body}>
          {loading && (
            <div className={styles.loading}>
              <img src={getImageUrl('logo-pure')} alt="" />
            </div>
          )}
          {error && (
            <div className={styles.errorBoundary}>
              <img src={getImageUrl('oops-service-error')} alt="" />
              <p>Something went wrong. Please try again later.</p>
              <div className={styles.tryBtn} onClick={() => getFundFlow()}>
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
        </div>
      </div>
    </div>,
    document.body
  )
}

export default ModalFundFlow
