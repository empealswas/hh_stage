export class User {
    userRoles;
    _email;
    constructor(userData) {
        this.userRoles = userData.signInUserSession.accessToken.payload['cognito:groups'];
        this._email = userData.attributes.email;
        console.log('User Roles: ', this.userRoles);
    }
    isAdmin() {
        return this.userRoles.includes('Admins');
    }
    isTeacher() {
        return this.userRoles.includes('Teachers');
    }
    get email() {
        return this._email;
    }
    getRoles() {
        return this.userRoles;
    }
}
