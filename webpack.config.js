import path from "path"
import { fileURLToPath } from "url"
import { glob } from "node:fs/promises"
import config from "./config.json" with { type: "json" }
import HandlebarsPlugin from "handlebars-webpack-plugin"
import CopyPlugin from "copy-webpack-plugin"
import HBX from "handlebarsextended"
import { register } from "tsx/esm/api"

// Register tsx to handle TypeScript files
register()

const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const __dirname = path.dirname(__filename) // get the name of the directory
const appRoot = path.resolve(__dirname)
const hbx = HBX({ appRoot, ...config.paths })

// Preload all controller modules
const controllerCache = new Map()

async function preloadControllers() {
  const controllerPattern = path.join(appRoot, config.paths.controllerPath, "**", "*.{js,ts}")
  for await (const filePath of glob(controllerPattern)) {
    try {
      const module = await import(filePath)
      const cacheKey = filePath.replace(/\.(js|ts)$/, "")
      const existingData = controllerCache.get(cacheKey) || {}
      controllerCache.set(cacheKey, {
        ...existingData,
        ...(module.default || module),
      })
      console.log(`Preloaded controller: ${filePath}`)
    } catch (error) {
      console.error(`Failed to preload ${filePath}:`, error)
    }
  }
}

await preloadControllers()

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
        use: { loader: "ts-loader" },
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
        const controllerPath = filename
          .replace(/(\..*)?\.hbs$/, "") // strip .hbs or .ext.hbs extension
          .replace(config.paths.pagesPath, config.paths.controllerPath) // change to controller path

        const filenameNoExt = path.parse(path.basename(filename, ".hbs")).name
        return {
          pagename: {
            name: filenameNoExt,
            is: { [filenameNoExt]: true },
          },
          ...data,
          ...(controllerCache.get(controllerPath) || {}), // Look up preloaded controller data from cache
        }
      },
    }),
  ],
}
