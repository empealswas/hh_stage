import React, {useEffect, useState} from 'react';
import useAuth from "../../../../hooks/useAuth";
import {useParams} from "react-router-dom";
import {UserInOrganization, UserRole} from "../../../../API";
import {API, graphqlOperation} from "aws-amplify";
import AttendanceSheetTable from "./AttendanceSheetTable";
import LoadingScreen from "../../../LoadingScreen";
import {Alert} from "@mui/material";

const getUserInOrganizationQuery = `query MyQuery($id: ID = "", $eq: ID = "") {
  getOrganization(id: $id) {
    members(filter: {userID: {eq: $eq}}) {
      items {
        id
        classrooms {
          items {
            id
            classroom {
              id
              name
              members {
                items {
                  userInOrganization {
                    user {
                      id
                      lastName
                      firstName
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`
const getRolesQuery = `query MyQuery($id: ID = "") {
  getOrganization(id: $id) {
    roles {
      items {
        id
        name
      }
    }
  }
}`;
const AttendanceSheetContainer = () => {
    const {user} = useAuth();
    const {organizationId} = useParams();
    const [userInOrganization, setUserInOrganization] = useState<UserInOrganization | null>(null);
    const [roles, setRoles] = useState<UserRole[] | null>(null);

    useEffect(() => {
        const getUserInOrganization = async () => {
            const result: any = await API.graphql(graphqlOperation(getUserInOrganizationQuery, {
                id: organizationId,
                eq: user?.email
            }))
            let userInOrganization = result.data.getOrganization.members.items[0];
            if (!userInOrganization) {
                throw new Error('This user does not belong to this organization)');
            }
            setUserInOrganization(userInOrganization);
        }
        const getRoles = async () => {
            const result: any = await API.graphql(graphqlOperation(getRolesQuery, {id: organizationId}));
            setRoles(result.data.getOrganization.roles.items);
        }
        getUserInOrganization()
        getRoles()
        return () => {

        };
    }, []);
    if (!userInOrganization || !roles) {
        return (<LoadingScreen/>);
    }
    if (userInOrganization.classrooms?.items.length === 0) {
        return (<Alert severity={'error'}>You are not in any team in this club, therefore you cannot view the attendance sheet.</Alert>);
    }
    if (roles.length === 0) {
        return (<Alert severity={'error'}>There is no roles in this club, please create some in organization settings.</Alert>);
    }
    return (
        <AttendanceSheetTable userInOrganization={userInOrganization} roles={roles}/>
    );
};

export default AttendanceSheetContainer;
