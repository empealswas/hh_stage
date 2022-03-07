/* Amplify Params - DO NOT EDIT
	API_HEALTHYHABITSV2API_APIID
	API_HEALTHYHABITSV2API_APINAME
	API_HEALTHYHABITSV2GRAPHQLAPI_GRAPHQLAPIENDPOINTOUTPUT
	API_HEALTHYHABITSV2GRAPHQLAPI_GRAPHQLAPIIDOUTPUT
	API_HEALTHYHABITSV2GRAPHQLAPI_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const axios = require('axios');
const gql = require('graphql-tag');
const graphql = require('graphql');
const { print } = graphql;
exports.handler = async (event) => {
    const body = JSON.parse(event.body)
    console.log(body)
    if(body.type === 'auth' && body.status === 'success'){
        await updateTerraId(body.reference_id, body.user.user_id, body.user.provider)
    }
    const response = {
        statusCode: 200,
        //  Uncomment below to enable CORS requests
        //  headers: {
        //      "Access-Control-Allow-Origin": "*",
        //      "Access-Control-Allow-Headers": "*"
        //  },
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
const mutation = gql`mutation MyMutation($id: ID = "", $provider: String = "", $terraId: String = "") {
    updateUser(input: {id: $id, provider: $provider, terraId: $terraId}) {
        id
    }
}
`

async function updateTerraId(pupilId, terraId, provider) {
    try {
        const graphqlData = await axios({
            url: process.env.API_HEALTHYHABITSV2GRAPHQLAPI_GRAPHQLAPIENDPOINTOUTPUT,
            method: 'post',
            headers: {
                'x-api-key': process.env.API_HEALTHYHABITSV2GRAPHQLAPI_GRAPHQLAPIKEYOUTPUT,
                "Authorization":"custom-authorized"
            },
            data: {
                query: print(mutation),
                variables: {id: pupilId, terraId: terraId, provider: provider}
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
}
