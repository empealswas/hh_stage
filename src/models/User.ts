export class User {
    userRoles: string [];
    email: string;
    constructor(userData: any) {
        this.userRoles = userData.signInUserSession.accessToken.payload['cognito:groups'];
        this.email = userData.attributes.email;
        console.log('User Roles: ', this.userRoles)
    }

    public isAdmin(): boolean {
        return this.userRoles.includes('Admins');
    }

    public isTeacher(): boolean {
        return this.userRoles.includes('Teachers');
    }
}