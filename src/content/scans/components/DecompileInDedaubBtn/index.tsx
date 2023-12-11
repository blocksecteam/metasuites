import { type FC } from 'react'

import { DEDAUB_SUPPORT_DIRECT_LIST } from '@common/constants'
import { getImageUrl } from '@common/utils'

import Button from '../Button'

interface Props {
  mainAddress: string
  chain: string
}

const DecompileInDedaubBtn: FC<Props> = ({ mainAddress, chain }) => {
  const toDedaub = () => {
    const item = DEDAUB_SUPPORT_DIRECT_LIST.find(item => item.chain === chain)

    if (item) {
      window.open(
        `https://library.dedaub.com/${item.pathname}/address/${mainAddress}/decompiled`
      )
    } else {
      const url = "https://api.dedaub.com/api/on_demand/";
      let bytecode = document.getElementById("dividcode").innerText;
      let data = {
        "hex_bytecode": bytecode,
      };
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        mode: "cors",
      })
        .then((response) => response.text())
        .then((data) => {
          console.log("Success:", data);
          window.open('https://library.dedaub.com/decompile?md5=' + data.replace(/"/g, ""));
        })
        .catch((error) => {
          console.error("Error:", error);
          window.open('https://library.dedaub.com/decompile')
        });
    }
  }

  return (
    <Button
      style={{ width: 'fit-content' }}
      theme="#EFE6DA"
      fontColor="#000"
      icon={<img src={getImageUrl('dedaub')} alt="" />}
      onClick={toDedaub}
    >
      Decompile in Dedaub
    </Button>
  )
}

export default DecompileInDedaubBtn
