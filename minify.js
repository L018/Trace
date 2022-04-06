/**
 * Copyright (c) 2022 L018. All rights reserved.
 * Licensed under MIT
 */


const path = require('path');
const fs = require('fs/promises');
const { minify } = require("terser");

let minifyOptions = {
    output: {
        path: path.resolve(__dirname, 'Trace-dist'),
    },
    dirIgnore:["\\.git", "\\.vscode", "\\dev", "\\readme-files"],
    ignore:[".md", ".pem", ".crx", ".gitignore", "minify.js", "babel.js"],
    skip: ['babel.min.js'],
    include: [".js"]
};

let terserOptions = {
    output: {
        ascii_only: true
    },
    compress: {
        defaults: false,
    },
    ecma: 2015,
};

function fileAction(pathname){
    for(let i of minifyOptions.ignore) {
        if (pathname.endsWith(i)) {
            return "ignore"
        }
    }
    for(let i of minifyOptions.skip) {
        if (pathname.endsWith(i)) {
            return "skip"
        }
    }
    for(let i of minifyOptions.include) {
        if (pathname.endsWith(i)) {
            return "include"
        }
    }
}

function dirAction(pathname){
    for(let i of minifyOptions.dirIgnore) {
        if (pathname.endsWith(i)) {
            return "ignore"
        }
    }
}

async function travel(dirPath, relative) {
    let files = await fs.readdir(dirPath);
    for (let file of files) {
        let pathname = path.join(dirPath,file);
        let stat = await fs.stat(pathname);
        if (stat.isDirectory()){
            if (pathname === minifyOptions.output.path){
                continue
            }
            if (dirAction(pathname)==="ignore") continue;
            await fs.mkdir(path.join(minifyOptions.output.path, relative, file));
            await travel(pathname, path.join(relative, file));
        } else {
            let action = fileAction(pathname);
            switch (action) {
                case "ignore":
                    break;
                case "include":
                    let code = (await fs.readFile(pathname, "utf8")) + "";
                    let result = await minify(code, terserOptions);
                    await fs.writeFile(path.join(minifyOptions.output.path, relative, file), result.code);
                    break;
                case "skip":
                default:
                    await fs.copyFile(pathname, path.join(minifyOptions.output.path, relative, file))
            }
        }
    }
}

(async ()=>{
    await fs.rm(minifyOptions.output.path, { recursive: true, force: true });
    await fs.mkdir(minifyOptions.output.path)
    await travel(path.resolve(__dirname), '.')
})().then().catch(e=>{console.log(e)})