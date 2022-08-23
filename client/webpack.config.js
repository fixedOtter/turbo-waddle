const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { GenerateSW, InjectManifest } = require('workbox-webpack-plugin');
const path = require('path');
const is_prod = process.env.NODE_ENV === 'production';
// const is_prod = true;

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

const plugins = [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.join(__dirname, 'src/index.html'),
    inject: 'body'
  }),
  new MiniCssExtractPlugin({
    filename: is_prod ? 'style.[contenthash].css' : 'style.css' // if its on production, create a css stylesheet with hash, otherwise, just make a stylesheet
  })
];

if (is_prod) plugins.push(...[
  new GenerateSW(),
  new InjectManifest({
    swSrc: path.resolve('src/js/src-sw.js')
  }),
  new WebpackPwaManifest({
    name: 'Turbo Waddle Text Editor',
    short_name: 'turbowaddle',
    description: 'Incredible Text Editor',
    background_color: '#F78DA7',
    start_url: './',
    publicPath: './',
    inject: true,
    theme_color: '#F78DA7',
    fingerprints: false, // prevents creating the image hash thing
    icons: [
      {
        src: path.resolve('src/images/penguin-logo.jpg'), // FIXME
        destination: path.join('assets/icons'),
        sizes: [96, 128, 192, 256, 384, 512], // multiple sizes,
        ios: true
      },
    ]
  })
]);

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: plugins,

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'] // this is pulling in the minicss plugin to generate our css
        },
        {
          test: /\.(png|svg|jpe?g|gif|ico)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ],
    },
  };
};
