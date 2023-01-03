const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'clients'),
    filename: '[name].js',
    publicPath: 'auto',
  },
  experiments: {
    outputModule: true,
  },
  mode: 'development',
  devtool: 'inline-source-map',
  optimization: {
    runtimeChunk: 'single',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
      {
        test: /\.css$/,
        loader: 'css-loader',
      },
      {
        test: /\.(png|jpg|gif|mp4|ogg|svg|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './assets/images/',
            },
          },
        ],
      },
    ],
  },
  resolve: { extensions: ['*', '.js', '.jsx', '.ts', '.tsx'] },
  devServer: {
    allowedHosts: 'all',
    static: {
      directory: './src/',
    },
    port: process.env.DEV_SERVER_PORT || 3000,
    devMiddleware: {
      publicPath: '/assets/',
    },
    historyApiFallback: true,
    hot: 'only',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve('src/assets'), to: path.resolve('clients/assets') },
        {
          from: path.resolve('src/css'),
          to: path.resolve('clients/css'),
        },
      ],
    }),
  ],
};
