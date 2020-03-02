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
    var options=
        {
            uri: process.env.GAS_TRANSLATE,
            method: 'POST',
            followAllRedirects: true,
            headers: {
                'Content-type': 'application/json'
            },
            json: true,
            form:JSON.stringify({
                text:str,
                source:source,
                target:target
            })
        };
    request(
        options, function (error, response, body) {
            callback(body);
            //console.log(body);
        }); 
    /*
    request(
        {url:
         "https://google.com",
         method: 'GET',

         followAllRedirects: true}, function (error, response, body) {
             //callback(body);
             console.log(body);
         });*/
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
//strs:array or string,type: v n a,callback:function called when process is finished, usesentence: optional,objectWord:optional
function SearchAntonymJp(strs,type,callback,usesentence,objectWord){
    //console.log(str);
    var str="";
    var arg=[];
    if(Array.isArray(strs)){
        str=strs[0];
        arg=strs;
    }else{
        str=strs;
        arg.push(str);
    }
    
    SearchAntonymDic(arg,function(res){dicfinished(res);});
    function dicfinished(res){
        if(res!=undefined){
            callback(res);
            return;
        }
        GetTranslation(str,"en","ja",function(en){
            console.log(en);
            //console.log(en.text);
            var sen=en.text.toLowerCase();
            var senarr=sen.split(" ");
            SearchAntonymEn(senarr[senarr.length-1],type,function(an){
                console.log(an);
                if(an==undefined){
                    callback();
                    return;
                }
                var sentence=an;
                if(usesentence){
                    switch(type){
                        default:
                            break;
                        case "v":
                            sentence="I "+an;
                            if(objectWord){
                                sentence+=" him";
                            }
                            break;
                        case "n":
                            sentence="I am "+an;
                            break;
                        case "a":
                            sentence="This is "+an;
                            break;
                    }
                }
                GetTranslation(sentence,"ja","en",function(jp){
                    callback(jp.text); 
                });

                //callback(an.text);
            });
        });
    }
    /*
    GetTranslation(str,"en","ja",function(en){
        SearchAntonymEn(en,type,function(an){
            console.log("an");
            console.log(an);
            GetTranslation(an,"ja","en",function(res){
                console.log("res");
                console.log(res);
                callback(res);
            });
        });
    });*/
}
function SearchAntonymDic(strs,callback){
    var count=0;
    var tmpscore=0;
    var count=0;
    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream('antonymJp')
    });
    var candidates=[];
    lineReader.on('line', function (line) {
        var arr=line.split(" ");
        if(strs.includes(arr[0])){
            end(arr[1]);
        }
        if(strs.includes(arr[1])){
            end(arr[0]);
        }
    });
    lineReader.on('close',function(){
        end();
    });
    var called=false;
    function end(res){
        if(called){
            return;
        }
        called=true;
        callback(res);
    }
}

//SentiWordNet_3.0.0
//type noun:n verb:v adjective:a
function SearchAntonymEn(str,type,callback){
    var count=0;
    var tmpscore=0;
    var count=0;
    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream('antonym.txt')
    });
    var candidates=[];
    lineReader.on('line', function (line) {
        var arr=line.split("\t");
        for(var i=0;i<arr.length;i++){
            if(arr[i]==str){
                var antonym=""; 
                if(i==0){
                    antonym=arr[1];
                }else{
                    antonym=arr[0];
                }
                candidates.push(antonym);
                //console.log("match found!"+antonym);
                break;
            }
        }
        count++;
    });
    lineReader.on('close',function(){ 
        var lineReader1 = require('readline').createInterface({
            input: require('fs').createReadStream('SentiWordNet_3.0.0.txt')
        });

        var antonym="";
        var count1=0;
        var judged=[];
        judged[str]={p:0,n:0,w:str,obsolete:true};
        for(var w of candidates){
            judged[w]={p:0,n:0,w:w,obsolete:false};
        }
        //console.log(judged);
        var removeList=[];
        lineReader1.on('line', function (line) {
            if(line.length==0){
                return;
            }
            if(line.charAt(0)=="#"){
                return;
            }
            var spaced=line.split("\t");
            for(var i=4;i<spaced.length;i++){
                if(!spaced[i].includes("#")){
                    break;
                }
                var word=spaced[i].split("#")[0];
                for(var w in judged){
                    if(judged[w].w==word){
                        //console.log(line);
                        //console.log("matched"+word);
                        var pscore=parseFloat(spaced[2]);
                        var nscore=parseFloat(spaced[3]);
                        if(type&&type!=spaced[0]&&w!=str){
                            removeList.push(w);
                        }
                        if(!type||type==spaced[0]||word==str){
                            //console.log(pscore+","+nscore);
                            judged[w].p=pscore;
                            judged[w].n=nscore;
                        }
                    }
                }
                if(count1==1){
                    //console.log(word);
                }
            }
            if(count1==1){
                //console.log(spaced);
            }
            count1++;
        });
        lineReader1.on('close',function(){ 
            for(var w of removeList){
                judged[w].obsolete=true;
            }
            //console.log(judged);
            var max=0;
            var a=judged[str];
            var unindis=[];
            var antonym1="";
            //console.log(judged);
            for(var w of candidates){
                if(judged[w].obsolete){
                    continue;
                }
                if(w.includes(str)){
                    var b=judged[w];
                    var diff=a.p-a.n-(b.p-b.n);
                    diff*=diff;
                    if(diff>=max){
                        antonym1=w;
                        max=diff;
                    }
                }
            }
            for(var w of candidates){
                if(judged[w].obsolete){
                    continue;
                }
                var b=judged[w];
                var diff=Math.abs(a.p-b.n)+Math.abs(a.p-b.n);
                diff*=diff;
                if(diff>=max){
                    antonym=w;
                    max=diff;
                }
            }
            if(antonym1!=""){
                //antonym=antonym1;
            }
            callback(antonym);
        });
    });
}
/*
SearchAntonymEn("favorite","v",function(s){
    console.log(s);
});*/
/*
SearchAntonymJp("面白い","a",function(s){
    console.log(s);
});*/
//GetTranslation("面白い","en","ja",function(){});
module.exports.SearchAntonymJp=SearchAntonymJp;
module.exports.SearchAntonymDic=SearchAntonymDic;
const cotoha=require("./CotohaApi.js");
/*
SearchAntonymJp("好き",undefined,function(s){
    console.log(s);
});
SearchAntonymDic(["好き"],function(s){
    console.log(s);
});*/
/*
SearchAntonymDic(["尊敬"],function(s){
    console.log(s);
});
*/
//SearchAntonymDic
/*
SearchAntonymJp(["悲しい","悲し"],"v",function(s){
    var parsed=cotoha.GetAccessToken(function(){
        cotoha.ParseJp(s,function(res){
            res=JSON.parse(res);
            //console.log(res);
            for(var sen of res.result){
                for(var token of sen.tokens){
                    if(token.features.includes("動作")){
                        console.log(token.form);
                    }
                }
            }
        });
    });
});*/