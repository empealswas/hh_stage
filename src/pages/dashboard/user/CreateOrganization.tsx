import {useEffect} from 'react';
import {paramCase} from 'change-case';
import {useLocation, useParams} from 'react-router-dom';
// @mui
import {Container} from '@mui/material';
import useSettings from "../../../hooks/useSettings";
import Page from "../../../components/Page";
import {getProducts} from "../../../redux/slices/product";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import {PATH_DASHBOARD} from "../../../routes/paths";
import {useDispatch, useSelector} from "../../../redux/store";
import OrganizationNewForm from "./OrganizationNewForm";
// redux
// routes
// components

// ----------------------------------------------------------------------

export default function CreateOrganization() {
    const {themeStretch} = useSettings();


    const {pathname} = useLocation();



    const isEdit = pathname.includes('edit');




    return (
        <Page title="Organizations: Create a new organization">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading={!isEdit ? 'Create a new product' : 'Edit product'}
                    links={[
                        {name: 'Dashboard', href: PATH_DASHBOARD.root},
                        {name: 'User', href: PATH_DASHBOARD.user.root},
                        {name: 'Account Settings', href: PATH_DASHBOARD.user.account},
                        {name: 'New Organization'}
                    ]}
                />

                <OrganizationNewForm isEdit={isEdit} currentOrganization={undefined}/>
            </Container>
        </Page>
    );
}
