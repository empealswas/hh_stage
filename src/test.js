var aws = require('aws-sdk');
const cognito = new aws.CognitoIdentityServiceProvider({apiVersion: '2016-04-18'});

async function addUserToCognitorPool(teacher){
    const params = {
        UserPoolId: process.env.userPoolId,
        Username: teacher.teacherEmail
    };

    await cognito.adminCreateUser(params).promise();
    console.log('Added user to cognito pool');

}
async function addUserToTeacherGroup(teacher){
    var params = {
        GroupName: process.env.userGroupName,
        UserPoolId: process.env.userPoolId,
        Username: teacher.teacherEmail
    };

    await cognito.adminAddUserToGroup(params).promise();
    console.log('Added user to cognito group');
}
async function addRecordToDatabase(teacher){
    const database = new aws.DynamoDB({apiVersion: '2012-10-08'});
    let date = new Date();
    let ddbParams = {
        Item: {
            'id': {S: teacher.teacherEmail},
            '__typename': {S: 'Teacher'},
            'name': {S: teacher.teacherEmail},
            'createdAt': {S: date.toISOString()},
            'updatedAt': {S: date.toISOString()},
            'schoolID': {S: teacher.schoolId},
            'firstName': {S: teacher.firstName},
            'lastName': {S: teacher.lastName}
        },
        TableName: process.env.teacherTableName
    };
    // Call DynamoDB
    try {
        await  database.putItem(ddbParams).promise();
        console.log("Added User to database");
    } catch (err) {
        console.log("Error", err);
        throw err;
    }
}

async function addParentToCognitoPool(parent) {
    const params = {
        UserPoolId: process.env.userPoolId,
        Username: parent.email
    };

    await cognito.adminCreateUser(params).promise();
    console.log('Added user to cognito pool');
}
async function addUserToParentGroup(parent){
    var params = {
        GroupName: process.env.parentGroupName,
        UserPoolId: process.env.userPoolId,
        Username: parent.email
    };

    await cognito.adminAddUserToGroup(params).promise();
    console.log('Added user to cognito group');
}
async function addParentToDatabase(parent){
    const database = new aws.DynamoDB({apiVersion: '2012-10-08'});
    let date = new Date();
    let ddbParams = {
        Item: {
            'id': {S: parent.email},
            '__typename': {S: 'Parent'},
            'createdAt': {S: date.toISOString()},
            'updatedAt': {S: date.toISOString()},
            'firstName': {S: parent.firstName},
            'lastName': {S: parent.lastName}
        },
        TableName: process.env.parentTableName
    };
    // Call DynamoDB
    try {
        await  database.putItem(ddbParams).promise();
        console.log("Added Parent to database");
    } catch (err) {
        console.log("Error", err);
        throw err;
    }
}
    exports.handler = async (event, context, callback) => {
        let response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Headers" : "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            body: JSON.stringify('Hello from Lambda!'),
        };
        console.log('event', event);
        const body = event.body;
        const type = body.type;
        console.log('body', body);
        switch(type) {
            case 'TEACHER':
                if(!body.teacherEmail || !body.schoolId) {
                    console.log('Connot create new user without email and schoolId');
                    context.fail(event);
                    response.statusCode = 500;
                }
                try {
                    await addUserToCognitorPool(body);
                    await addUserToTeacherGroup(body);
                    await addRecordToDatabase(body);
                }catch(err){
                    console.log('error: ', err)
                    response.statusCode = 500;
                }
                break;
            case 'PARENT':
                if(!body.teacherEmail || !body.schoolId) {
                    console.log('Cannot create new user without email and schoolId');
                    context.fail(event);
                    response.statusCode = 500;
                }
                try {
                    await addParentToCognitoPool(body);
                    await addUserToParentGroup(body);
                    await addParentToDatabase(body);
                }catch(err){
                    console.log('error: ', err)
                    response.statusCode = 500;
                }
                break;
            default:
                console.log('Undefined type: ' + type);
                response.statusCode = 500;
        }

        callback(null, response);
    };