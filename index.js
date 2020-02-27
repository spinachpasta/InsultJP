
const lexicon=require("./getLexicon.js");

const dotenv = require('dotenv');
dotenv.config();

const https = require('https');
const prompt = require('prompt');
/*
prompt.start();

prompt.get(['username', 'email'], function (err, result) {
    if (err) { return onErr(err); }
    console.log('Command-line input received:');
    console.log('  Username: ' + result.username);
    console.log('  Email: ' + result.email);
});
*/
const myArgs=process.argv.slice(2);

let accessToken="";

function GetAccessToken(){
    return;
    const data = JSON.stringify({
        "grantType": "client_credentials",
        "clientId": process.env.COTOHA_ID,
        "clientSecret": process.env.COTOHA_SECRET
    });
    console.log(data);
    const options = {
        hostname: 'api.ce-cotoha.com',
        port: 443,
        path: '/v1/oauth/accesstokens',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)

        res.on('data', d => {
            var textChunk = d.toString('utf8');
            console.log(textChunk);
            var json=JSON.parse(textChunk);
            accessToken= json.access_token;
            console.log(`access token:${accessToken}`);
            setTimeout(GetInput,1);
        });
    })

    req.on('error', error => {
        console.error(error);
    });

    req.write(data);
    req.end();
}

GetAccessToken();
function GetInput(){
    console.log("type a sentence in Japanese:");
    prompt.start();

    prompt.get(['sentence'], function (err, result) {
        if (err) { return onErr(err); }
        //ParseJp(result.sentence);
        GenerateInsult(result.sentence);
        //GetEmotion(result.sentence,function(d){console.log(d)});
        //console.log('  Username: ' + result.sentence);
        //setTimeout(GetInput,1);
    });
}
//https://cloud.google.com/translate/docs/basic/translating-text#translate_translate_text-nodejs
async function translateText(text) {
    var target="en";
    // Translates the text into the target language. "text" can be a string for
    // translating a single piece of text, or an array of strings for translating
    // multiple texts.
    let [translations] = await translate.translate(text, target);
    translations = Array.isArray(translations) ? translations : [translations];
    console.log('Translations:');
    translations.forEach((translation, i) => {
        console.log(`${text[i]} => (${target}) ${translation}`);
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
function GetEmotion(str,callback){
    //    /nlp/v1/sentiment
    const data = JSON.stringify({
        "sentence": str
    });
    console.log(data);
    const options = {
        hostname: 'api.ce-cotoha.com',
        port: 443,
        path: '/api/dev/nlp/v1/sentiment',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization":`Bearer ${accessToken}`
        }
    }

    const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)

        res.on('data', d => {
            var textChunk = d.toString('utf8');
            console.log(textChunk);
            callback((textChunk));
        });
    })

    req.on('error', error => {
        console.error(error);
    })

    req.write(data);
    req.end();
}
function ParseJp(str,callback){

    const data = JSON.stringify({
        "sentence": str,
        "type":"kuzure"
    });
    console.log(data);
    const options = {
        hostname: 'api.ce-cotoha.com',
        port: 443,
        path: '/api/dev/nlp/v1/parse',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization":`Bearer ${accessToken}`
        }
    }

    const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`);

        res.on('data', d => {
            var textChunk = d.toString('utf8');
            console.log(textChunk);
            callback((textChunk));
        });
    })

    req.on('error', error => {
        console.error(error);
    })

    req.write(data);
    req.end();
}
