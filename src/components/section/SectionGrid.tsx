import React, {useEffect, useState} from 'react';
import {API, graphqlOperation} from "aws-amplify";

import {Section, SectionFromContentStore} from "../../API";
import {useParams} from "react-router-dom";
import {onCreateSection, onDeleteSection} from "../../graphql/subscriptions";
import {Container, Grid} from '@mui/material';
import CardSkeleton from "../skeleton/CardSkeleton";
import ActivityCard from "./ActivityCard";
import EmptyContent from "../EmptyContent";
import useUserInOrganization from 'src/hooks/useUserInOrganization';

const getChildrenSectionsQuery = `query MyQuery($eq: ID = "") {
  listSections(filter: {parentID: {eq: $eq}}, limit: 100000) {
    items {
      name
      id
      parentID
      organizationID
      ImagePreview {
        bucket
        id
        key
      }
      rolesThatCanAccess {
        items {
          userRole {
            name
            id
          }
        }
      }
    }
  }
}
`
const parentsQuery = `query MyQuery($organizationId: ID = "") {
  listSections(filter: {parentID: {attributeExists: false}, organizationID: {eq: $organizationId}}, limit: 100000) {
    items {
      name
      id
      parentID
      organizationID
      ImagePreview {
        bucket
        id
        key
      }
      rolesThatCanAccess {
        items {
          userRole {
            name
            id
          }
        }
      }
    }
  }
}
`
const getContentStoreSectionsQuery = `query MyQuery($id: ID = "") {
  getOrganization(id: $id) {
    SectionsFromContentStore {
      items {
        section {
          ImagePreview {
            bucket
            createdAt
            id
            key
            lessonID
          }
          name
          id
          rolesThatCanAccess {
            items {
              id
              userRole {
                id
                name
              }
            }
          }
        }
      }
    }
  }
}`
const SectionGrid = () => {
    const {sectionId, organizationId} = useParams();
    const userInOrganization = useUserInOrganization();
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
    const [sectionsFromContentStore, setSectionsFromContentStore] = useState<SectionFromContentStore[] | null>(null);
    useEffect(() => {
        const getSectionsAsync = async () => {
            setSections(null);
            if (sectionId) {
                const result: any = await API.graphql(graphqlOperation(getChildrenSectionsQuery, {eq: sectionId}));
                console.log(result);
                setSections(result.data.listSections.items);
            } else {
                const result: any = await API.graphql(graphqlOperation(parentsQuery, {organizationId: organizationId}));
                console.log(result)
                setSections(result.data.listSections.items);
                const result2: any = await API.graphql(graphqlOperation(getContentStoreSectionsQuery, {id: organizationId}))
                let items = result2.data.getOrganization?.SectionsFromContentStore.items;
                console.log(items);
                setSectionsFromContentStore(items);
            }


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
    }, [sectionId])

    const Sections = () => {
        if (!sections) {
            return (
                <>
                    {
                        [0, 1, 2, 3, 4, 5].map((value) => (<Grid key={value} item lg={4} md={4} sm={6} xs={12}>
                                <CardSkeleton height={'250px'} key={value}/>
                            </Grid>
                        ))
                    }
                </>
            );
        }
        let sectionsToDisplay: Section[] = sections;

        return (
            <>
                {sectionsToDisplay?.filter(value => {
                    if (value.organizationID !== organizationId) {
                        return true;
                    }
                    if (userInOrganization.ownedOrganizations?.items.some(organization => organization?.id === organizationId)) {
                        return true;
                    }
                    const inOrganization = userInOrganization.organizations?.items[0];
                    return value.rolesThatCanAccess?.items.map(role => role?.userRole).some(role => inOrganization?.roles?.items.map(userRole => userRole?.userRole).some(userRole => userRole?.id === role?.id))
                })?.sort((a, b) => a.name?.localeCompare(b.name ?? '') ?? 0).map((value: Section, index: number) => (
                    <Grid key={value.id} item lg={4} md={4} sm={6} xs={12}>
                        <ActivityCard linkTo={sectionId ? '..\\' + value.id : `section/${value.id}`}
                                      imagePath={value?.ImagePreview?.key} title={value.name ?? ''}/>

                    </Grid>
                ))}
                {!sectionId && sectionsFromContentStore?.map(value =>
                    <Grid key={value.id} item lg={4} md={4} sm={6} xs={12}>
                        <ActivityCard linkTo={`section/${value.section.id}`}
                                      imagePath={value?.section.ImagePreview?.key} title={value.section.name ?? ''}/>
                    </Grid>
                )}
            </>
        );
    }
    return (
        <Grid container
              direction="row"
              justifyContent="center"
              alignItems="flex-start"
              spacing={3}
        >

            <Sections/>
        </Grid>
    );
}
export default SectionGrid;
