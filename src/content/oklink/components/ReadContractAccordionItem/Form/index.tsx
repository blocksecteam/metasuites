import { type FC, memo } from 'react'
import type { PrivateVariable } from '@common/api/types'
import styles from './index.module.less'
import Label from './Label'
import Input from './Input'

interface Props {
  data: PrivateVariable
}

const Form: FC<Props> = ({ data: { inputs } }) => {
  return (
    <form>
      {inputs.map((item, index) => (
        <div className={styles.item} key={index}>
          <Label name={item.name} type={item.type} />
          <Input type={item.type} />
        </div>
      ))}
    </form>
  )
}

export default memo(Form)
