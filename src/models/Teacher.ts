import {User} from "./User";
import {API, graphqlOperation} from "aws-amplify";
import {getTeacher} from "../graphql/queries";
import {Classroom} from "../API";
const getClassroomsQuery = `query MyQuery($id: ID = "") {
  getTeacher(id: $id) {
    classrooms {
      items {
        classroom {
          id
        }
      }
    }
  }
}
`
export class Teacher extends User {

    async getCredentials(): Promise<void> {
        const result: any = await API.graphql(graphqlOperation(getTeacher, {id: this._email}));
        const teacher: any = result.data.getTeacher;
        this.firstName = teacher.firstName;
        this.lastName = teacher.lastName;
    }
    async getClassrooms(): Promise<Classroom[]>{
        const result: any = await API.graphql(graphqlOperation(getClassroomsQuery, {id: this._email}));
        return result.data.getTeacher.classrooms.items.map((item: any) => item.classroom);
    }

    getRole(): string {
        return 'Teacher'
    }
}