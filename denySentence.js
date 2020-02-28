
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
    console.log("out of cases");
    return form;
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

function test(data,callback){
    for(var sen of data.result){
        for(var token of sen.tokens){
            //var token=sen.tokens[t];
            console.log(token.form);
            if(token.pos=="動詞語幹"||token.pos=="形容詞語幹"){
                console.log(`*${katsuyou(token.form,token.lemma,token.features)}*`);
            }
            if(token.pos=="判定詞"){
                console.log(`*じゃない*`);
            }
        }
    }
}
var fs = require('fs');
fs.readFile('parsed/gakuryoku', 'utf8', function(err, data) {
    if (err) throw err;
    console.log(data);
    test(JSON.parse(data),new Function(""));
});

