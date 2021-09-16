const AWS = require('aws-sdk');
const https = require('https');
const UrlParse = require('url').URL;
const gql = require('graphql-tag');
const graphql = require('graphql');
const { print } = graphql;

/*
 * Waits using an exponential
 * backoff algorithm.
 */
function waitTimeExp(retryCount) {
    return new Promise((resolve, reject) => {
        if (retryCount === 0) {
            resolve();
        } else {
            let MAX_TIME = 20000;
            let waitTime = Math.pow(2, retryCount) * 500;
            let t = Math.min(waitTime, MAX_TIME);

            setTimeout(function () {
                resolve();
            }, t);
        }
    });
}

function fetchData(httpReq) {
    return new Promise(async (resolve, reject) => {
        let received = '';
        const httpRequest = https
            .request(httpReq, (result) => {
                result
                    .on('data', (data) => {
                        received += data;
                    })
                    .on('end', function () {
                        let r = JSON.parse(received.toString());
                        if (r.hasOwnProperty('errors')) {
                            reject(r.errors[0].message);
                        } else {
                            resolve(r);
                        }
                    });
            })
            .on('timeout', function () {
                httpRequest.destroy(new Error('timeout'));
            })
            .on('error', (e) => {
                reject(e.message);
            });

        httpRequest.write(httpReq.body);
        httpRequest.end();
    });
}

function getEndpoint() {
    let k = Object.keys(process.env).filter((key) => {
        if (key.indexOf('GRAPHQLAPIENDPOINTOUTPUT') !== -1) {
            return true;
        }
    });

    let endpoint;
    if (k.length > 0) {
        endpoint = process.env[k[0]];
    }

    return endpoint;
}

function createSignedReq(aQuery, aVariables) {
    const graphQlEndpoint = getEndpoint();
    const endpoint = new UrlParse(graphQlEndpoint).hostname.toString();

    const req = new AWS.HttpRequest(graphQlEndpoint, 'us-east-1');  // change this to your region
    req.method = 'POST';
    req.path = '/graphql';
    req.headers.host = endpoint;
    req.headers['Content-Type'] = 'application/json; charset=UTF-8';

    let queryData = {
        query: print(gql(aQuery)),
    };

    if (aVariables) {
        queryData.variables = aVariables;
    }

    req.body = JSON.stringify(queryData);

    const signer = new AWS.Signers.V4(req, 'appsync', true);
    signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());

    let signedReq = {
        ...req,
        host: endpoint,
        timeout: 30000,
    };

    return signedReq;
}

module.exports = async function (aQuery, aVariables) {
    let retries = 0;
    let retry = false;
    let data = null;
    let httpReq = createSignedReq(aQuery, aVariables);
    let err = null;
    const MAX_RETRIES = 5;

    do {
        try {
            retry = false;
            await waitTimeExp(retries);
            data = await fetchData(httpReq);
        } catch (error) {
            console.log(error);
            err = error;
            retry = true;
        }
    } while (retry && retries++ < MAX_RETRIES);

    if (retries >= MAX_RETRIES) {
        console.log('Error - max retries');
        throw err;
    }

    return data;
};