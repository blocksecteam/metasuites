import classNames from 'classnames'
import { memo, type FC } from 'react'

import OKLinkImage from '@src/content/oklink/components/OKLinkImage'
import styles from './index.module.less'

interface Props {
  showMessage?: boolean
}

const Message: FC<Props> = ({ showMessage = false }) => {
  return (
    <div className={classNames(styles.message, { [styles.show]: showMessage })}>
      <OKLinkImage src="https://assets.blocksec.com/image/1684488852891-2.svg" />
      Transaction summary feature is turned off. You can always re-enable this
      feature in the settings.
    </div>
  )
}

export default memo(Message)
