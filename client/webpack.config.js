const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const is_prod = process.env.NODE_ENV === 'production';

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

const plugins = [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.join(__dirname, 'index.html'),
    inject: 'body'
  }),
  new MiniCssExtractPlugin({
    filename: is_prod ? 'style.[contenthash].css' : 'style.css'
  })
];

if (is_prod) plugins.push(...[
  new GenerateSW(),
  new WebpackPwaManifest({
    name: 'Webpack Example',
    short_name: 'WPEx',
    description: 'Example on setting PWA workflow',
    background_color: '#555555',
    start_url: './',
    publicPath: './',
    inject: true,
    theme_color: '#555555',
    icons: [
      {
        src: path.resolve('src/images/blue-robot.png'),
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
        
      ],
    },
  };
};
