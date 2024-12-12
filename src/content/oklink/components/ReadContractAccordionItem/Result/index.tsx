import { type FC, memo } from 'react'

import type {
  PrivateVariableArgument,
  PrivateVariable
} from '@common/api/types'
import styles from './index.module.less';
import Value from './Value';

interface Props {
  data: PrivateVariable
  queryResult?: PrivateVariableArgument
}

const Result: FC<Props> = ({ data: { inputs, value }, queryResult }) => {
  if (inputs.length && queryResult) {
    return (
      <div className={styles.resultBox}>
        <div className="items-center md-flex">
          {
            Array.isArray(queryResult.value) ? queryResult.value.map((item, index) => {
              return <Value className={styles.hasInputBox} value={item} key={index} />
            }) : (
              <Value className={styles.hasInputBox} value={queryResult} />
            )
          }
        </div>
      </div>
    )
  }

  return <Value value={value} className={styles.noInputBox} />
}

export default memo(Result);
