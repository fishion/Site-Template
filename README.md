# Site Template

A starting point for a website project

## Style guide

<https://google.github.io/styleguide/tsguide.html>

## Converting to typescript

<https://dev.to/tqbit/a-step-by-step-guide-to-migrate-a-nodejs-web-app-to-typescript-5hi2>

## Instructions

- Clone project into new directory
- npm i
- In package.json:
  - Edit Name / description
  - Change server port, if you want
- Edit config.json with site details
- Create a favicon
- Deploy static site ot e.g. cloudflare pages, building to 'dist' folder as part of deployment

### Serving site

- use dnsmasq configuration to serve everything on any-site-name.dev.maytreehousestudios.co.uk from localhost.
  - `/opt/homebrew/etc/dnsmasq.conf` should countain the following line : `address=/dev.maytreehousestudios.co.uk/127.0.0.1`
- Connect on http for now

## Defaults

### npm dependencies

**Build & bundling:**

- webpack, webpack-cli : Site builder for bundling JS/TS modules
- copy-webpack-plugin : Copy static assets during webpack build
- css-loader : Webpack loader for processing CSS files
- style-loader : Webpack loader for injecting CSS into the DOM

**Template engine:**

- handlebars-webpack-plugin : Plugin to interpret Handlebars templates
- handlebarsextended : Add wrapper and include (+other helpers) to Handlebars

**Styling:**

- sass : Compile SASS to CSS in build

**Maps & visualization:**

- ol : OpenLayers library for interactive maps

**TypeScript:**

- typescript : TypeScript compiler
- ts-loader : Webpack loader for TypeScript
- tsx : Execute TypeScript files directly (allows webpack config to be .ts)
- @types/node : TypeScript type definitions for Node.js

**Linting & formatting:**

- eslint, @eslint/js : Lint your code using config in eslint.config.js
- typescript-eslint, @typescript-eslint/eslint-plugin, @typescript-eslint/parser : ESLint for TypeScript
- eslint-config-prettier : Disable ESLint rules that conflict with Prettier
- prettier : Code formatter
- globals : Global variable definitions for ESLint
- lint-staged : Run linters on staged files only during pre-commit

**Development tools:**

- serve : Local webserver for static website
- onchange : Trigger builds when files change
- husky : Git hooks for running pre-commit checks

### files

**Core configuration:**

- package.json : Node.js project configuration, dependencies, and npm scripts
- config.json : Site-specific settings (paths, metadata, theme colors) used by webpack build

**Build configuration:**

- tsconfig.json : TypeScript compiler configuration and project settings
- webpack.config.js : Build configuration for bundling Handlebars templates, SASS, TS, and JS

**Code quality:**

- eslint.config.js : ESLint linting rules and configuration
- .prettierrc : Prettier code formatting rules (semicolons, trailing commas, etc.)
- .prettierignore : Files and directories to exclude from Prettier formatting
- .lintstagedrc.json : Lint-staged configuration for pre-commit linting/formatting
- .husky/ : Git hooks directory (pre-commit checks for linting and formatting)

**Development:**

- .serve.json : Configuration for the local static file server
- .gitignore : Files and directories to exclude from git repository

## suggested dependencies

dependencies : {
"app-root-path": "^2.1.0",
"bluebird": "^3.5.3",
"compression": "^1.7.3",
"cookie-parser": "^1.4.4",
"cors": "^2.8.4",
"db-migrate": "^0.11.5",
"db-migrate-mysql": "^1.1.10",
"express": "^4.16.4",
"express-jwt": "^5.3.1",
"helmet": "^3.14.0",
"knex": "^0.16.3",
"morgan": "^1.9.1",
"mysql": "^2.16.0",
"socket.io": "^2.2.0",
"winston": "^3.1.0"
},
"devDependencies": {
"chai": "^4.2.0",
"mocha": "^5.2.0",
"nodemon": "^1.18.6",
"nyc": "^13.1.0",
"sinon": "^7.1.0",
"supertest": "^3.3.0"
},
"nyc": {
"exclude": [
"test",
"config"
]
}
