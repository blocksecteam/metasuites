import { createRoot } from 'react-dom/client'
import $ from 'jquery'

import ParsersBtn from '../components/ParsersBtn'

const genQuick2parsersBtn = async () => {
  const container = $('#mainContent .transcation-type-wrap')
  const txHash = $('#mainContent .txn-table-wrap .hashLink').text().trim()
  container.css({
    display: 'flex',
    justifyContent: 'space-between'
  })
  const rootEl = $('<span style="padding-top: 15px;"></span>')
  container.append(rootEl)

  createRoot(rootEl[0]).render(<ParsersBtn txHash={txHash} />)
}

export default genQuick2parsersBtn
