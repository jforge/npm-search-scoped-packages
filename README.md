# Searching NPM Registry for packages by scope

Typescript based utility to find NPM packages by scope name.

Uses the [npms.io API](https://api-docs.npms.io/).

## Usage

```bash
npx ts-node npm-by-scope <scope>
```

```bash
node npm-by-scope <package_scope>
```

## Example

```bash
npx ts-node npm-by-scope aws-cdk
```

This shows/filters all packages found in the NPM registry that belong to the `@aws-cdk` scope.

Respective NPM Search Uri: https://api.npms.io/v2/search?q=scope:aws-cdk+not:unstable&size=250

## Reference

- [NPM Search](https://npms.io)
- [NPM Search API](https://api-docs.npms.io/)
