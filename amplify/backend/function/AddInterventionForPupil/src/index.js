/* Amplify Params - DO NOT EDIT
	API_HEALTHYHABITSV2GRAPHQLAPI_FILETABLE_ARN
	API_HEALTHYHABITSV2GRAPHQLAPI_FILETABLE_NAME
	API_HEALTHYHABITSV2GRAPHQLAPI_GRAPHQLAPIENDPOINTOUTPUT
	API_HEALTHYHABITSV2GRAPHQLAPI_GRAPHQLAPIIDOUTPUT
	AUTH_HEALTHYHABITSV24AEA1E5F_USERPOOLID
	ENV
	REGION
	STORAGE_HEALTHYHABITSV2_BUCKETNAME
Amplify Params - DO NOT EDIT */

const axios = require('axios');
const gql = require('graphql-tag');
const graphql = require('graphql');
const { print } = graphql;


const mutation = gql`mutation MyMutation($message: String = "", $pupilID: ID = "") {
    createIntervention(input: {message: $message, pupilID: $pupilID}) {
        id
        createdAt
        message
        pupilID
        updatedAt
    }
}

`
exports.handler = async (event) => {
    const body = JSON.parse(event.body)
    try {
        const graphqlData = await axios({
            url: process.env.API_HEALTHYHABITSV2GRAPHQLAPI_GRAPHQLAPIENDPOINTOUTPUT,
            method: 'post',
            headers: {
                'x-api-key': 'da2-zpmpagzgwfaibbojmysuhcezt4',
                "Authorization":"custom-authorized"
            },
            data: {
                query: print(mutation),
                variables: {pupilID: body.pupilId, message: body.message}
            }
        });
        console.log('DATA RECEIVED', graphqlData.data)
        return {
            statusCode: 200,
            body: JSON.stringify(graphqlData.data),
            headers: {
                "Access-Control-Allow-Origin": "*",
            }
        }
    } catch (err) {
        console.log('error deleting file: ', err);
    }
};