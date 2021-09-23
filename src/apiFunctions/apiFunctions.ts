import {AddTeacherRequest} from "./DTO/AddTeacherRequest";
import {API} from "aws-amplify";
import {ResendTeacherInvitation} from "./DTO/ResendTeacherInvitation";

export async function addTeacherApi(params: AddTeacherRequest) {

    console.log('Adding teacher');
    const result = await API.post('amplifyapiREST', '/api/addTeacher', {
        body: {
            ...params
        }
    });
    console.log(result);
    console.log('Added');
}

export async function resendCodeToTeacher(params: ResendTeacherInvitation) {
    console.log('Resending teacher invitation');
    const result = await API.post('amplifyapiREST', '/api/resendTeacherInvitation', {
        body: {
            ...params
        }
    });
    console.log(result);
    console.log('Invite is resent');
}