import { ADDRESS_ATTR, TX_HASH_ATTR } from './enum'

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
  addressRisk: `.metaSuites__addressRisk:not(.${META_SUITES_DONE})`,
  txHashParentOnce: `[${TX_HASH_ATTR}]:not(.${META_SUITES_DONE})`,
  txTabs: `.m__txTabs:not(.${META_SUITES_DONE})`,
  txOverview: `.m__txOverview:not(.${META_SUITES_DONE})`,
  txTip: `.m__txTip:not(.${META_SUITES_DONE})`,
  contractTabs: `.m__contractTabs:not(.${META_SUITES_DONE})`,
  readContractBox: `.m__readContractBox:not(.${META_SUITES_DONE})`,
  contractItem: `.m__contractItem:not(.${META_SUITES_DONE})`,
  contractTitle: `.m__contractTitle:not(.${META_SUITES_DONE})`,
  contractChild: `.m__contractChild:not(.${META_SUITES_DONE})`,
  contractInput: `.m__contractInput`,
  contractCodeHeader: `.m__contractCodeHeader:not(.${META_SUITES_DONE})`,
  contractCode: '.m__contractCode',
  contractVerifiedHeader: `.m__contractVerifiedHeader:not(.${META_SUITES_DONE})`,
  method: `.m__method:not(.${META_SUITES_DONE})`
}

export default META_SUITES_CLASS
