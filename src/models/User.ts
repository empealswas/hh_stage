import {API, graphqlOperation} from "aws-amplify";
import {getTeacher} from "../graphql/queries";
import {Teacher} from "../API";

export class User {
    userRoles: string [];
    firsName?: string | null;
    lastName?: string | null;
    private _email: string;
    constructor(userData: any) {
        this.userRoles = userData.signInUserSession.accessToken.payload['cognito:groups'];
        this._email = userData.attributes.email;
        console.log('User Roles: ', this.userRoles);
    }
    private async getTeacherCredentials(){
        if(this.isAdmin()) return;
        if(this.isParent()) return;
        const result: any = await API.graphql(graphqlOperation(getTeacher, {id: this._email}));
        const teacher: Teacher = result.data.getTeacher;
        this.firsName = teacher.firstName;
        this.lastName = teacher.lastName;
        console.log('teacher' , teacher)
    }
    public async getFirstAndLastName(){
        if (this.isAdmin()) {
            return {
                firstName: 'Admin',
                lastName: 'Admin'
            }
        }
        if (this.isParent()) {
            return{
                firstName: 'Parent',
                lastName: 'Parent'
            }
        }
        if (!this.firsName || this.lastName) {
            await this.getTeacherCredentials();
        }
        return {
            firstName: this.firsName,
            lastName: this.lastName
        }
    }
    public async getFirstName(){
        if (this.isAdmin()) {
            return 'Admin'
        }
        if (this.isParent()) {
            return 'Parent';
        }
        if (!this.firsName) {
            await this.getTeacherCredentials();
        }
        return this.firsName;
    }
    public async getLastName(){
        if (this.isAdmin()) {
            return '';
        }
        if (this.isParent()) {
            return '';
        }
        if (!this.lastName) {
            await this.getTeacherCredentials();
        }
        return this.lastName;
    }
    public isAdmin(): boolean {
        return this.userRoles.includes('Admins');
    }

    public isTeacher(): boolean {
        return this.userRoles.includes('Teachers');
    }

    public isParent(): boolean{
        return this.userRoles.includes('Parents');
    }

    get email(): string {
        return this._email;
    }

    public getRoles(): string [] {
        return this.userRoles;
    }
}