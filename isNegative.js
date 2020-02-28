const lexicon=require("./getLexicon.js");
var fs = require('fs');
fs.readFile('parsed/gakuryoku', 'utf8', function(err, data) {
    if (err) throw err;
    console.log(data);
    isNegative(JSON.parse(data),function(){});
});

function isNegative(data,callback){
    var sen=data.result[data.result.length-1];
    
    for(var token of sen.tokens){
        //var token=sen.tokens[t];
        console.log(token);
        lexicon.JudgeEmotion(token.lemma,token.form,function(score,word){
            if(score==undefined)score=0;
            console.log(word+`(${score})`);
        });
    }
}
