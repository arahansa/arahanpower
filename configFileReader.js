#!/usr/bin/env node


exports.readConfigFile = () => {
    var current_path = process.cwd();
    var configFileJson = require(current_path+'/arahan-file-scaffold.json');
    return configFileJson;
}