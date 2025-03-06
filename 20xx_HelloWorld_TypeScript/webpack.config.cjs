const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {


    target: ['web', 'es7'],
    devtool: 'source-map',
    mode: 'development',

    entry: './typescript/experiment_configuration.ts',

    optimization: {
        splitChunks: {
            chunks: 'all',
        },
        removeAvailableModules: false,
        removeEmptyChunks: false,
        concatenateModules: false,
    },
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
        filename: './experiment_configuration.js',
        path: path.resolve(__dirname, '.'),
    },
};