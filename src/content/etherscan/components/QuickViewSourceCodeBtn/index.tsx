import { type FC } from 'react'

import { IconCodeSnippet } from '@common/components'

import Button from '../Button'

interface Props {
  href: string
}

const QuickViewSourceCodeBtn: FC<Props> = ({ href }) => {
  return (
    <Button
      href={href}
      type="secondary"
      className="me-2"
      icon={<IconCodeSnippet mr={4} color="var(--bs-btn-color)" />}
    >
      View in DethCode
    </Button>
  )
}

export default QuickViewSourceCodeBtn
