/**
 * Created by jarvis on 2017. 9. 13..
 */

var assert  = require('assert')
var util  = require('./util');

describe('util.js 테스트', () => {


    it('파일 슬래시가 없더라도 알아서 연결시켜준다. ', ()=>{

        var result = util.concatDirectoryStr("/src/main/java", "test", "hi");
        assert(result, "/src/main/java/test/hi");
        result = util.concatDirectoryStr("/src/main/java", "/test/", "hi");
        assert(result, "/src/main/java/test/hi");

    });

    it('파일 이름으로 파일 확장자 ( .어쩌고 )를 얻는다.', () => {
        assert(util.getExtension("index.html"), ".html");
    });

    it('파일 내용 변경 테스트', ()=>{
        var result = util.replaceString("{{package}}helloworld");
        console.log("result : ", result);
        assert(result, "replacementhelloworld");

    });

    it("디렉터리 경로에서 패키지 명 추출해내기 ", ()=>{

        var result = util.getPackageNameByPath("/Users/jarvis/code/workspace/nodejs/arahanpower/src/main/java/com/arahansa/service/", "com.arahansa");
        console.log("final result: ", result);

    });



});