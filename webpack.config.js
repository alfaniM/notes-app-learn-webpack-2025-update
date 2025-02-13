const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { watch } = require('fs');

module.exports = {
  entry: './src/index.js', // Entry point utama
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html', // Menggunakan template.html
    }),
    new MiniCssExtractPlugin(),
  ],
  watch: true,
  devtool: false,
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            targets: 'defaults',
            presets: [['@babel/preset-env']],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          'css-loader',
        ],
      },
      // {
      //   test: /\.html$/i,
      //   loader: 'html-loader',
      // },
      // {
      //   test: /\.(png|jpe?g|gif|svg)$/i,
      //   type: 'asset/resource',
      // },
    ],
  },
};
