import {AddParentRequest, AddTeacherRequest} from "./DTO/AddTeacherRequest";
import {API} from "aws-amplify";
import {ResendTeacherInvitation} from "./DTO/ResendTeacherInvitation";

const apiName = 'HealthyHabitsV2API'

export async function addTeacherApi(params: AddTeacherRequest) {

    console.log('Adding teacher');
    const result = await API.post(apiName, '/api/addTeacher', {
        body: {
            ...params
        }
    });
    console.log(result);
    console.log('Added');
}
export async function addParentApi(params: AddParentRequest){
    console.log('Adding parent');
    const result = await API.post(apiName, '/api/addParent', {
        body: {
            ...params
        }
    });
    console.log(result);
    console.log('Added');
}

export async function resendCodeToTeacher(params: ResendTeacherInvitation) {
    console.log('Resending teacher invitation');
    const result = await API.post(apiName, '/api/resendTeacherInvitation', {
        body: {
            ...params
        }
    });
    console.log(result);
    console.log('Invite is resent');
}

export async function genUrlOfThumbnailOfFile(fileName: string){

    const result = await API.get(apiName, '/api/getUrlToObject', {
        queryStringParameters: {  // OPTIONAL
            name: fileName
        },
    })
    return result;
}
export async function deleteFileById(id: string){

    const result = await API.del(apiName, `/api/deleteFile/${id}`,{})
    return result;
}
