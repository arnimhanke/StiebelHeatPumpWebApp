// const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require("terser-webpack-plugin");

module.exports =
  (env, argv) => {
    const envKeys = Object.keys(env).reduce((prev, next) => {
      prev[`process.env.${next}`] = JSON.stringify(env[next]);
      return prev;
    }, {});
    console.log(envKeys);
    return {
      //context: path.resolve(__dirname, './src'),
      entry: './src/index.js',
      // devtool: 'nosources.source-map', // see: http://webpack.github.io/docs/configuration.html#devtool
      devtool: 'eval',
      module: {
        rules: [
          {
            test: /\.ts(x?)$/,
            exclude: /node_modules/,
            // https://blog.johnnyreilly.com/2015/12/es6-typescript-babel-react-flux-karma.html
            // loader: 'babel-loader?presets[]=es2015&presets[]=react!ts-loader',
            loader: 'ts-loader',
          },
          {
            test: [/\.js$/, /\.jsx$/],
            exclude: [/node_modules/],
            loader: 'babel-loader'
          },
          {
            test: /\.css$/,
            // loader: [
            use: [
              "style-loader",
              "css-loader",
            ]
            // 'style-loader',
            // 'css-loader',
            // ],
          },
          // Image file config. Generate hashed file names to make them easy to cache.
          {
            test: /\.(png|gif|jpe?g|svg)$/i,
            loader: 'file-loader',
          },
          {
            test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader',
          },
          {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader',
          },
          {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file-loader',
          },
        ],
      },
      // optimization: {
      //   usedExports: true,
      //   minimize: true,
      //   minimizer: [
      //       new TerserPlugin()
      //   ]
      // },
      output: {
        path: path.resolve(__dirname, "build"),
        publicPath: (process.env.REACT_APP_ROUTER_BASE || "") + "/"
      },
      plugins: [
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
        }),
        new webpack.DefinePlugin(envKeys)
      ],
      resolve: {
        extensions: [".js", ".jsx", ".es6", ".d.ts", ".ts", ".tsx"],
        modules: [
          path.resolve(__dirname, "./src"),
          path.resolve(__dirname, "./node_modules")
        ],
      },
      target: ["web", "es5"],
      mode: "development",
      devServer: {
        hot: true,
        contentBase: path.join(__dirname, "build"),
        historyApiFallback: true,
        port: 3001,
        proxy: {
          "/emu-backend": {
            target: "http://localhost:8080",
            secure: false,
          },
        }
      },
    };
  }
