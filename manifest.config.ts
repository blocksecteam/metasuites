import { defineManifest } from '@crxjs/vite-plugin'
import { ConfigEnv } from 'vite'

import { version } from './package.json'

export default defineManifest((env: ConfigEnv) => {
  const isDev = env.mode === 'development'

  return {
    name: "MetaDock - Builders' Swiss Army Knife",
    description:
      'Integrating 30+ popular Web3 and AI Tools, 300M+ Address Labels, and the Fund Flow Map into a single extension.',
    version: version,
    manifest_version: 3,
    icons: {
      '16': 'src/assets/icons/icon16.png',
      '32': 'src/assets/icons/icon32.png',
      '48': 'src/assets/icons/icon48.png',
      '64': 'src/assets/icons/icon64.png',
      '128': 'src/assets/icons/icon128.png'
    },
    content_scripts: [
      {
        matches: isDev
          ? [
              '*://*.etherscan.io/*',
              '*://*.etherscan.com/*',
              '*://*.bscscan.com/*',
              '*://*.polygonscan.com/*',
              '*://optimistic.etherscan.io/*',
              '*://*.arbiscan.io/*',
              '*://*.ftmscan.com/*',
              '*://cronoscan.com/*',
              '*://*.moonscan.io/*',
              '*://*.basescan.org/*',
              '*://*.lineascan.build/*',
              '*://*.wemixscan.com/*',
              '*://gnosisscan.io/*',
              '*://*.celoscan.io/*',
              '*://*.bttcscan.com/*',
              '*://era.zksync.network/*'
            ]
          : ['<all_urls>'],
        js: ['src/content/index.all_frames.ts'],
        all_frames: true
      },
      {
        matches: isDev
          ? [
              '*://explorer.btc.com/*',
              '*://*.opensea.io/*',
              '*://*.tronscan.org/*',
              '*://*.snowtrace.io/*'
            ]
          : ['<all_urls>'],
        js: ['src/content/index.ts'],
        all_frames: false
      }
    ],
    background: {
      service_worker: 'src/background/index.ts'
    },
    web_accessible_resources: [
      {
        matches: ['<all_urls>'],
        resources: ['src/assets/images/*.png', 'src/assets/js/*.js']
      }
    ],
    action: {
      default_popup: 'src/popup/popup.html',
      default_icon: {
        '16': 'src/assets/icons/icon16.png',
        '32': 'src/assets/icons/icon32.png',
        '48': 'src/assets/icons/icon48.png',
        '64': 'src/assets/icons/icon64.png',
        '128': 'src/assets/icons/icon128.png'
      }
    },
    permissions: ['storage', 'webRequest'],
    host_permissions: ['<all_urls>']
  }
})
