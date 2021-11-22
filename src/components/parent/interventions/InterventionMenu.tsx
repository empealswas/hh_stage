import React, {useState} from 'react';
import {Button, Menu, MenuItem, Typography} from "@material-ui/core";
import {Icon} from "@iconify/react";
import chevronUpFill from "@iconify/icons-eva/chevron-up-fill";
import chevronDownFill from "@iconify/icons-eva/chevron-down-fill";
import {Box, Card, IconButton, Stack, TextField} from "@mui/material";
import FeedbackIcon from '@mui/icons-material/Feedback';
import {Rating} from "@mui/lab";

const InterventionMenu = () => {
    const [open, setOpen] = useState(null);

    const handleOpen = (event: any) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
    };
    return (
        <>
            <IconButton
                color="inherit"
                disableRipple
                onClick={handleOpen}
            >
                <FeedbackIcon color={'action'}/>
            </IconButton>
            <Menu
                keepMounted
                anchorEl={open}
                open={Boolean(open)}
                onClose={handleClose}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                transformOrigin={{vertical: 'top', horizontal: 'center'}}
            >
                <Stack sx={{margin: 2}} spacing={2} direction={'column'}>
                    <Typography>Please rate this intervention</Typography>
                    <Rating
                        name="simple-controlled"
                        value={2}
                        onChange={(event, newValue) => {
                            // setValue(newValue);
                        }}
                    />
                    <TextField label={'Comment'} multiline={true}>
                    </TextField>
                    <Button variant={'outlined'}>Submit</Button>
                </Stack>
            </Menu>
        </>
    );
};

export default InterventionMenu;
