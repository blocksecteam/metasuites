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

- Build the project to the `/dist` folder with `yarn build`.

```shell
yarn build
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

## Changelog

v1.3.0

- [feat] All in one dock for blockchain explorers
- [feat] More Flexible Fund Flow Chart
- [feat] More Friendly experience on \*scan
