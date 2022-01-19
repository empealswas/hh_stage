import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {API, graphqlOperation} from "aws-amplify";
import {Organization} from "../../../API";
import CardSkeleton from "../../skeletons/CardSkeleton";
import {
    Autocomplete,
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    CardMedia, Container,
    Grid, IconButton,
    Link, Stack, TextField,
    Typography
} from '@mui/material';
import {Link as RouterLink} from 'react-router-dom';
import {CardMembership, HdrPlus} from "@mui/icons-material";
import {Teacher} from "../../../models/Teacher";
import {UserContext} from "../../../App";
import OrganizationsSearch from "../OrganizationsSearch";
import AddBoxIcon from '@mui/icons-material/AddBox';
import {Box} from '@material-ui/core';
import OrganizationsOverview from "./OrganizationsOverview";

const organizationsQuery = `query MyQuery($id: ID = "") {
  getPupil(id: $id) {
    Organizations {
      items {
        organization {
          name
          id
          type
        }
      }
    }
  }
}`
const teacherOrganizationsQuery = `query MyQuery($id: ID = "") {
  getTeacher(id: $id) {
    Organizations {
      items {
        id
        organization {
          name
          type
          id
        }
      }
    }
  }
}
`;
const SuggestedOrganizationsOverview = () => {
    const {pupilId} = useParams();
    const [organizations, setOrganizations] = useState<Organization[] | null>(null);
    const [filter, setFilter] = React.useState<string | null>('');
    const user = useContext(UserContext);
    useEffect(() => {
        const getOrganizations = async () => {
            setOrganizations(null)
            if (pupilId) {
                const result: any = await API.graphql(graphqlOperation(organizationsQuery, {id: pupilId}));
                let map = result.data.getPupil?.Organizations.items.map((item: any) => item.organization);
                setOrganizations(map);
            } else if (user instanceof Teacher) {
                const result: any = await API.graphql(graphqlOperation(teacherOrganizationsQuery, {id: user.email}));
                setOrganizations(result.data.getTeacher?.Organizations.items.map((item: any) => item.organization))
            }

        }
        getOrganizations()
        return () => {

        };
    }, [pupilId]);

    return (<>
            {/*<OrganizationsSearch/>*/}
        </>
    );
};

export default SuggestedOrganizationsOverview;
