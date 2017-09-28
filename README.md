# Shopgate Cloud SDK Development Server

[![Travis CI Build](https://travis-ci.org/shopgate/sdk-devserver.svg?branch=master)](https://travis-ci.org/shopgate/sdk-devserver)
[![GitHub release](https://img.shields.io/github/release/shopgate/sdk-devserver.svg)]()
[![Coverage Status](https://coveralls.io/repos/github/shopgate/sdk-devserver/badge.svg?branch=master)](https://coveralls.io/github/shopgate/sdk-devserver?branch=master)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

The development server for your **Shopgate Cloud App** themes.
It uses [webpack](https://webpack.js.org) to compile your resources.

## Installation

To run the development server on all your _Shopgate Cloud_ themes, you need
to install this package **globally**:

```
npm install -g @shopgate/sdk-devserver
```

## Setup

In your console navigate to your project folder:

```
cd /path/to/my/project/
```

Then you have to run `npm i` first to install all your dependencies:

```
~/ npm i
```

Afterwards you have to run the development server's setup script:

```
~/ sgcloud --setup
```

Then you can start the development server by simply running:

```
~/ sgcloud
```

This will start the **Shopgate Cloud** development server with a Webpack instance.

## Options (CLI arguments)

There are a few options available that change the server's behaviour:

### `--setup`

This will setup you project configuration and save it into the
configuration file `local.json` in your project's `./config` directory.
The directory will be created if it does not exist.

#### Usage:

```
~/ sgcloud --setup
```

### `--link`

This will link the installed `@shopgate` dependencies with your
local copy. _**NOTE**: This will only apply in development mode and only links the
`@shopgate` modules that you have checked out from GitHub._

#### Usage:

```
~/ sgcloud --link
```

### `--reset`

This will reset your theme project by re-installing and re-locking all node modules.

#### Usage:

```
~/ sgcloud --reset
```

### `--remote`

This starts the development server together with the [Redux Remote DevTools](https://github.com/zalmoxisus/remote-redux-devtools). With that you can debug the redux
state and actions from your mobile device on your desktop browser.

#### Usage:

```
~/ sgcloud --remote
```

### `--analyze`

This uses the [Webpack Bundle Analyzer](https://github.com/th0r/webpack-bundle-analyzer) that will
help you to realize what's really inside your bundles, find out which modules take up
most of it's size and helps you recognize modules that shouldn't be there.

#### Usage:

```
~/ sgcloud --analyze
```

### `--production`

This will build your project for production. It will output all of the resources
for your **Shopgate App** into the `./public` folder in your project's
root directory. _**Note**: This will most likely be used in the Shopgate Cloud deployment
processes. Without the corresponding server-side backend, this will NOT be useful._

#### Usage:

```
~/ sgcloud --production
```
### `--sourcemap`

Additional argument to make the webpack use the style of source mapping of your choice. For more information check the [webpack documentation](https://webpack.js.org/configuration/devtool/).

#### Usage:
```
~/ sgcloud --sourcemap=cheap-eval-source-map
```

### `--silent`

This argument would suppress most logs outputted to the console.

#### Usage:
```
~/ sgcloud --silent
```

## Customization

In order to use your own [webpack configuration](https://webpack.js.org/configuration/) you can simply provide your own `webpack.config.js` inside your project's root directory. The development server will automatically recognize and use it.

**ATTENTION**: You will also need to provide your own [babel configuration](https://babeljs.io/docs/usage/babelrc/) inside a `.babelrc` file in your project's root directory!

## About Shopgate

Shopgate is the leading mobile commerce platform.

Shopgate offers everything online retailers need to be successful in mobile. Our leading software-as-a-service (SaaS) enables online stores to easily create, maintain and optimize native apps and mobile websites for the iPhone, iPad, Android smartphones and tablets.

## License

Shopgate's SDK Development Server is available under the Apache License, Version 2.0.

See the [LICENSE.md](./LICENSE.md) file for more information.
