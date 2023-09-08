import { type FC, useState } from 'react'
import cls from 'classnames'
import { debounce } from 'lodash-es'

import type { BaseComponent } from '@common/types'
import { LoadingOutlined, TokenSymbol } from '@common/components'
import { chromeEvent } from '@common/event'
import { GET_SIGNATURE_BY_SELECTOR } from '@common/constants'
import type { PostSignatureReq } from '@common/api/types'

type Props = {
  onClick: (signature?: string) => void
} & Partial<PostSignatureReq> &
  BaseComponent

const SimulateBtn: FC<Props> = ({
  chain,
  selector,
  className,
  contract,
  funcName,
  style,
  onClick
}) => {
  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    if (chain && contract) {
      fetchSignature(chain, contract)
    } else {
      onClick()
    }
  }

  const fetchSignature = debounce(async (_chain: string, _contract: string) => {
    setLoading(true)
    const res = await chromeEvent.emit<
      typeof GET_SIGNATURE_BY_SELECTOR,
      { sig: string }
    >(GET_SIGNATURE_BY_SELECTOR, {
      contract: _contract,
      selector,
      chain: _chain,
      funcName
    })
    onClick(res?.data.sig)
    setLoading(false)
  }, 500)

  return (
    <button
      disabled={loading}
      type="button"
      className={cls(
        'write-btn btn btn-primary border md-btn-primary',
        className
      )}
      style={style}
      onClick={handleClick}
    >
      {loading ? <LoadingOutlined /> : <TokenSymbol color="#fff" />}
      Simulate
    </button>
  )
}

export default SimulateBtn
