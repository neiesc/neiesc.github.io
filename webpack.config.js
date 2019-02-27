var path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  entry: './src/assets/js/app.js',
  optimization: {
    minimizer: [
      /* new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }), */
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../'
        }
      },
      'css-loader'
      ]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
      filename: 'index.html',
      minify: {
        html5: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: false,
        removeAttributeQuotes: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeOptionalTags: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributese: true,
        useShortDoctype: true
      }
    }),
    new CopyWebpackPlugin([
      { from: path.join(__dirname, 'src/assets/js/particles.json') },
      { from: path.join(__dirname, '*.png') },
      { from: path.join(__dirname, 'browserconfig.xml') },
      { from: path.join(__dirname, 'favicon.ico') },
      { from: path.join(__dirname, 'safari-pinned-tab.svg') },
      { from: path.join(__dirname, 'site.webmanifest') }
    ]),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ]
}
