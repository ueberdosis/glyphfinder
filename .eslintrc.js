module.exports = {
  root: true,
  env: {
    node: true,
***REMOVED***,
  extends: [
    'scrumpy',
  ],
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
***REMOVED***,
  parserOptions: {
    parser: 'babel-eslint',
***REMOVED***,
}
