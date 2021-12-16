import React, {useEffect, useState} from 'react';
import {Stack, Typography} from "@material-ui/core";
import {Box, Breadcrumbs, Container, Divider, Link} from "@mui/material";
import {Can} from "../../utils/Ability";
import AddSectionModal from "./AddSectionModal";
import SectionGrid from "./SectionGrid";
import DeletionModal from "../Lesson/YearPage/DeletionModal";
import HeaderOptions from "../Lesson/YearPage/Title";
import {Link as RouterLink, useNavigate, useParams} from "react-router-dom";
import {Section} from "../../API";
import {API, graphqlOperation} from "aws-amplify";
import {getSection, listSections} from "../../graphql/queries";
import EditSectionModal from "./EditSectionModal";
import {onUpdateSection} from "../../graphql/subscriptions";
import {deleteSection} from "../../graphql/mutations";
import {useSnackbar} from "notistack";
import AddLessonModalSection from "./AddLessonModalSection";
import LessonsGridSection from "./LessonsGridSection";


const SectionOverview = () => {
    const {sectionId} = useParams();
    const [section, setSection] = useState<Section | null>(null);
    const [allSections, setAllSections] = useState<Section[] | null>(null);

    useEffect(() => {
        const getSectionAsync = async () => {
            const result: any = await API.graphql(graphqlOperation(getSection, {id: sectionId}));
            let fetchedSection = result.data.getSection;
            setSection(fetchedSection);
        }
        const getBreadcrumbs = async () => {
            const result: any = await API.graphql(graphqlOperation(listSections));
            setAllSections(result.data.listSections.items);
        }
        if (sectionId) {
            getSectionAsync();
            getBreadcrumbs();
        }
        const createSubscription: any = API.graphql(graphqlOperation(onUpdateSection));
        const updateSubscription = createSubscription.subscribe({
            next: (postData: any) => {
                getSectionAsync();
            }
        })
        return () => {
            updateSubscription.unsubscribe();
        };
    }, [sectionId]);
    const deleteSectionAsync = async () => {
        return API.graphql(graphqlOperation(deleteSection, {
            input: {
                id: section?.id
            }
        }))
    }
    const snackbar = useSnackbar();
    const navigate = useNavigate();
    const BreadcrumbsHeader = () => {
        if (!allSections) {
            return <></>;
        }
        const links: Section[] = [];
        let parent: Section | undefined = allSections?.filter(section => section.id === sectionId)[0];
        while (parent) {
            parent = allSections?.filter(section => section.id === parent?.parentID)[0];
            if (parent) {
                links.push(parent);
            }
        }
        allSections?.filter(section => section.id === sectionId);
        return (
            <Breadcrumbs aria-label="breadcrumb">
                {links.reverse().map(section => <Link component={RouterLink} underline={'hover'} color={'secondary'} to={`section/${section.id}`}>
                    {section.name}
                </Link>)}
            </Breadcrumbs>
        )
    }
    return (
        <Container>
            {section && <HeaderOptions title={sectionId ? section?.name ?? "Sections" : "Sections"}
                                       editingForm={
                                           <Can I={'update'} a={'section'}>
                                               <EditSectionModal updateObject={section}/>
                                           </Can>
                                       }
                                       deletionModal={
                                           <Can I={'delete'} a={'section'}>
                                               <DeletionModal title={'Do you want to delete this Year Group?'}
                                                              onDelete={async () => {
                                                                  const result: any = await deleteSectionAsync();
                                                                  snackbar.enqueueSnackbar(`You\'ve successfully deleted Year Group: ${result.data.deleteSection.name}`, {variant: 'success'})
                                                                  navigate(-1);
                                                              }}/>
                                           </Can>
                                       }
            />}

            <Stack direction={{xs: 'column', sm: "row"}} alignItems="center" justifyContent={{xs: 'start', sm: "space-between"}} spacing={{xs: 2, sm: 0}} mb={5}>
                <Typography variant="h4" gutterBottom>
                    {allSections &&
                    <BreadcrumbsHeader/>
                    }
                </Typography>
                <Can I={'create'} a={'section'}>
                    <AddSectionModal/>
                    {sectionId &&
                    <AddLessonModalSection/>
                    }
                </Can>
            </Stack>
            <Typography variant={'h3'} textAlign={'center'}>Sections</Typography>
            <Box height={50}/>
            <SectionGrid/>
            <Box height={50}/>
            <Divider sx={{height: 3}}/>
            <Box height={50}/>
            {sectionId &&
                <>
            <Typography variant={'h3'} textAlign={'center'}>Lessons</Typography>
                    <Box height={50}/>

                    <LessonsGridSection/>
                </>
            }
        </Container>
    );
};

export default SectionOverview;
