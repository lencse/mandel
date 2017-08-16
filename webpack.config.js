var path = require('path');
var LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
    entry: ['./compile/main.js'],

    output: {
        path: path.resolve(__dirname, 'build/js'),
        filename: 'main.js'
    },

    plugins: [
        new LiveReloadPlugin()
    ]

};