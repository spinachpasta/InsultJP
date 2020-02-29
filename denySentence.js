const Antonym=require("./getAntonym.js");
//form:語幹 lemma
function katsuyou(form,lemma,features){//converts a word to 未然形
    if(features.includes("A")){
        var gobi=getGobi(form,lemma);
        if(gobi.length<1){
            console.log("error invalid ending of the word")
        }else{
            console.log(getVowel(gobi[0]));
            console.log(getVowel(gobi[0])+"e");
            return form+romaji[getVowel(gobi[0])+"e"]+"ない";
        }

        return "e"+"ない";
    }
    if(features.includes("K")){
        return form+"か";
    }
    if(features.includes("G")){
        return form+"が";
    }
    if(features.includes("S")){
        return form+"さ";
    }
    if(features.includes("T")){
        return form+"た";
    }
    if(features.includes("N")){
        return form+"な";
    }
    if(features.includes("B")){
        return form+"ば";
    }
    if(features.includes("M")){
        return form+"ま";
    }
    if(features.includes("R")){
        return form+"ま";
    }
    if(features.includes("W")){
        return form+"わ";
    }

    if(features.includes("KURU")){
        return form;
    }
    if(features.includes("RX")){
        return form+"ら";
    }
    if(features.includes("IKU")){
        return "行か";
    }
    //アウオ段 イ段 Lて連用

    if(features.includes("アウオ段")){
        return lemma.substring(0,lemma.length-1);
    }
    if(features.includes("イ段")){

    }
    if(features.includes("Lて連用")){

    }
    //console.log("out of cases");
    return undefined;
} 
function getGobi(form,lemma){
    var gobi=lemma.substring(form.length,lemma.length);
    console.log(gobi);
    return gobi;
}
function getVowel(chara){
    var roman=Object.getOwnPropertyNames(romaji);
    for(var i=0;i<roman.length;i++){
        if(romaji[roman[i]]==chara){
            return roman[i].substring(0, roman[i].length-1);
        }
    }
}

var romaji = {
    'a':'あ', 'i':'い', 'u':'う', 'e':'え', 'o':'お',
    'ka':'か', 'ki':'き', 'ku':'く', 'ke':'け', 'ko':'こ',
    'sa':'さ', 'si':'し', 'su':'す', 'se':'せ', 'so':'そ',
    'ta':'た', 'ti':'ち', 'tu':'つ', 'te':'て', 'to':'と', 'chi':'ち', 'tsu':'つ',
    'na':'な', 'ni':'に', 'nu':'ぬ', 'ne':'ね', 'no':'の',
    'ha':'は', 'hi':'ひ', 'hu':'ふ', 'he':'へ', 'ho':'ほ', 'fu':'ふ',
    'ma':'ま', 'mi':'み', 'mu':'む', 'me':'め', 'mo':'も',
    'ya':'や', 'yi':'い', 'yu':'ゆ', 'ye':'いぇ', 'yo':'よ',
    'ra':'ら', 'ri':'り', 'ru':'る', 're':'れ', 'ro':'ろ',
    'wa':'わ', 'wyi':'ゐ', 'wu':'う', 'wye':'ゑ', 'wo':'を',
    'nn':'ん',
    'ga':'が', 'gi':'ぎ', 'gu':'ぐ', 'ge':'げ', 'go':'ご',
    'za':'ざ', 'zi':'じ', 'zu':'ず', 'ze':'ぜ', 'zo':'ぞ', 'ji':'じ',
    'da':'だ', 'di':'ぢ', 'du':'づ', 'de':'で', 'do':'ど',
    'ba':'ば', 'bi':'び', 'bu':'ぶ', 'be':'べ', 'bo':'ぼ',
    'pa':'ぱ', 'pi':'ぴ', 'pu':'ぷ', 'pe':'ぺ', 'po':'ぽ',
    'kya':'きゃ', 'kyu':'きゅ', 'kyo':'きょ',
    'sya':'しゃ', 'syu':'しゅ', 'syo':'しょ',
    'tya':'ちゃ', 'tyi':'ちぃ', 'tyu':'ちゅ', 'tye':'ちぇ', 'tyo':'ちょ', 'cha':'ちゃ', 'chu':'ちゅ', 'che':'ちぇ', 'cho':'ちょ',
    'nya':'にゃ', 'nyi':'にぃ', 'nyu':'にゅ', 'nye':'にぇ', 'nyo':'にょ',
    'hya':'ひゃ', 'hyi':'ひぃ', 'hyu':'ひゅ', 'hye':'ひぇ', 'hyo':'ひょ',
    'mya':'みゃ', 'myi':'みぃ', 'myu':'みゅ', 'mye':'みぇ', 'myo':'みょ',
    'rya':'りゃ', 'ryi':'りぃ', 'ryu':'りゅ', 'rye':'りぇ', 'ryo':'りょ',
    'gya':'ぎゃ', 'gyi':'ぎぃ', 'gyu':'ぎゅ', 'gye':'ぎぇ', 'gyo':'ぎょ',
    'zya':'じゃ', 'zyi':'じぃ', 'zyu':'じゅ', 'zye':'じぇ', 'zyo':'じょ', 'ja':'じゃ', 'ju':'じゅ', 'je':'じぇ', 'jo':'じょ', 'jya':'じゃ', 'jyi':'じぃ', 'jyu':'じゅ', 'jye':'じぇ', 'jyo':'じょ',
    'dya':'ぢゃ', 'dyi':'ぢぃ', 'dyu':'ぢゅ', 'dye':'ぢぇ', 'dyo':'ぢょ',
    'bya':'びゃ', 'byi':'びぃ', 'byu':'びゅ', 'bye':'びぇ', 'byo':'びょ',
    'pya':'ぴゃ', 'pyi':'ぴぃ', 'pyu':'ぴゅ', 'pye':'ぴぇ', 'pyo':'ぴょ',
    'fa':'ふぁ', 'fi':'ふぃ', 'fe':'ふぇ', 'fo':'ふぉ',
    'fya':'ふゃ', 'fyu':'ふゅ', 'fyo':'ふょ',
    'xa':'ぁ', 'xi':'ぃ', 'xu':'ぅ', 'xe':'ぇ', 'xo':'ぉ', 'la':'ぁ', 'li':'ぃ', 'lu':'ぅ', 'le':'ぇ', 'lo':'ぉ',
    'xya':'ゃ', 'xyu':'ゅ', 'xyo':'ょ',
    'xtu':'っ', 'xtsu':'っ',
    'wi':'うぃ', 'we':'うぇ',
    'va':'ヴぁ', 'vi':'ヴぃ', 'vu':'ヴ', 've':'ヴぇ', 'vo':'ヴぉ'
};

function maxInArray(arr){
    var max=Number.NEGATIVE_INFINITY;
    for(var elem of arr){
        if(max<elem){
            max=elem;
        }
    }
    return max;
}
function test(data,callback){
    function initArr(){
        var d=[];
        for(var sen of data.result){
            d.push(-1);
        }
        return d;
    }
    var depth=initArr();
    for(var start of data.result){
        var id=start.chunk_info.id;
        var localDepth=initArr();
        localDepth[id]=0;
        var targets=[];
        for(;;){
            var chunk=getChunk(data,id);
            console.log(chunk.chunk_info.links);
            for(var link of chunk.chunk_info.links){
                var label=link.label;
                //if(label=="aobject"||label=="goal"||label=="object")
                {
                    if(localDepth[parseInt(link.link)]<0){
                        //console.log(id+"->"+link.link);
                        targets.push(parseInt(link.link));
                        localDepth[parseInt(link.link)]=localDepth[id]+1;
                    }
                }
            }
            console.log(targets);
            if(targets.length==0){
                break;
            }
            id=targets.pop();
        }
        //console.log(localDepth);
        //        /console.log(localDepth);
        depth[start.chunk_info.id]=maxInArray(localDepth);
        //console.log(depth[start.chunk_info.id]);
    }
    var region=[];
    var prev=0;
    var cur=0;
    for(var sen of data.result){
        for(var token of sen.tokens){
            cur=sen.chunk_info.id;
            if(token.pos=="句点"){
                region.push({start:prev,end:cur});
                prev=cur+1;
            }
        }
    }
    if(region.length==0){
        region=[{start:0,end:cur}];
    }else{
        region.push({start:prev,end:cur});
    }
    var localMaximums=[];
    for(var r of region){
        var max=Number.NEGATIVE_INFINITY;
        var pos=r.start;
        for(var i=r.start;i<=r.end;i++){
            if(max<depth[i]){
                max=depth[i];
                pos=i;
            }
        }
        localMaximums.push(pos);
    }
    console.log("localMaximums");
    console.log(localMaximums);
    var maxDepth=maxInArray(depth);
    for(var sen of data.result){

        var chunkStr="";
        for(var token of sen.tokens){
            chunkStr+=token.form;
        }
        console.log("depth:"+depth[sen.chunk_info.id]);
        if(localMaximums.includes(sen.chunk_info.id)){
            console.log(depth[sen.chunk_info.id]);
            //invert
            var tdep=tokenDepth(sen.tokens);
            var maxtdepth=maxInArray(tdep);
            for(var i in sen.tokens){
                console.log(sen.tokens[i].form);
                if(tdep[i]==maxtdepth){
                    console.log("*");
                    var token=sen.tokens[i];
                    var inverted=katsuyou(token.form,token.lemma,token.features);
                    var isNeg=false;
                    for(var dep of token.dependency_labels){
                        if(dep.label=="neg"){
                            isNeg=true;
                            console.log("remove:"+getToken(data,dep.token_id));
                            break;
                        }
                    }
                    if(isNeg){
                        continue;
                    }
                    //console.log(`***${inverted}***`);
                    if(token.pos=="名詞"){
                        //console.log("*"); 
                        if(token.features.includes("動作"))  Antonym.SearchAntonymJp([token.lemma,token.form],undefined,function(s){
                            console.log(`***${s}***`);
                        });
                        else{
                            for(var dep of token.dependency_labels){
                                if(dep.label=="amod"){
                                    var t1=getToken(data,dep.token_id);
                                    /*console.log(getToken(data,dep.token_id));*/
                                    inverted=katsuyou(t1.form,t1.lemma,t1.features);
                                    console.log(`***${inverted}くな***`);
                                    break;
                                }
                            }
                        }

                    }else{
                        if(token.pos=="形容詞語幹"){
                            inverted+="くな";
                        }
                        console.log(`***${inverted}***`);
                    }
                    /*
                    Antonym.SearchAntonymJp(,"v",function(s){

                    });*/
                }
            }
        }else{
            console.log(chunkStr);
        }
        /*
        var globalDepth=initArr();
        //aobject goal object
        for(var start in sen.chunk_info.links){
            var localDepth=initArr();
            var label=start.label;
            if(label=="aobject"||label=="goal"||label=="object"){
                var targets=[];
                for(var t in ){

                }
            }
        }*/
        /*
        for(var token of sen.tokens){
            //var token=sen.tokens[t];
            console.log(token.form);
            if(token.pos=="動詞語幹"||token.pos=="形容詞語幹"){
                console.log(`*${katsuyou(token.form,token.lemma,token.features)}*`);
            }
            if(token.pos=="判定詞"){
                console.log(`*じゃない*`);
            }
        }*/
    }
}

function getChunk(parsed,chunkId){
    for(var chunk of parsed.result){
        if(chunk.chunk_info.id==chunkId){
            return chunk;
        }
    }
}

function getToken(parsed,tokenId){

    for(var chunk of parsed.result){
        for(var token of chunk.tokens){
            if(token.id==tokenId)return token;
        }
    }
}

function tokenDepth(tokens){
    function lo(id){
        return id-tokens[0].id;
    }
    function initArr(){
        var arr=[];
        for(var t of tokens){
            arr.push(-1);
        }
        return arr;
    }
    function Gtoken(id){
        for(var t of tokens){
            if(t.id==id){
                return t;
            }
        }
    }
    var depth=initArr();
    for(var start of tokens){
        var id=start.id;
        var localDepth=initArr();
        localDepth[lo(id)]=0;
        var targets=[];
        for(;;){
            var token=Gtoken(id);
            //console.log(token.dependency_labels);
            if(token.dependency_labels){
                for(var dep of token.dependency_labels){
                    var label=dep.label;
                    //if(label=="aobject"||label=="goal"||label=="object")
                    {
                        if(localDepth[lo(dep.token_id)]<0){
                            //console.log(id+"->"+link.link);
                            targets.push(dep.token_id);
                            localDepth[lo(dep.token_id)]=localDepth[lo(id)]+1;
                        }
                    }
                }
            }
            console.log(targets);
            if(targets.length==0){
                break;
            }
            id=targets.pop();
        }
        console.log(localDepth);
        depth[lo(start.id)]=maxInArray(localDepth);
    }
    return depth;
    //var maxDepth=maxInArray(depth);
    var res={};
    for(var t of tokens){
        var prin=t.form;
        if(depth[lo(t.id)]==maxDepth){
            prin+="*";
        }
        res[t.id]=depth[lo(t.id)];
        /*
        console.log(prin);
        console.log(depth[lo(t.id)]);*/
    }
    return res;
}


var fs = require('fs');
fs.readFile('parsed/sharknado_deny', 'utf8', function(err, data) {
    if (err) throw err;
    console.log(data);
    test(JSON.parse(data),new Function(""));
});