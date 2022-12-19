import { type FC } from 'react'

import { getImageUrl } from '@common/utils'

import Button from '../Button'

interface Props {
  href: string
}

const QuickViewSourceCodeBtn: FC<Props> = ({ href }) => {
  return (
    <Button
      href={href}
      type="secondary"
      className="ml-1"
      icon={<img src={getImageUrl('code-snippet')} alt="" />}
    >
      View in DethCode
    </Button>
  )
}

export default QuickViewSourceCodeBtn
