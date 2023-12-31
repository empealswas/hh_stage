import {User} from "./User";
import {API, graphqlOperation} from "aws-amplify";
import {getTeacher} from "../graphql/queries";
import {Classroom, Pupil} from "../API";

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

const getPupilsIdQuery =
    `query MyQuery($id: ID = "") {
  getTeacher(id: $id) {
    classrooms {
      items {
        classroom {
          pupils {
            items {
              id
              pupil {
                firstName
                lastName
                id
                terraId
              }
            }
          }
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
        this.firstName = result.data.getTeacher.firstName;
        this.lastName = result.data.getTeacher.lastName;
    }

    async getClassrooms(): Promise<Classroom[]> {
        const result: any = await API.graphql(graphqlOperation(getClassroomsQuery, {id: this._email}));
        return result.data.getTeacher.classrooms.items.map((item: any) => item.classroom);
    }

    async getPupilsIds() {
        if (!this.pupilsIds) {
            const result: any = await API.graphql(graphqlOperation(getPupilsIdQuery, {id: this._email}));
            let data: any[] = [];
            if (result.data?.getTeacher) {
                result.data.getTeacher.classrooms.items[0].classroom.pupils.items.forEach((item: any) => {
                    let name = item.pupil.firstName + " " + item.pupil.lastName;
                    data.push({id: item.pupil.id, name: name});
                })
                this.pupilsIds = data;
            }
            this.pupilsIds = result.data.getTeacher.classrooms.items
                .map((item: any) => item.classroom)
                .flatMap((classroom: Classroom) => classroom?.pupils?.items)
                .map((item: any) => item.pupil)
                .map((item: Pupil) => {
                    return {
                        id: item.terraId,
                        name: `${item.firstName} ${item.lastName}`
                    }
                })
        }
        return this.pupilsIds;
    }


    getRole(): string {
        return 'Teacher'
    }
}

