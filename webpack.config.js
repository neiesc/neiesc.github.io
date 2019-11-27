var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const minifyOptions = {
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
};

const HtmlWebpackPluginConfigIndex = new HtmlWebpackPlugin({
  template: path.join(__dirname, 'src/index.html'),
  filename: 'index.html',
  minify: minifyOptions
});

const HtmlWebpackPluginConfigPodcasts = new HtmlWebpackPlugin({
  template: path.join(__dirname, 'src/podcasts/index.html'),
  filename: 'podcasts/index.html',
  minify: minifyOptions
});

module.exports = {
  entry: ['babel-polyfill', './src/assets/js/app.js'],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
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
    },
    {
      test: /\.js$/,
      enforce: 'pre',
      exclude: /(node_modules|public|scripts)/,
      use: [
        'babel-loader'
      ]
    }]
  },
  plugins: [
    HtmlWebpackPluginConfigIndex,
    HtmlWebpackPluginConfigPodcasts,
    new CopyWebpackPlugin([
      { from: path.join(__dirname, '.gitignore') },
      { from: path.join(__dirname, 'CNAME') },
      { from: path.join(__dirname, 'src/assets/js/particles.json') },
      { from: path.join(__dirname, 'src/assets/js/podcasts.json') },
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
};
