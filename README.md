# MetaDock Chrome Extension

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0) [![Chrome Web Store](https://img.shields.io/chrome-web-store/stars/fkhgpeojcbhimodmppkbbliepkpcgcoo?label=MetaDock&style=flat&logo=google)](https://chrome.google.com/webstore/detail/metadock/fkhgpeojcbhimodmppkbbliepkpcgcoo)

<p align="center"><a href="https://chrome.google.com/webstore/detail/metadock/fkhgpeojcbhimodmppkbbliepkpcgcoo" target="_blank" rel="noreferrer noopener"><img width="500" alt="MetaDock" src="https://assets.blocksec.com/image/1670212325471-2.png"></a></p>

MetaDock is a powerful browser extension designed for the crypto community. It aims to deliver an enhanced user experience by seamlessly integrating various innovative features into the blockchain explorers.

MetaDock supports Google Chrome. We recommend using the latest available browser version.

For up to the minute news, follow our [Twitter](https://twitter.com/MetaDockTeam) or [Medium](https://blocksecteam.medium.com/getting-started-with-metadock-5e3b3aeb64d4) pages.

## Building

- Install [Node.js](https://nodejs.org) version 16
  - If you are using [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) (recommended) running `nvm use` will automatically choose the right node version for you.
- Install [Yarn](https://yarnpkg.com/en/docs/install)

```shell
npm install -g yarn
```

- Install dependencies: `yarn install` or `yarn`

```shell
yarn install
# or
yarn
```

- Build the project to the `/dist` folder with `yarn build:prod`.

```shell
yarn build:prod
```

- Optionally, you may run `yarn dev` to run dev mode.

```shell
yarn dev
```

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
- [ ] Sandwich Attack Risk Detection

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

## Changelog

### v2.1.0

- [feat]: Enhance the Token Approval of blockchain explorers
- [fix]: Fix some issues when copying some items
- [feat]: Adjust the style of labels
- [feat]: Integrate approval diagnosis into search service

### v2.0.0

- [feat] Adapted to the new version of etherscan
- [build] Turn off code obfuscation

### v1.6.1

- [fix] A bug related to the conflict with tenderly extension
- [feat] Support copy opcodes

### v1.6.0

- [feat] Support export current page data
- [feat] Integrate Eden Network and Flashbots Explorer
- [feat] Update fund flow map, add button of MetaSleuth

### v1.5.0

- [feat] Optimized search shortcuts feature
- [fix] Fixed issue with button style misalignment
- [fix] Supports inputting spaces for search
- [fix] Fixed address copying bug
- [fix] Fixed Ethervm button issue
- [fix] Fixed snowtrace dethcode button bug

### v1.4.0

- [feat] NFTgo quick jump feature - Etherscan
- [feat] display funding source of deployer's - Etherscan
- [feat] NFT floor price feature - Etherscan
- [feat] Ethervm integration for contract - Etherscan
- [feat] Enhanced rarity feature - Opensea
- [feat] Enhanced holder address label - Opensea
- [feat] Risk assessment radar chart for collections - Opensea
- [perf] Optimized custom settings function
- [perf] Improved search functionality interaction
- [fix] Fixed Certain display bugs
- [fix] Fixed bug with fundflow jumping

### v1.3.1

- [feat] Show quick open in DethCode
- [feat] Alternative watermark on the fund flow chart
- [feat] Support PNG format output of fund flow chart

### v1.3.0

- [feat] All in one dock for blockchain explorers
- [feat] More Flexible Fund Flow Chart
- [feat] More Friendly experience on \*scan
