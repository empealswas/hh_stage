import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';
import {IconButton, Tooltip} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import Iconify from "../Iconify";

type DeletionModalProps = {
    title: string,
    onDelete: () => Promise<any>,

}

const DeletionModal = (props: DeletionModalProps) => {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Tooltip title={'Delete'}>
                <IconButton onClick={handleClickOpen}>
                    <Iconify icon={'mdi:delete'} sx={{fontSize: 30}} color={'error'} fontSize={'large'}/>
                </IconButton>
            </Tooltip>
            <Dialog
                open={open}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        You cannot reverse this action!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant={'contained'} onClick={handleClose}>Cancel</Button>
                    <LoadingButton loading={loading} color={'error'} onClick={() => {
                        setLoading(true)

                        props.onDelete().then(value => {
                            setLoading(false);
                            setOpen(false);
                        })
                    }}>Delete</LoadingButton>

                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DeletionModal;
