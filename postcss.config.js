module.exports = {
  plugins: [
    require('postcss-pseudoelements')(),
    require('postcss-mixins')(),
    require('postcss-each')(),
    require('postcss-smart-import')(),
    require('postcss-cssnext')({
      /*browsers: 'last 2 versions',
      features: {
        customProperties: {
          'color-primary': 'var(--palette-pink-500)',
          'color-primary-dark': 'var(--palette-pink-700)',
          'color-accent': 'var(--palette-indigo-a200)'
        }
      }*/
    }),
    require('postcss-reporter')({ clearAllMessages: true })
  ]
}