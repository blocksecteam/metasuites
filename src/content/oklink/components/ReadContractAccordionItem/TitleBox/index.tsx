import { type FC, memo } from 'react'

import type {
  PrivateVariable
} from '@common/api/types'

// import { getOKLinkImage } from '@src/content/oklink/utils'
import styles from './index.module.less'
// import OKLinkImage from '../../OKLinkImage'
import ContractVariable from '../../ContractVariable'

interface Props {
  id: string
  data: PrivateVariable
}

const TitleBox: FC<Props> = ({
  id,
  data,
}) => {
  return (
    <div className={styles.titleBox}>
      <div className={styles.title}>{id.split('-')[1]}.{data.name}<ContractVariable variable={data} /></div>
      {/* <div className={styles.icon}><OKLinkImage className={styles.icon} src={getOKLinkImage('arrow-chevrons')} /></div> */}
    </div>
  )
}

export default memo(TitleBox);
