/* Amplify Params - DO NOT EDIT
	API_HEALTHYHABITSV2API_APIID
	API_HEALTHYHABITSV2API_APINAME
	AUTH_HEALTHYHABITSV24AEA1E5F_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */
var aws = require('aws-sdk');
const cognito = new aws.CognitoIdentityServiceProvider({apiVersion: '2016-04-18'});
exports.handler = (event, context, callback) => {
    const body = event.body
    console.log(body)
    var confirmParams = {
        UserPoolId: process.env.AUTH_HEALTHYHABITSV24AEA1E5F_USERPOOLID, /* required */
        Username: body.email /* required */
    };
    cognito.adminConfirmSignUp(confirmParams, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        console.log(data);
        callback(null, data);

        // return;
    });
};
