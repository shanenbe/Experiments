const path = require('path');

module.exports = {
    entry: './typescript/Indirection.ts',
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