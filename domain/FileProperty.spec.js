/**
 * Created by jarvis on 2017. 9. 14..
 */


var assert  = require('assert')
var FileProperty  = require('./FileProperty');

describe('FileProperty.js 테스트', () => {


    it(' object assign test  ', ()=>{
        var jsonobj = {"name":"", "dest":"/domain", "source" :"Domain.java" , "prop":"domain"};
        var assigned = new FileProperty.FileProperty(jsonobj, "basicpath", "pack", "lowercase");
        console.log("assigned :", assigned);

        console.log("packageprefix: ", assigned.packageprefix)
    });


});