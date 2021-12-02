import {User} from "./User";
import {API, graphqlOperation} from "aws-amplify";
import {getPrincipal, getTeacher} from "../graphql/queries";
import {Teacher} from "../API";

const getPupilsIdQuery =`query MyQuery ($id: ID = "") {
    getPrincipal(id: $id) {
        id
        School {
            Pupils { 
                items { 
                    id 
                    firstName 
                    lastName 
                }
            }
        }
    }
}
`
export class Principal extends User{
	pupilsIds: null | any[] = null;

	public override async getCredentials(): Promise<void> {
		const result: any = await API.graphql(graphqlOperation(getPrincipal, {id: this._email}));
		const principal: any = result.data.getPrincipal;
		this.firstName = principal.firstName;
		this.lastName = principal.lastName;
	}

	async getPupilsIds() {
		if (!this.pupilsIds) {
			const result: any = await API.graphql(graphqlOperation(getPupilsIdQuery, {id: this._email}));
			let data: any[] = [];
			if (result.data?.getPrincipal) {
				result.data.getPrincipal.School.Pupils.items.forEach((item: any) => {
					let name = item.firstName + " " + item.lastName;
					data.push({id: item.id, name: name});
				})
				this.pupilsIds=data;
			}
		}
		return this.pupilsIds;
  }

	getRole(): string {
			return 'Principal'
	}
}