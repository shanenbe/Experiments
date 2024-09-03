const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './Loader.js',
    output: {
        // path:'./',
        path: path.resolve(__dirname, './'),
        filename: './PACKED_CODE.js',
    }
};