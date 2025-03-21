import { type FC } from 'react'

import { CopyButton } from '@common/components'
import type { GptTxExplainRes } from '@common/api/types'
import styles from './index.module.less'
import Liked from './Liked'
import Hidden from './Hidden'
import Disable from './Disable'

interface Props {
  tx: string
  chain: string
  result?: GptTxExplainRes
  errorOccur?: boolean
  onHidden: () => void
}

const Edit: FC<Props> = ({ errorOccur, onHidden, ...props }) => {
  return (
    <div className={styles.box}>
      <div className={styles.edit}>
        {!errorOccur && (
          <CopyButton
            className={styles.copy}
            size={14}
            text={props.result?.content ?? ''}
          />
        )}
        <Liked {...props} />
        <Hidden onHidden={onHidden} />
        <Disable />
      </div>
    </div>
  )
}

export default Edit
