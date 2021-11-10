import {User} from "./User";
import {API, graphqlOperation} from "aws-amplify";
import {getPrincipal, getTeacher} from "../graphql/queries";
import {Teacher} from "../API";

export class Principal extends User{


    public override async getCredentials(): Promise<void> {
        const result: any = await API.graphql(graphqlOperation(getPrincipal, {id: this._email}));
        const principal: any = result.data.getPrincipal;
        this.firstName = principal.firstName;
        this.lastName = principal.lastName;
    }


    getRole(): string {
        return 'Principal'
    }
}