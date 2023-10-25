const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const resolve = require('./webpack.config.resolve');

const build = new Date().getTime();

module.exports = (env, argv) => {
  const devMode = argv.mode !== 'production';

  let pathEnv = '.env.development';

  if (argv.mode === 'production') {
    pathEnv = '.env.production';
  }

  return {
    mode: argv.mode,
    devtool: 'nosources-source-map',
    performance: {
      hints: false,
      maxEntrypointSize: 500000,
    },
    entry: {
      // All App source files will be compiled into main
      app: './src/DetailFix.tsx',

      // All vendor files will be compiled into vendor.
      vendor: ['@babel/polyfill', 'react', 'react-dom', 'react-router-dom'],
    },
    devServer: {
      port: 3003,
      compress: true,
      historyApiFallback: true,
      hot: true,
      open: false,
      client: {
        progress: false,
        reconnect: false,
      },
    },
    module: {
      rules: [
        {
          test: /\.(jsx|js|ts|tsx)?$/,
          exclude: /(node_modules)/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/react', '@babel/env'],
              },
            },
            {
              loader: 'ts-loader',
              options: {
                compilerOptions: {
                  noEmit: false,
                },
              },
            },
          ],
        },
        // Compile CSS files
        {
          test: /\.css$/,
          use: ['css-hot-loader', MiniCssExtractPlugin.loader, 'css-loader'],
        },

        // Compile SCSS files
        {
          test: /\.scss$/,
          use: [
            'css-hot-loader',
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
            },
            {
              loader: 'sass-loader',
            },
          ],
        },
        // Copy static assets over with file-loader
        {
          test: /\.(ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader',
          exclude: /node_modules/,
          options: {
            esModule: false,
            name: 'assets/fonts/[name].[ext]',
          },
        },
        {
          test: /\.(jpg|gif|png|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader',
          options: {
            name: 'assets/images/[name].[ext]',
          },
        },
      ],
    },
    resolve,
    plugins: [
      // Inject the required assets into the template index file
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/index.html',
      }),
      new Dotenv({
        path: `${__dirname}/${pathEnv}`,
        safe: true,
        systemvars: true,
        silent: true,
        defaults: false,
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: `${__dirname}/public`,
            force: true,
          },
        ],
      }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        filename: devMode
          ? 'assets/css/[name].css'
          : `assets/css/${build}.[name].[hash].css`,
        chunkFilename: devMode
          ? 'assets/css/[id].css'
          : `assets/css/${build}.[id].[hash].css`,
      }),
    ],
    optimization: {
      minimize: !devMode,
      minimizer: [
        new TerserPlugin({
          minify: TerserPlugin.uglifyJsMinify,
          parallel: true,
        }),
      ],
      splitChunks: {
        chunks: 'async',
        minSize: 20000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        enforceSizeThreshold: 50000,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
      runtimeChunk: true,
    },
    output: {
      path: `${__dirname}/build`,
      filename: devMode
        ? 'assets/js/[name].js'
        : `assets/js/${build}.[name].[hash].js`,
      chunkFilename: devMode
        ? 'assets/js/[name].js'
        : `assets/js/${build}.[name].[hash].js`,
      publicPath: '/',
    },
  };
};
