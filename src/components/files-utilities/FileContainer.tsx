import React, {useEffect, useState} from 'react';

import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import {API, graphqlOperation, Storage} from "aws-amplify";
import {useSnackbar} from "notistack";
import axios from "axios";
import {File} from "../../API";

import {genUrlOfThumbnailOfFile} from "../../apiFunctions/apiFunctions";
import {deleteFile} from "../../graphql/mutations";
import Iconify from "../Iconify";
import {Can} from "../../abilities/Ability";
import {Link as RouterLink} from 'react-router-dom';
import {
    Box, Card,
    CardActionArea,
    CardActions, CardContent,
    CardHeader,
    CardMedia, Divider,
    IconButton, Link,
    Menu,
    Skeleton,
    Typography
} from '@mui/material';
import MenuPopover from "../MenuPopover";
import Image from "../Image";
import {fDate} from "../../utils/formatTime";
import {styled} from "@mui/material/styles";
import cssStyles from "../../utils/cssStyles";

type Props = {
    linkToFile: string
    fileExtension: string
    fileName: string
    file: File
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
const FileContainer = (props: Props) => {
    const {linkToFile, fileExtension, fileName, file} = {...props}
    const [linkToPreview, setLinkToPreview] = useState<string | null>(null);
    useEffect(() => {
        genUrlOfThumbnailOfFile(fileName + '.jpg').then(res => {

            if (res.url) {
                setLinkToPreview(res.url);
            } else {
                setLinkToPreview('/static/image_placeholder.png')
            }
        }).catch(reason => {
            console.log(reason);
            setLinkToPreview('/static/image_placeholder.png')

        })
    }, []);


    return (

        <>
            <Image
                alt="file thumbnail"
                ratio="1/1"
                src={linkToPreview ?? '/static/image_placeholder.png'}
            />
            <CaptionStyle>
                <Link color={'inherit'} onClick={()=>{
                    window.open(linkToFile, '_blank')
                }} >
                    <Typography  variant="subtitle1">{fileName.substring(0, 40)}</Typography>
                <Typography variant="body2" sx={{opacity: 0.72}}>
                    {file.createdAt}
                </Typography>
                </Link>
                <MoreMenuButton setLinkToPreview={setLinkToPreview} {...props} />

            </CaptionStyle>
        </>
    )
};

interface MoreButtonProps extends Props {
    setLinkToPreview: any,
}

function MoreMenuButton({linkToFile, fileExtension, fileName, file, setLinkToPreview}: MoreButtonProps) {
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    const [open, setOpen] = useState<HTMLElement | null>(null);

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
    };

    const ICON = {
        mr: 2,
        width: 20,
        height: 20,
    };
    const downloadFile = async () => {
        axios({
            url: linkToFile,
            method: 'GET',
            responseType: 'blob'
        })
            .then((response) => {
                const url = window.URL
                    .createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', String(file?.key));
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
    }
    const openInNewTab = () => {
        window.open(linkToFile, '_blank')
    }
    const removeFile = () => {
        if (file?.key) {
            setLinkToPreview(null);
            const snackbar = enqueueSnackbar('Removing file: ' + fileName, {variant: 'info'});
            Storage.remove(file?.key).then(r => {
                API.graphql(graphqlOperation(deleteFile, {input: {id: file?.id}}))
                closeSnackbar(snackbar);
                enqueueSnackbar('File removed: ' + fileName, {variant: 'success'})
            });
        }
    }

    return (
        <>
            <IconButton size="large" color={'inherit'} onClick={handleOpen}>
                <Iconify icon={'eva:more-vertical-fill'} width={23} height={23}/>
            </IconButton>

            <MenuPopover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleClose}
                anchorOrigin={{vertical: 'top', horizontal: 'left'}}
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                arrow="right-top"
                sx={{
                    mt: -0.5,
                    width: 160,
                    '& .MuiMenuItem-root': {px: 1, typography: 'body2', borderRadius: 0.75},
                }}
            >
                <MenuItem onClick={downloadFile}>
                    <Iconify icon={'eva:download-fill'} sx={{...ICON}}/>
                    Download
                </MenuItem>

                <MenuItem onClick={openInNewTab}>
                    <Iconify icon={'mdi:open-in-new'} sx={{...ICON}}/>
                    New Tab
                </MenuItem>

                <Can I={'delete'} a={'file'}>
                    <Divider sx={{borderStyle: 'dashed'}}/>

                    <MenuItem sx={{color: 'error.main'}} onClick={removeFile}>
                        <Iconify icon={'eva:trash-2-outline'} sx={{...ICON}}/>
                        Delete
                    </MenuItem>
                </Can>
            </MenuPopover>
        </>
    );
}

export default FileContainer;
