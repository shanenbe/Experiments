const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './typescript/experiment_configuration_.ts',
    devtool: "inline-source-map",
    output: {
        path: path.resolve(__dirname, './'),
        filename: './webpacked_experiment.js',
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