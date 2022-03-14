/* Amplify Params - DO NOT EDIT
	API_HEALTHYHABITSV2GRAPHQLAPI_GRAPHQLAPIENDPOINTOUTPUT
	API_HEALTHYHABITSV2GRAPHQLAPI_GRAPHQLAPIIDOUTPUT
	API_HEALTHYHABITSV2GRAPHQLAPI_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const gql = require('graphql-tag');
const axios = require('axios');
const graphql = require('graphql');
const {print} = graphql;

exports.handler = async event => {
    //eslint-disable-line
    console.log(JSON.stringify(event, null, 2));
    for(let record of event.Records) {
        if (record.eventName === 'REMOVE') {
            await removeRecordDependencies(record);

        }
    }

    return Promise.resolve('Successfully processed DynamoDB record');
};

async function graphqlQuery(query, variables) {
    const result = await axios({
        url: process.env.API_HEALTHYHABITSV2GRAPHQLAPI_GRAPHQLAPIENDPOINTOUTPUT,
        method: 'post',
        headers: {
            'x-api-key': process.env.API_HEALTHYHABITSV2GRAPHQLAPI_GRAPHQLAPIKEYOUTPUT,
            "Authorization": "custom-authorized"
        },
        data: {
            query: print(query),
            variables
        }
    });
    return result.data;

}

const deleteSectionQuery = gql`mutation MyMutation($id: ID = "") {
    deleteSection(input: {id: $id}) {
        id
        name
    }
}
`

async function removeRecordDependencies(record) {
    let sectionId = record.dynamodb.OldImage.id.S;
    console.log(record)
    console.log(sectionId)

    let sections = await listSections(sectionId);
    console.log(sections);

    for (const id of sections) {
        console.log('Deletitng', id);
        const result = await graphqlQuery(deleteSectionQuery, {
            id: id
        });
        console.log('Deleted Child Section', result.data.deleteSection.id);
    }
    const deletedSection = await removeCurrentSection(sectionId);
    console.log('Deleted Section', deletedSection);
}

const listChildSections = gql`query MyQuery($eq: ID = "") {
    listSections(filter: {parentID: {eq: $eq}}, limit: 1000000) {
        items {
            id
        }
    }
}
`

async function listSections(sectionId) {
    const result = await graphqlQuery(listChildSections, {eq: sectionId});
    console.log(result);
    return result.data.listSections.items.map(item => item.id);
}

const getCurrentSectionQuery = gql`query MyQuery($id: ID = "") {
    getSection(id: $id) {
        ImagePreview {
            id
            key
        }
        Lessons {
            items {
                id
            }
        }
    }
}
`

async function removeCurrentSection(sectionId) {
    //todo remove ImagePreview and all lessons
    return sectionId;

}

async function getCurrentSection(sectionId) {
    const result = await graphqlQuery(getCurrentSectionQuery, {id: sectionId});
    return result.data.getSection;
}

