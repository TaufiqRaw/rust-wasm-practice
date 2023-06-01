const webpack = require('webpack');
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = (env, args) => {
  const isProduction = (args.mode === 'production');

  return {
    mode: isProduction ? 'production' : 'development',
    entry : './index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? '[name].[contenthash].js' : '[name].[fullhash].js',
    },
    experiments: {
        syncWebAssembly: true
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
      }),
      new WasmPackPlugin({
        crateDirectory: path.resolve(__dirname, '.'),
      }),
      new webpack.ProvidePlugin({
        TextDecoder : ['text-encoding', 'TextDecoder'],
        TextEncoder : ['text-encoding', 'TextEncoder'],
      })
    ]
  }
}