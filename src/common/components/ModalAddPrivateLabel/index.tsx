import React, { type FC, useEffect, useState } from 'react'
import { Input, Button, ConfigProvider, Form } from 'antd'
import cls from 'classnames'
import { debounce } from 'lodash-es'

import { BscModal, IconMetaDock } from '@common/components'
import type { PrivateLabel } from '@src/store'
import { useStore } from '@common/hooks'
import type { ChainType } from '@common/constants'
import { formatAddress } from '@common/utils'
import { chromeEvent } from '@common/event'
import { REFRESH } from '@common/constants'

import styles from './index.module.less'

interface Props {
  chainType: ChainType
  address: string
  visible: boolean
  refreshable?: boolean
  onClose: () => void
  onSuccess?: (label?: string, color?: string) => void
}

const LABEL_COLORS = [
  '#EF4444',
  '#FB923C',
  '#EAB308',
  '#22C55E',
  '#67E8F9',
  '#3B82F6',
  '#F472B6',
  '#A855F7',
  '#BE185D'
]

const ModalAddPrivateLabel: FC<Props> = ({
  visible,
  chainType,
  address,
  refreshable = true,
  onClose,
  onSuccess
}) => {
  const [form] = Form.useForm()

  const [privateLabels, setPrivateLabels] = useStore('privateLabels')

  const [selectedColor, setSelectedColor] = useState<string>()
  const handleSave = debounce(async () => {
    form.validateFields().then(async (values: { label: string }) => {
      if (values.label.trim()) {
        const privateLabel: PrivateLabel = {
          label: values.label,
          color: selectedColor,
          chainType,
          address
        }
        setPrivateLabels({
          ...privateLabels,
          [`${chainType}-${formatAddress(address)}`]: privateLabel
        })
      } else {
        const labels = { ...privateLabels }
        if (labels[`${chainType}-${formatAddress(address)}`]) {
          delete labels[`${chainType}-${formatAddress(address)}`]
          setPrivateLabels(labels)
        } else {
          onClose()
          return
        }
      }

      onSuccess?.(values.label.trim(), selectedColor)
      if (refreshable) {
        chromeEvent.emit(REFRESH, true)
      }
      onClose()
    })
  }, 300)

  useEffect(() => {
    if (visible) {
      const label = privateLabels[`${chainType}-${formatAddress(address)}`]
      if (label) {
        form.setFieldsValue({ label: label.label })
        setSelectedColor(label?.color)
      } else {
        form.resetFields()
      }
    }
  }, [visible, privateLabels, chainType, address])

  return (
    <BscModal
      width={512}
      destroyOnClose
      maskClosable={false}
      title={
        <div className="md-flex items-center">
          <IconMetaDock mr={4} /> Local Label
        </div>
      }
      open={visible}
      onCancel={onClose}
    >
      <ConfigProvider theme={{ token: { colorPrimary: '#448C0C' } }}>
        <div className={styles.container}>
          <h6 className={styles.address}>{address}</h6>
          <Form form={form} layout="vertical" labelAlign="left">
            <Form.Item
              rules={[{ max: 35, message: 'Up to 35 characters' }]}
              name="label"
              label={null}
            >
              <Input
                placeholder="Enter the local label"
                className={styles.input}
              />
            </Form.Item>
          </Form>
          <div className={styles.label}>Choose the local label color</div>
          <ul className={styles.colors}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className={styles.svg}
              onClick={() => setSelectedColor('')}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 1H20C21.6569 1 23 2.34315 23 4V20C23 20.6544 22.7905 21.2599 22.4348 21.753C22.4132 21.7148 22.3861 21.679 22.3536 21.6464L2.35355 1.64645C2.32104 1.61393 2.28517 1.58684 2.24705 1.56515C2.74014 1.20953 3.3456 1 4 1ZM1.56515 2.24705C1.20953 2.74014 1 3.3456 1 4V20C1 21.6569 2.34315 23 4 23H20C20.6544 23 21.2599 22.7905 21.753 22.4348C21.7148 22.4132 21.679 22.3861 21.6464 22.3536L1.64645 2.35355C1.61393 2.32104 1.58684 2.28517 1.56515 2.24705ZM0 4C0 1.79086 1.79086 0 4 0H20C22.2091 0 24 1.79086 24 4V20C24 22.2091 22.2091 24 20 24H4C1.79086 24 0 22.2091 0 20V4Z"
                fill="black"
              />
            </svg>
            {LABEL_COLORS.map(color => (
              <li
                key={color}
                style={{ backgroundColor: color }}
                className={cls({
                  [styles.active]: color === selectedColor
                })}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </ul>
          <Button
            type="primary"
            className={styles.saveButton}
            onClick={handleSave}
          >
            Save
          </Button>
          <ul className={styles.notes}>
            <li>Local storage, exportable anytime, truly private.</li>
            <li>Edit once, apply across multiple websites.</li>
          </ul>
        </div>
      </ConfigProvider>
    </BscModal>
  )
}

export default ModalAddPrivateLabel
