import { type FC } from 'react'

import type { PostAddressParams } from '@common/api/types'
import { BASE_URL } from '@common/config/uri'
import styles from './index.module.less'
import Link from '../Link'
import OKLinkImage from '../OKLinkImage'
import { getOKLinkImage } from '../../utils'

const DownloadSourceCodeBtn: FC<PostAddressParams> = ({ chain, address }) => {
  return (
    <Link
      className={styles.downloadBtn}
      href={
        BASE_URL +
        '/api/v1/source-code/download?' +
        new URLSearchParams({ chain, address })
      }
    >
      <OKLinkImage className={styles.img} src={getOKLinkImage('download')} />
      Download as Zip
    </Link>
  )
}

export default DownloadSourceCodeBtn
