import {User} from "./User";
import {API, graphqlOperation} from "aws-amplify";
import {listPupils} from "../graphql/queries";
import {Pupil} from "../API";

export class Admin extends User {

    async getCredentials(): Promise<void> {
        this.firstName = 'Admin';
        this.lastName = 'Admin';
    }

    async getPupilsIds(): Promise<any> {
        if (!this.pupilsIds) {
        const result: any = await API.graphql(graphqlOperation(listPupils, {limit: 100000}));
            this.pupilsIds = result.data.listPupils.items.map((pupil: Pupil) => pupil.id);
        }
        return this.pupilsIds;
    }

    getRole(): string {
        return 'Admin'
    }
}