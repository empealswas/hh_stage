import {AddParentRequest, AddTeacherRequest} from "./DTO/AddTeacherRequest";
import {API} from "aws-amplify";
import {ResendTeacherInvitation} from "./DTO/ResendTeacherInvitation";

const apiName = 'HealthyHabitsV2API'

export async function addTeacherApi(params: AddTeacherRequest) {

    const result = await API.post(apiName, '/api/addTeacher', {
        body: {
            ...params
        }
    });
    console.log(result);
    console.log('Added');
}
export async function addParentApi(params: AddParentRequest){
    const result = await API.post(apiName, '/api/addParent', {
        body: {
            ...params
        }
    });
    return result;
}
export async function addPrincipalApi(params: AddParentRequest){
    const result = await API.post(apiName, '/api/addPrincipal', {
        body: {
            ...params
        }
    });
    return result;
}


export async function getAverage(){
    return await API.get(apiName, '/api/getAverage', {});
}

export async function resendCodeToTeacher(params: ResendTeacherInvitation) {
    const result = await API.post(apiName, '/api/resendTeacherInvitation', {
        body: {
            ...params
        }
    });
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
