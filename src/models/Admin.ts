import {User} from "./User";

export class Admin extends User {

    async getCredentials(): Promise<void> {
        this.firstName = 'Admin';
        this.lastName = 'Admin';
    }

    getRole(): string {
        return 'Admin'
    }
}