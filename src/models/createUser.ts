import {Admin} from "./Admin";
import {Teacher} from "./Teacher";
import {Principal} from "./Principal";
import {Parent} from "./Parent";
import {User} from "./User";

export function createUser(userData: any) {
    const userRoles = userData.signInUserSession.accessToken.payload['cognito:groups'];
    if (userRoles.includes('Admins')) {
        return new Admin(userData.attributes.email);
    }else if (userRoles.includes('Teachers')) {
        return new Teacher(userData.attributes.email);
    }else if (userRoles.includes('Principals')) {
        return new Principal(userData.attributes.email);
    }else if (userRoles.includes('Parents')) {
        return new Parent(userData.attributes.email);
    }
    return new User(userData.attributes.email);

}