import React from 'react';
import Page from "../components/Page";
import {Container, Stack, Typography} from "@material-ui/core";
import {School} from "../API";
import {Connect} from "aws-amplify-react";
import {graphqlOperation} from "aws-amplify";
import {listSchools} from "../graphql/queries";
import {IConnectState} from "aws-amplify-react/lib/API/GraphQL/Connect";
import AddingSchoolDialog from "../components/School/AddingSchoolDialog";
import SchoolInteraction from "../components/School/SchoolInteraction";
import {Outlet} from "react-router-dom";

export const SchoolsContext = React.createContext<School[] | null>(null);

const Schools = () => {
    return (
        // @ts-ignore
        <Page title="Schools | Healthy Habits">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Schools
                    </Typography>
                    <AddingSchoolDialog/>
                </Stack>
                    <Connect query={graphqlOperation(listSchools)}>
                        {(schools: IConnectState) => {
                            return (
                                <SchoolsContext.Provider
                                    value={schools.loading ? null : schools.data.listSchools.items}>
                                    <SchoolInteraction/>
                                </SchoolsContext.Provider>
                            );
                        }
                        }
                    </Connect>
                <Outlet/>
            </Container>
        </Page>
    );
};




export default Schools;
