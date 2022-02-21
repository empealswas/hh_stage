// @mui
import { Container } from '@mui/material';
import useSettings from "../../../hooks/useSettings";
import Page from "../../../components/Page";
import {BlogNewPostForm} from "../../../sections/@dashboard/blog";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import {PATH_DASHBOARD} from "../../../routes/paths";
import LessonNewForm from "./LessonNewForm";
import {useParams} from "react-router-dom";
// routes
// hooks
// components
// sections

// ----------------------------------------------------------------------

export default function LessonNew() {
  const { themeStretch } = useSettings();
const {sectionId,organizationId} = useParams();
  return (
    <Page title="Blog: New Post">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Create a new lesson"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Organization', href: `${PATH_DASHBOARD.root}/organization/${organizationId}` },
            { name: 'Section', href: `${PATH_DASHBOARD.root}/organization/${organizationId}/section/${sectionId}` },
            { name: 'New Lesson', },
          ]}
        />

        <LessonNewForm />

      </Container>
    </Page>
  );
}
