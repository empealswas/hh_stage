export class User {
    userRoles: string [];
    private _email: string;
    constructor(userData: any) {
        this.userRoles = userData.signInUserSession.accessToken.payload['cognito:groups'];
        this._email = userData.attributes.email;
        console.log('User Roles: ', this.userRoles)
    }

    public isAdmin(): boolean {
        return this.userRoles.includes('Admins');
    }

    public isTeacher(): boolean {
        return this.userRoles.includes('Teachers');
    }

    get email(): string {
        return this._email;
    }

    public getRoles(): string [] {
        return this.userRoles;
    }
}