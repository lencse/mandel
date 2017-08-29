#!/usr/bin/env node

import { compile }  from 'handlebars';
import * as commandLineArgs from 'command-line-args';
import * as fs from 'fs';
import * as path from 'path';
import dirs from './dirs';

const options = commandLineArgs([{
    name: 'watch',
    alias: 'w',
    type: Boolean,
    defaultValue: false
}]);

const template = fs.readFileSync(path.resolve(dirs.projectRoot, dirs.views ,'index.hbs')).toString()
const targetDir = options.watch ? dirs.dist.watch : dirs.dist.prod

const content = compile(template)({
    watch: options.watch
})

fs.writeFileSync(path.resolve(targetDir, 'index.html'), content)

