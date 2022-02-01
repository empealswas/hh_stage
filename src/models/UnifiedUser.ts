import {User} from "./User";
import {API, graphqlOperation} from "aws-amplify";
import {getTeacher, getUser} from "../graphql/queries";

export class UnifiedUser extends User {
    async getCredentials(): Promise<void> {
        const result: any = await API.graphql(graphqlOperation(getUser, {id: this._email}));
        const user: any = result?.data?.getUser;
        this.firstName = user?.firstName;
        this.lastName = user?.lastName;
    }

    getPupilsIds(): Promise<any> {
        return Promise.resolve([]);
    }

    getRole(): string {
        return 'User'
    }

}