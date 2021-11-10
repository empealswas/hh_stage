import {User} from "./User";
import {API, graphqlOperation} from "aws-amplify";
import {getTeacher} from "../graphql/queries";

export class Teacher extends User {

    async getCredentials(): Promise<void> {
        const result: any = await API.graphql(graphqlOperation(getTeacher, {id: this._email}));
        const teacher: any = result.data.getTeacher;
        this.firstName = teacher.firstName;
        this.lastName = teacher.lastName;
    }


    getRole(): string {
        return 'Teacher'
    }
}