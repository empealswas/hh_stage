import {useEffect} from 'react';
import {paramCase} from 'change-case';
import {useParams, useLocation} from 'react-router-dom';
// @mui
import {Container} from '@mui/material';
import ProductNewForm from "../../../sections/@dashboard/e-commerce/ProductNewForm";
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

    const dispatch = useDispatch();

    const {pathname} = useLocation();

    const {name = ''} = useParams();

    const {products} = useSelector((state) => state.product);

    const isEdit = pathname.includes('edit');

    const currentProduct = products.find((product) => paramCase(product.name) === name);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

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
