import React, {useEffect, useState} from 'react';
import {API, graphqlOperation} from "aws-amplify";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import {Connect} from 'aws-amplify-react'
import {IConnectState} from "aws-amplify-react/lib/API/GraphQL/Connect";
import {Section} from "../../API";
import CardSkeleton from "../skeletons/CardSkeleton";
import {Link as RouterLink, useParams} from "react-router-dom";
import {listSections} from '../../graphql/queries';
import {onCreateSection, onDeleteSection, onUpdateSection} from "../../graphql/subscriptions";
import {Container} from '@mui/material';
import {AmplifyEmailField} from "@aws-amplify/ui-react";
import ActivityCard from "../Lesson/pe/ActivityCard";

const SectionGrid = () => {
    const {sectionId} = useParams();
    const updateItems = (prevData: any, data: any) => {
        let newData = {...prevData};
        console.log('prevData', prevData)
        newData.listSections.items = [
            data.onCreateSection,
            ...prevData.listSections.items
        ];
        return newData;
    };
    const [sections, setSections] = useState<Section[] | null>(null)
    useEffect(() => {
        const getSectionsAsync = async () => {
            setSections(null);
            const result: any = await API.graphql(graphqlOperation(`query MyQuery {
  listSections {
    items {
      id
      name
      parentID
      ImagePreview {
        id
        bucket
        key
      }
    }
  }
}`));
            setSections(result.data.listSections.items);
        }
        const createSubscription: any = API.graphql(graphqlOperation(onCreateSection));
        const updateSubscription = createSubscription.subscribe({
            next: (postData: any) => {
                getSectionsAsync();
            }
        })
        const deleteSubscription: any = API.graphql(graphqlOperation(onDeleteSection));
        const subscription = deleteSubscription.subscribe({
            next: (postData: any) => {
                getSectionsAsync();
            }
        })

        getSectionsAsync();
        return (() => {
            updateSubscription.unsubscribe();
            subscription.unsubscribe();
        })
    }, [])

    const Sections = () => {
        if (!sections) {
            return (
                <>
                    {
                        [0, 1, 2, 3, 4, 5].map((value) => (
                            <CardSkeleton key={value}/>
                        ))
                    }
                </>
            );
        }
        let sectionsToDisplay: Section[] = sections;
        if (sectionId) {
            sectionsToDisplay = sectionsToDisplay.filter(subject => subject.parentID === sectionId);
        } else {
            sectionsToDisplay = sectionsToDisplay.filter(subject => subject.parentID === null);
        }
        if (sectionsToDisplay.length === 0) {
            return <Container style={{textAlign: 'center'}}>
                <Typography>
                    No Sections
                </Typography>
            </Container>
        }
        return (
            <>
                {sectionsToDisplay?.sort((a, b) => a.name?.localeCompare(b.name ?? '') ?? 0).map((value: Section, index: number) => (
                    <Grid key={index} item lg={4} md={4} sm={6} xs={12}>
                        <ActivityCard linkTo={value.id} imagePath={value.ImagePreview?.key} title={value.name ?? ''}/>
                    </Grid>
                ))}
            </>
        );
    }
    return (
        <Grid container
              direction="row"
              justifyContent="center"
              alignItems="flex-start" spacing={3}
        >

            <Sections/>
        </Grid>
    );
}
export default SectionGrid;
