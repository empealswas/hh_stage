import {User} from "./User";
import {API, graphqlOperation} from "aws-amplify";
import {getParent} from "../graphql/queries";

export class Parent extends User {

    async getCredentials(): Promise<void> {
        const result: any = await API.graphql(graphqlOperation(getParent, {id: this._email}));
        const teacher: any = result.data.getTeacher;
        this.firstName = teacher.firstName;
        this.lastName = teacher.lastName;
    }

    getRole(): string {
        return 'Parent';
    }
}