const path = require('path')
  , HandlebarsPlugin = require('handlebars-webpack-plugin')
  , config = require('./config.json')

const appRoot = path.resolve(__dirname)
  , hbx = require('HandlebarsExtended')({ appRoot, ...config.paths })

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
      },
      onBeforeRender : (hb, data, filename) => {
        let controllereData = {}
        try {
          const controllerName = filename
            .replace(/(\..*)?\.hbs$/, '') // strip .hbs or .ext.hbs extension
            .replace(config.paths.pagesPath, config.paths.controllerPath) // change to controller path
          controllereData = require(controllerName)
        } catch (e) {}

        const filenameNoExt = path.parse(path.basename(filename, '.hbs')).name
        console.log(`filename is ${filenameNoExt}`)
        return {
          pagename : {
            name : filenameNoExt,
            is : { [filenameNoExt] : true }
          },
          ...data,
          ...controllereData
        }
      }
    })
  ]
}
