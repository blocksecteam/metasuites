import { type FC } from 'react'

import { getImageUrl } from '@common/utils'

import Button from '../Button'

interface Props {
  address: string
}

const ApprovalDiagnosisBtn: FC<Props> = ({ address }) => {
  const toTokenApprovalChecker = () =>
    window.open(
      `https://${window.location.host}/tokenapprovalchecker?search=${address}`
    )

  return (
    <Button
      theme="#00A54C"
      fontColor="#fff"
      mr={10}
      onClick={toTokenApprovalChecker}
      icon={<img src={getImageUrl('approval-diagnosis')} alt="" />}
    >
      Approval Diagnosis
    </Button>
  )
}

export default ApprovalDiagnosisBtn
