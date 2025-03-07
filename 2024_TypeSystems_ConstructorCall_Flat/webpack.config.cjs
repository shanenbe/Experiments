const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './___BUILD_CURRENT_EXPERIMENT/typescript/exp_trial02.ts',
    devtool: "inline-source-map",
    output: {
        // path:'./',
        path: path.resolve(__dirname, './'),
        filename: 'experiment_configuration.js',
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

    // plugins: [
    //     new HtmlWebpackPlugin({
    //         title: 'TestExperiment',
    //         filename: 'SQL_trial02_web.html',
    //         inject: true
    //     })
    // ]

};