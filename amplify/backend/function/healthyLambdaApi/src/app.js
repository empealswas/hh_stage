/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


const aws = require('aws-sdk')
const lambda = new aws.Lambda({
    region: 'eu-west-2'
})
const s3 = new aws.S3();
const dynamoDB = new aws.DynamoDB();
var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "*")
    next()
});


/**********************
 * Example get method *
 **********************/

app.get('/api', function (req, res) {
    // Add your code here
    res.json({success: 'get call succeed!', url: req.url});
});


/****************************
 * Example post method *
 ****************************/
app.get('/api/getUrlToObject', function (req, res) {
    const name = req.query.name;
    const gotURl = s3.getSignedUrl('getObject', {
        Bucket: "serverlessrepo-thumbnail-creator-resultsbucket-1orehh2pvqrw9",
        Key: name,
        Expires: 10000
    });
    res.json({success: 'got url', url: gotURl});
});
app.get('/api/listUnconfirmedOrganizations', function (req, res) {
    return lambda.invoke({
        FunctionName: 'listOrganizationsToBeVerifiedHealthyHabits-dev',
        InvocationType: 'RequestResponse',
        Payload: JSON.stringify({}) // pass params
    }, function (error, data) {
        if (error) {
            res.json({error: error, users: []})
        }
        if (data.Payload) {
            res.json({success: 'returned', users: data.Payload})
        }
    });
});


app.get('/api/getAverage', async function (req, res) {
    const statement = `select * from "Attendance-z3pgonvfxjgxjbgblzjkb3kvv4-dev"`
    const results = await dynamoDB.executeStatement({Statement: statement}).promise();
    res.json({success: 'got url', result: results});
});

app.post('/api', function (req, res) {
    // Add your code here
    res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.post('/api/addTeacher', (req, res) => {
    const event = {
        body: {
            ...req.body,
            type: 'TEACHER'
        }
    }
    console.log('event' + event)
    return lambda.invoke({
        FunctionName: 'addTeacherToUserPoolAndCreateRecordInDatabase',
        InvocationType: 'RequestResponse',
        Payload: JSON.stringify(event) // pass params
    }, function (error, data) {
        if (error) {
            res.json({error: error, url: req.url})
        }
        if (data.Payload) {
            res.json({success: 'teacher added', url: req.url})
        }
    });
})
app.post('/api/addTeacherOrganization', (req, res) => {
    const event = {
        body: {
            ...req.body,
            type: 'TEACHER'
        }
    }
    console.log('event' + event)
    return lambda.invoke({
        FunctionName: 'addUserToOrganizationHH',
        InvocationType: 'RequestResponse',
        Payload: JSON.stringify(event) // pass params
    }, function (error, data) {
        if (error) {
            res.json({error: error, url: req.url})
        }
        if (data.Payload) {
            res.json({success: 'teacher added', url: req.url})
        }
    });
})



app.post('/api/confirmOrganization', (req, res) => {
    const event = {
        body: {
            ...req.body,
        }
    }
    console.log('event',event);
    return lambda.invoke({
        FunctionName: 'ConfirmOrganization-dev',
        InvocationType: 'RequestResponse',
        Payload: JSON.stringify(event) // pass params
    }, function (error, data) {
        if (error) {
            res.json({error: error, url: req.url})
        }
        if (data) {
        if (data.Payload) {
            res.json({success: 'teacher added', url: req.url});
        }
        }
    });
})
app.post('/api/addParent', (req, res) => {
    const event = {
        body: {
            ...req.body,
            type: 'PARENT'
        }
    }
    console.log('event' + event)
    return lambda.invoke({
        FunctionName: 'addTeacherToUserPoolAndCreateRecordInDatabase',
        InvocationType: 'RequestResponse',
        Payload: JSON.stringify(event) // pass params
    }, function (error, data) {
        if (error) {
            res.json({error: error, url: req.url})
        }
        if (data.Payload) {
            res.json({success: 'parent added', url: req.url})
        }
    });
})
app.post('/api/addPrincipal', (req, res) => {
    const event = {
        body: {
            ...req.body,
            type: 'PRINCIPAL'
        }
    }
    console.log('event' + event)
    return lambda.invoke({
        FunctionName: 'addTeacherToUserPoolAndCreateRecordInDatabase',
        InvocationType: 'RequestResponse',
        Payload: JSON.stringify(event) // pass params
    }, function (error, data) {
        if (error) {
            res.json({error: error, url: req.url})
        }
        if (data.Payload) {
            res.json({success: 'parent added', url: req.url})
        }
    });
})
app.post('/api/resendTeacherInvitation', (req, res) => {
    const event = {
        body: req.body
    }
    return lambda.invoke({
        FunctionName: 'resentInvitationToTeacher',
        InvocationType: 'RequestResponse',
        Payload: JSON.stringify(event) // pass params
    }, function (error, data) {
        if (error) {
            res.json({error: error, url: req.url})
        }
        if (data?.Payload) {
            res.json({success: 'Invite is resent', url: req.url})
        }
    });
})


/****************************
 * Example put method *
 ****************************/

app.put('/api', function (req, res) {
    // Add your code here
    res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/api/*', function (req, res) {
    // Add your code here
    res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
 * Example delete method *
 ****************************/

app.delete('/api', function (req, res) {
    // Add your code here
    res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/api/deleteFile/:id', function (req, res) {
    const {id} = req.params;
    const event = {
        body: {
            id: id
        }
    }
    console.log('event' + event)
    return lambda.invoke({
        FunctionName: 'RemoveFileFromS3Bucket-dev',
        InvocationType: 'RequestResponse',
        Payload: JSON.stringify(event) // pass params
    }, function (error, data) {
        if (error) {
            res.json({error: error, url: req.url})
        }
        if (data?.Payload) {
            res.json({success: 'File deleted', url: req.url})
        }
    });
});

app.delete('/api/*', function (req, res) {
    // Add your code here
    res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function () {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
