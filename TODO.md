# TODO

- Module Resolution Mismatch - Your tsconfig.json uses NodeNext but webpack.config.ts overrides it to bundler for ts-loader. This works but could be confusing.
  - consider https://www.typescriptlang.org/docs/handbook/modules/guides/choosing-compiler-options.html

- Develop AI md files to guide the AI and set up desired behaviour

- add a script to follwo instructions in README and set up a new project from this template
- Basic CI for publishing to cloudflare pages (friends of knoll park has one)
- Lint .json
- Test partials path in webpack
- No testing framework (Jest, Vitest, etc.)

- Mixed .js + .ts Controllers - Your webpack config searches for both index.ts and index.js and merges them. This is unusual - typically you'd standardize on one or the other.
