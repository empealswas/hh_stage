import {User} from "./User";
import {API, graphqlOperation} from "aws-amplify";
import {getTeacher, getUser} from "../graphql/queries";
import {NavListProps} from "../components/nav-section/type";
import {PATH_DASHBOARD} from "../routes/paths";
import {ICONS} from "../layouts/dashboard/navbar/NavConfig";
import Iconify from "../components/Iconify";

export class UnifiedUser extends User {
    async getCredentials(): Promise<void> {
        const result: any = await API.graphql(graphqlOperation(getUser, {id: this._email}));
        const user: any = result?.data?.getUser;
        this.firstName = user?.firstName;
        this.lastName = user?.lastName;
    }

    getNavGroups(): { subheader: string; items: NavListProps[] }[] {
        if (this.isAdmin) {

            return [
                {
                    subheader: 'admins',
                    items: [
                        {
                            title: 'Test Page',
                            path: PATH_DASHBOARD.general.test,
                            icon: ICONS.analytics
                        }

                    ]
                }
            ]
        }
        return super.getNavGroups();
    }

    getPupilsIds(): Promise<any> {
        return Promise.resolve([]);
    }

    getRole(): string {
        if (this.isAdmin) {
            return "Admin";
        }
        return 'User';
    }

}