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
        //ParseJp(result.sentence);
        cotoha.ParseJp(result.sentence,function(r){
            console.log(r);
            var ran=Math.random();
            fs.writeFile("./parsed/parsed"+Math.floor(ran*100000), r, function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
            });
        });
        //GenerateInsult(result.sentence);
        //GetEmotion(result.sentence,function(d){console.log(d)});
        //console.log('  Username: ' + result.sentence);
        //setTimeout(GetInput,1);
    });
}