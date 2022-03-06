import React, {useEffect, useState} from 'react';
import {Organization, Section} from "../../../../API";
import {API, graphqlOperation, Storage} from "aws-amplify";
import {
    Card,
    CardActionArea,
    CardContent, Checkbox, Container,
    Divider,
    FormControlLabel,
    FormGroup,
    Grid,
    IconButton,
    Link, Stack, Tooltip,
    Typography
} from "@mui/material";
import CardSkeleton from "../../../../components/skeleton/CardSkeleton";
import ActivityCard from "../../../../components/section/ActivityCard";
import {useSnackbar} from "notistack";
import axios from "axios";
import {
    createRolesOfUser,
    createSectionFromContentStore,
    deleteFile,
    deleteRolesOfUser, deleteSectionFromContentStore
} from "../../../../graphql/mutations";
import Iconify from "../../../../components/Iconify";
import MenuPopover from "../../../../components/MenuPopover";
import MenuItem from "@mui/material/MenuItem";
import {Can} from "../../../../abilities/Ability";
import {Link as RouterLink} from "react-router-dom";
import Image from "../../../../components/Image";
import cssStyles from "../../../../utils/cssStyles";
import {styled} from "@mui/material/styles";
import {getUser} from "../../../../graphql/queries";
import useAuth from "../../../../hooks/useAuth";


const query = `query MyQuery {
  listSections(limit: 10000, filter: {isPlacedInContentStore: {eq: true}}) {
    items {
    id
    name
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
}
`
export type ActivityCardProps = {
    linkTo: string,
    imagePath: string | undefined | null,
    title: string,
    organizations: Organization [],
    sectionId: string,
    updateOrganizations: () => Promise<void>;

}
const CaptionStyle = styled(CardContent)(({theme}) => ({
    ...cssStyles().bgBlur({blur: 2, color: theme.palette.grey[900]}),
    bottom: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'space-between',
    color: theme.palette.common.white,
}));
const getOrganizationQuery = `query MyQuery($id: ID = "") {
  getUser(id: $id) {
    ownedOrganizations {
      items {
        name
        id
        SectionsFromContentStore(limit: 100000) {
          items {
            id
            sectionID
          }
        }
      }
    }
  }
}`
const ContentStore = () => {
    const [sections, setSections] = useState<Section[] | null>(null);
    const [organizations, setOrganizations] = useState<Organization[] | null>(null);
    const {user} = useAuth();
    const getOrganizationsAsync = async () => {
        const result: any = await API.graphql(graphqlOperation(getOrganizationQuery, {id: user?.email}));
        console.log(result)
        setOrganizations(result.data.getUser.ownedOrganizations.items);
    }
    useEffect(() => {
        const getContentSections = async () => {
            const result: any = await API.graphql(graphqlOperation(query));
            setSections(result.data.listSections?.items);

        }

        getOrganizationsAsync();
        getContentSections();
        return () => {

        };
    }, []);
    const Sections = () => {
        if (!sections || !organizations) {
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

        if (sectionsToDisplay.length === 0) {
            return <></>
        }
        return (
            <>
                {sectionsToDisplay?.sort((a, b) => a.name?.localeCompare(b.name ?? '') ?? 0).map((value: Section, index: number) => (
                    <Grid key={value.id} item lg={4} md={4} sm={6} xs={12}>
                        <SectionCard linkTo={''} imagePath={value?.ImagePreview?.key} title={value.name ?? ''}
                                     sectionId={value.id} organizations={organizations}
                                     updateOrganizations={getOrganizationsAsync}/>
                    </Grid>
                ))}
            </>
        );
    }
    return (
        <Container>
            <Typography sx={{pb: 5}} align={'center'} variant={'h2'}>Content Store</Typography>

            <Grid container
                  direction="row"
                  justifyContent="center"
                  alignItems="flex-start"
                  spacing={3}
            >

                <Sections/>
            </Grid>
        </Container>
    );
};

function MoreMenuButton(props: ActivityCardProps) {
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    const [open, setOpen] = useState<HTMLElement | null>(null);

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
        props.updateOrganizations();
    };

    const ICON = {
        mr: 2,
        width: 20,
        height: 20,
    };

    return (
        <>
            <Tooltip title={'Add/Remove this section from your organizations'}>
                <IconButton size="large" color={'inherit'} onClick={handleOpen}>
                    <Iconify icon={'eva:more-vertical-fill'} width={23} height={23}/>
                </IconButton>
            </Tooltip>

            <MenuPopover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleClose}
                anchorOrigin={{vertical: 'top', horizontal: 'left'}}
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                arrow="right-top"
                sx={{
                    mt: -0.5,
                    '& .MuiMenuItem-root': {px: 1, typography: 'body2', borderRadius: 0.75},
                }}
            >
                <Container>
                    <FormGroup>

                        {props.organizations?.map(value =>
                            <>
                            <FormControlLabel
                                key={value.id}
                                onChange={async (event, checked) => {
                                    if (checked) {
                                        API.graphql(graphqlOperation(createSectionFromContentStore, {
                                            input: {
                                                organizationID: value.id,
                                                sectionID: props.sectionId,
                                            }
                                        }))
                                    }else{
                                        value.SectionsFromContentStore?.items.forEach(section => {
                                            API.graphql(graphqlOperation(deleteSectionFromContentStore, {
                                                input: {
                                                    id: section?.id,
                                                }
                                            }))
                                        })
                                    }
                                }}
                                control={<Checkbox
                                    defaultChecked={!!value.SectionsFromContentStore?.items.find(section => section?.sectionID === props.sectionId)}/>}
                                label={String(value.name)}
                            />

                            </>
                        )}


                    </FormGroup>
                </Container>
            </MenuPopover>
        </>
    );
}

const SectionCard = (props: ActivityCardProps) => {
    const {linkTo, imagePath, title} = {...props};
    const [linkToPreview, setLinkToPreview] = useState('');

    useEffect(() => {
        let keyOfObject = imagePath;
        if (keyOfObject) {
            const promise = Storage.get(keyOfObject, {expires: 10000}).then(result => {
                setLinkToPreview(result);
            })
            return (() => {
                promise.then(value => {
                    return;
                })
            });
        }

    }, [imagePath])
    return (
        <Card sx={{cursor: 'default', position: 'relative'}}>
            {linkToPreview ?
                <Image
                    alt="gallery image"
                    ratio={'1/1'}
                    src={linkToPreview}
                /> :
                <Image
                    alt="gallery image"
                    ratio={'1/1'}
                />
            }
            <CardActionArea>
                <CaptionStyle>
                    <div>
                        <Typography variant="subtitle1">{title}</Typography>
                        <Typography variant="body2" textAlign={'center'} sx={{opacity: 0.72}}>
                            {/*{fDate('10/20/2022')}*/}
                        </Typography>
                    </div>
                    <MoreMenuButton {...props}/>
                </CaptionStyle>

            </CardActionArea>

        </Card>
    );
}

export default ContentStore;
