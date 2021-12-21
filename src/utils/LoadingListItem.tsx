import {useEffect, useState} from "react";
import {API, graphqlOperation, Storage} from "aws-amplify";
import awsConfig from "../aws-exports";
import {createFile} from "../graphql/mutations";
import {useSnackbar} from "notistack";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {CircularProgress, ListItemAvatar} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {formatBytes} from "./formatNumber";

type LoadingListItemProps = {
    file: File,
    lessonId: string
}
export default function LoadingListItem(props: LoadingListItemProps) {
    const {file, lessonId} = {...props};
    const snackbar = useSnackbar();
    const [progress, setProgress] = useState<any>(null);
    const startUploading = async () => {
        try {
            const fileName = `${Date.now()}-${file.name.replace(/ /g, '_')}`;
            const uploadedFile: any = await Storage.put(fileName, file, {
                contentType: file.type,
                progressCallback: (progress: any) => {
                    setProgress(progress);
                }
            })
            const input: any = {
                key: uploadedFile.key,
                bucket: awsConfig.aws_user_files_s3_bucket,
                region: awsConfig.aws_user_files_s3_bucket_region,
                lessonID: lessonId
            };
            const result: any = await API.graphql(graphqlOperation(createFile, {input}));
            snackbar.enqueueSnackbar('File added: ' + result.data.createFile.key, {variant: 'success'});
            console.log(result);

        } catch (error) {
            console.error(`During the file uploading error occurred:`, error)
        }
    }
    useEffect(() => {
        startUploading();
        return () => {

        };
    }, []);

    return (<ListItem disablePadding>
        <ListItemButton>
            <ListItemIcon>
                {progress?.loaded === progress?.total ?
                    <CheckCircleIcon color={'success'} fontSize={'large'}/>
                    :
                    <CircularProgress thickness={6} size={30} variant="determinate"
                                      value={((progress?.loaded ?? 0) / (progress?.total ?? 1) * 100)}/>
                }
            </ListItemIcon>
            <ListItemText primary={file.name} secondary={progress?.loaded ? `${formatBytes(progress?.loaded)} of ${formatBytes(progress?.total)}` : 'Starting Uploading'}/>
        </ListItemButton>
    </ListItem>);
}