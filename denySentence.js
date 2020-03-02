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
            return form+romaji[getVowel(gobi[0])+"e"];
        }

        return "e";
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
        return form+"ら";
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
    /*
    if(features.includes("アウオ段")){
        return lemma.substring(0,lemma.length-1);
    }
    if(features.includes("イ段")){
        return "よ";
    }
    if(features.includes("Lて連用")){

    }*/
    //console.log("out of cases");
    return undefined;
} 


function katsuyou1(form,lemma,features){//converts a word
    if(features.includes("A")){
        var gobi=getGobi(form,lemma);
        if(gobi.length<1){
            console.log("error invalid ending of the word")
        }else{
            console.log(getVowel(gobi[0]));
            console.log(getVowel(gobi[0])+"e");
            return form+romaji[getVowel(gobi[0])+"e"];
        }

        return "e";
    }
    if(features.includes("K")){
        return form+"け";
    }
    if(features.includes("G")){
        return form+"げ";
    }
    if(features.includes("S")){
        return form+"せ";
    }
    if(features.includes("T")){
        return form+"て";
    }
    if(features.includes("N")){
        return form+"ね";
    }
    if(features.includes("B")){
        return form+"べ";
    }
    if(features.includes("M")){
        return form+"め";
    }
    if(features.includes("R")){
        return form+"れ";
    }
    if(features.includes("W")){
        return form+"え";
    }

    if(features.includes("KURU")){
        return form;
    }
    if(features.includes("RX")){
        return form+"れ";
    }
    if(features.includes("IKU")){
        return "行け";
    }
    //アウオ段 イ段 Lて連用

    if(features.includes("アウオ段")){
        return form;//lemma.substring(0,lemma.length-1);
    }
    if(features.includes("イ段")){
        return "え";
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
    function build(){
        if(count>0)return;
        var res="";
        var res1="";
        for(var sen of data.result){
            for(var token of sen.tokens){
                res1+=token.form;
                var w=token.form;
                var insert="";
                for(var mod of mods){
                    if(mod.id==token.id){
                        console.log(mod);
                        switch(mod.type){
                            case "remove":
                                w="";
                                break;
                            case "replace":
                                w=mod.str;
                                break;
                            case "insert":
                                continue;
                                break;
                        }
                        break;
                    }
                }

                for(var mod of mods){
                    if(mod.id==token.id){
                        switch(mod.type){
                            case "insert":
                                insert+=mod.str;
                                break;
                        }
                    }
                }
                res+=w+insert;
            }
        }
        console.log(res);
        console.log(res1);
    }
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
    var mods=[];
    var count=0;
    function invertAdjective(token){
        var tmpMods=[];
        console.log("invertAdjective");
        var next=getToken(data,token.id+1);
        if(next&&next.pos=="形容詞接尾辞"){
            //tmpMods.unshift(new ModifyToken.remove(token.id+1));
        }
        tmpMods.unshift(new ModifyToken.replace(token.id,token.form+"くな"));

        count++;
        Antonym.SearchAntonymDic([token.lemma,token.form],function(s){
            console.log(s);
            if(s!=undefined){
                mods.unshift(new ModifyToken.replace(token.id,s.substring(0,s.length-1)));
            }else{
                for(var mod of tmpMods){
                    mods.unshift(mod);
                }
            }
            count--;
            build();
            //console.log(`***${s}***`);
        });
    }
    function invertVerb(token){
        console.log(token);
        var tmpMods=[];
        console.log("invertVerb");
        if(token.lemma=="ある"||token.lemma=="有る"){
            tmpMods.unshift(new ModifyToken.replace(token.id,"なか"));

        }else{
            var inverted=katsuyou(token.form,token.lemma,token.features)||token.form;
            tmpMods.unshift(new ModifyToken.replace(token.id,inverted));
            var next=getToken(data,token.id+1);
            if(next&&(next.pos=="動詞活用語尾"||next.pos=="動詞接尾辞")){
                tmpMods.unshift(new ModifyToken.replace(token.id+1,"ない"));
            }
        }
        var maxtoken=undefined;
        var auxpass=undefined;
        if(token.dependency_labels){
            for(var dep of token.dependency_labels){
                var t1=getToken(data,dep.token_id);
                if(dep.label=="auxpass"&&t1.id>token.id){
                    auxpass=t1;
                }
                if(dep.label=="aux"&&t1.id>token.id&&t1.pos=="動詞語幹"){
                    auxpass=t1;
                }
                /*
            if(dep.label=="aux"&&t1.id>token.id){
                console.log(t1);
                if(!maxtoken||maxtoken.id<t1.id){
                    maxtoken=t1;
                }
            }*/
                if(dep.label=="nmod"){
                    console.log(t1);
                    if(t1.pos=="名詞"&&t1.features.includes("形容")){
                        count++;
                        Antonym.SearchAntonymJp(
                            [t1.lemma,t1.form,t1.kana]
                            ,"a",function(s){
                                count--;

                                if(s!=undefined){
                                    mods.unshift(new ModifyToken.replace(t1.id,s));
                                }else{
                                    for(var mod of tmpMods){
                                        mods.unshift(mod);
                                    }
                                }
                                build();
                            });
                        found=true;
                    }
                }
            }
        }

        if(maxtoken){
            tmpMods.unshift(new ModifyToken.replace(maxtoken.id,"ない"));
        }
        if(auxpass){
            console.log("auxpass");
            invertVerb(auxpass);
            return;
        }
        if(!found){
            for(var mod of tmpMods){
                mods.unshift(mod);
            }
        }
    }
    function invertNoun(token){
        var found=false;
        var tmpMod=undefined;
        var tmpMods=[];

        for(var dep of token.dependency_labels){
            var t1=getToken(data,dep.token_id);
            if(dep.label=="nsubj"){
                tmpMods.unshift(new ModifyToken.replace(token.id,token.form+"ではない"));
                break;
            }
            if(dep.label=="amod"&&t1.id<token.id){
                //console.log(getToken(data,dep.token_id));
                inverted=katsuyou(t1.form,t1.lemma,t1.features);
                //console.log(`***${inverted}くな***`);
                if(!inverted){
                    inverted=t1.form;
                }
                found=true;
                tmpMods.unshift(new ModifyToken.replace(t1.id,inverted+"くな"));
                break;
            }
            if(dep.label=="cop"&&t1.pos=="判定詞"){
                tmpMods.unshift(new ModifyToken.replace(t1.id,denyCop(t1.features)));

                //mods.unshift(new ModifyToken.replace(t1.id,denyCop(t1.features)));
                break;
            }
            if(dep.label=="aux"&&dep.token_id>token.id){
                if(t1.form=="する"){
                    tmpMods.unshift(new ModifyToken.replace(t1.id,"しない"));
                }
                if(t1.form=="し"){
                    var t2=getToken(data,dep.token_id+1);
                    if(t2){
                        tmpMods.unshift(new ModifyToken.replace(t1.id,"しなかっ"));
                    }else{
                        tmpMods.unshift(new ModifyToken.replace(t1.id,"しない"));
                    }
                }
            }
        }
        console.log(tmpMods);
        if(found){
            for(var mod of tmpMods){
                mods.unshift(mod);
            }
            return;
        }
        //if(!found){
        count++;
        Antonym.SearchAntonymDic([token.lemma,token.form],function(s){
            console.log(s);
            if(s!=undefined){
                mods.unshift(new ModifyToken.replace(token.id,s));
            }else if(tmpMods.length>0){
                for(var mod of tmpMods){
                    mods.unshift(mod);
                }
            }
            count--;
            build();
            //console.log(`***${s}***`);
        });
        //}
    }
    function invertNeg(token){
        mods.push(new ModifyToken.replace(token.id,token.lemma));
        var next=getToken(data,token.id+1);
        if(next&&next.pos=="動詞活用語尾"){
            mods.unshift(new ModifyToken.remove(token.id+1));
        }
        for(var dep of token.dependency_labels){
            var t1=getToken(data,dep.token_id);
            //console.log(dep.label);
            if(dep.label=="neg"){
                console.log("remove:"+t1.form);
                mods.push(new ModifyToken.remove(t1.id));
                continue;
            }
            if(dep.label=="aux"){
                if(t1.pos=="形容詞接尾辞"&&t1.id==token.id+1){
                    mods.push(new ModifyToken.remove(t1.id));
                    //console.log("remove:"+t1.form);
                }
            }
        }
    }
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
                console.log("depth:"+tdep[i]);
                console.log(sen.tokens[i].form);
                if(tdep[i]==maxtdepth){
                    console.log("*");

                    var token=sen.tokens[i];
                    var isNeg=false;
                    for(var deplab of token.dependency_labels){
                        if(deplab.label=="neg"){
                            isNeg=true;
                            break;
                        }
                    }
                    if(isNeg){
                        invertNeg(token);
                        continue;
                    }
                    switch(token.pos){
                        case "名詞":
                        case "補助名詞":
                            invertNoun(token);
                            break;
                        case "形容詞語幹":
                            invertAdjective(token);
                            break;
                        case "動詞語幹":
                            invertVerb(token);
                            break;
                    }
                    continue;
                    var inverted=katsuyou(token.form,token.lemma,token.features);
                    if(isNeg){
                        for(var dep of token.dependency_labels){
                            var t1=getToken(data,dep.token_id);
                            //console.log(dep.label);
                            if(dep.label=="neg"){
                                console.log("remove:"+t1.form);
                                mods.push(new ModifyToken.remove(t1.id));
                                continue;
                            }
                            if(dep.label=="aux"){
                                if(t1.pos=="形容詞接尾辞"&&t1.id==token.id+1){
                                    mods.push(new ModifyToken.remove(t1.id));
                                    //console.log("remove:"+t1.form);
                                }
                            }
                        }
                        continue;
                    }
                    //console.log(`***${inverted}***`);
                    if(token.pos=="名詞"){
                        //console.log("*"); 
                        var found=false;

                        for(var dep of token.dependency_labels){
                            if(dep.label=="amod"){
                                var t1=getToken(data,dep.token_id);
                                /*console.log(getToken(data,dep.token_id));*/
                                inverted=katsuyou(t1.form,t1.lemma,t1.features);
                                //console.log(`***${inverted}くな***`);
                                if(!inverted){
                                    inverted=t1.form;
                                }
                                found=true;
                                mods.unshift(new ModifyToken.replace(t1.id,inverted+"くな"))
                                break;
                            }
                        }
                        if(!found){
                            count++;
                            Antonym.SearchAntonymDic([token.lemma,token.form],function(s){
                                console.log(s);
                                if(s!=undefined){
                                    mods.unshift(new ModifyToken.replace(token.id,s));
                                }
                                count--;
                                build();
                                //console.log(`***${s}***`);
                            });
                        }
                        else{

                        }

                    }else{
                        for(var dep of token.dependency_labels){
                            if(dep.label=="nmod"){
                                var t1=getToken(data,dep.token_id);
                                console.log(t1);
                                if(t1.pos=="名詞"&&t1.features.includes("形容")){
                                    count++;
                                    Antonym.SearchAntonymJp(
                                        [t1.lemma,t1.form,t1.kana]
                                        ,"a",function(s){
                                            count--;

                                            if(s!=undefined)
                                                mods.unshift(new ModifyToken.replace(token.id,s));

                                            build();
                                        });
                                    found=true;
                                }
                            }
                        }

                        /*
                        count++;
                        Antonym.SearchAntonymDic(
                            [token.lemma,token.form,token.kana]
                            ,function(s){
                                if(s!=undefined){
                                    if(s=="ない"){
                                        for(var dep of token.dependency_labels){
                                            if(dep.label=="aux"){
                                                var t1=getToken(data,token.id);

                                            }
                                        }
                                    }
                                    var t1=getToken(data,dep.token_id);;
                                    if(t1&&t1.pos.includes("活用語尾")){
                                        mods.unshift(new ModifyToken.remove(t1.id));
                                        var t1=getToken(data,dep.token_id);
                                    }
                                    mods.unshift(new ModifyToken.replace(token.id,s));
                                }

                                count--;
                                build();
                            });*/

                        /*
                        if(token.pos=="形容詞語幹"){
                            inverted+="くな";
                        }*/
                        if(token.lemma=="ある"||token.lemma=="有る"){
                            mods.push(new ModifyToken.remove(token.id));
                            mods.push(new ModifyToken.insert(token.id,"なか"));
                        }else{
                            if(!inverted){
                                inverted=token.form+"く";
                                //console.log(getToken(data,token.id+1));
                            }

                            mods.push(new ModifyToken.replace(token.id,inverted));
                            mods.push(new ModifyToken.insert(token.id,"な"));

                        }
                        //console.log(`***${inverted}***`);
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
    build();

}
function denyCop(features){
    if(features.includes("終止")){
        return "でない";
    }
    if(features.includes("仮定")){
        return "でなけれ";
    }
    if(features.includes("連体")){
        return "でない";
    }
    if(features.includes("未然")){
        return "でなかろ";
    }
    if(features.includes("連用")){
        return "でなく";
    }
}
var ModifyToken={
    replace:function(id,str){
        this.id=id;
        this.str=str;
        this.type="replace";
    },
    remove:function(id){
        this.id=id;
        this.type="remove";
    },
    insert:function(id,str){
        this.id=id;
        this.str=str;
        this.type="insert";
    },

};
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
fs.readFile('parsed/poo', 'utf8', function(err, data) {
    if (err) throw err;
    console.log(data);
    test(JSON.parse(data),new Function(""));
});