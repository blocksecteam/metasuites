import { store } from '@src/store'
import { genQuick2parsersBtn } from '../feat-scripts'

const initTxPageScript = () => {
  requestIdleCallback(async () => {
    const { quick2Parsers } = await store.get('options')
    if (quick2Parsers) genQuick2parsersBtn()
  })
}

export default initTxPageScript
