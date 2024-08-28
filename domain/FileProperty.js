/**
 * Created by jarvis on 2017. 9. 14..
 */
const SOURCE_DIR = "arahan-file-scaffold";
var util  = require('../util');

const path = require('path');


/**
 * 속성은 domain :: -d 옵션으로 받은 domain Name
 */
class FileProperty{

    constructor(obj, domainName, basicpath, lowercase, packageprefix){
        let current_path  = process.cwd();

        this.name = '';
        this.dest = '';
        this.source = '';
        this.prop = '';
        this.ext = '';

        this.lowercase = lowercase;
        this.domainName4File = (!lowercase) ? util.capitalizeFirstLetter(domainName) : domainName;
        this.packageprefix = packageprefix;


        // 기존의 파일속성들을 이곳에 복사처리 함.
        for (var p in obj){
            if(p=="dest" || p=="name"){
                this[p] = obj[p].replaceAll("{{domain}}", domainName);
            }else{
                this[p] = obj[p];
            }
        }

        // 파일 위치들 세팅
        this.file_basic_path = util.concatDirectoryStr(current_path, basicpath)
        this.source_path = util.concatDirectoryStr(current_path, SOURCE_DIR);
    }



    // {{ }} template
    setKeyValueProperties(array){
        array.push({
            "key" : "{{"+ this.prop +"_package}}",
            "value" : util.getPackageNameByPath(this.destDir(), this.packageprefix) + "."+ this.resolveFileName()
        });
        array.push({
            "key" : "{{"+ this.prop +"_name}}",
            "value" : this.resolveFileName()
        });
    }

    resolveFileName(){
        return this.domainName4File + this.name;
    }

    resolveFileNameWithExt(){
        return this.resolveFileName() + "." + this.ext ? this.ext : util.getExtension(this.source);
    }

    // source file path
    sourceFilePath(){
        return util.concatDirectoryStr(this.source_path, this.source);
    }

    // destination file path
    destFilePath(){
        var dest = this.lowercase ? this.dest.toLowerCase() : this.dest;
        var resolveFileNameWithExt = this.lowercase ? this.resolveFileNameWithExt().toLowerCase() : this.resolveFileNameWithExt();
        return util.concatDirectoryStr(this.file_basic_path, dest, resolveFileNameWithExt);
    }

    // destination directory path
    destDir(){
        var destFilePath = this.destFilePath();
        return path.dirname(destFilePath);
    }



};

exports.FileProperty = FileProperty;
