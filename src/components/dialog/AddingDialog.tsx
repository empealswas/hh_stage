import React, {ReactNode, useState} from 'react';
import {
    Button,
    Card, CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    IconButton,
    Stack,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";
import {useFormikContext} from "formik";
import {CloseIcon} from "../../theme/overrides/CustomIcons";
import Iconify from "../Iconify";
import {LoadingButton} from "@mui/lab";


interface AddingDialogProps {
    title: string,
    buttonName: string,
    children?: ReactNode,
    edit?: boolean,
    onSubmit: () => Promise<any>,
}

export default function AddingDialog(props: AddingDialogProps) {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const formik = useFormikContext();
    const handleOpen = () => {
        setLoading(false);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const onSubmitDialog = () => {
        setLoading(true);
        props.onSubmit()
            .then(
                value => {
                }
            ).catch(error => {
            console.log(error);
        }).finally(() => {
            setLoading(false);
        })
    }
    return (
        <>
            {props.edit ?? false ? <Tooltip title={'Edit'}>
                    <IconButton onClick={handleOpen}>
                        <Iconify icon={'eva:edit-outline'} sx={{fontSize: 30}}/>
                    </IconButton>
                </Tooltip> :
                <Button variant="contained"
                        startIcon={<Iconify icon={'eva:plus-outline'}/>} onClick={handleOpen}>
                    {props.buttonName}
                </Button>
            }
                <Dialog open={open} onClose={handleClose}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon/>
                        </IconButton>
                        <Typography variant="h6">
                            {props.title}
                        </Typography>
                    </Toolbar>
                    <DialogContent dividers>
                        <Card>
                            <CardContent>
                                <FormControl sx={{minWidth: ('calc(200px + 10vw)')}}>
                                    <Stack direction='column' spacing={3}>
                                        {props.children}
                                    </Stack>
                                </FormControl>
                            </CardContent>
                        </Card>
                    </DialogContent>
                    <DialogActions>
                        <Button color={'inherit'} variant={'contained'} onClick={handleClose}>Cancel</Button>
                        <LoadingButton variant={'contained'} onClick={onSubmitDialog}
                                       loading={loading}
                                       disabled={loading || (formik ? !formik?.isValid : false)}>Add</LoadingButton>
                    </DialogActions>
                </Dialog>
        </>
    );
}
