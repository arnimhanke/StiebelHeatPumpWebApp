// const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const babelLoaderOptions = {
  presets: [
  'babel-preset-es2015',
  'babel-preset-stage-2',
  'babel-preset-react',
  ],
};

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    app: './index.js',
  },
  // devtool: 'nosources.source-map', // see: http://webpack.github.io/docs/configuration.html#devtool
  devtool: 'eval',
  module: {
    rules: [
       {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        // https://blog.johnnyreilly.com/2015/12/es6-typescript-babel-react-flux-karma.html
        // loader: 'babel-loader?presets[]=es2015&presets[]=react!ts-loader',
        loader: [
          {
            loader: 'babel-loader',
            options: babelLoaderOptions,
          },
          'ts-loader',
          {
            loader: 'tslint-loader',
            options: {
              configFile: path.resolve(__dirname, './tslint.json'),
              failOnHint: false,
              fix: true,
            },
          },
        ],
      },
      {
        test: [/\.js$/, /\.jsx$/],
        exclude: /node_modules/,
        loader: [
          {
            loader: 'babel-loader',
            options: babelLoaderOptions,
          },
          {
            loader: 'eslint-loader',
            options: {
               configFile: path.resolve(__dirname, './.eslintrc'),
               sourceType: 'module',
               fix: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        loader: [
          'style-loader',
          'css-loader',
        ],
      },
      // Image file config. Generate hashed file names to make them easy to cache.
      {
        test: /\.(png|gif|jpe?g|svg)$/i,
        loader: 'file-loader?img/[name].[ext]',
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=100000&mimetype=application/font-woff',
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=100000&mimetype=application/octet-stream',
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
      },
    ],
  },
  output: {
    path: __dirname + '/public',
    filename: 'frontend.js',
    sourceMapFilename: 'frontend.bundle.map',
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.es6', '.d.ts', '.ts', '.tsx'],
    modules: [
      path.resolve(__dirname, './src'),
      path.resolve(__dirname, './node_modules')],
  },
};
