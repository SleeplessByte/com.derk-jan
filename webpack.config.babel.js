const HtmlWebPackPlugin = require("html-webpack-plugin");
// const PreloadWebpackPlugin = require('preload-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html?$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.(p(ost)?)?css$/,
        exclude: [
          path.resolve('./node_modules/material-components-web'),
          path.resolve('./node_modules/@material')
        ],
        use: [
          MiniCssExtractPlugin.loader,
          //'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1, modules: true } },
          "postcss-loader"
        ]
      },
      {
        test: /\.(p(ost)?)?css$/,
        include: [
          path.resolve('./node_modules/material-components-web'),
          path.resolve('./node_modules/@material')
        ],
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            },
          },
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html"
    }),
    // new PreloadWebpackPlugin(),
    new CopyWebpackPlugin([
      { from: './public/favicon.ico', to: 'favicon.ico' },
      { from: './public/manifest.webmanifest', to: 'manifest.webmanifest' },
    ]),
    new OfflinePlugin({
      ServiceWorker: {
        minify: false,
        events: true
      }
    })
  ],
  resolve: {
    extensions: [".jsx", ".js", ".json", ".pcss", ".postcss", ".css"],
    alias: {
      'react': 'preact-compat',
      'react-dom': 'preact-compat',
    }
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  stats: {
    children: false
  },
  optimization: {
    minimize: false
  }
};
