import { type FC, memo } from 'react'
import styles from './index.module.less'

interface Props {
  name: string
  type: string
}

const Label: FC<Props> = ({ name, type }) => {
  return (
    <label className={styles.label}>
      {name} ({type})
    </label>
  )
}

export default memo(Label)
