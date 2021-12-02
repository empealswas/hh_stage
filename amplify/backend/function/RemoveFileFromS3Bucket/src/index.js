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


const mutation = gql`mutation MyMutation($id: ID = "") {
    deleteFile(input: {id: $id}) {
        id
        key
    }
}
`
exports.handler = async (event) => {
    const {id} = {...event.body}
    console.log('Id of file: ' + 'id');
    try {
        const graphqlData = await axios({
            url: process.env.API_URL,
            method: 'post',
            headers: {
                'x-api-key': process.env.API_HEALTHYHABITSV2GRAPHQLAPI_GRAPHQLAPIIDOUTPUT
            },
            data: {
                query: print(mutation),
                variables: {
                    input: {
                        id: id
                    }
                }
            }
        });
        console.log('Response: ', graphqlData);
        console.log('Response: ', graphqlData);
        const body = {
            //todo change to key of returned object
            message: `Successfully removed file: ${id}`
        }
        return {
            statusCode: 200,
            body: JSON.stringify(body),
            headers: {
                "Access-Control-Allow-Origin": "*",
            }
        }
    } catch (err) {
        console.log('error deleting file: ', err);
    }
};