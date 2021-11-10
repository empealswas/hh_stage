import { Card, CardHeader } from "@material-ui/core";
import { Box } from "@material-ui/system";

export default function DailiesOverview(){


return (
    <Card >
        <CardHeader title="Steps" subheader="Total duration and intensity" />
        <Box sx={{ p: 3, pb: 1 }} dir="ltr">
            <h1>A grand design</h1>
        </Box>
    </Card>
);

}