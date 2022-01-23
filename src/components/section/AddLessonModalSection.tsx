import React, {useCallback, useState} from 'react';
import {API, Auth, graphqlOperation, Storage} from "aws-amplify";
import {useParams} from "react-router-dom";
import {createFile, createLesson} from "../../graphql/mutations";
import awsConfig from "../../aws-exports";
import AddingDialog from '../dialog/AddingDialog';
import {TextField, Typography} from "@mui/material";


export default function AddLessonModalSection() {
    const {sectionId} = useParams();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    async function addLesson() {
        const input = {
            title: title,
            description: description,
            sectionID: sectionId
        }
        const result: any = await API.graphql(graphqlOperation(createLesson, {input}));
        let lessonID = result.data.createLesson.id;
        await uploadFiles(lessonID)
    }

    const uploadFiles = async (lessonID: string) => {
        const visibility = "public";
        const {identityId} = await Auth.currentCredentials();
        for (const file of selectedFiles) {
            try {
                // const fileName = `/${visibility}/${identityId}/${Date.now()}-${file.name}`;
                const fileName = `${Date.now()}-${file.name.replace(/ /g, '_')}`;
                const uploadedFile: any = await Storage.put(fileName, file, {
                    contentType: file.type
                })
                const input: any = {
                    key: uploadedFile.key,
                    bucket: awsConfig.aws_user_files_s3_bucket,
                    region: awsConfig.aws_user_files_s3_bucket_region,
                    lessonID: lessonID
                };
                const result = await API.graphql(graphqlOperation(createFile, {input}));
                console.log(result);

            } catch (error) {
                console.error(`During the file uploading error occurred:`, error)
            }
        }
    }
    const onDrop = useCallback(acceptedFiles => {
        setSelectedFiles(prevState => {
            return [...prevState, ...acceptedFiles];
        })
    }, []);
    const [selectedFiles, setSelectedFiles] = useState<File []>([]);
    return (
        <AddingDialog title={'Adding new Lesson'} buttonName={'Add Lesson'} onSubmit={addLesson}>
            <TextField value={title} variant={'outlined'} onChange={(event) => {
                setTitle(event.target.value)
            }} label={'Name of Lesson'}/>
            <TextField aria-label="minimum height" rows={3}
                       multiline
                       label="Description of the lesson"
                       value={description}
                       onChange={event => setDescription(event.target.value)}/>
            {/*<FilesUploadDropzone onDrop={onDrop}*/}
            {/*                     accept={['image/*', 'application/pdf', 'text/plain', 'application/mp4', '.mp4']}/>*/}
            <Typography variant={"h5"}>
                Files
            </Typography>
            {/*<UploadingFilesList files={selectedFiles} setFiles={setSelectedFiles}/>*/}
        </AddingDialog>
    );
}
