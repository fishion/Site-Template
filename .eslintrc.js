module.exports = {
  env : {
    browser : true,
    es2021 : true
  },
  extends : [
    'standard'
  ],
  parserOptions : {
    ecmaVersion : 'latest',
    sourceType : 'module'
  },
  ignorePatterns : ['dist/**'],
  rules : {
    'no-multi-spaces' : 'off',
    'one-var' : ['error', 'consecutive'],
    'comma-style' : ['error', 'first', { exceptions : { ArrayExpression : true, ObjectExpression : true } }],
    'space-before-function-paren' : ['error', 'never'],
    'key-spacing' : ['error', { beforeColon : true }],
    'brace-style' : ['error', '1tbs', { allowSingleLine : true }]
  },
  overrides : [
    {
      files : ['**/*.ts', '**/*.tsx'],
      parser : '@typescript-eslint/parser',
      plugins : [
        '@typescript-eslint'
      ],
      extends : [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
      ],
      parserOptions : {
        project : ['./tsconfig.json']
      }
    }
  ]
}
