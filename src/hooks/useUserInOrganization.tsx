import {useContext} from "react";
import {AuthContext} from "../contexts/AwsCognitoContext";
import {UserInOrganizationContext} from "../pages/dashboard/organization/OrganizationOutlet";

const useUserInOrganization = () => {
    const context = useContext(UserInOrganizationContext);

    if (!context) throw new Error('Auth context must be use inside AuthProvider');

    return context;
};

export default useUserInOrganization;