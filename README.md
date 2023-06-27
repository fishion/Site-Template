# Site Template

A starting point for a website project

## Instructions

* Clone project into new directory
* npm i
* In package.json:
  * Edit Name / description
  * Change server port, if you want
* Edit config.json with site details
* Create a favicon

## Defaults

### npm dependencies

* serve                     : Local webserver for static website
* onchange                  : Trigger builds when files change
* sass                      : compile sass to css in build
* eslint                    : lint your code ising config in .eslintrc.js
* eslint-config-standard    : used as baseline in .eslintrc.js
* webpack, webpack-cli      : site builder
* handlebars-webpack-plugin : Plugin to interpret hb
* css-loader, style-loader  : Used in webpack config to pull in CSS styling in js modules (eg openlayers)

### files

* .eslintrc.js              : eslint configuration settings
* .gitignore                : a basic set of file paths I don't want in git repo
* .serve.json               : basic configuration for static file server
* webpack.config.js         : build configurtion for Handlebars templates, SASS, JS
* package.json              : node config

## TODO

* add a script to do all the above instructions for you
* Basic CI for publishing to cloudflare pages
