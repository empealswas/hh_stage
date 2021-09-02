import React, {useEffect, useState} from 'react';
import {File} from "../API";
import {Box, Card, CardActionArea, Container, Link, Skeleton, Stack, Typography} from "@material-ui/core";
import Label from "../components/Label";
import {Link as RouterLink} from "react-router-dom";
import {Document, Page} from "react-pdf";
import {getFileDescription} from "./filenameExtractor";
import {Storage} from "aws-amplify";
import FileContainer from "./FileContainer";

const FileWidget = (props: { file: File }) => {
    const [linkToShow, setLinkToShow] = useState('');
    const {file} = {...props};
    const {fileName, extension} = getFileDescription(file);
    useEffect(() => {
        Storage.get(file?.key as string, {expires: 60}).then((link: any) => setLinkToShow(link))
        return () => {

        };
    }, []);

    return (
        <Card>
            <CardActionArea onClick={() => {
                if (extension !== 'mp4') {
                    window.open(linkToShow, "_blank");
                }
            }}>
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
                    {linkToShow && <FileContainer fileExtension={extension} linkToFile={linkToShow}/>}
                </Box>
                <Stack spacing={2} sx={{p: 1}}>
                    <Typography variant="subtitle2" noWrap>
                        {fileName.trim()}
                    </Typography>

                    {/*<Stack direction="row" alignItems="center" justifyContent="space-between">*/}
                    {/*    <Typography variant="subtitle1">*/}
                    {/*        <Typography*/}
                    {/*            component="span"*/}
                    {/*            variant="body1"*/}
                    {/*            sx={{*/}
                    {/*                color: 'text.disabled',*/}
                    {/*                textDecoration: 'line-through'*/}
                    {/*            }}*/}
                    {/*        >*/}
                    {/*            price*/}
                    {/*        </Typography>*/}
                    {/*        &nbsp;*/}
                    {/*    </Typography>*/}
                    {/*</Stack>*/}
                </Stack>
            </CardActionArea>
        </Card>
    );
};

export default FileWidget;
