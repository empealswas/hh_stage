import React, {createRef, useState} from 'react';
import {Document, Page} from "react-pdf";
import {Box, CardActions, CardContent, CardMedia, Container, IconButton, Skeleton, Typography} from "@material-ui/core";
// @ts-ignore
import {Player} from 'video-react';
import {SpecialZoomLevel, Viewer} from '@react-pdf-viewer/core';
import {Worker} from '@react-pdf-viewer/core';
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import {fullScreenPlugin, RenderEnterFullScreenProps} from '@react-pdf-viewer/full-screen';
import {Button, Card, CardActionArea, CardHeader, Menu, Stack} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud'
import {Delete, OpenInNew} from "@material-ui/icons";
import {thumbnailPlugin} from '@react-pdf-viewer/thumbnail';
import {Plugin, RenderViewer} from '@react-pdf-viewer/core';
// @ts-ignore
import styles from './Sample.less'
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/thumbnail/lib/styles/index.css';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {getFilenameFromUrl} from "pdfjs-dist";
import {genUrlOfThumbnailOfFile} from "../apiFunctions/apiFunctions";

const disableScrollPlugin = (): Plugin => {
    const renderViewer = (props: RenderViewer) => {
        const {slot} = props;

        if (slot.subSlot && slot.subSlot.attrs && slot.subSlot.attrs.style) {
            slot.subSlot.attrs.style = Object.assign({}, slot.subSlot.attrs.style, {
                // Disable scrolling in the pages container
                overflow: 'hidden',
            });
        }

        return slot;
    };

    return {
        renderViewer,
    };
};
const FileContainer = (props: { linkToFile: string, fileExtension: string, fileName: string }) => {
    const {linkToFile, fileExtension, fileName} = {...props}
    const linkToThumbnail = `https://serverlessrepo-thumbnail-creator-resultsbucket-1orehh2pvqrw9.s3.eu-west-2.amazonaws.com/${fileName}.jpg`;
    const [linkToPreview, setLinkToPreview] = useState('');
    console.log(linkToThumbnail)
    genUrlOfThumbnailOfFile(fileName+'.jpg').then(res =>{
        console.log('url to file: ' + res.url);
        setLinkToPreview(res.url);
    })

    const [contextMenu, setContextMenu] = React.useState<{
        mouseX: number;
        mouseY: number;
    } | null>(null);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
    const PdfFile = () => {
        const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
        const open = Boolean(anchorEl);
        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
            setAnchorEl(null);
        };
        return (
            <>

                <CardActionArea onClick={() => {
                    window.open(linkToFile, '_blank')
                }}>

                    <CardMedia>
                        <Document
                            renderMode={'canvas'}
                            loading={<Skeleton variant="rectangular" animation={"wave"} height={212} width={300}/>
                            }
                            file={linkToFile}
                        >
                            <Page canvasRef={instance => {
                            }} height={200} renderMode={'canvas'} pageNumber={1}/>
                        </Document>
                    </CardMedia>
                </CardActionArea>
                <CardHeader

                    style={{paddingTop: 0}}
                    action={
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
                                    <MenuItem>
                                        <ListItemIcon>
                                            <DeleteOutlineOutlinedIcon/>
                                        </ListItemIcon>
                                        <ListItemText>Remove</ListItemText>
                                    </MenuItem>
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
                    }
                    title={<Typography variant={"subtitle1"}>{fileName}</Typography>}
                />
            </>

        );
    }
    const PdfTest = () => {
        const [numPages, setNumPages] = useState(null);


        // @ts-ignore
        function onDocumentLoadSuccess({numPages: nextNumPages}) {
            setNumPages(nextNumPages);
        }

        return (
            <Container style={{
                overflow: 'hidden'
            }}>
                <Document
                    file={linkToFile}
                    onLoadSuccess={onDocumentLoadSuccess}
                    // options={options}
                >
                    <Page className={styles.reactPdf__Page}
                          pageNumber={1}
                          scale={0.4}
                    />
                </Document>
            </Container>
        );
    }

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
                            <MenuItem>
                                <ListItemIcon>
                                    <DeleteOutlineOutlinedIcon/>
                                </ListItemIcon>
                                <ListItemText>Remove</ListItemText>
                            </MenuItem>
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
            <CardActionArea>
                <CardMedia
                style={{
                    maxWidth: '100%',
                    height: '200px'

                }}
                component="img"
                image={linkToPreview}
                alt="Paella dish"
            />
            </CardActionArea>
            <CardHeader
                style={{paddingTop: 0}}
                title={<Typography  display={'flex'} variant={"subtitle1"}>{fileName}</Typography>}
            />
        </>
    )
};


export default FileContainer;
