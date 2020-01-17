module.exports = {
  presets: [
    [
      '@vue/app', {
        polyfills: [
          'es6.promise',
          'es6.symbol'
        ]
      }
    ],
    '@vue/babel-preset-jsx'
  ],
  plugins: ['@babel/plugin-syntax-jsx']
}
