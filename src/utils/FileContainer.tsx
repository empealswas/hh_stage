import React from 'react';
import {Document, Page} from "react-pdf";
import {Box, Container, Skeleton, Typography} from "@material-ui/core";
// @ts-ignore
import { Player } from 'video-react';
const FileContainer = (props: { linkToFile: string, fileExtension: string}) => {
    const {linkToFile, fileExtension} = {...props}
    const PdfFile = () => {
        return(
            <Document
                renderMode={'canvas'}
                loading={<Skeleton variant="rectangular" width={270} height={140}/>
                }
                file={linkToFile}
            >
                <Page pageNumber={1} width={270}/>
            </Document>
        )
    }
    const VideoPlayer = () => {
        return (
            <Box width={270}>
                <Player
                    fluid={true}
                    width={250}
                    src={linkToFile}
                />
            </Box>
        );
    }

    switch (fileExtension){
        case 'pdf':
            return <PdfFile/>;
            break;
        case 'mp4':
            return <VideoPlayer/>;
        default:
            return (
                <Box width={250} height={200}>
                    <Container >
                        <Typography variant={'h5'}  style={{margin: 'auto'}}>
                            {fileExtension}
                        </Typography>
                    </Container>
                </Box>
            )
    }
};


export default FileContainer;
