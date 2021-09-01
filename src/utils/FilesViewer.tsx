import React, {useEffect, useState} from 'react';
import {
    Avatar, Box, Card, Container,
    LinearProgress,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText
} from "@material-ui/core";
import {Storage} from "aws-amplify";
import {Document, Page, pdfjs} from "react-pdf";

// @ts-ignore
import {Player} from 'video-react';
import VideocamIcon from '@material-ui/icons/Videocam';
import DescriptionIcon from '@material-ui/icons/Description';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import 'react-pdf/dist/umd/Page/AnnotationLayer.css';
import {File} from "../API";


type FilesListProps = {
    files: (File | null)[];
}
type FileItemProps = {
    file: File;
    index: number;
}
const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
};
const FilesViewer = (props: FilesListProps) => {
    const [urlToVideo, setUrlToVideo] = useState<string | null>(null);
    const showFile = (file: File) => {
        if (file?.key != null) {
            Storage.get(file?.key, {expires: 60})
                .then((url: any) => {
                    setUrlToVideo(url);
                });
        }
    }
    const FileItem = (props: FileItemProps) => {
        const [linkToShow, setLinkToShow] = useState('');
        const file = props.file;

        // const DeleteButton = () => {
        //     return <IconButton onClick={() => handleDeleteFile(file)} edge="end" aria-label="delete">
        //         <DeleteIcon/>
        //     </IconButton>;
        // }

        if (file?.key?.endsWith('.mp4')) {
            return (
                <ListItem key={props.index} button
                          onClick={() => showFile(file)}>
                    <ListItemAvatar>
                        <Avatar>
                            <VideocamIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={file.key.slice(Math.max(0, file.key.length - 30), file.key.length)}
                    />
                    <ListItemSecondaryAction>
                        {/*<DeleteButton/>*/}
                    </ListItemSecondaryAction>
                </ListItem>

            );
        } else if (file?.key?.endsWith('.pdf')) {
            Storage.get(file?.key, {expires: 60}).then((link: any) => setLinkToShow(link))
            if (linkToShow) {
                return (
                    <Card>
                        <Document
                            renderMode={'canvas'}
                            options={options}
                            file={linkToShow}
                        >
                            <Page pageNumber={1} width={200}/>
                        </Document>
                    </Card>
                );
            } else {
                return <></>
            }

        } else {
            if (file?.key == null) return <></>;
            Storage.get(file?.key, {expires: 60}).then((link: any) => setLinkToShow(link))
            if (linkToShow) {
                return (
                    <ListItem key={props.index} button onClick={() => {
                        if (file?.key != null) {
                            Storage.get(file?.key, {expires: 60}).then((link: any) => {
                                window.open(link, "_blank");
                            })
                        }
                    }
                    }>
                        <ListItemAvatar>
                            <Avatar>
                                {file.key.endsWith('.pdf') ?
                                    <PictureAsPdfIcon/>
                                    :
                                    <DescriptionIcon/>
                                }
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={file.key.slice(Math.max(0, file.key.length - 30), file.key.length)}/>
                        <ListItemSecondaryAction>
                            {/*<DeleteButton/>*/}
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            } else {
                return (
                    <ListItem>
                        <LinearProgress color="secondary"/>
                    </ListItem>
                );
            }
        }
    }
    useEffect(() => {
        return () => {

        };
    }, []);

    return (
        <>
            <List>
                {props.files.map((value: File | null, index: number) => {
                        if (value) {
                            return <FileItem file={value} index={index}/>;
                        }
                    }
                )}
            </List>
            {urlToVideo &&
            <Player
                playsInline
                src={urlToVideo}
            />
            }
        </>
    );
};

export default FilesViewer;
