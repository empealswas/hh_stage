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
import {
    Box,
    CardActionArea,
    CardActions,
    CardHeader,
    CardMedia,
    IconButton,
    Menu,
    Skeleton,
    Typography
} from '@mui/material';

const FileContainer = (props: { linkToFile: string, fileExtension: string, fileName: string, file: File }) => {
    const {linkToFile, fileExtension, fileName, file} = {...props}
    const [linkToPreview, setLinkToPreview] = useState(null);
    useEffect(() => {
        genUrlOfThumbnailOfFile(fileName + '.jpg').then(res => {
            setLinkToPreview(res.url);
        })
    }, []);


    const [contextMenu, setContextMenu] = React.useState<{
        mouseX: number;
        mouseY: number;
    } | null>(null);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const handleClose = () => {
        setAnchorEl(null);
    };

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

        // deleteFileById(file.id).then(result => {
        //     console.log('File deleted')
        // }).catch(error => {
        //     console.error(error);
        // })
    }

    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
        setContextMenu(
            contextMenu === null
                ? {
                    mouseX: event.clientX - 2,
                    mouseY: event.clientY - 4,
                }
                :
                null,
        );
    };


    return (
        < >

            <CardActions>
                <>
                    <IconButton onContextMenu={handleContextMenu} aria-label="settings" id="basic-button"
                                aria-controls="basic-menu"
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}>
                        <Iconify icon={'eva:more-vertical-fill'} sx={{fontSize: 25}}/>
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuList>
                            <Can I={'delete'} this={'file'}>
                                <MenuItem onClick={removeFile}>
                                    <ListItemIcon>
                                        <Iconify icon={'mdi:delete-outline'} sx={{fontSize: 25}}/>
                                    </ListItemIcon>
                                    <ListItemText>Remove</ListItemText>
                                </MenuItem>
                            </Can>
                            <MenuItem onClick={() => {
                                window.open(linkToFile, '_blank')
                            }
                            }>
                                <ListItemIcon>
                                    <Iconify icon={'mdi:open-in-new'} sx={{fontSize: 25}}/>

                                </ListItemIcon>
                                <ListItemText>Open in new tab</ListItemText>
                            </MenuItem>

{/*                            component={Link} rel="noreferrer" href={linkToFile} download={true} target={'_self'}*/}
                            <MenuItem onClick={async ()=>{
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
                            }}>
                                <ListItemIcon>
                                    <Iconify icon={'mdi:download-outline'} sx={{fontSize: 25}}/>

                                </ListItemIcon>
                                <ListItemText>Download</ListItemText>

                            </MenuItem>
                        </MenuList>
                    </Menu>

                </>
            </CardActions>
            <CardActionArea onClick={() => {
                window.open(linkToFile, '_blank')
            }}>
                {linkToPreview ?
                    <CardMedia
                        style={{
                            maxWidth: '100%',
                            height: '200px'
                        }}
                        component="img"
                        image={linkToPreview ?? '/static/image_placeholder.png'}
                        alt="Thumbnail not found"
                    />
                    :
                    <Skeleton variant={'rectangular'} height={200} width={"100%"}/>
                }
            </CardActionArea>
            <CardHeader
                style={{paddingTop: 0}}
                title={<Typography display={'flex'} variant={"subtitle1"}>{fileName}</Typography>}
            />
        </>
    )
};


export default FileContainer;
