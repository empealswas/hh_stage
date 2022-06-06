import {User} from "./User";
import {API, graphqlOperation} from "aws-amplify";
import {getParent} from "../graphql/queries";
import {NavListProps} from "../components/nav-section/type";
import {PATH_DASHBOARD} from "../routes/paths";
import {ICONS} from "../layouts/dashboard/navbar/NavConfig";

const getPupilsIdQuery = `query MyQuery($id: ID = ""){
    getParent(id: $id) {
      children { 
        items {
          Pupil {
            id 
            firstName 
            lastName 
          }
        }
      }
    }
  }`

export class Parent extends User {

    pupilsIds: null | any[] = null;

    async getCredentials(): Promise<void> {
        const result: any = await API.graphql(graphqlOperation(getParent, {id: this._email}));
        const teacher: any = result.data.getParent;
        this.firstName = teacher.firstName;
        this.lastName = teacher.lastName;
        await this.getPupilsIds();
    }


    getNavGroups(): { subheader: string; items: NavListProps[] }[] {
        return [
            {
                subheader: 'Parent',
                items: [{
                    title: 'Children',
                    path: PATH_DASHBOARD.parent.child,
                    icon: ICONS.user,
                    children: this.pupilsIds?.map((item: any) => {
                        return {
                            title: item.name,
                            path: PATH_DASHBOARD.parent.child + '/' + item.id,
                        }
                    })
                }]
            }
        ]
    }

    async getPupilsIds() {
        if (!this.pupilsIds) {
            const result: any = await API.graphql(graphqlOperation(getPupilsIdQuery, {id: this._email}));
            let data: any[] = [];
            if (result.data?.getParent) {
                result.data.getParent.children.items.forEach((item: any) => {
                    let name = item.Pupil.firstName + " " + item.Pupil.lastName;
                    data.push({id: item.Pupil.id, name: name});
                })
                this.pupilsIds = data;
            }
        }
        return this.pupilsIds;
    }

    getRole(): string {
        return 'Parent';
    }
}