# gint [![](http://img.shields.io/npm/dm/gint.svg?style=flat)](https://www.npmjs.org/package/gint) [![npm version](https://badge.fury.io/js/gint.svg)](https://www.npmjs.org/package/gint) [![Build Status](https://img.shields.io/travis/runk/gint/master.svg)](https://travis-ci.org/runk/gint)

> A pluggable and configurable GIT linter tool

Gint can help with enforcing commit message patterns, branch sizes and heaps more.

## Install

```shell
npm install gint --save-dev
# or 
yarn add gint --dev
```

_Existing hooks aren't replaced_

## Uninstall

```shell
npm uninstall gint
# or
yarn remove gint
```

### Git GUI clients support

If you've installed Node using the [standard installer](https://nodejs.org/en/), [nvm](https://github.com/creationix/nvm) or [homebrew](http://brew.sh/), Git hooks will be executed in GUI applications.

### Working with multiple version of Node

If [`nvm`](https://github.com/creationix/nvm) is installed, gint will try to use the `default`/`current` installed Node version or use the project `.nvmrc`.

__Tip__ to use the system-installed version of node, `nvm` provides a [`system`](https://github.com/creationix/nvm#system-version-of-node) alias

## See also

* [Husky](https://github.com/typicode/husky) - Heavily based on husky source code.

## License

[MIT](https://github.com/runk/gint/blob/master/LICENSE)
