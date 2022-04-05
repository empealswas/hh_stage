import {
    Button,
    Card,
    CardActionArea,
    CardActions, CardContent,
    CardHeader,
    CardMedia,
    Container, IconButton,
    Link,
    Rating,
    Typography
} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import {useEffect, useState} from "react";
import {Storage} from "aws-amplify";
import {Skeleton} from "@mui/lab";
import Image from "../Image";
import {fDate} from "../../utils/formatTime";
import Iconify from "../Iconify";
import {styled} from "@mui/material/styles";
import cssStyles from "../../utils/cssStyles";

export type ActivityCardProps = {
    linkTo: string,
    imagePath: string | undefined | null,
    title: string,
}
const CaptionStyle = styled(CardContent)(({theme}) => ({
    ...cssStyles().bgBlur({blur: 2, color: theme.palette.grey[900]}),
    bottom: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'space-between',
    color: theme.palette.common.white,
}));
export default function ActivityCard(props: ActivityCardProps) {
    const {linkTo, imagePath, title} = {...props};

    useEffect(() => {
        let keyOfObject = imagePath;
        if (keyOfObject) {
           const promise = Storage.get(keyOfObject, {expires: 10000}).then(result => {
                setLinkToPreview(result);
            })
            return (() => {
                promise.then(value => {
                    return;
                })
            });
        } else {
        }

    }, [imagePath])
    const [linkToPreview, setLinkToPreview] = useState('');
    return (
        <Link component={RouterLink} to={linkTo}  underline={'none'} color={'text.primary'}>
            <Card sx={{cursor: 'default', position: 'relative'}}>
                {linkToPreview ?
                    <Image
                        alt="gallery image"
                        ratio={'1/1'}
                        src={linkToPreview}
                    /> :
                    <Image
                        alt="gallery image"
                        ratio={'1/1'}
                    />
                }
                <CardActionArea>
                    <CaptionStyle>
                        <div>
                            <Typography variant="subtitle1">{title}</Typography>
                            <Typography  variant="body2" textAlign={'center'} sx={{opacity: 0.72}}>
                                {/*{fDate('10/20/2022')}*/}
                            </Typography>
                        </div>

                    </CaptionStyle>

                </CardActionArea>

            </Card>
        </Link>
    );
};
