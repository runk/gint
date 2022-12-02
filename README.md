# gint [![](http://img.shields.io/npm/dm/gint.svg?style=flat)](https://www.npmjs.org/package/gint)

> A pluggable and configurable git linter tool

Gint can help with enforcing commit message patterns, branch sizes and heaps more.

## Install

```shell
npm i gint --only=dev
```

_Existing hooks aren't replaced_

## Uninstall

```shell
npm uninstall gint
```

### Usage

Gint requires you to create a configuration file named `.gintrc` in your project root. See example below.

```json
{
  "rules": {
    "commit-message-pattern": ["error", "^\\[(patch|minor|major)\\]\\s.{3,}", "i"],
    "commit-min-len": ["error", 10],
    "commit-max-len": ["error", 512]
  }
}
```

### Rules

[Refer to rules documentation](https://github.com/runk/gint/blob/master/RULES.md).

### Git GUI clients support

If you've installed Node using the [standard installer](https://nodejs.org/en/), [nvm](https://github.com/creationix/nvm) or [homebrew](http://brew.sh/), Git hooks will be executed in GUI applications.

### Working with multiple version of Node

If [`nvm`](https://github.com/creationix/nvm) is installed, gint will try to use the `default`/`current` installed Node version or use the project `.nvmrc`.

__Tip__ to use the system-installed version of node, `nvm` provides a [`system`](https://github.com/creationix/nvm#system-version-of-node) alias

## See also

* [Husky](https://github.com/typicode/husky) - Heavily based on husky source code.

## License

[MIT](https://github.com/runk/gint/blob/master/LICENSE)
