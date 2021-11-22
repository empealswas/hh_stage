import {User} from "./User";
import {API, graphqlOperation} from "aws-amplify";
import {getOrganization, getTeacher} from "../graphql/queries";
import {Classroom} from "../API";
export class Organization extends User {

    async getCredentials(): Promise<void> {
        const result: any = await API.graphql(graphqlOperation(getOrganization, {id: this._email}));
        const organization: any = result.data.getOrganization;
        this.firstName = organization.name;
        this.lastName = organization.name;
    }

    getRole(): string {
        return 'Organization'
    }
}