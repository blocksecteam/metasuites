# Contributing

thanks for your interest in contributing to MetaSuites! Please take a moment to review this document before submitting a pull request.

## Important

When submitting a pull request (PR), please ensure that it is merged into the `develop` branch rather than the `main` branch.

## Cloning the repository

To start contributing to the project, clone it to your local machine using git:

```shell
git clone https://github.com/blocksecteam/metasuites.git --recurse-submodules
```

## Installing Node.js

You need to install Node.js v18.18.0. You can run the following commands in your terminal to check your local Node.js versions:

```shell
node -v
```

If the versions are not correct or you don't have Node.js or Bun installed, download and follow their setup instructions:

- Install Node.js using [fnm](https://github.com/Schniz/fnm) or from the [official website](https://nodejs.org)
- Install Node.js using [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) running `nvm use` will automatically choose the right node version for you.

## Installing yarn

```shell
npm install -g yarn
```

## Installing dependencies

Once in the project's root directory, run the following command to install the project's dependencies:

```shell
yarn install
```

## Running the test suite

you may run `yarn start` to locally debug the interface in the production environment.Please note that do not run yarn dev locally, as it will request the API of BlockSec's development environment, which is internal-use only.

```shell
yarn start
```

## Running Linting

You can run the linter by itself with `yarn lint`.

## Changing dependencies

Whenever you change dependencies (adding, removing, or updating, either in `package.json` or `yarn.lock`), `yarn.lock` must be kept up-to-date.

## Building

### Chrome and Firefox

- Build the project to the `/dist/*` folder with `yarn build:prod` or `yarn build-firefox:prod`.

```shell
# chrome
yarn build:prod
# firefox
yarn build-firefox:prod
```

### Safari

Install Xcode (for building the Safari package)

To build the extension for distribution, or to run it locally for testing purposes, follow these steps:

```shell
# step 1
yarn build-safari:prod
# step 2
xcrun safari-web-extension-converter --macos-only /path/to/metasuites/dist/safari-extension
```

For more information on building and debugging Safari extensions, see the [official documentation](https://developer.apple.com/documentation/safariservices/safari_web_extensions/).
