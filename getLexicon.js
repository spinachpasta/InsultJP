
function SearchLexicon(str,gokan,callback){
    var i=0;
    var tmpscore=0;
    var count=0;
    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream('pn_ja.txt')
    });
    lineReader.on('line', function (line) {
        var arr=line.split(":");
        i++;
        if(arr[0]==str){
            callback(arr[3],str);
            lineReader.removeAllListeners();
        }
        if(arr[0].includes(gokan)){
            tmpscore+=parseFloat(arr[3]);
            count++;
        }
        //console.log('Line from file:', line);
    });
    if(count!=0)
        tmpscore/=count;
    lineReader.on('close',function(){ callback(tmpscore,str)});
}
SearchLexicon("馬鹿","馬鹿",function(score){console.log("end score:"+score);});

module.exports.JudgeEmotion=SearchLexicon;