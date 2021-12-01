import {User} from "./User";
import {API, graphqlOperation} from "aws-amplify";
import {getParent} from "../graphql/queries";

// const getPupilsIdQuery = `query MyQuery($id: ID = ""){
//     getParent(id: $id) {
//       children { 
//         items {
//           Pupil {
//             id 
//             firstName 
//             lastName 
//           }
//         }
//       }
//     }
//   }`

export class Parent extends User {
    pupilsIds: null | any[] = null;

    async getCredentials(): Promise<void> {
        const result: any = await API.graphql(graphqlOperation(getParent, {id: this._email}));
        const teacher: any = result.data.getParent;
        this.firstName = teacher.firstName;
        this.lastName = teacher.lastName;
    }

    // async getPupilsIds() {
    //     if (!this.pupilsIds) {
    //         const result: any = await API.graphql(graphqlOperation(getPupilsIdQuery, {id: this._email));
    //         let data: any[] = [];
    //         if (result.data?.getParent) {
    //           result.data.getParent.children.items.forEach((item: any) => {
    //             let name = item.Pupil.firstName + " " + item.Pupil.lastName;
    //             data.push({id: item.Pupil.id, name: name});
    //           })
    //           this.pupilsIds=data;
    //         }
    //     }
    //     return this.pupilsIds;
    // }

    getRole(): string {
        return 'Parent';
    }
}