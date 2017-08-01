const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


module.exports = {
    context: path.resolve(__dirname, './js'),
    entry: {
        app: './behaviour.js',
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'badger-accordion.js',
    },
    // plugins: [
    //     new UglifyJSPlugin({
    //         compress: false
    //     })
    // ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015'],
                        // npm install --save-dev babel-plugin-transform-es3-member-expression-literals
                        plugins: [
                            'transform-object-assign',
                            'syntax-dynamic-import',
                        ],
                    }
                }
            }
        ]
    }
};
