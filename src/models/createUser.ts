import {Admin} from "./Admin";
import {Teacher} from "./Teacher";
import {Principal} from "./Principal";
import {Parent} from "./Parent";
import {Organization} from "./Organization";
import {User} from "./User";

export function createUser(userData: any, attributes: any): User | null {
    const userRoles = userData.signInUserSession.accessToken.payload['cognito:groups'];
    console.log(attributes);
    if (userRoles.includes('Admins')) {
        return new Admin(attributes.email);
    }else if (userRoles.includes('Teachers')) {
        return new Teacher(attributes.email);
    }else if (userRoles.includes('Principals')) {
        return new Principal(attributes.email);
    }else if (userRoles.includes('Parents')) {
        return new Parent(attributes.email);
    }else if (userRoles.includes('Organizations')) {
        return new Organization(attributes.email);
    }
    return null;
}