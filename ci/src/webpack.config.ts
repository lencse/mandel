import * as path from 'path'
import * as LiveReloadPlugin from 'webpack-livereload-plugin'
import * as commandLineArgs from 'command-line-args'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import dirs from './dirs'

const options = commandLineArgs([{
    name: 'watch',
    alias: 'w',
    type: Boolean,
    defaultValue: false
}], {partial: true})

const distDir = options.watch ? dirs.dist.watch : dirs.dist.prod

const config = {
    target: distDir,
    plugins: options.watch ? [new LiveReloadPlugin()] : [
        new HtmlWebpackPlugin({
            template: 'build/html/index.ejs',
            filename: 'index.html',
            inject: 'body'
        })
    ]
}

module.exports =  {
    entry: [`./${dirs.build}/js/main.js`],
    output: {
        path: path.resolve(dirs.projectRoot, config.target),
        filename: 'js/main.js'
    },
    plugins: config.plugins
}
