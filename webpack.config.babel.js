const webpack = require('webpack')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ReplacePlugin = require('replace-bundle-webpack-plugin')
const OfflinePlugin = require('offline-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

const path = require('path')

const ENV = process.env.NODE_ENV || 'development'
const SERVICE_WORKER = process.env.SERVICE_WORKER === 'on' || ENV === 'production' ? 'on' : 'off'

const CSS_MAPS = ENV !== 'production'
const JS_MAPS = ENV !== 'production'

const DEFINITIONS = {
  'process.env.NODE_ENV': `'${ENV}'`,
  'process.env.SERVICE_WORKER': `'${SERVICE_WORKER}'`
}

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: './index.js',

  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: '/',
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['.jsx', '.js', '.json', '.css', '.pcss'],
    modules: [
      path.resolve(__dirname, "src/lib"),
      path.resolve(__dirname, "node_modules"),
      'node_modules'
    ],
    alias: {
      components: path.resolve(__dirname, "src/components"),    // used for tests
      style: path.resolve(__dirname, "src/style"),

      'react': 'preact-compat',
      'react-dom': 'preact-compat'
    }
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        exclude: path.resolve(__dirname, 'src'),
        loader: 'source-map-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: `babel-loader?sourceMaps=${JS_MAPS ? 1 : 0}`
      },
      {
        test: /\.(p?css)$/,
        include: [
          path.resolve(__dirname, 'src/components'),
          path.resolve(__dirname, 'node_modules', 'react-toolbox')
        ],
        loader: ExtractTextPlugin.extract({
          fallbackLoader: {
            loader: 'style-loader',
            query: {
              singleton: true
            }
          },
          loader: [
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
      },
      {
        test: /\.(p?css)$/,
        exclude: [
          path.resolve(__dirname, 'src/components'),
          path.resolve(__dirname, 'node_modules', 'react-toolbox')
        ],
        loader: ExtractTextPlugin.extract({
          fallbackLoader:  {
            loader: 'style-loader',
            query: {
              singleton: true
            }
          },
          loader: [
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
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(xml|html|txt|md)$/,
        loader: 'raw-loader'
      },
      {
        test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
        loader: ENV==='production' ? 'file-loader?name=[path][name]_[hash:base64:5].[ext]' : 'url-loader'
      }
    ]
  },

  plugins: ([
    // Analyze the bundle and see what is taking up all that space
    // new BundleAnalyzerPlugin(),

    // Don't continue when there are errors
    new webpack.NoEmitOnErrorsPlugin(),

    // Bundle all styles into a file, unless this is production
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true,
      disable: ENV === 'production'
    }),

    // Right now we only support the default locale
    // Ignore all the locale files to minimize the bundle
    new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),

    // Compress all the files with the default settings
    // Enables gzip compression and delivers these files instead
    new CompressionPlugin(),

    // Define the constants loaded before
    new webpack.DefinePlugin(DEFINITIONS),

    // Check for circular dependencies and break out if it fails
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true
    }),

    // During karma's webpack launch, webpack does not accept the --progress flag
      // This shows some progress bar during test webpack builds
    new ProgressBarPlugin({
      format: '  build [:bar] :percent (:elapsed seconds)',
      clear: false
    }),

    // Build the index.html with the bundle.js and optional styles.css
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: { collapseWhitespace: true }
    }),

    // Copy assets over to the root of the distribution folder
    new CopyWebpackPlugin([
      { from: './manifest.json', to: './' },
      { from: './favicon.ico', to: './' }
    ])
  ]).concat(ENV === 'production'
  ? [

    // Strip out babel-helper invariant checks
    new ReplacePlugin([{
      // this "partten" is actually the property name https://github.com/kimhou/replace-bundle-webpack-plugin/issues/1
      partten: /throw\s+(new\s+)?[a-zA-Z]+Error\s*\(/g,
      replacement: () => 'return;('
    }, {
      pattern: /throw\s+(new\s+)?[a-zA-Z]+Error\s*\(/g,
      replacement: () => 'return;('
    }])

  ] : []).concat(SERVICE_WORKER === 'on'
  ? [

    // Build the service worker and offline manifest
    new OfflinePlugin({
      relativePaths: false,
      AppCache: false,
      ServiceWorker: {
        events: true
      },
      publicPath: '/'
    })

  ] : []),

  stats: { colors: true },

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
