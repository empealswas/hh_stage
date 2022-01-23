import React, {useEffect, useState} from 'react';
import {File} from "../../API";
import {getFileDescription} from "./filenameExtractor";
import {API, Storage} from "aws-amplify";
import FileContainer from "./FileContainer";
import Label from "../Label";
import {Box, Card} from "@mui/material";

const FileWidget = (props: { file: File }) => {
    const [linkToShow, setLinkToShow] = useState('');
    const {file} = {...props};
    const {fileName, extension} = getFileDescription(file);

    useEffect(() => {
        Storage.get(file?.key as string, {expires: 10000}).then((link: any) => setLinkToShow(link))
        return () => {

        };
    }, []);

    return (
        <Card style={{borderRadius: '5px'}}>
            <Box sx={{position: 'relative'}}>
                <Label
                    variant="filled"
                    color={'error'}
                    sx={{
                        zIndex: 20,
                        top: 10,
                        right: 10,
                        position: 'absolute',
                        textTransform: 'uppercase'
                    }}
                >
                    {extension}
                </Label>
            </Box>
            {linkToShow && <FileContainer file={file} fileExtension={extension} linkToFile={linkToShow} fileName={fileName}/>}

        </Card>
    );
};

export default FileWidget;
