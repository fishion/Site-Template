'use strict'

import path = require('path')
import HandlebarsPlugin = require('handlebars-webpack-plugin')
import config = require('./config.json')
import HBX = require('HandlebarsExtended')

const appRoot = path.resolve(__dirname)
  , hbx = HBX({ appRoot, ...config.paths })

module.exports = {
  // mode: 'development', devtool: false,
  mode : 'production',
  entry : {
    site : './src/js/site.ts'
  },
  output : {
    filename : '[name].js',
    path : path.join(__dirname, config.paths.outputBuildPath, 'js')
  },
  module : {
    rules : [
      {
        test : /\.tsx?$/,
        use : 'ts-loader',
        exclude : /node_modules/
      },
      {
        test : /\.css$/,
        use : ['style-loader', 'css-loader']
      }
    ]
  },
  plugins : [
    new HandlebarsPlugin({
      entry : path.join(__dirname, 'src', 'view', 'page', '**', '*.hbs'),
      output : path.join(__dirname, config.paths.outputBuildPath, '[path]', '[name]'),
      data : config,
      // globbed path to partials, where folder/filename is unique
      partials : [
        path.join(appRoot, 'src', 'view', 'component', '*', '*.hbs')
      ],
      // register custom helpers
      helpers : {
        wrap : hbx.helpers.wrap,
        include : hbx.helpers.include,
        math : hbx.helpers.math
      },
      onBeforeRender : (hb: object, data: object, filename: string) => {
        const controllerName: string = filename
          .replace(/(\..*)?\.hbs$/, '') // strip .hbs or .ext.hbs extension
          .replace(config.paths.pagesPath, config.paths.controllerPath) // change to controller path
        let controllereData = {};
        ['js', 'ts'].forEach(extension => {
          try {
            controllereData = {
              ...controllereData,
              ...require(`${controllerName}.${extension}`)
            }
          } catch (e) {}
        })

        const filenameNoExt = path.parse(path.basename(filename, '.hbs')).name
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
