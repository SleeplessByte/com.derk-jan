module.exports = (context) => ({
  plugins: [
    require('postcss-smart-import')({ addDependencyTo: context }),
    require('postcss-cssnext')({
      // https://npmjs.com/package/pixrem
      // https://npmjs.com/package/autoprefixer
      browsers: 'last 2 versions',
      features: {
        // https://npmjs.com/package/postcss-custom-properties
        customProperties: {
          variables: {
            'color-primary': 'var(--palette-pink-500)',
            'color-primary-dark': 'var(--palette-pink-700)',
            'color-accent': 'var(--palette-indigo-a200)'
          }
        },

        // https://npmjs.com/package/postcss-calc
        calc: {
          warnWhenCannotResolve: false
        },

        // https://npmjs.com/package/postcss-nesting
        nesting: {},

        // https://www.npmjs.com/package/postcss-replace-overflow-wrap
        overflowWrap: {
          method: 'copy'
        }
      }
    }),
    require('postcss-css-variables')(),
    require('postcss-mixins')(),
    require('postcss-each')(),
    require('postcss-browser-reporter')(),
    require('postcss-reporter')({ clearAllMessages: true })
  ]
})