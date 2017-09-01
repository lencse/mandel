import * as path from 'path'

const dirs = {
    projectRoot: path.resolve(__dirname, '../..'),
    views: 'views',
    build: {
        css: 'build/css',
        html: 'build/html',
        js: 'build/js'
    },
    dist: 'dist'
}

export default dirs
