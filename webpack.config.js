const fs = require('fs');
const path = require('path');
const HandlebarsPlugin = require("handlebars-webpack-plugin");
const hbx = require('HandlebarsExtended')({
  appRoot : path.resolve(__dirname),
  pagesPath : 'src/view/page',
  wrappersPath : 'src/view/components/wrappers',
  includesPath : 'src/view/components/includes',
  extension : 'html'
});

module.exports = {
  mode: 'production',
  entry: {
    site : './src/js/site.js',
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, "dist", "js"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ],
      },
    ],
  },
  plugins: [
    new HandlebarsPlugin({
      entry: path.join(__dirname, "src", "view", "page", "*.hbs"),
      output: path.join(__dirname, "dist", "[name]"),
      // globbed path to partials, where folder/filename is unique
      partials: [
        path.join(process.cwd(), "app", "src", "components", "*", "*.hbs")
      ],
      // register custom helpers. May be either a function or a glob-pattern
      helpers: {
        wrap: hbx.helpers.wrap,
        include: hbx.helpers.include,
      // onBeforeSave: function (Handlebars, resultHtml, filename) {
      //   const compiledWrapper = Handlebars.compile(
      //     fs.readFileSync(`${path.join(appRoot, wrappersPath, wrapper)}.html.hbs`,'utf8').toString()
      //   );
      // },
      }
    })
  ]
}