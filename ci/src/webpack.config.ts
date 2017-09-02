import * as path from 'path'
import * as LiveReloadPlugin from 'webpack-livereload-plugin'
import * as commandLineArgs from 'command-line-args'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as ExtractTextWebpackPlugin from 'extract-text-webpack-plugin'
import * as UglifyjsWebpackPlugin from 'uglifyjs-webpack-plugin'
import dirs from './dirs'

interface Config {
    plugins: Array<any>
    fileNames: {
        js: string,
        css: string
    },
    loaders: Array<any>
}

interface Configs {
    dev: Config,
    watch: Config
    prod: Config
}

const options = commandLineArgs([{
    name: 'watch',
    alias: 'w',
    type: Boolean,
    defaultValue: false
}], {partial: true})

const mode = options.watch
    ? 'watch'
    : process.env.NODE_ENV === 'production'
        ? 'prod'
        : 'dev'

const config: Configs = {
    dev: {
        plugins: [],
        fileNames: {
            js: '[name].js',
            css: '[name].css'
        },
        loaders: []
    },
    prod: {
        plugins: [
            new UglifyjsWebpackPlugin()
        ],
        fileNames: {
            js: '[name].[hash].js',
            css: '[name].[contentHash].css'
        },
        loaders: []
    },
    watch: {
        plugins: [new LiveReloadPlugin()],
        fileNames: {
            js: '[name].js',
            css: '[name].css'            
        },
        loaders: []
    }
}

const effective = config[mode]

module.exports =  {
    entry: [`./${dirs.build.js}/main.js`,`./${dirs.styles}/main.scss` ],
    output: {
        path: path.resolve(dirs.projectRoot, dirs.dist),
        filename: `js/${effective.fileNames.js}`
    },
    module: {
        loaders: effective.loaders.concat([
            {
                test: /\.scss$/,
                loader: ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!sass-loader'
                })
            }, {
                test: /\.js$/,
                exclude: /node_modules/, 
                loader: 'babel-loader'
            }

        ])
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
