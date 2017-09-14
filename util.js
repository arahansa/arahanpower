/**
 * Created by jarvis on 2017. 9. 13..
 */
const path = require('path');

/**
 * 디렉터리 문자열 연결
 * @param before
 * @param after
 * @returns {*}
 */
exports.concatDirectoryStr = (before, ...after) => {
    var result = before;

    for (var a of after) {
        if(!result.endsWith(path.sep) && !a.startsWith(path.sep)){
            result += path.sep;
        }

        if(result.endsWith(path.sep) && a.startsWith(path.sep)){
            result += a.slice(1);
        }else{
            result += a;
        }
    }

    return result;
}

/**
 * 파일 확장자 얻기
 * @param filename
 * @returns {*}
 */
exports.getExtension = (filename) => {
    var ext = path.extname(filename||'').split('.');
    return ext[ext.length - 1];
}

exports.capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};


/**
 * 디렉터리 생성
 * 참고 URL
 * http://lmws.net/making-directory-along-with-missing-parents-in-node-js
 * path.dirname
 */


exports.replaceString = (data) => {
    var result = data;
    result = result.replace("{{package}}", 'replacement');
    return result;
}


String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

exports.getPackageNameByPath = (pathFile, packageprefix) => {
    var replacedPath = pathFile.replaceAll(path.sep, ".");
    replacedPath = replacedPath.substr(replacedPath.indexOf(packageprefix))

    if(replacedPath.endsWith(".")){
        replacedPath = replacedPath.substr(0, replacedPath.length-1);
    }
    return replacedPath;
}