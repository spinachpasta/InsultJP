
function SearchLexicon(str,callback){
    var i=0;
    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream('pn_ja.txt')
    });
    lineReader.on('line', function (line) {
        var arr=line.split(":");
        i++;
        if(arr[0]==str){
            callback(arr[3]);
            lineReader.removeAllListeners();
        }
        //console.log('Line from file:', line);
    });
    lineReader.on('close', callback);
}
console.log("あ");
//SearchLexicon("Fラン",function(score){console.log("end score:"+score);});

module.exports.JudgeEmotion=SearchLexicon;