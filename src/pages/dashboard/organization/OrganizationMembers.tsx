import React from 'react';
import Page from "../../../components/Page";
import {Button, Card, CardContent, Container, Stack, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import {PATH_DASHBOARD} from "../../../routes/paths";
import Iconify from "../../../components/Iconify";
import OrganizationsTable from "../user/OrganizationsTable";
import useSettings from "../../../hooks/useSettings";
import OrganizationMembersTable from "./OrganizationMembersTable";
import InviteMemberDialog from "./InviteMemberDialog";
import MembersTabs from "./member/MembersTabs";
import {API, graphqlOperation} from "aws-amplify";
import useAuth from '../../../hooks/useAuth';
import {useParams} from "react-router-dom";
import {CreateUserInOrganizationInput, UserInOrganizationStatus} from "../../../API";
import {createUserInOrganization} from "../../../graphql/mutations";
import { useState } from 'react';

const usersQuery = `query MyQuery {
  listUsers(limit: 100000000) {
    items {
      id
    }
  }
}`;

const OrganizationMembers = () => {

    const {themeStretch} = useSettings();
    const {user, register} = useAuth();
    const {organizationId} = useParams();

    const [userNo, setUserNo] = useState(0);
    const [userCount, setUserCount] = useState(0);

    const createUsers = async (event: any) => {
        // get existing users
        let result: any = await API.graphql(graphqlOperation(usersQuery));
        let users = result?.data?.listUsers?.items ?? [];
        // get username part for each user id
        let existingUsernames = users.map((item: any) => item.id.split("@")[0]);
        // sort the existing usernames (to help us find the username with highest number appended)
        existingUsernames.sort();
        // get new-users data from CSV file
        let text = await event.target.files[0].text();
        let lines = text.replace(/\r\n/g, "\n").split("\n");
        setUserCount(lines.length);
        let logText = "";
        // for each new user
        for (let i = 0; i < lines.length; i ++) {
            setUserNo(i + 1);
            let line = lines[i];
            let fields = line.split(",");
            let firstName = fields[0];
            let lastName = fields[1];
            let postcode = fields[2];
            let dateOfBirth = fields[3];
            let recoveryEmailAddress = fields[4];
            let username = firstName.toLowerCase() + "." + lastName.toLowerCase();
            // get existing usernames starting with username
            let usernames = existingUsernames.filter((item: any) => item.toLowerCase().startsWith(username));
            // prepare a unique user id if necessary
            if (usernames.length > 0) {
                // get the last item (the username with the highest number appended)
                let highestUsername = usernames[usernames.length - 1];
                // get the appended number (or 0, if it does not exist)
                let number = 0;
                if (highestUsername.length > username.length) {
                    let digitCount = highestUsername.length - username.length;
                    number = parseInt(highestUsername.substr(highestUsername.length - digitCount));
                }
                username = username + (number + 1);
            }
            let userId = username + "@healthy.habits";
            // set password
            let password = userId;
            // create user
            try {
                await register(userId, password, firstName, lastName, recoveryEmailAddress, dateOfBirth, postcode);
                // update the existing usernames and sort
                existingUsernames.push(username);
                existingUsernames.sort();
            }
            catch (error) {
                logText += "Failed to create user '" + line + "' as '" + userId + "'\n";
                continue;
            }
            // create user in organization
            try {
                let input: CreateUserInOrganizationInput = {
                    userID: userId,
                    organizationID: organizationId,
                    status: UserInOrganizationStatus.ACCEPTED
                }
                await API.graphql(graphqlOperation(createUserInOrganization, {input}));
            }
            catch (error) {
                logText += "Failed to add user '" + userId + "' to organization\n";
            }
        }
        // finished
        setUserNo(0);
        setUserCount(0);
        if (logText == "") alert("Users created successfully");
        else alert(logText);
    };

    return (
        <Container maxWidth={themeStretch ? false : 'lg'}>

            <Stack sx={{mb: 2}} justifyContent={{sx: 'center', md: 'space-between'}}
                   direction={{sx: 'column', md: 'row'}}>
                <Typography variant={'h4'}>Members of your organization</Typography>
                <InviteMemberDialog/>
                {user?.email == "admin@hal.health" &&
                    <div>
                        <Typography>Add Members From CSV File:</Typography>
                        <input type="file" accept="text/csv" onChange={(event) => createUsers(event)}></input>
                        <input type="text" value={"User " + userNo + " of " + userCount}></input>
                    </div>
                }
            </Stack>

                    <MembersTabs/>
        </Container>
    );
};

export default OrganizationMembers;
