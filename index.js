const cotoha=require("./cotohaApi.js");
const lexicon=require("./getLexicon.js");

const fs = require('fs');
const prompt = require('prompt');
cotoha.GetAccessToken(GetInput);
function GetInput(){
    console.log("type a sentence in Japanese:");
    prompt.start();

    prompt.get(['sentence'], function (err, result) {
        if (err) { return onErr(err); }
        
    });
}

function lexiconEmotion(parsed){

    for(var s in parsed.result){
        var sen=parsed.result[s];
        for(var t in sen.tokens){

        }
    }
}

function GenerateInsult(str){
    var e;
    var p;
    function analysisLoaded(em,pa){
        var emotionData=JSON.parse(em);
        var parsed=JSON.parse(pa);
        console.log("analysisLoaded");
        /*
        if(emotionData.result.sentiment=="Negative"){
            //replace subject of the sentence by "you"
            //example: "He is ugly"-> "You are ugly"
            return;
        }*/
        for(var s in parsed.result){
            var sen=parsed.result[s];
            for(var t in sen.tokens){
                var token=sen.tokens[t];
                //console.log("token");
                var isSubject=false;
                var isCase=false;
                for(var d in token.dependency_labels){
                    var dep=token.dependency_labels[d];
                    if(dep.label=="case"){
                        isCase=true;
                    }
                }
                if(!isCase){
                    console.log(token.form);
                }else{
                    console.log(`***${token.form}***`);
                }
            }
        }
    }
    GetEmotion(str,function(d){
        e=d;
        ParseJp(str,function(dd){
            p=dd;
            analysisLoaded(e,p);
        });
    });
}
