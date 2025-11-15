import path from "path"
import { fileURLToPath } from "url"
import { createRequire } from "module"
import config from "./config.json" with { type: "json" }
import HandlebarsPlugin from "handlebars-webpack-plugin"
import CopyPlugin from "copy-webpack-plugin"
import HBX from "handlebarsextended"

const require = createRequire(import.meta.url)

const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const __dirname = path.dirname(__filename) // get the name of the directory
const appRoot = path.resolve(__dirname)
const hbx = HBX({ appRoot, ...config.paths })

export default {
  // mode: 'development', devtool: false,
  mode: "production",
  entry: {
    site: "./src/site-scripts/site.js",
    sitets: "./src/site-scripts/site.ts",
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, config.paths.outputBuildPath, "js"),
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            compilerOptions: {
              module: "ESNext",
              moduleResolution: "bundler",
            },
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, "src", "img"),
          to: path.join(__dirname, config.paths.outputBuildPath, "img"),
        },
      ],
      options: {
        concurrency: 100,
      },
    }),
    new HandlebarsPlugin({
      entry: path.join(__dirname, "src", "view", "page", "**", "*.hbs"),
      output: path.join(__dirname, config.paths.outputBuildPath, "[path]", "[name]"),
      data: config,
      // globbed path to partials, where folder/filename is unique
      partials: [path.join(appRoot, "src", "view", "component", "*", "*.hbs")],
      // register custom helpers
      helpers: {
        wrap: hbx.helpers.wrap,
        include: hbx.helpers.include,
        math: hbx.helpers.math,
        json: hbx.helpers.json,
      },
      onBeforeRender: (_, data, filename) => {
        const controllerName = filename
          .replace(/(\..*)?\.hbs$/, "") // strip .hbs or .ext.hbs extension
          .replace(config.paths.pagesPath, config.paths.controllerPath) // change to controller path
        let controllerData = {}
        ;["js", "ts"].forEach(extension => {
          try {
            controllerData = {
              ...controllerData,
              ...require(`${controllerName}.${extension}`),
            }
          } catch (_) {
            // no action
          }
        })

        const filenameNoExt = path.parse(path.basename(filename, ".hbs")).name
        return {
          pagename: {
            name: filenameNoExt,
            is: { [filenameNoExt]: true },
          },
          ...data,
          ...controllerData,
        }
      },
    }),
  ],
}
