import jslint from "@eslint/js"
import tslint from "typescript-eslint"
import globals from "globals"

export default [
  jslint.configs.recommended,
  ...tslint.configs.recommended,
  {
    files : ["**/*.js", '**/*.ts'],
    languageOptions : {
      ecmaVersion : "latest",
      sourceType : "module",
      globals : {
        ...globals.browser,
        ...globals.node
      },
    }
  },
  {
    ignores : [
      "node_modules",
      "**/node_modules", // should be ignored by default anyway
      "dist/**/*",
      //"**/*.js", // ignore compiled js files
      "!eslint.config.js" // but not this file
    ]
  },
  {
    rules : {
      "one-var" : ["warn", "never"],
      "no-multi-spaces" : "warn",
      "comma-style" : ["error", "first", {
        exceptions : {
          ArrayExpression : true,
          ObjectExpression : true,
        },
      }],
      "space-before-function-paren" : ["error", "never"],
      "key-spacing" : ["error", {
        beforeColon : true,
      }],
      "brace-style" : ["error", "1tbs", {
        allowSingleLine : true,
      }],
      "@typescript-eslint/consistent-indexed-object-style" : "error",
      "@typescript-eslint/no-unused-vars" : [ "error", {
        "argsIgnorePattern" : "^_",
        "varsIgnorePattern" : "^_",
        "caughtErrorsIgnorePattern" : "^_"
      }]
    }
  }
]
