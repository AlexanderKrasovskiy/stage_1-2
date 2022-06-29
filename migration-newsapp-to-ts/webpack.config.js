const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
//const CopyPlugin = require('copy-webpack-plugin');

const baseConfig = {
    entry: path.resolve(__dirname, 'src', 'index'),
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.[jt]s$/,
                use: 'ts-loader',
                include: [path.resolve(__dirname, 'src')],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
            filename: 'index.html',
        }),
        new ESLintPlugin({
            extensions: ['.ts', '.js'],
            exclude: 'node_modules',
        }),
        // new CopyPlugin({
        //     patterns: [{ from: './src/assets', to: '.dist/assets' }],
        // }),
    ],
    stats: {
        errorDetails: true,
    },
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

    return merge(baseConfig, envConfig);
};
