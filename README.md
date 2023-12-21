# MetaDock Browser Extension

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0) [![Chrome Web Store](https://img.shields.io/chrome-web-store/stars/fkhgpeojcbhimodmppkbbliepkpcgcoo?label=MetaDock&style=flat&logo=google)](https://chrome.google.com/webstore/detail/metadock/fkhgpeojcbhimodmppkbbliepkpcgcoo) [![Firefox Web Store](https://img.shields.io/chrome-web-store/stars/fkhgpeojcbhimodmppkbbliepkpcgcoo?label=MetaDock&style=flat&logo=firefox)](https://addons.mozilla.org/firefox/addon/metadock/) [![Safari Apple Store](https://img.shields.io/chrome-web-store/stars/fkhgpeojcbhimodmppkbbliepkpcgcoo?label=MetaDock&style=flat&logo=apple)](https://apps.apple.com/app/metadock/id6448738932?l=en&mt=12) [![Twitter Follow](https://img.shields.io/twitter/follow/MetaDockTeam?style=social)](https://twitter.com/MetaDockTeam)

<p align="center"><a href="https://chrome.google.com/webstore/detail/metadock/fkhgpeojcbhimodmppkbbliepkpcgcoo" target="_blank" rel="noreferrer noopener"><img width="500" alt="MetaDock" src="https://assets.blocksec.com/image/1670212325471-2.png"></a></p>

MetaDock is a powerful browser extension designed for the crypto community. It aims to deliver an enhanced user experience by seamlessly integrating various innovative features into the blockchain explorers.

MetaDock supports Google Chrome, Firefox and Safari. We recommend using the latest available browser version.

For up to the minute news, follow our [Twitter](https://twitter.com/MetaDockTeam) or [Medium](https://blocksecteam.medium.com/getting-started-with-metadock-5e3b3aeb64d4) pages.

## Building

- Install [Node.js](https://nodejs.org) version 18.12.0 or later
  - If you are using [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) (recommended) running `nvm use` will automatically choose the right node version for you.
- Install [Yarn](https://yarnpkg.com/en/docs/install)
- Xcode (for building the Safari package)

```shell
npm install -g yarn
```

- Install dependencies: `yarn install` or `yarn`

```shell
yarn install
# or
yarn
```

### Chrome and Firefox

- Build the project to the `/dist/*` folder with `yarn build:prod` or `yarn build-firefox:prod`.

```shell
# chrome
yarn build:prod
# firefox
yarn build-firefox:prod
# safari
yarn build-safari:prod
xcrun safari-web-extension-converter --macos-only /path/to/metadock/dist/safari-extension
```

- Optionally, you may run `yarn dev` to run dev mode.

```shell
yarn dev
```

### Safari

To build the extension for distribution, or to run it locally for testing purposes, follow these steps:

```shell
# step 1
yarn build-safari:prod
# step 2
xcrun safari-web-extension-converter --macos-only /path/to/metadock/dist/safari-extension
```

For more information on building and debugging Safari extensions, see the [official documentation](https://developer.apple.com/documentation/safariservices/safari_web_extensions/).

## Contributing

### Development builds

To start a development build (e.g. with logging and file watching) run `yarn dev`.

### Running Linting

You can run the linter by itself with `yarn lint`.

### Changing dependencies

Whenever you change dependencies (adding, removing, or updating, either in `package.json` or `yarn.lock`), `yarn.lock` must be kept up-to-date.

## Features

- [x] Show the fund flow chart
- [x] Show enhanced function signatures
- [x] Show compliance scores for addresses
- [x] Show enhanced address labels
- [x] Show quick open in multiple enhanced parsers for transactions
- [x] Enable batch download of contract source code and ABI
- [x] Show quick open in DeBank for addresses
- [x] Show quick open in Dedaub for unverified contracts
- [x] Convert UTC to Local Time Zone
- [x] Show copy icon for addresses
- [x] Show quick open in ethervm.io for unverified contracts
- [x] Show NFT floor price in major markets
- [x] Show the source of funding for contract deployers
- [x] Show quick open in NFTGo for NFT contracts
- [x] Show comprehensive risk graph of the collection
- [x] Show owner's address label
- [x] Show export data for a part of transactions
- [x] Show alternative block explorers
- [x] Show approval diagnosis
- [x] Show enhanced address labels by Forta
- [x] Alert suspicious transactions by Forta
- [x] Show private variables
- [x] Quick format parameters
- [x] Show nft marketplaces
- [x] Show proxy upgrade log
- [x] Show transaction summary
- [x] Show evm.storage shortcut
- [x] Show transaction simulator
- [x] Show Variable Logs

## Supported Websites List

- btc.com
- etherscan.io
- bscscan.com
- polygonscan.com
- ftmscan.com
- arbiscan.io
- cronoscan.com
- moonscan.io
- snowtrace.io
- optimistic.etherscan.io
- opensea.io
- tronscan.org

## Changelog

For a detailed list of changes, see the [changelog](./CHANGELOG.md).
