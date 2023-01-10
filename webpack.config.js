const path = require('path')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  devServer: {
    open: {
      app: {
        name: 'chrome',
      },
    },
    static: './dist',
    port: 8000,
    devMiddleware: {
      writeToDisk: true,
    },
  },
  devtool: 'source-map',
  entry: {
    main: path.resolve(__dirname, "./src/index.ts")
  },
  module: {
    rules: [{
      test: /\.ts$/,
      use: 'ts-loader',
      include: [path.resolve(__dirname, 'src')]
    }]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    clean: {
      dry: true,
    },
    path: path.join(__dirname, 'dist/script'),
    publicPath: './dist/script',
    filename: 'index.js'
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
}