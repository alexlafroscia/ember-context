# How To Contribute

## Installation

- `git clone https://github.com/alexlafroscia/ember-context.git`
- `cd ember-context`
- `yarn install`

## Linting

- `yarn lint:hbs`
- `yarn lint:js`
- `yarn lint:js --fix`

## Running tests

- `ember test` – Runs the test suite on the current Ember version
- `ember test --server` – Runs the test suite in "watch mode"
- `ember try:each` – Runs the test suite against multiple Ember versions

## Running the dummy application

- `ember serve`
- Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

## Commit Formatting

This project uses [conventional commits][conventional-commits] to help generate changelogs and handle versioning based on the changed made. Please read that document to understand the format. The high-level points are that:

- Commits names should be prefixed with one of:
  - `feat:` for new features that do not break old functionality
  - `fix:` for bug fixes or cleanup work
  - `chore:` for basic project maintenance
- Breaking changes should be prefixed by the words `BREAKING CHANGE:` in the commit body

Additionally, make sure commit in small, logical chunks. If the entire pull request is for a single change, please squash all commits together. If there are multiple changes, please split them out into logical groupings with the appropriate commit format.

## Releasing Versions

Releasing a new version should be done using [`standard-version`][standard-version] (aliased to `yarn release`):

```sh
yarn release --dry-run
# Make sure that all looks right!
yarn release
```

[standard-version]: https://www.npmjs.com/package/standard-version
[conventional-commits]: https://conventionalcommits.org/
