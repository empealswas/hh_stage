import React, {useEffect, useState} from 'react';
import {Box, Breadcrumbs, Button, Container, Divider, Link, Stack, Typography} from "@mui/material";
import {Link as RouterLink, useNavigate, useParams} from "react-router-dom";
import {Section, User, UserInOrganization} from "../../API";
import {API, graphqlOperation} from "aws-amplify";
import {getSection, listSections} from "../../graphql/queries";
import {onUpdateSection} from "../../graphql/subscriptions";
import {deleteSection} from "../../graphql/mutations";
import {useSnackbar} from "notistack";
import SectionHeader from "./SectionHeader";
import AddSectionModal from "./AddSectionModal";
import EditSectionModal from "./EditSectionModal";
import AddLessonModalSection from "./AddLessonModalSection";
import DeletionModal from "./DeletionModal";
import SectionGrid from "./SectionGrid";
import LessonsGridSection from "./lesson/LessonsGridSection";
import Iconify from "../Iconify";
import AddingDialog from "../dialog/AddingDialog";
import NewSectionForm from "../../pages/dashboard/section/NewSectionForm";
import defineAbilityFor from "../../abilities/defineAbilityFor";
import defineAbilityForUserInOrganization from 'src/abilities/defineAbilityForUserInOrganization';
import useAuth from "../../hooks/useAuth";
import {AbilityContext, Can} from 'src/abilities/Ability';
import LoadingScreen from "../LoadingScreen";

const getSectionQuery = `query MyQuery($id: ID = "") {
  getSection(id: $id) {
    id
    name
    organizationID
    isPlacedInContentStore
    SectionOptions {
      Durations
      DeliveredBy
      Activities
      createdAt
      id
    }
    rolesThatCanAccess {
      items {
        id
        userRole {
          id
          name
        }
      }
    }
    ImagePreview {
      id
      key
      bucket
    }
  }
}
`

const SectionOverview = () => {
    const {sectionId} = useParams();
    const [section, setSection] = useState<Section | null>(null);
    const {organizationId} = useParams();
    const {user} = useAuth();


    useEffect(() => {
        const getSectionAsync = async () => {
            const result: any = await API.graphql(graphqlOperation(getSectionQuery, {id: sectionId}));
            let fetchedSection = result.data.getSection;
            setSection(fetchedSection);
        }


        if (sectionId) {
            getSectionAsync();
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
    /*    const BreadcrumbsHeader = () => {
            if (!allSections) {
                return <></>;
            }
            const links: Section[] = [];
            let parent: Section | undefined = allSections?.filter(section => section.id === sectionId)[0];
            while (parent) {
                const parents = allSections?.filter(section => section.id === parent?.parentID)[0];
                if (parents) {
                    links.push(parents);
                }
            }
            allSections?.filter(section => section.id === sectionId);
            return (
                <Breadcrumbs aria-label="breadcrumb">
                    {links.reverse().map(section => <Link key={section.id} component={RouterLink} underline={'hover'}
                                                          color={'secondary'} to={`${section.id}`}>
                        {section.name}
                    </Link>)}
                </Breadcrumbs>
            )
        }*/

    return (

        <Container>
            {section && <SectionHeader title={sectionId ? section?.name ?? "Sections" : "Sections"}
                                       editingForm={
                                           organizationId === section.organizationID ?
                                               <Can I={'update'} a={'section'}>
                                                   <EditSectionModal updateObject={section}/>
                                               </Can>
                                               : <></>
                                       }
                                       deletionModal={
                                           <Can I={'delete'} a={'section'}>
                                               {organizationId === section.organizationID ?
                                                   <DeletionModal title={'Do you want to delete this Year Group?'}
                                                                  onDelete={async () => {
                                                                      const result: any = await deleteSectionAsync();
                                                                      snackbar.enqueueSnackbar(`You\'ve successfully deleted Year Group: ${result.data.deleteSection.name}`, {variant: 'success'})
                                                                      navigate(-1);
                                                                  }}/>
                                                   :
                                                   <></>}
                                           </Can>
                                       }
            />}

            <Stack direction={{xs: 'column', sm: "row"}} alignItems="center"
                   justifyContent={{xs: 'start', sm: "space-between"}} spacing={{xs: 2, sm: 0}} mb={5}>
                {/*<Can I={'create'} a={'section'}>*/}
                {/*                <AddingDialog title={'Add'} buttonName={'Done'} onSubmit={async () => {

                }}>
                    <NewSectionForm/>
                </AddingDialog>*/}
                {organizationId === (section?.organizationID ?? organizationId) &&
                    <Can I={'create'} a={'section'}>
                        <AddSectionModal/>
                    </Can>
                }
                {sectionId ?
                    organizationId === section?.organizationID &&
                    <Can I={'create'} a={'lesson'}>
                        <Button component={RouterLink} to={'lesson/new'} variant={'contained'}>Add Lesson</Button>
                    </Can>

                    :
                    <>
                        <Can I={'manage'} an={'organization'}>
                            <Button component={RouterLink} startIcon={<Iconify icon={'bi:gear'}/>} to={'manage'}
                                    variant={'contained'}>Manage</Button>
                        </Can>
                        <Can I={'read'} this={'dashboard'}>
                            <>
                                <Button component={RouterLink} startIcon={<Iconify icon={'carbon:dashboard'}/>}
                                        to={'steps'}
                                        variant={'contained'}>Steps Dashboard</Button>
                                <Button component={RouterLink} startIcon={<Iconify icon={'carbon:dashboard'}/>}
                                        to={'dashboard'}
                                        variant={'contained'}>Activity Dashboard</Button>
                                <Button component={RouterLink} startIcon={<Iconify icon={'ion:fitness-outline'}/>}
                                        to={'activity'}
                                        variant={'contained'}>Comparison Dashboard</Button>
                            </>
                        </Can>
                    </>
                }
                {/*</Can>*/}
            </Stack>
            <Stack direction={'column'} spacing={3}>
                <SectionGrid/>
                {sectionId &&
                    <>
                        <LessonsGridSection/>
                    </>
                }
            </Stack>
        </Container>
    );
};

export default SectionOverview;
