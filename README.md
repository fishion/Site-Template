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

- serve : Local webserver for static website
- onchange : Trigger builds when files change
- sass : compile sass to css in build
- eslint : lint your code ising config in .eslintrc.js
- eslint-config-standard : used as baseline in .eslintrc.js
- webpack, webpack-cli : site builder
- handlebars-webpack-plugin : Plugin to interpret hb
- @types/handlebars-webpack-plugin : ts types for handlebars-webpack-plugin
- handlebarsextended : Add wrapper and include (+other helpers) to handlebars
- css-loader, style-loader : Used in webpack config to pull in CSS styling in js modules (eg openlayers)
- typescript, ts-loader : Allow typescript compiling in webpack
- ts-node : Allows webpack config itself to be .ts
- typescript-eslint, @typescript-eslint/eslint-plugin, @typescript-eslint/parser : eslint for typescript

### files

- .eslintrc.js : eslint configuration settings
- .gitignore : a basic set of file paths I don't want in git repo
- .serve.json : basic configuration for static file server
- webpack.config.ts : build configurtion for Handlebars templates, SASS, TS, JS
- package.json : node config

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
"eslint": "^5.16.0",
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
