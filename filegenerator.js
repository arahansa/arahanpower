#!/usr/bin/env node

var fs = require('fs');
var util  = require('./util');
const SOURCE_DIR = "arahan-file-scaffold";
const path = require('path');
const FileProperty = require("./domain/FileProperty");

// http://lmws.net/making-directory-along-with-missing-parents-in-node-js
fs.mkdirParent = (dirPath, mode, callback) => {
    //Call the standard fs.mkdir
    fs.mkdir(dirPath, mode, (error)=>{
        //When it fail in this way, do the custom steps
        if (error && (error.errno === 34 || error.errno === -2)) {
            //Create all the parents recursively
            fs.mkdirParent(path.dirname(dirPath), mode, callback);
            //And then the directory
            fs.mkdirParent(dirPath, mode, callback);
        }
        //Manually run the callback since we used our own callback to do all these
        callback && callback(error);
    });
};

exports.analysisProp = (domainName, prop) => {

    var filePropList = []
    var replaceProperties = []; // global share in a loop

    // remove strings replacement
    if(prop.removestrings){
        for(var s of prop.removestrings){
            replaceProperties.push({"key":s,"value":""});
        }
    }

    // convert file json => file Object
    for(var f of prop.files){

        var fileProperty = new FileProperty.FileProperty(f, domainName,  prop.basicpath, prop.lowercase, prop.packageprefix);
        filePropList.push(fileProperty);

        if(prop.packageprefix && f.prop){
            fileProperty.setKeyValueProperties(replaceProperties);
        }
    }

    // iterate file List & copy file ( source -> dest )
    for(var f of filePropList){

        // replace variables copied..
        var replacePropertiesCopied = replaceProperties.slice();

        // add current package variable
        if(prop.packageprefix){
            replacePropertiesCopied.push({
                "key":"{{package}}",
                "value":util.getPackageNameByPath(f.destDir(), prop.packageprefix)+";"
            });
        }

        // copy
        exports.copySource2Dest(
            f.sourceFilePath(),
            f.destFilePath(),
            replacePropertiesCopied
        )
    }
};




exports.copySource2Dest = (sourcePath, destPath, replaceProperties)=> {
    console.log("copying.. from : "+sourcePath);
    console.log("to :"+destPath);

    var destDir = path.dirname(destPath);


    var writeFile = (destPath, result) => {
        fs.writeFile(destPath, result, 'utf8', (err) => {
            if (err) {
                console.log("write file err... dir path : ", destPath );
                return;
            }
        });
    };

    fs.readFile(sourcePath, 'utf8', (err,data) => {
        if (err) {
            console.log("Input file not found :: ", sourcePath);
            return ;
        }

        var result = data;
        for(var item of replaceProperties){
            result = result.replace(item.key, item.value);
        }

        fs.stat(destDir, (err)=> {
            if(err){
                console.log("creating directory : ", destDir);
                fs.mkdirParent(destDir+path.sep, '0755', ()=>{writeFile(destPath, result);});
            }else{
                writeFile(destPath, result);
            }
        });
    });

};




/*

참고할만한 URL

https://stackoverflow.com/questions/14177087/replace-a-string-in-a-file-with-nodejs
*/