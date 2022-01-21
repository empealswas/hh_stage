// @mui
import {Grid, Stack} from '@mui/material';
// @types
//
import ProfileAbout from './ProfileAbout';
import ParentsInfo from './ParentsInfo';
import {Pupil} from "../../../../../../API";
import TechInfo from "./TechInfo";
import InterventionsList from "./intervention/InterventionsList";

// ----------------------------------------------------------------------

type Props = {
    child: Pupil;
};

export default function ChildProfileDetails({child}: Props) {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
                <Stack spacing={3}>
                    <ProfileAbout pupil={child}/>
                    <ParentsInfo pupil={child}/>
                    <TechInfo pupil={child}/>
                </Stack>
            </Grid>

            <Grid item xs={12} md={8}>
                <Stack spacing={3}>
                  <InterventionsList pupil={child}/>
                </Stack>
            </Grid>
        </Grid>
    );
}
