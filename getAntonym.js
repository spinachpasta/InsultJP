var parser = require('fast-xml-parser');

var options = {
    attributeNamePrefix : "@_",
    attrNodeName: "attr", //default is 'false'
    textNodeName : "#text",
    ignoreAttributes : true,
    ignoreNameSpace : false,
    allowBooleanAttributes : false,
    parseNodeValue : true,
    parseAttributeValue : false,
    trimValues: true,
    cdataTagName: "__cdata", //default is 'false'
    cdataPositionChar: "\\c",
    parseTrueNumberOnly: false,
    arrayMode: false, //"strict"
    attrValueProcessor: (val, attrName) => he.decode(val, {isAttributeValue: true}),//default is a=>a
    tagValueProcessor : (val, tagName) => he.decode(val), //default is a=>a
    stopNodes: ["parse-me-as-string"]
};




const fs = require('fs');
const prompt = require('prompt');


const dotenv = require('dotenv');
dotenv.config();

const https = require('https');

const myArgs=process.argv.slice(2);
const request = require('request');

function GetTranslation(str,target,source,callback){
    var data="";
    var params="?text="+encodeURI(str)+"&"+"source="+source+"&target="+target;
    request(process.env.GAS_TRANSLATE+params, function (error, response, body) {
        callback(body);
        //console.log(body);
    });
}

function htmlGet(address,callback){
    https.get(address,function(res){
        var data="";
        res.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        res.on('end', () => {
            callback(data);
        });
    });
}

function SearchAntonymEn(str,callback){
    var count=0;
    var tmpscore=0;
    var count=0;
    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream('antonym.txt')
    });
    var antonym="";
    var unim="";//interesting->uninteresting
    lineReader.on('line', function (line) {
        var arr=line.split("\t");
        for(var i=0;i<arr.length;i++){
            if(arr[i]==str){
                if(i==0){
                    antonym=arr[1];
                }else{
                    antonym=arr[0];
                }
                if(antonym.includes(str)){
                    unim=antonym;
                }
                console.log("match found!"+antonym);
                break;
            }
        }
        count++;
    });
    lineReader.on('close',function(){ 
        if(unim!=""){
            antonym=unim;
        }
        callback(antonym);
    });
}
SearchAntonymEn("like",function(s){
    console.log(s);
});
//GetTranslation("面白い","en","ja",function(){});