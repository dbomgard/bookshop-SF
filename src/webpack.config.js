var path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { Template } = require('webpack');

module.exports = {
    entry: path.resolve(__dirname, './index.js'),
    output: {
        path: path.resolve(__dirname, 'output'),
        filename: 'main.js'

    },
    mode: "production",
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
          template: "./index.pug",
          filename: "index.html"
        })
    ],
    module: {
        rules: [
          { test: /\.scss$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
          },
          {
            test: /\.pug$/,
            use: 'pug-loader'
          }
        ],
    },
    optimization: {
        minimizer: [
          '...',
          new CssMinimizerPlugin(),
        ],
    },
}