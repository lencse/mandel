import * as path from 'path'
import * as LiveReloadPlugin from 'webpack-livereload-plugin'
import * as commandLineArgs from 'command-line-args'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as ExtractTextWebpackPlugin from 'extract-text-webpack-plugin'
import dirs from './dirs'

interface Config {
    plugins: Array<any>
    fileNames: {
        js: string,
        css: string
    }
}

interface Configs {
    dev: Config,
    watch: Config
}

const options = commandLineArgs([{
    name: 'watch',
    alias: 'w',
    type: Boolean,
    defaultValue: false
}], {partial: true})

const mode = options.watch ? 'watch' : 'dev'

const config: Configs = {
    dev: {
        plugins: [],
        fileNames: {
            js: '[name].js',
            css: '[name].css'
        }
    },
    watch: {
        plugins: [new LiveReloadPlugin()],
        fileNames: {
            js: '[name].js',
            css: '[name].css'            
        }
    }
}

const effective = config[mode]

module.exports =  {
    entry: [`./${dirs.build.js}/main.js`,`./${dirs.build.css}/main.css` ],
    output: {
        path: path.resolve(dirs.projectRoot, dirs.dist),
        filename: `js/${effective.fileNames.js}`
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            }
        ]
    },
    plugins: effective.plugins.concat([
        new HtmlWebpackPlugin({
            template: `${dirs.build.html}/index.ejs`,
            filename: 'index.html',
            inject: 'body'
        }),
        new ExtractTextWebpackPlugin(`css/${effective.fileNames.css}`) 
    ])
}
