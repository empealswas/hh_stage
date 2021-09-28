import React, {useEffect, useState} from 'react';
import {Box, CardActions, CardMedia, IconButton, Skeleton, Typography} from "@material-ui/core";
// @ts-ignore
import {Player} from 'video-react';
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import {CardActionArea, CardHeader, Menu} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
// @ts-ignore
import styles from './Sample.less'
import '@react-pdf-viewer/thumbnail/lib/styles/index.css';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {deleteFileById, genUrlOfThumbnailOfFile} from "../apiFunctions/apiFunctions";
import {API, graphqlOperation, Storage} from "aws-amplify";
import {File} from "../API";
import {deleteFile} from "../graphql/mutations";
import {useSnackbar} from "notistack";
import {Can} from "./Ability";

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

    const VideoPlayer = () => {
        return (
            <Box width={359}>
                <Player
                    fluid={true}
                    width={270}
                    src={linkToFile}
                />
            </Box>
        );
    }
    return (
        < >

            <CardActions>
                <>
                    <IconButton onContextMenu={handleContextMenu} aria-label="settings" id="basic-button"
                                aria-controls="basic-menu"
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}>
                        <MoreVertIcon/>
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
                                        <DeleteOutlineOutlinedIcon/>
                                    </ListItemIcon>
                                    <ListItemText>Remove</ListItemText>
                                </MenuItem>
                            </Can>
                            <MenuItem onClick={() => {
                                window.open(linkToFile, '_blank')
                            }
                            }>
                                <ListItemIcon>
                                    <OpenInNewOutlinedIcon/>
                                </ListItemIcon>
                                <ListItemText>Open in new tab</ListItemText>
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
                        image={linkToPreview}
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
