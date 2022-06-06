import React, {createContext, useEffect, useState} from 'react';
import {AbilityContext} from 'src/abilities/Ability';
import defineAbilityForUserInOrganization from 'src/abilities/defineAbilityForUserInOrganization';
import LoadingScreen from "../../../components/LoadingScreen";
import {User, UserInOrganization} from "../../../API";
import {API, graphqlOperation} from "aws-amplify";
import {Outlet, useParams} from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import {AnyAbility} from "@casl/ability";
import { Alert } from '@mui/material';

const rolesQuery = `query MyQuery($id: ID = "", $eq: ID = "") {
  getUser(id: $id) {
    organizations(filter: {organizationID: {eq: $eq}}) {
      items {
        id
        roles {
          items {
            userRole {
              name
              id
              permissions {
      canAccessAttendanceSheet
      canDeleteLessons
      canRateLessons
      canCreateLesson
      canUpdateLesson
      canUploadContent
      canViewContent
      canCreateSection
      canDeleteSection
      canUpdateSection
      canViewDashboard
      canManageOrganization
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
export const UserInOrganizationContext = createContext<User | null>(null);


const OrganizationOutlet = () => {
    const {organizationId} = useParams();
    const {user} = useAuth();
    const [userOrganization, setUserOrganization] = useState<User | null>(null);
    useEffect(() => {
        const getRoles = async () => {
            setUserOrganization(null);
            const result: any = await API.graphql(graphqlOperation(rolesQuery, {id: user?.email, eq: organizationId}))
            setUserOrganization(result.data.getUser);
            console.log("Roles", result);
        }
        getRoles();
        return () => {

        };
    }, [organizationId]);



    if (!userOrganization ) {
        return (<LoadingScreen/>);
    }

    return (
        <AbilityContext.Provider value={defineAbilityForUserInOrganization(userOrganization, String(organizationId))}>
            <UserInOrganizationContext.Provider value={userOrganization}>
                <Outlet/>
            </UserInOrganizationContext.Provider>
        </AbilityContext.Provider>
    );
};

export default OrganizationOutlet;
