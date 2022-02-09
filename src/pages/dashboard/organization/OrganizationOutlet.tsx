import React, {useEffect, useState} from 'react';
import { AbilityContext } from 'src/abilities/Ability';
import defineAbilityForUserInOrganization from 'src/abilities/defineAbilityForUserInOrganization';
import LoadingScreen from "../../../components/LoadingScreen";
import {User} from "../../../API";
import {API, graphqlOperation} from "aws-amplify";
import {Outlet, useParams} from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
const rolesQuery = `query MyQuery($id: ID = "", $eq: ID = "") {
  getUser(id: $id) {
    organizations(filter: {organizationID: {eq: $eq}}) {
      items {
        roles {
          items {
            userRole {
              name
              id
              permissions {
                canAccessAttendanceSheet
                canDeleteLessons
                canRateLessons
              }
            }
          }
        }
      }
    }
    ownedOrganizations {
      items {
        id
      }
    }
  }
}`;
const OrganizationOutlet = () => {
    const {organizationId} = useParams();
    const {user} = useAuth();
    const [userInOrganization, setUserInOrganization] = useState<User | null>(null);
    useEffect(() => {
        const getRoles = async () => {
            setUserInOrganization(null);
            const result: any = await API.graphql(graphqlOperation(rolesQuery, {id: user?.email, eq: organizationId}))
            setUserInOrganization(result.data.getUser);
            console.log("Roles", result);
        }
        getRoles();
        return () => {

        };
    }, [organizationId]);
    if (!userInOrganization) {
        return (<LoadingScreen/>);
    }

    return (
        <AbilityContext.Provider value={defineAbilityForUserInOrganization(userInOrganization, String(organizationId))}>
            <Outlet/>
        </AbilityContext.Provider>
    );
};

export default OrganizationOutlet;
