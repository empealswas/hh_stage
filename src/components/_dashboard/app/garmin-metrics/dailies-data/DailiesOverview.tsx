import { Card, CardHeader } from "@material-ui/core";
import { Box } from "@material-ui/system";
import { GarminQueryData } from "../../../../../models/garminDataModels/garminQueryData";

export default function DailiesOverview(props: any, props2: any){

    // set up query url seqments
    const dailiesBaseUrl: string = "https://analytics.healthyhabits.link/api/garminDailies/dates/start/";
    const dailiesZvaluesBaseUrl: string = "https://analytics.healthyhabits.link/api/garminDailies/z-values/dates/start/";
    const startUrl: string = "/start/";
    const endUrl: string = "/end/";
    const periodUrl: string = "/period/";
    const groupedByUrl: string = "/groupedby/"

    // const dailesDataQuery = dailiesBaseUrl+startUrl+props.startDate+endUrl+props.endDate+periodUrl+props.period+groupedByUrl+props.groupedBy;
    // const dailiesStanineQuery = dailiesZvaluesBaseUrl+startUrl+props.startDate+endUrl+props.endDate+periodUrl+props.period+groupedByUrl+props.groupedBy;
    // console.log("In Steps overview");
    // console.log(props.endDate);
    // console.log(props.startDate);
    // console.log(props.period);
    // console.log(props.groupedBy);
    console.log("props");
    console.log(props);
    
    console.log("props2");
    console.log(props['blah'].id);
    // console.log(dailesDataQuery);
    // console.log(dailiesStanineQuery);

    return (
        <Card >
            <CardHeader title="Steps" subheader="Total duration and intensity" />
            <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                <h1>A grand design </h1>
                <h3>start adding plot views below</h3>
            </Box>
        </Card>
    );

}