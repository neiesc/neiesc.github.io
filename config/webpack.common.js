const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')

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
}

const title = 'Edinei Cavalcanti'

const HtmlWebpackPluginConfigIndex = new HtmlWebpackPlugin({
  template: path.join(__dirname, '../src/index.ejs'),
  filename: 'index.html',
  minify: minifyOptions,
  title,
  keywords: `neiesc,Edinei,developer,desenvolvedor,programador,programmer,
  dotnet,dotnetcore,csharp,nodejs,python`,
  description: `Olá sou Edinei aka neiesc.
  Começei profissionalmente em 2010 minha carreira, sólido conhecimente em TI,
  mais especificamente em desenvolvimento de software em C#, .NET, .NET Core, Node.js e Python
  com experiência em grandes aplicações.`,
  author: 'Edinei aka neiesc',
  menu: 'home'
})

const HtmlWebpackPluginConfigBlog = new HtmlWebpackPlugin({
  template: path.join(__dirname, '../src/blog/index.ejs'),
  filename: 'blog/index.html',
  minify: minifyOptions,
  title: `Blog - ${title}`,
  keywords: 'blog',
  description: 'Blog.',
  author: 'Edinei aka neiesc',
  menu: 'blog'
})

const HtmlWebpackPluginConfigLive = new HtmlWebpackPlugin({
  template: path.join(__dirname, '../src/live/index.ejs'),
  filename: 'live/index.html',
  minify: minifyOptions,
  title: `Live - ${title}`,
  keywords: 'live,twitch',
  description:
    'Lista das proximas live.',
  author: 'Edinei aka neiesc',
  menu: 'live'
})

const HtmlWebpackPluginConfigPalestras = new HtmlWebpackPlugin({
  template: path.join(__dirname, '../src/palestras/index.ejs'),
  filename: 'palestras/index.html',
  minify: minifyOptions,
  title: `Palestras - ${title}`,
  keywords: 'palestras,eventos,workshop',
  description:
    'Lista das palestras (Palestra, Eventos ou Workshop) que palestrei.',
  author: 'Edinei aka neiesc',
  menu: 'palestra'
})

const HtmlWebpackPluginConfigPodcasts = new HtmlWebpackPlugin({
  template: path.join(__dirname, '../src/podcasts/index.ejs'),
  filename: 'podcasts/index.html',
  minify: minifyOptions,
  title: `Podcasts - ${title}`,
  keywords: 'podcasts,podcast',
  description: 'Lista dos podcasts que eu constumo escutar.',
  author: 'Edinei aka neiesc',
  menu: 'podcast'
})

const HtmlWebpackPluginConfigProjects = new HtmlWebpackPlugin({
  template: path.join(__dirname, '../src/projects/index.ejs'),
  filename: 'projects/index.html',
  minify: minifyOptions,
  title: `Projects - ${title}`,
  keywords: 'projects,opensource,codigolivre',
  description: 'Lista dos projetos.',
  author: 'Edinei aka neiesc',
  menu: 'project'
})


const HtmlWebpackPluginConfigRecommends = new HtmlWebpackPlugin({
  template: path.join(__dirname, '../src/recommends/index.ejs'),
  filename: 'recommends/index.html',
  minify: minifyOptions,
  title: `Recomendações - ${title}`,
  keywords: 'recommends,recomendações,opensource,codigolivre',
  description: 'Recomendações.',
  author: 'Edinei aka neiesc',
  menu: 'recommends'
})

const HtmlWebpackPluginConfigYoutube = new HtmlWebpackPlugin({
  template: path.join(__dirname, '../src/youtube/index.ejs'),
  filename: 'youtube/index.html',
  minify: minifyOptions,
  title: `Youtube - ${title}`,
  keywords: 'youtube,videos,programming,programação,software',
  description: 'Meu canal no youtube.',
  author: 'Edinei aka neiesc',
  menu: 'youtube'
})

module.exports = {
  entry: ['babel-polyfill', path.join(__dirname, '../src/assets/js/app.js')],
  output: {
    publicPath: '/'
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  module: {
    rules: [
      {
        test: /\.ejs$/,
        use: {
          loader: 'ejs-compiled-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          {
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
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    HtmlWebpackPluginConfigIndex,
    HtmlWebpackPluginConfigBlog,
    HtmlWebpackPluginConfigLive,
    HtmlWebpackPluginConfigPalestras,
    HtmlWebpackPluginConfigPodcasts,
    HtmlWebpackPluginConfigProjects,
    HtmlWebpackPluginConfigRecommends,
    HtmlWebpackPluginConfigYoutube,
    new CopyWebpackPlugin({
      patterns: [
        { from: path.join(__dirname, '../src/CNAME') },
        { from: path.join(__dirname, '../src/config/particles.json') },
        { from: path.join(__dirname, '../src/data/podcasts.json') },
        { from: path.join(__dirname, '../src/data/projects.json') },
        { from: path.join(__dirname, '../src/android-chrome-192x192.png') },
        { from: path.join(__dirname, '../src/android-chrome-384x384.png') },
        { from: path.join(__dirname, '../src/android-chrome-512x512.png') },
        { from: path.join(__dirname, '../src/apple-touch-icon.png') },
        { from: path.join(__dirname, '../src/browserconfig.xml') },
        { from: path.join(__dirname, '../src/favicon-16x16.png') },
        { from: path.join(__dirname, '../src/favicon-32x32.png') },
        { from: path.join(__dirname, '../src/mstile-150x150.png') },
        { from: path.join(__dirname, '../src/safari-pinned-tab.svg') },
        { from: path.join(__dirname, '../src/site.webmanifest') },
        { from: path.join(__dirname, '../src/sitemap.xml') },
        { from: path.join(__dirname, '../src/assets/img/chris.jpg') },
        { from: path.join(__dirname, '../src/assets/img/wilson.jpg') },
        { from: path.join(__dirname, '../src/assets/img/diogo.jpg') }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async'
    })
  ]
}
