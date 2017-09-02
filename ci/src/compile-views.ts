#!/usr/bin/env node

import { compile } from 'handlebars'
import * as commandLineArgs from 'command-line-args'
import * as fs from 'fs'
import * as path from 'path'
import * as colors from 'colors/safe'
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
        const content = compile(template)({})
        
        const targetDir = path.resolve(dirs.projectRoot, dirs.build.html)
        
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir)
        }

        const targetFile = path.resolve(targetDir, 'index.ejs')
        const targetFileDisplay = path.relative(dirs.projectRoot, targetFile)
        const sourceFileDisplay = path.relative(dirs.projectRoot, this.sourceFile)

        console.log(`${colors.bold(sourceFileDisplay)} -> ${colors.green(targetFileDisplay)}`)
        
        fs.writeFileSync(targetFile, content)
    }

    public watch() {
        fs.watch(this.sourceFile, (eventType, filename) => {
            console.log(`${colors.bold(path.relative(dirs.projectRoot, filename))} changed`)
            this.compile()
        })
    }

}

let compiler = new Compiler()

compiler.compile()

if (options.watch) {
    compiler.watch()
}

process.on('SIGINT', () => {
    process.exit()
})
