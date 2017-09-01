#!/usr/bin/env node

import { compile } from 'handlebars'
import * as commandLineArgs from 'command-line-args'
import * as fs from 'fs'
import * as path from 'path'
import dirs from './dirs'

const options = commandLineArgs([{
    name: 'watch',
    alias: 'w',
    type: Boolean,
    defaultValue: false
}])

class Compiler {

    private sourceFile = path.resolve(dirs.projectRoot, dirs.views ,'index.hbs')

    public compile() {
        const template = fs.readFileSync(this.sourceFile).toString()
        const content = compile(template)({
            watch: options.watch
        })
        
        const targetDir = path.resolve(dirs.projectRoot, dirs.build.html)
        
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir)
        }
        
        fs.writeFileSync(path.resolve(targetDir, 'index.ejs'), content)
    }

    public watch() {
        fs.watch(this.sourceFile, (eventType, filename) => {
            this.compile()
        })
    }

}

let compiler = new Compiler()

compiler.compile()

if (options.watch) {
    compiler.watch()
}
