import * as path from 'path'
import * as LiveReloadPlugin from 'webpack-livereload-plugin'
import * as commandLineArgs from 'command-line-args'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as ExtractTextWebpackPlugin from 'extract-text-webpack-plugin'
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
    plugins: options.watch ? [new LiveReloadPlugin()] : []
}

module.exports =  {
    entry: [`./${dirs.build}/js/main.js`,`./${dirs.build}/css/main.css` ],
    output: {
        path: path.resolve(dirs.projectRoot, config.target),
        filename: 'js/[name].[hash].js'
    },
    module: {
        // rules: [
        //     {
        //         test: /\.css$/,
        //         use: 'file-loader'
        //     }
        // ]
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
                // loader: ['style-loader', 'css-loader']
            }
        ]
        // loaders: [
        //     {
        //         test: /\.css$/,
        //         loader: 'file-loader',
        //         options: {
        //             name: '[path][name].[ext]'
        //         }
        //     }
        // ]
    },
    plugins: config.plugins.concat([
        new HtmlWebpackPlugin({
            template: 'build/html/index.ejs',
            filename: 'index.html',
            inject: 'body'
        })
        ,
        new ExtractTextWebpackPlugin('css/[name].[contentHash].css') 
    ])
}
