import { ADDRESS_ATTR } from './enum'

export const META_SUITES_DONE = 'metaSuites__done'

const META_SUITES_CLASS = {
  done: `.${META_SUITES_DONE}`,
  addressTools: `.metaSuites__addressTools:not(.${META_SUITES_DONE})`,
  download: `.metaSuites__download:not(.${META_SUITES_DONE})`,
  tableParent: `.metaSuites__tableParent`,
  addressParent: `[${ADDRESS_ATTR}]`,
  addressParentOnce: `[${ADDRESS_ATTR}]:not(.${META_SUITES_DONE})`,
  address: '.metaSuites__address',
  txHeaderLinkBox: `.metaSuites__txHeaderLink_box:not(.${META_SUITES_DONE})`,
  addressLabel: `.metaSuites__addressLabel:not(.${META_SUITES_DONE})`,
  addressRisk: `.metaSuites__addressRisk:not(.${META_SUITES_DONE})`
}

export default META_SUITES_CLASS
