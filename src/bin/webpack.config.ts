import * as path from 'path';
import * as LiveReloadPlugin from 'webpack-livereload-plugin';
import * as commandLineArgs from 'command-line-args';
import dirs from './dirs';

const options = commandLineArgs([{
    name: 'watch',
    alias: 'w',
    type: Boolean,
    defaultValue: false
}], {partial: true});

const config = {
    target: options.watch ? dirs.dist.watch : dirs.dist.prod,
    plugins: options.watch ? [new LiveReloadPlugin()] : []
};

module.exports =  {
    entry: [`./${dirs.build.js}/main.js`],

    output: {
        path: path.resolve(dirs.projectRoot, config.target, 'js'),
        filename: 'main.js'
    },

    plugins: config.plugins

};
