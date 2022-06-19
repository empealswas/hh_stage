import {capitalCase} from 'change-case';
import {useEffect, useState} from 'react';
// @mui
import {styled} from '@mui/material/styles';
import {Tab, Box, Card, Tabs, Container} from '@mui/material';
// routes
import {PATH_DASHBOARD} from '../../../../routes/paths';
// hooks
import useAuth from '../../../../hooks/useAuth';
import useSettings from '../../../../hooks/useSettings';
// _mock_
import {_userAbout, _userFeeds, _userFriends, _userGallery, _userFollowers} from '../../../../_mock';
// components
import Page from '../../../../components/Page';
import Iconify from '../../../../components/Iconify';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
// sections
import {
    Profile,
    ProfileCover,
    ProfileFriends,
    ProfileGallery,
    ProfileFollowers,
} from '../../../../sections/@dashboard/user/profile';
import ChildActivitiesSummary from "./profile_tabs/ChildActivitiesSummary";
import {Pupil, User} from "../../../../API";
import {API, graphqlOperation} from "aws-amplify";
import {useParams} from "react-router-dom";
import ChildProfileDetails from "./profile_tabs/Profile/ChildProfileDetails";
import ChildProfileCover from "./ChildProfileCover";
import ConnectToWearableDeviceButton from "./wearable/ConnectToWearableDeviceButton";
import OrganizationsGrid from "../../organization/OrganizationsGrid";
import InterventionsList from "./profile_tabs/Profile/intervention/InterventionsList";

// ----------------------------------------------------------------------

const TabsWrapperStyle = styled('div')(({theme}) => ({
    zIndex: 9,
    bottom: 0,
    width: '100%',
    display: 'flex',
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up('sm')]: {
        justifyContent: 'center',
    },
    [theme.breakpoints.up('md')]: {
        justifyContent: 'flex-end',
        paddingRight: theme.spacing(3),
    },
}));

// ----------------------------------------------------------------------
const query = `query MyQuery($id: ID = "") {
  getUser(id: $id) {
    id
    firstName
    lastName
    terraId
    provider
    organizations {
      items {
        id
        status
        organization {
          name
          id
        }
      }
    }
  }
}
`
export default function UserProfile() {
    const {themeStretch} = useSettings();
    const {user} = useAuth();
    const [fetchedUser, setUser] = useState<User | null>(null);

    const [currentTab, setCurrentTab] = useState('activity');
    const handleChangeTab = (newValue: string) => {
        setCurrentTab(newValue);
    };
    useEffect(() => {
        const getUserAsync = async () => {
            const result: any = await API.graphql(graphqlOperation(query, {id: user?.email}))
            setUser(result.data.getUser);
        }
        getUserAsync();
        return () => {

        };
    }, []);



    const PROFILE_TABS = [
        /*    {
              value: 'clubs',
              icon: <Iconify icon={'ic:round-corporate-fare'} width={20} height={20} />,
              component: (
                  <OrganizationsGrid/>
              ),
            },*/
        {
            value: 'activity',
            icon: <Iconify icon={'eva:activity-fill'} width={20} height={20}/>,
            component: fetchedUser ? <ChildActivitiesSummary user={fetchedUser}/> : <></>,
        },
        {
          value: 'profile',
          icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
          component: fetchedUser ? <ChildProfileDetails child={fetchedUser}/> : <></>,
        },
        {
            value: 'Interventions',
            icon: <Iconify icon={'eva:activity-fill'} width={20} height={20}/>,
            component: fetchedUser ? <InterventionsList user={fetchedUser}/> : <></>,
        }

    ];

    return (
        <Page title="User: Profile">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="Profile"
                    links={[
                        {name: 'Dashboard', href: PATH_DASHBOARD.root},
                        {name: `${user?.firstName} ${user?.lastName}` || ''},
                    ]}
                />
                <Card
                    sx={{
                        mb: 3,
                        height: 280,
                        position: 'relative',
                    }}
                >
                    <ChildProfileCover/>

                    <TabsWrapperStyle>

                        <Tabs
                            value={currentTab}
                            scrollButtons="auto"
                            variant="scrollable"
                            allowScrollButtonsMobile
                            onChange={(e, value) => handleChangeTab(value)}
                        >
                            {PROFILE_TABS.map((tab) => (
                                <Tab
                                    disableRipple
                                    key={tab.value}
                                    value={tab.value}
                                    icon={tab.icon}
                                    label={capitalCase(tab.value)}
                                />
                            ))}
                        </Tabs>

                    </TabsWrapperStyle>
                </Card>

                {PROFILE_TABS.map((tab) => {
                    const isMatched = tab.value === currentTab;
                    return isMatched && <Box key={tab.value}>{tab.component}</Box>;
                })}
            </Container>
        </Page>
    );
}
