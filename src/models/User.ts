
export class User {

    firstName?: string;
    lastName?: string;
    protected _email: string;

    public constructor(email: string) {
        this._email = email
    }

    public async getCredentials(){}

    public getFirstAndLastName(){
        return {
            firstName: this.firstName,
            lastName: this.lastName
        }
    }
    get email(): string {
        return this._email;
    }

    getRole(){
        return 'Teacher';
    }
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