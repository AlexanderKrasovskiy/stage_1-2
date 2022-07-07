const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const dartSass = require('sass');

const isDev = process.env.NODE_ENV === 'dev';

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index'),
  output: {
    filename: isDev ? '[name].js' : '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    assetModuleFilename: 'assets/[name][ext][query]',
  },
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'eval-source-map' : false,
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      filename: 'index.html',
      favicon: './src/assets/favicon.ico',
    }),
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : '[name].[contenthash].css',
    }),
    new ESLintPlugin({
      extensions: ['.ts', '.js'],
      exclude: 'node_modules',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.[jt]s$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: dartSass,
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[name][ext][query]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext][query]',
        },
      },
    ],
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    open: true,
    client: {
      overlay: true,
      progress: true,
    },
  },
  stats: {
    errorDetails: true,
  },
};
