import * as path from 'path'

const dirs = {
    projectRoot: path.resolve(__dirname, '../..'),
    views: 'views',
    styles: 'styles',
    build: {
        html: 'build/html',
        js: 'build/js'
    },
    dist: 'dist'
}

export default dirs
