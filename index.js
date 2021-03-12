#!/usr/bin/env node
console.log("Starting language definition...")
const yaml = require('js-yaml');
const fs = require('fs');
const yargs = require('yargs')

const options = yargs
    .usage("Usage: language-component-definer --of <outputFiles> --ftg <filesToGroup>")
    .option("of", {
        alias: "outputFiles",
        describe: "Output file to write your results to",
        type: "string",
        demandOption: true
    })
    .option("ftg", {
        alias: "filesToGroup",
        describe: "A file containing all files the plugin should group into components (one file per line)",
        type: "string",
        demandOption: true
    })
    .argv;

class Component {
    constructor(language, files) {
        this.fullyQualifiedName = language
        this.files = files
    }
}

let languages = {}
try {
    languages = yaml.load(fs.readFileSync('languages.yml', 'utf8'));
} catch (e) {
    console.log(e);
}

const filesToGroup = options.ftg

const allFiles = fs.readFileSync(filesToGroup, {encoding: 'UTF-8'}).toString().split("\n").filter(file => file.length !== 0)

const defaultComponent = new Component("@", [])
const components = [defaultComponent]

allFiles.forEach(file_path => {
    let idx = file_path.lastIndexOf(".")
    if(idx === 0){
        return
    }
    let extension = file_path.substring(idx)
    
    for(let [language, properties] of Object.entries(languages)){
        language = language.split(" ")
        language = language.join("-")
        language = language.split("+")
        language = language.join("-")
        if('extensions' in properties) {
            if(properties.extensions.includes(extension)){
                const component = components.find(c => language == c.fullyQualifiedName)
                if (component){
                    component.files.push(file_path)
                    return
                }
                else {
                    components.push(new Component(language, [file_path]))
                    return
                }   
            }       
        }  
    }
    defaultComponent.files.push(file_path)
})
fs.writeFileSync(options.of, JSON.stringify(components))