import {useEffect, useState} from "react";
import {listUnconfirmedOrganizations} from "../apiFunctions/apiFunctions";
import OrganizationsTable from "../components/organizations/OrganizationsTable";




const Organizations = () => {


    return (
        <div>
            <OrganizationsTable/>
        </div>
    );
};

export default Organizations;
