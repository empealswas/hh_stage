import React, {useContext} from 'react';
import {graphqlOperation} from "aws-amplify";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import {Connect} from 'aws-amplify-react'
import {IConnectState} from "aws-amplify-react/lib/API/GraphQL/Connect";
import {listCurricula} from "../../../graphql/queries";
import {Curriculum, Term} from "../../../API";
import {Link as RouterLink} from "react-router-dom";
import {onCreateCurriculum} from "../../../graphql/subscriptions";
import CardSkeleton from "../../skeletons/CardSkeleton";
import YearPageGrids from "./YearPageGrids";
import {UserContext} from "../../../App";

const query =/*GraphQL*/`query MyQuery($id: ID = "") {
    getTeacher(id: $id) {
        classrooms {
            items {
                classroom {
                    id
                    name
                    yearGroup {
                        id
                        name
                    }
                }
            }
        }
    }
}`
const CurriculaGrid = () => {
    const updateItems = (prevData: any, data: any) => {
        let newData = {...prevData};
        newData.listCurricula.items = [
            data.onCreateCurriculum,
            ...prevData.listCurricula.items
        ];
        return newData;
    }
    const user = useContext(UserContext);
    console.log("User", user)
    return (
        <Grid container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start" spacing={2}
        >
            <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={2}
                      style={{flexGrow: 1, display: 'flex', flexWrap: 'wrap'}}>
                    <Connect
                        query={graphqlOperation(query, {id: user?.email})}
                    >
                        {({data, loading, errors}: IConnectState) => {
                            if (errors.lenght > 0) {
                                console.error(errors)
                            }
                            if (loading) {
                                return [0, 1, 2, 3, 4, 5].map((value) => (
                                    <CardSkeleton key={value}/>
                                ))
                            }
                            const yearGroups: Curriculum[] = data.getTeacher.classrooms.items
                                .filter((item: any) => !!item?.classroom?.yearGroup)
                                .flatMap((item: any) => item?.classroom?.yearGroup);
                            return(
                                <YearPageGrids yearPages={yearGroups}/>
                            )
                        }}
                    </Connect>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default CurriculaGrid;
