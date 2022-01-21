import { capitalCase } from 'change-case';
import {useEffect, useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Tab, Box, Card, Tabs, Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useAuth from '../../../../hooks/useAuth';
import useSettings from '../../../../hooks/useSettings';
// _mock_
import { _userAbout, _userFeeds, _userFriends, _userGallery, _userFollowers } from '../../../../_mock';
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
import {Pupil} from "../../../../API";
import {API, graphqlOperation} from "aws-amplify";
import {useParams} from "react-router-dom";
import ChildProfileDetails from "./profile_tabs/Profile/ChildProfileDetails";
import ChildProfileCover from "./ChildProfileCover";
import ConnectToWearableDeviceButton from "./wearable/ConnectToWearableDeviceButton";

// ----------------------------------------------------------------------

const TabsWrapperStyle = styled('div')(({ theme }) => ({
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
  getPupil(id: $id) {
    firstName
    terraId
    provider
          id
          lastName
          parents {
            items {
              Parent {
                firstName
                id
                lastName
              }
            }
          }
          school {
            name
          }
          schoolHouse {
            name
          }
          classrooms {
            items {
              classroom {
                name
                yearGroup {
                  name
                }
              }
            }
          }
  }
}

`
export default function UserProfile() {
  const { themeStretch } = useSettings();
  const { user } = useAuth();
  const {pupilId} = useParams();

  const [currentTab, setCurrentTab] = useState('activity');
  const [pupil, setPupil] = useState<Pupil | null>(null);
  const handleChangeTab = (newValue: string) => {
    setCurrentTab(newValue);
  };

  useEffect(()=>{
    const getPupil = async () => {
      const result: any = await API.graphql(graphqlOperation(query, {id: pupilId}));
      setPupil(result.data.getPupil);
    }
    getPupil();
  },[pupilId])

  const PROFILE_TABS = [
    {
      value: 'activity',
      icon: <Iconify icon={'eva:activity-fill'} width={20} height={20} />,
      component: pupil ? <ChildActivitiesSummary pupil={pupil}/> : <></>,
    },
    {
      value: 'profile',
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: pupil ? <ChildProfileDetails child={pupil}/> : <></>,
    },
    {
      value: 'clubs',
      icon: <Iconify icon={'ic:round-corporate-fare'} width={20} height={20} />,
      component: (
        <></>
      ),
    },
  ];

  return (
      <Page title="Child: Profile">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
              heading="Profile"
              links={[
                {name: 'Dashboard', href: PATH_DASHBOARD.root},
                {name: `${pupil?.firstName} ${pupil?.lastName}` || ''},
              ]}
          />
          <Card
              sx={{
                mb: 3,
                height: 280,
                position: 'relative',
              }}
          >
            {pupil &&
                <ChildProfileCover pupil={pupil}/>
            }

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
