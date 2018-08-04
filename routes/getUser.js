var express = require('express');
var router = express.Router();
const models = require('../models/index');
const request = require('request');
const keys = require('../data/keys');
var Twitter = require('twitter');

/* GET users listing. */
router.get('/', function (req, res, next) {

    let timestamp = Math.round(Date.now() / 1000);
    let signingKey = oAuthSigningKey(keys.TWITTER_CONSUMER_SECRET, keys.TWITTER_ACCESS_TOKEN_SECRET);
    let baseString = oAuthBaseString('GET', 'https://api.twitter.com/1.1/users/show.json',
        '', keys.TWITTER_CONSUMER_KEY,
        keys.TWITTER_ACCESS_TOKEN, timestamp, btoa(keys.TWITTER_CONSUMER_KEY + ':' + timestamp));
    let signature = oAuthSignature(baseString, signingKey);
    // request.get({
    //
    //         headers: {
    //             Authorization: {
    //                 oauth_consumer_key: keys.TWITTER_CONSUMER_KEY,
    //                 oauth_nonce: btoa(keys.TWITTER_CONSUMER_KEY + ':' + timestamp),
    //                 oauth_signature: signature,
    //                 oauth_signature_method: "HMAC-SHA1",
    //                 oauth_timestamp: timestamp,
    //                 oauth_token: keys.TWITTER_ACCESS_TOKEN,
    //                 oauth_version: "1.0",
    //             }
    //         }
    //         , url: 'https://api.twitter.com/1.1/users/show.json?screen_name=ni_moradi',
    //     }
    //     , function (error, response, body) {
    //         res.send(response + " , " + error+ " , " +body);
    //     });
    let client = new Twitter({
        consumer_key: keys.TWITTER_CONSUMER_KEY,
        consumer_secret: keys.TWITTER_CONSUMER_SECRET,
        access_token_key: keys.TWITTER_ACCESS_TOKEN,
        access_token_secret: keys.TWITTER_ACCESS_TOKEN_SECRET
    });
    client.get('users/show.json', {screen_name: 'ni_moradi'})
        .then(function (tweet) {
            res.json(tweet);
        })
        .catch(function (error) {
            res.send(error);
        });
});

function oAuthBaseString(method, url, params, key, token, timestamp, nonce) {
    return method
        + '&' + percentEncode(url)
        + '&' + percentEncode(genSortedParamStr(params, key, token, timestamp, nonce));
}

function oAuthSigningKey(consumer_secret, token_secret) {
    return consumer_secret + '&' + token_secret;
}

function oAuthSignature(base_string, signing_key) {
    var signature = hmac_sha1(base_string, signing_key);
    return percentEncode(signature);
}

// Percent encoding
function percentEncode(str) {
    return encodeURIComponent(str).replace(/[!*()']/g, (character) => {
        return '%' + character.charCodeAt(0).toString(16);
    });
}

// HMAC-SHA1 Encoding, uses jsSHA lib
var jsSHA = require('jssha');

function hmac_sha1(string, secret) {
    let shaObj = new jsSHA("SHA-1", "TEXT");
    shaObj.setHMACKey(secret, "TEXT");
    shaObj.update(string);
    return shaObj.getHMAC("B64");

}

// Merge two objects
function mergeObjs(obj1, obj2) {
    for (var attr in obj2) {
        obj1[attr] = obj2[attr];
    }
    return obj1;
}// Generate Sorted Parameter String for base string params
function genSortedParamStr(params, key, token, timestamp, nonce) {
    // Merge oauth params & request params to single object
    let paramObj = mergeObjs(
        {
            oauth_consumer_key: key,
            oauth_nonce: nonce,
            oauth_signature_method: 'HMAC-SHA1',
            oauth_timestamp: timestamp,
            oauth_token: token,
            oauth_version: '1.0'
        },
        params
    );
    // Sort alphabetically
    let paramObjKeys = Object.keys(paramObj);
    let len = paramObjKeys.length;
    paramObjKeys.sort();
    // Interpolate to string with format as key1=val1&key2=val2&...
    let paramStr = paramObjKeys[0] + '=' + paramObj[paramObjKeys[0]];
    for (var i = 1; i < len; i++) {
        paramStr += '&' + paramObjKeys[i] + '=' + percentEncode(decodeURIComponent(paramObj[paramObjKeys[i]]));
    }
    return paramStr;
}

const btoa = function (str) {
    return Buffer.from(str).toString('base64');
};
module.exports = router;
