const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    externals: {
        MathJax: 'MathJax'
    },
    target: ['web', 'es7'],
    resolve: {
        fallback: {
            "crypto": false ,
        },
        extensions: ['.ts', '.js'],
    },
    devtool: 'source-map',
    mode: 'development',
    entry: './typescript/experiment_configuration.ts',

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        configFile: 'tsconfig.json',
                    },
                },
                exclude: /node_modules/,
            },
        ],
    },
    output: {
        filename: './experiment.js',
        path: path.resolve(__dirname, '.'),
    },
};
