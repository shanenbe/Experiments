const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './trial02/typescript/exp_trial02.ts',
    devtool: "inline-source-map",
    output: {
        path: path.resolve(__dirname, './'),
        filename: './experiment.js',
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
        fallback: { "crypto": false },
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader'
            },
        ],
    },

};