import React, {useEffect, useState} from 'react';

import {Storage} from "aws-amplify";

import FileWidget from "./FileWidget";
import {Grid} from "@mui/material";
import {File} from "../../API";


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
