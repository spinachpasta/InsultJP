


const dotenv = require('dotenv');
dotenv.config();

const https = require('https');

const myArgs=process.argv.slice(2);

let accessToken="";

function GetAccessToken(callback){
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
            callback();
        });
    })

    req.on('error', error => {
        console.error(error);
    });

    req.write(data);
    req.end();
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
module.exports.ParseJp=ParseJp;
module.exports.GetAccessToken=GetAccessToken;
module.exports.GetEmotion=GetEmotion;

