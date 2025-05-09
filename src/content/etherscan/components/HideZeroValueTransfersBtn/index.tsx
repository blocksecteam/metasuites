import React, { useState, type FC } from 'react'
import cls from 'classnames'

import { Button } from '../'

interface Props {
  table: HTMLElement
  className?: string
}

const HideZeroValueTransfersBtn: FC<Props> = ({ table, className }) => {
  const [zeroValuesHidden, setZeroValuesHidden] = useState(false)
  const [hiddenCount, setHiddenCount] = useState(0)

  const toggleZeroValueTransfers = () => {
    const newHiddenState = !zeroValuesHidden
    setZeroValuesHidden(newHiddenState)

    const rows = table.querySelectorAll('tbody tr')
    let count = 0

    rows.forEach((row: Element) => {
      const tds = row.querySelectorAll('td')
      let isZeroValueTransfer = false

      tds.forEach(td => {
        const amountSpan = td.querySelector('span.td_showAmount')
        if (amountSpan) {
          const quantityText = amountSpan.textContent?.trim() || ''
          if (/^0(\.0+)?$/.test(quantityText)) {
            isZeroValueTransfer = true
          }
        }
      })

      if (isZeroValueTransfer) {
        ;(row as HTMLElement).style.display = newHiddenState ? 'none' : ''
        count++
      }
    })

    setHiddenCount(count)
  }

  return (
    <Button
      className={cls('btn btn-sm btn-white text-nowrap', className)}
      onClick={toggleZeroValueTransfers}
    >
      {zeroValuesHidden
        ? `Show Zero-Amount Transfers (${hiddenCount})`
        : 'Hide Zero-Amount Transfers'}
    </Button>
  )
}

export default HideZeroValueTransfersBtn
