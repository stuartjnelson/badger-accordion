const path = require('path');
const webpack = require('webpack');
module.exports = {
    context: path.resolve(__dirname, './lib'),
    entry: {
        app: './badger-accordion.js',
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'badger-accordion.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                        plugins: [
                            'transform-object-assign',
                            'syntax-dynamic-import'
                        ]
                    }
                }
            }
        ]
    }
};
