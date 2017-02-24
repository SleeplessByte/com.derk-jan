const debug = require('debug')('app:webpack:config')
const debugEnvironment = require('debug')('app:webpack:config:environment')
const debugPlugins = require('debug')('app:webpack:config:plugins')
const debugRules = require('debug')('app:webpack:config:rules')
debug('Setup environment.')

const argv = require('yargs').argv
const webpack = require('webpack')
const path = require('path')
const dotenv = require('dotenv')

// Start by determining the build environment. The three main options are:
// - development: for development servers
// - test: for running tests or developing tests
// - production: for staging and production servers
//
// Additionally coverage and cli can be turned on changing the configuration significantly.
const ENV = process.env.NODE_ENV || 'development'

const __DEV__ = ENV === 'development'
const __PROD__ = ENV === 'production'
const __TEST__ = ENV === 'test'
const __COVERAGE__ = !argv.watch && (argv.coverage || process.env.COVERAGE === 'on') && __TEST__
const __CLI__ = (argv.cli || process.env.CI === 'on')

debugEnvironment(`Environment ${ENV} with coverage=${__COVERAGE__} and cli=${__CLI__}.`)

if (!__DEV__ && !__PROD__ && !__TEST__) {
  // Make sure the environment exists or the configuration will be in an undefined but buildable state.
  throw new Error(`${ENV} is not a valid environment`)
}

// Additional options can be turned on using environment variables
const ANALYZE = process.env.ANALYZE === 'on'
const SERVICE_WORKER = process.env.SERVICE_WORKER || ENV === 'production'
const DASHBOARD = process.env.DASHBOARD === 'on'
const HOT = argv.hot || false
const HOT_ONLY = argv.hotOnly || false

// These options override any default setup and are dependent on the environment
const POSTCSS_OPTIONS = !__PROD__ ? { sourceMap: 'inline' } : {}
const CSS_MAPS = !__PROD__
const JS_MAPS = !__PROD__

debugEnvironment(`Source maps for CSS=${CSS_MAPS} and JavaScript=${JS_MAPS}.`)

// Each key will be replaced wich each value and values are loaded from the a .env file if that's available. However if a value is
// provided through the environment already, it won't be loaded by dotenv. So even though dotenv will override anything in there, it's a
// safe process and environment variables take precedent over .env variables.

// I don't have any yet

// These definitions will be passed to a plugin later and each key in the webpack source files will be replaced by the value. This is an
// exact replacement and can be anything. Strings here are put into quotes so that when they are replaced, they are still string.
let DEFINITIONS = {
  'process.env.NODE_ENV': JSON.stringify(ENV),
  'process.env.SERVICE_WORKER': `'${SERVICE_WORKER ? 'on' : 'off'}'`,
  __PROD__,
  __DEV__,
  __TEST__,
  __COVERAGE__
}

debugEnvironment(`Environment assigned ${Object.keys(DEFINITIONS).length} definitions.`)

// Here the plugin definitions start. Each plugin has commentary on what it does, why it's added or in a conditional bracket and a link to
// its source.
debug(`Defining plugins`)

const ExtractTextPlugin = require('extract-text-webpack-plugin')
let plugins = []

if (ANALYZE && !__CLI__ && !HOT_ONLY) {
  // Analyze the bundle and see what is taking up all that space.
  // https://github.com/th0r/webpack-bundle-analyzer
  // Only run when requested as it may start up a server and bind on a exports which isn't great with HMR.
  const analyzerMode = process.env.ANALYZE_MODE || 'static'
  plugins.push(
    new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)({
      analyzerMode
    })
  )

  debugPlugins(`Analyze plugin added with mode=${analyzerMode}.`)
}

if (HOT && !__PROD__) {
  // Replace the bundle ids by filenames. Only care about this when hot reloading and not in production.
  plugins.push(new webpack.NamedModulesPlugin())
}

plugins.push(
  // Don't continue when there are errors
  new webpack.NoEmitOnErrorsPlugin(),

  // Check for watch analyzerMode
  // https://github.com/webpack/webpack/issues/3460
  new (require('awesome-typescript-loader').CheckerPlugin)(),

  // Resolve paths for Typescript 2+ baseUrl and paths.
  // https://www.typescriptlang.org/docs/handbook/module-resolution.html
  // https://github.com/s-panferov/awesome-typescript-loader#advanced-path-resolution-in-typescript-20
  new (require('awesome-typescript-loader').TsConfigPathsPlugin)({
    configFileName: 'tsconfig.json'
  }),

  // Bundle all styles into a file, unless this is production.
  // https://github.com/webpack-contrib/extract-text-webpack-plugin
  //
  // In production we would like our service worker to update bundles sep. and not reload the styles bundle each time we make a single
  // update. All chunks makes this HMR & Code Split compatible and also includes the styles from chunks that are not the inital one.
  new ExtractTextPlugin({
    filename: 'style.css',
    allChunks: true,
    disable: !__PROD__ || true
  }),

  // Ignore certain files and paths from being bundled at all.
  // https://webpack.github.io/docs/list-of-plugins.html#ignoreplugin
  // Right now we only support the default locale (en_US) and thus ignore all the locale files in moment and/ moment-timezone to minimize
  // the bundle.
  new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),

  // Compress all the files with the default settings, by preparing them with gzip compression source that they may be delivered instead.
  // https://github.com/webpack-contrib/compression-webpack-plugin
  new (require('compression-webpack-plugin'))(),

  // Define the constants. Webpack will replace all keys in the object by the value in the object passed.
  // https://webpack.js.org/plugins/define-plugin/
  new webpack.DefinePlugin(DEFINITIONS),

  // Check for circular dependencies and break out if it fails.
  // https://github.com/aackerman/circular-dependency-plugin
  // Circular dependencies will make imports resolve to null, as the first time a file is refering its exports, not all will be available.
  // This breaks the build when this occurs and displays the cycle.
  new (require('circular-dependency-plugin'))({
    exclude: /node_modules/,
    failOnError: true
  }),

  //
  // https://webpack.js.org/guides/code-splitting-libraries/#implicit-common-vendor-chunk
  //
  new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor', 'manifest'] // 'services',
  })
)

debugPlugins('Added "always" plugins.')

if (!__CLI__ && DASHBOARD) {
  // When the dashboard option is provided, starts up the dashboard plugin on a given port or the default 3001.
  // https://github.com/FormidableLabs/webpack-dashboard
  const port = process.env.DASHBOARD_PORT || 3001
  plugins.push(
    new (require('webpack-dashboard/plugin'))({
      port
    })
  )

  debugPlugins(`Added the dashboard plugin on port=${port}.`)
}

if (!__TEST__) {
  // In the test environment these plugins may not work as expected, thus are excluded when running a test. This should be resolved and
  // these should be moved to the "always" group above.
  plugins.push(
    // Build the index.html with the bundle.js and optional styles.css
    // https://github.com/jantimon/html-webpack-plugin
    new (require('html-webpack-plugin'))({
      template: './index.html',
      minify: { collapseWhitespace: __PROD__ }
    }),

    // Copy assets over to the root of the distribution folder.
    // https://github.com/kevlened/copy-webpack-plugin
    new (require('copy-webpack-plugin'))([
      { from: './manifest.json', to: './' },
      { from: './favicon.ico', to: './' }
    ])
  )

  debugPlugins(`Added the HTML webpack plugin and copied assets.`)
}

if (__PROD__) {
  plugins.push(
    // Build the service worker and offline manifest.
    // https://github.com/NekR/offline-plugin
    new (require('offline-plugin'))({
      caches: 'all',
      responseStrategy: 'cache-first',
      updateStrategy: 'changed',
      relativePaths: false,
      AppCache: false,
      ServiceWorker: {
        output: 'sw.js',
        events: true
      },
      publicPath: '/'
    })
  )

  debugPlugins('Added the Offline plugin.')
}

const vendor = [
  'core-js',
  'no-case',
  //'moment',
  //'moment-timezone',
  //'rxjs',
  'ramda',
  'redux',
  'react-dom',
  //'react-intl',
  'react-toolbox',
  //'react-motion',
  //'react-redux',
  //'react-router',
  //'react-router-dom',
  'react-css-themr'
]

const entry = {
  main: './index.js',
  vendor
  //services: ['services']
}

if (DASHBOARD && !__CLI__) {
  // When the dashboard is enabled, this adds the socket script to the HTML (thanks HTMLWebPackPlugin) so it may
  // communicate with the dashboard.
  entry['dev-server'] = `webpack-dev-server/client?http://localhost:${process.env.DASHBOARD_PORT || 3001}`

  debugPlugins('Setup entry for the Dashboard plugin.')
}


// Here the rules definitions start. These are loaders, regular, post and pre, that will be used to load files and
// process them using webpack before being outputted.
debug('Define rules.')

let rules = []
if (JS_MAPS) {
  // Load sourcemaps for all the included node modules. These sourcemaps are preloaded so that they may be used when
  // our own sourcemaps are created. The excluded node modules fail to have precompiles sourcemaps and thus have to
  // be excluded.
  rules.push({
    test: /\.jsx?$/,
    enforce: 'pre',
    exclude: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules', 'intl-messageformat-parser'),
      path.resolve(__dirname, 'node_modules', 'intl-relativeformat'),
      path.resolve(__dirname, 'node_modules', 'intl-messageformat'),
      path.resolve(__dirname, 'node_modules', 'intl-format-cache')
    ],
    loader: 'source-map-loader'
  })

  debugRules('Added source-map-loader.')
}

if (__COVERAGE__) {
  // Instrument typescript for the istanbul plugin. The istanbul plugin is added by karma, so only add this when
  // coverage is requested. Right now it's added as a post loader so babel will have transformed the files.
  rules.push({
    test: /\.tsx?$/,
    include: [
      path.resolve(__dirname, 'src')
    ],
    loader: 'istanbul-instrumenter-loader?esModules=true',
    enforce: 'post'
  })

  debugRules('Added istanbul-instrumenter-loader.')
}


rules.push(
  {
    // Transform our (js and jsx) files with Babel
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: {
      loader: 'babel-loader',
      options: {
        sourceMaps: JS_MAPS ? 1 : 0,
        plugins: __COVERAGE__ ? [] : []
      }
    }
  }, {
    // Transform our (ts and tsx) files with Typescript and Babel
    test: /\.tsx?$/,
    exclude: /node_modules/,
    loader: [
      {
        loader: 'awesome-typescript-loader',
        options: {
          babelOptions: {
            sourceMaps: JS_MAPS ? 1 : 0
          }
        }
      }
    ]
  }, {
    // Transform our own .(p?css) files with PostCSS and CSS-modules
    test: /\.(p?css)$/,
    include: [
      path.join(__dirname, 'src')
    ],
    loader: ExtractTextPlugin.extract({
      fallback: {
        loader: 'style-loader',
        query: {
          singleton: true
        }
      },
      use: [
        {
          loader: 'css-loader',
          query: {
            modules: true,
            importLoaders: 1,
            localIdentName: '[local]__[hash:base64:5]',
            sourceMap: CSS_MAPS
          }
        },
        { loader: 'postcss-loader' }
      ]
    })
  }, {
    // Transform react toolbox. They are separated out because they have CSS modules turned on.
    test: /\.(p?css)$/,
    include: [
      path.resolve(__dirname, 'node_modules', 'react-toolbox')
    ],
    loader: ExtractTextPlugin.extract({
      fallback: {
        loader: 'style-loader',
        query: {
          singleton: true
        }
      },
      use: [
        {
          loader: 'css-loader',
          query: {
            modules: true,
            importLoaders: 1,
            localIdentName: '[local]__[hash:base64:5]',
            sourceMap: CSS_MAPS
          }
        },
        { loader: 'postcss-loader' }
      ]
    })
  }, {
    // Transform everyone else' styles (with css modules turned off)
    test: /\.(p?css)$/,
    exclude: [
      path.join(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules', 'react-toolbox'),
      path.resolve(__dirname, 'node_modules', 'mdi')
    ],
    loader: ExtractTextPlugin.extract({
      fallback:  {
        loader: 'style-loader',
        query: {
          singleton: true
        }
      },
      use: [
        {
          loader: 'css-loader',
          query: {
            modules: false,
            importLoaders: 0,
            localIdentName: '[local]__[hash:base64:5]',
            sourceMap: CSS_MAPS
          }
        },
        { loader: 'postcss-loader' }
      ]
    })
  }, {
    // Files that should be delivered rawly
    test: /\.(xml|html|txt|md)$/,
    loader: 'raw-loader'
  }, {
    // FOnts and images are loaded using the file loader in production, or using the url loader otherwise
    test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
    loader: __PROD__ ? {
      loader: 'file-loader',
      options: {
        name: '[path][name]_[hash:base64:5].[ext]'
      }
    } : {
      loader: 'url-loader'
    }
  }
)

debugRules('Added "always" loaders.')

debug('Build configuration.')

module.exports = {
  context: path.resolve(__dirname, 'src'),

  // Defines the files that are loaded and put in the html.
  entry,

  // This is where the build output goes
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: `${HOT ? '' : '[chunkhash].'}[name].js`
  },

  // Resolve for webpack imports
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json', '.scss', '.sass', '.pcss', '.css'],

    // Base directories so you can import something inside src or node_modules without the need to type out src or node_modules. The order
    // is important. This allows us to override node_modules in src. Finally also allow loading directly from the webpack node modules
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules'),
      'node_modules'
    ],
    alias: {
      components: path.resolve(__dirname, "src/components"),    // used for tests
      style: path.resolve(__dirname, "src/style"),

      'react': 'preact-compat',
      'react-dom': 'preact-compat',
      'react-addons-css-transition-group': 'preact-transition-group'
    }
  },

  module: { rules },

  plugins,

  stats: {
    children: false
  },

  node: {
    global: true,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
    setImmediate: false
  },

  devtool: ENV === 'production' ? 'source-map' : 'cheap-module-source-map',

  devServer: {
    port: process.env.PORT || 4000,
    host: 'localhost',
    publicPath: '/',
    contentBase: './src',
    historyApiFallback: true,
    open: true,
    proxy: {
      // OPTIONAL: proxy configuration:
      // '/optional-prefix/**': { // path pattern to rewrite
      //   target: 'http://target-host.com',
      //   pathRewrite: path => path.replace(/^\/[^\/]+\//, '')   // strip first path segment
      // }
    }
  }
}

debug('Configuration ready.')
