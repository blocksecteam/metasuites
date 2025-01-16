import { memo, type FC } from 'react'
import classNames from 'classnames'

import { Image } from '@src/common/components'

interface Props {
  src: string
  className?: string
  style?: object
}

const OKLinkImage: FC<Props> = ({ src, className, style }) => {
  return (
    <Image
      style={style}
      className={classNames(className, 'f-filter')}
      src={src}
    />
  )
}

export default memo(OKLinkImage)
