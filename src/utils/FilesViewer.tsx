import React, {useEffect, useState} from 'react';
import {
    Avatar, Box, Card, Container, Grid,
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
import ShopProductCard from "../components/_dashboard/products/ProductCard";
import FileWidget from "./FileWidget";


type FilesListProps = {
    files: (File | null)[];
}
type FileItemProps = {
    file: File;
}
const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
};
const FilesViewer = (props: FilesListProps) => {


    return (
        <>
            <Grid container spacing={3}>
                {props.files.map((file) => (
                    <Grid item xs={12} sm={6} md={4} lg={4} key={file?.key}>
                        <>
                            {file && <FileWidget file={file}/>}
                        </>
                    </Grid>
                ))}
            </Grid>

        </>
    );
};

export default FilesViewer;
