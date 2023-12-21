import { type FC, useState } from 'react'
import $ from 'jquery'

import { DEDAUB_SUPPORT_DIRECT_LIST } from '@common/constants'
import { getImageUrl } from '@common/utils'
import { LoadingOutlined } from '@common/components'

import Button from '../Button'

interface Props {
  mainAddress: string
  chain: string
}

const DecompileInDedaubBtn: FC<Props> = ({ mainAddress, chain }) => {
  const [loading, setLoading] = useState(false)

  const toDedaub = () => {
    const item = DEDAUB_SUPPORT_DIRECT_LIST.find(item => item.chain === chain)

    if (item) {
      window.open(
        `https://library.dedaub.com/${item.pathname}/address/${mainAddress}/decompiled`
      )
    } else {
      const url = 'https://library.dedaub.com/api/on_demand'
      const bytecode = $('#dividcode').text().trim()
      if (!bytecode) {
        window.open('https://library.dedaub.com/decompile')
        return
      }
      const data = {
        hex_bytecode: bytecode
      }
      setLoading(true)
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authority: 'api.dedaub.com',
          origin: 'https://library.dedaub.com',
          referer: 'https://library.dedaub.com/'
        },
        body: JSON.stringify(data),
        mode: 'cors'
      })
        .then(response => response.text())
        .then(data => {
          window.open(
            'https://library.dedaub.com/decompile?md5=' + data.replace(/"/g, '')
          )
        })
        .catch(() => {
          window.open('https://library.dedaub.com/decompile')
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  return (
    <Button
      style={{ width: 'fit-content' }}
      theme="#EFE6DA"
      fontColor="#000"
      icon={
        loading ? (
          <LoadingOutlined />
        ) : (
          <img src={getImageUrl('dedaub')} alt="" />
        )
      }
      onClick={toDedaub}
    >
      Decompile in Dedaub
    </Button>
  )
}

export default DecompileInDedaubBtn
