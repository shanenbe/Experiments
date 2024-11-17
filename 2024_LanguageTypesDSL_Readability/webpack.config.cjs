const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MathJax = require("mathjax-full")

module.exports = {


    externals: {
        MathJax: 'MathJax'
    },

    target: ['web', 'es7'],
    devtool: 'source-map',
    mode: 'development',

    entry: './2024_LanguageTypesDSL_Readability/typescript/experiment_configuration.ts',

    optimization: {
        splitChunks: {
            chunks: 'all',
        },
        // minimize: true,
        // minimizer: [
        //     new TerserPlugin({
        //         terserOptions: {
        //             compress: false, // Disable code compression
        //             mangle: false, // Minify variable names (set to false if not desired)
        //             format: {
        //                 comments: true, // Remove comments
        //             },
        //         },
        //         extractComments: false, // Disable extracting comments to separate files
        //     }),
        // ],
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
        filename: './experiment.js',
        path: path.resolve(__dirname, '.'),
    },

};