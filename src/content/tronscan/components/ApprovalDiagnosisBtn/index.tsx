import { type FC } from 'react'
import { Button, ConfigProvider } from 'antd'
import $ from 'jquery'

import { getImageUrl } from '@common/utils'
import { Image } from '@common/components'

const ApprovalDiagnosisBtn: FC = () => {
  const activeApprovalChecker = () => {
    const scrollTop = $(
      '#mainContent .address-top .address-title .address-tag-box'
    ).offset()?.top
    const navHeight = $('.sticky-nav-wrapper').height()
    if (scrollTop && navHeight) {
      window.scrollTo({
        top: scrollTop - navHeight - 20,
        behavior: 'smooth'
      })
    }
    const tabs = $('#mainContent .asset-overview-table .ant-tabs-tab')
    tabs.each(function () {
      if ($(this).text().indexOf('Approval') !== -1) {
        $(this).click()
      }
    })
  }

  return (
    <ConfigProvider
      prefixCls="metadock"
      theme={{
        token: {
          colorPrimary: '#00A54C',
          controlHeight: 30,
          controlOutlineWidth: 0
        }
      }}
    >
      <Button
        type="primary"
        className="align-center"
        onClick={activeApprovalChecker}
        icon={<Image src={getImageUrl('approval-diagnosis')} width={16} />}
      >
        Approval Diagnosis
      </Button>
    </ConfigProvider>
  )
}

export default ApprovalDiagnosisBtn
