#!/usr/bin/env node
console.log("arahan power coding..!");


// lib
var fileGenerator = require('./filegenerator');
var configFileReader = require('./configFileReader');


// domain check
var commander = require('commander');
commander
    .option('-d, --domain <domain>', 'The domain name')
    .option('-p, --profile <profile>', 'Other Profile')
    .parse(process.argv);

if(!commander.domain){
    console.log("plase type domain name ( ex : arahanpower -d domain-name");
    process.exit();
}

var profile = commander.profile ? commander.profile : 'default';
console.log("profile :", profile, ", domain  :" ,commander.domain);
console.log("------");

var configJson = configFileReader.readConfigFile();

for(var f of configJson[profile]){
    fileGenerator.analysisProp(commander.domain, f);
}



