# Mandelbrot

[![Build Status](https://travis-ci.org/lencse/mandel.svg?branch=master)](https://travis-ci.org/lencse/mandel)

### Prerequisites

[Yarn package manager](https://yarnpkg.com)

### Installing

```sh
git clone git@github.com:lencse/mandel.git
cd mandel
yarn
```

### Build and development

#### Building
```sh
yarn build
```
Open dist/index.html in browser

#### Watch file changes and use livereload server:
```sh
yarn watch
```
Then open http://localhost:8666 in browser

#### Building for production
```sh
NODE_ENV=production yarn build
```
Open dist/index.html in browser

## Running lint and checking build status

```sh
yarn test
```