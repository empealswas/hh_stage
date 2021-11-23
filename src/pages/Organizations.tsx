import {useEffect} from "react";
import {listUnconfirmedOrganizations} from "../apiFunctions/apiFunctions";


type Organization = {
    email: string,
    name: string,
    confirmed: boolean,
}

const Organizations = () => {

    useEffect(() => {
        const getOrganizations = async () =>{
            const result: any = await listUnconfirmedOrganizations();
            const data = JSON.parse(result.users);
            let users = data.Users;
            console.log(users);
            users = users.filter((user: any) => {
                return user.Attributes.some((attribute: any) => {
                    if (attribute.Name === 'custom:organizationType') {
                        console.log('here')
                        return true;
                    }
                    return false;
                });
            })
            console.log(users);
        }
        getOrganizations()

        return () => {

        };
    }, []);

    return (
        <div>

        </div>
    );
};

export default Organizations;
