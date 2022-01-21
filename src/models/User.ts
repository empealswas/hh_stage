import {NavListProps} from "../components/nav-section/type";

export abstract class User {

    firstName?: string;

    lastName?: string;


    protected _email: string;

    pupilsIds: null | any[] = null;

    public constructor(email: string) {
        this._email = email
    }

    abstract getCredentials(): Promise<void>;

    public getFirstAndLastName() {
        return {
            firstName: this.firstName,
            lastName: this.lastName
        }
    }

    public getNavGroups(): {
        subheader: string;
        items: NavListProps[];
    }[] {
        return [];
    }

    get email(): string {
        return this._email;
    }

    get displayName(): string {
        return this.firstName + ' ' + this.lastName;
    }

    getRole() {
        return 'Teacher';
    }

    abstract getPupilsIds(): Promise<any>

}


///////////// if there is a pupil role... standardised way to get id, and username
// const getPupilsIdQuery =`query MyQuery ($id: ID = "") {
//   getPupil(id: $id) {
//     firstName
//     id
//     lastName
//   }
// }
// `;
// store ids
// pupilsIds: null | any[] = null;
//
// get ids and format correctly
//   async getPupilsIds() {
//     if (!this.pupilsIds) {
//         const result: any = await API.graphql(graphqlOperation(getPupilsIdQuery, {id: "decb3739-9468-4fbd-a578-5379fe39536c"}));
//         console.log(result);
//         let data: any[] = [];
//         if (result.data?.getPupil) {
//           let name = result.data.getPupil.firstName + " " + result.data.getPupil.lastName;
//           data.push({id: result.data.getPupil.id, name: name});
//           this.pupilsIds=data;
//         }
//     }
//     return this.pupilsIds;
// }