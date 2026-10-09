import { renderAddressLabels } from './address-labels'

const renderEnhancedLabels = () =>
  renderAddressLabels('table a[href], [role="table"] a[href]')

export default renderEnhancedLabels
