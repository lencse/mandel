import * as path from 'path'

const dirs = {
    projectRoot: path.resolve(__dirname, '../..'),
    views: 'views',
    build: {
        js: 'build/js',
        html: 'build/html'
    },
    dist: {
        prod: 'dist',
        watch: 'dist.watch'
    }
}

export default dirs
