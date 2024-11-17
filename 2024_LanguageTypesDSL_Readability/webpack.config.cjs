const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './2024_LanguageTypesDSL_Readability/typescript/experiment_configuration.ts',
    output: {
        // path:'./',
        path: path.resolve(__dirname, './'),
        filename: 'experiment.js',
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

    externals: {
        MathJax: 'MathJax'
    },

};