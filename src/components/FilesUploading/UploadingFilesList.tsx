import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {IconButton, ListItemIcon, ListItemSecondaryAction} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

const UploadingFilesList = (props: { files: File[], setFiles: React.Dispatch<React.SetStateAction<File[]>> }) => {

    return (
        <List >
            {props.files.map((item, index) => (
                <ListItem key={index}>
                    <ListItemText primary={item.name}/>
                    <ListItemSecondaryAction>
                        <IconButton onClick={
                            () => {
                                props.setFiles(prevState => {
                                    return prevState.filter(file => file !== item);
                                })
                            }
                        }>
                            <DeleteIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            ))}
        </List>
    );
}
export default UploadingFilesList