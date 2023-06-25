const path = require('path')
  , HandlebarsPlugin = require('handlebars-webpack-plugin')
  , config = require('./config.json')

const hbx = require('HandlebarsExtended')({
  appRoot : path.resolve(__dirname),
  ...config.paths
})

module.exports = {
  mode : 'production',
  entry : {
    site : './src/js/site.js'
  },
  output : {
    filename : '[name].js',
    path : path.join(__dirname, 'dist', 'js')
  },
  module : {
    rules : [
      {
        test : /\.css$/,
        use : ['style-loader', 'css-loader']
      }
    ]
  },
  plugins : [
    new HandlebarsPlugin({
      entry : path.join(__dirname, 'src', 'view', 'page', '*.hbs'),
      output : path.join(__dirname, 'dist', '[name]'),
      data : config,
      // globbed path to partials, where folder/filename is unique
      partials : [
        path.join(process.cwd(), 'app', 'src', 'components', '*', '*.hbs')
      ],
      // register custom helpers
      helpers : {
        wrap : hbx.helpers.wrap,
        include : hbx.helpers.include
      }
    })
  ]
}
