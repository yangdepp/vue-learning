const path = require('path')

const isDev = process.env.NODE_ENV === 'development'
const HTMLPlugin = require('html-webpack-plugin')
const ExtractPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const baseConfig = require('./webpack.config.base')
const merge = require('webpack-merge')

let config
const devServer = {
  port: "8000",
  host: "0.0.0.0",
  overlay: {
    errors: true,
  },
  hot: true
};

const defaultPluins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new HTMLPlugin(),
]


if (isDev) {
  config = merge(baseConfig, {
    devtool: '#cheap-moudle-eval-source-map',
    module: {
      rules: [
        {
          test: /\.styl/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
              }
            },
            'stylus-loader'
          ]
        }
      ]
    },
    devServer,
    plugins: defaultPluins.concat([
      new webpack.HotModuleReplacementPlugin()
      // new webpack.NoEmitOnErrorsPlugin()
    ])
  })

} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/index.js')
      // vendor: ['vue']
    },
    output: {
      filename: '[name].[chunkhash:8].js',
    },
    module: {
      rules: [
        {
          test: /\.styl/,
          use: ExtractPlugin.extract({
            fallback: 'vue-style-loader',
            use: [
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              'stylus-loader'
            ]
          })
        }
      ]
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      },
      runtimeChunk: true,
    },
    plugins: defaultPluins.concat([
      new ExtractPlugin('styles.[contentHash:8].css')
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'vendor'
      // }),
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'runtime'
      // }),
    ])
  })
}



module.exports = config
