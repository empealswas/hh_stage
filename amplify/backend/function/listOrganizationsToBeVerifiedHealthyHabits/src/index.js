/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	AUTH_HEALTHYHABITSV24AEA1E5F_USERPOOLID
	API_HEALTHYHABITSV2API_APINAME
	API_HEALTHYHABITSV2API_APIID
	api
Amplify Params - DO NOT EDIT */
var aws = require('aws-sdk');
const cognito = new aws.CognitoIdentityServiceProvider({apiVersion: '2016-04-18'});
exports.handler = (event, context, callback) => {
    var params = {
        UserPoolId: process.env.AUTH_HEALTHYHABITSV24AEA1E5F_USERPOOLID,
        //AttributesToGet: ["email", "custom:organizationType"]
    };
    const response = {
        statusCode: 200,
        //  Uncomment below to enable CORS requests
        //  headers: {
        //      "Access-Control-Allow-Origin": "*",
        //      "Access-Control-Allow-Headers": "*"
        //  },
        body: JSON.stringify('Hello from Lambda!'),
    };
    cognito.listUsers(params, (err, data) => {
        if (err) {
            response.statusCode = 500;
            callback(err)
            console.log(err, err.stack);
        } else {
            console.log(data);
            callback(null, data);
        }
    });

};
