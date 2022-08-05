'use strict'
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    mode: 'development',
    entry: [
      './src/app.js'
    ],
    output: {
        filename: 'main.js',
        path: path.resolve('./dist')
            },
            resolve: {
                    alias: {
                        'vue$': 'vue/dist/vue.esm-bundler.js'
                }
        },
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: 'vue-loader'
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin()
    ]
  }