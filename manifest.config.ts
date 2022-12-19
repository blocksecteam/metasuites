import { defineManifest } from '@crxjs/vite-plugin'
import { ConfigEnv } from 'vite'

import { version } from './package.json'

export default defineManifest((env: ConfigEnv) => ({
  name: 'MetaDock',
  description:
    'Improve the usability of blockchain explorers, including BTC.com, Etherscan, BscScan, and *scans of most EVM-compatible chains.',
  version: version,
  manifest_version: 3,
  icons: {
    '16': 'src/assets/icons/icon16.png',
    '32': 'src/assets/icons/icon32.png',
    '48': 'src/assets/icons/icon48.png',
    '128': 'src/assets/icons/icon128.png'
  },
  content_scripts: [
    {
      matches: [
        '*://etherscan.io/*',
        '*://cn.etherscan.com/*',
        '*://polygonscan.com/*',
        '*://*.bscscan.com/*',
        '*://snowtrace.io/*',
        '*://optimistic.etherscan.io/*',
        '*://arbiscan.io/*',
        '*://ftmscan.com/*',
        '*://cronoscan.com/*',
        '*://*.moonscan.io/*'
      ],
      js: ['src/content/scans/index.tsx'],
      all_frames: true
    },
    {
      matches: ['*://explorer.btc.com/*'],
      js: ['src/content/btc/index.tsx']
    },
    {
      matches: ['*://*.blocksec.com/*'],
      js: ['src/content/blocksec/index.tsx']
    }
  ],
  background: {
    service_worker: 'src/background/index.ts'
  },
  web_accessible_resources: [
    {
      matches: ['<all_urls>'],
      resources: ['src/assets/images/*.png']
    }
  ],
  action: {
    default_popup: 'src/popup/popup.html',
    default_icon: {
      '16': 'src/assets/icons/icon16.png',
      '32': 'src/assets/icons/icon32.png',
      '48': 'src/assets/icons/icon48.png',
      '128': 'src/assets/icons/icon128.png'
    }
  },
  permissions: ['storage', 'webRequest'],
  host_permissions: [
    '*://explorer.btc.com/*',
    '*://etherscan.io/*',
    '*://cn.etherscan.com/*',
    '*://polygonscan.com/*',
    '*://*.bscscan.com/*',
    '*://snowtrace.io/*',
    '*://optimistic.etherscan.io/*',
    '*://arbiscan.io/*',
    '*://ftmscan.com/*',
    '*://cronoscan.com/*',
    '*://*.moonscan.io/*',
    '*://*.blocksec.com/*',
    '*://explorer.api.btc.com/*'
  ]
}))
