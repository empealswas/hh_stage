
export class User {
    firstName?: string;
    lastName?: string;
    protected _email: string;

    public constructor(email: string) {
        this._email = email
    }


    public async getCredentials(){}
    public getFirstAndLastName(){
        return {
            firstName: this.firstName,
            lastName: this.lastName
        }
    }

    get email(): string {
        return this._email;
    }
    getRole(){
        return 'Teacher';
    }

}
