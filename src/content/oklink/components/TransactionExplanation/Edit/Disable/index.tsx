import { memo, useState } from 'react'

import { useStore } from '@common/hooks'

import Message from './Message'
import styles from './index.module.less'


const Disable = () => {
  const [options, setOptions] = useStore('options');
  const [showMessage, setShowMessage] = useState(false)
  const onDisable = () => {
    setShowMessage(true)
    setTimeout(() => {
      setShowMessage(false)
      setOptions({
        ...options,
        txSummary: false
      })
    }, 2500)
  }

  return (
    <>
      <Message showMessage={showMessage} />
      <div className={styles.disable}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          onClick={onDisable}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
          />
        </svg>
      </div>
    </>
  )
}

export default memo(Disable);
