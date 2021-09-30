import {Button, Card, CardActionArea, CardActions, CardHeader, CardMedia, Link} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";

export default function PECard() {
    return (
        <Card>
            <Link component={RouterLink} to={'pe'} underline={'none'} color={'text.primary'}>
                <CardActionArea>
                    <CardHeader title="PE Lessons Self Reporting"
                                subheader="Only for teachers">
                    </CardHeader>
                    <CardMedia
                        component={'img'}
                        height="194"
                        image={"/static/images/Record_your_own_PE.png"}
                        alt="Paella dish"
                    />
                </CardActionArea>
            </Link>
            {/*<Link component={RouterLink} to={'pe'} underline={'none'}>*/}
            {/*</Link>*/}
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    )
};