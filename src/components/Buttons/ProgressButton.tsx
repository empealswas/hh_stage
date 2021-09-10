import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import {green, red} from '@material-ui/core/colors';
import Button, {ButtonProps} from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import {Box} from "@material-ui/core";

interface ProgressButtonProps{
    buttonProps?: ButtonProps
    success: boolean,
    loading: boolean,
    onClick?: () => void,
    onClickWhenSuccess?: () => void,
    disabled: boolean,
    error?: boolean
}
const ProgressButton = (props: ProgressButtonProps) => {
    const buttonSx = {
        ...(props.success && {
                bgcolor: green[500],
                '&:hover': {
                    bgcolor: green[700],
                },
            }
        ),
        ...(props.error && {
                bgcolor: red[500],
                '&:hover': {
                    bgcolor: red[700],
                },
            }
        ),
    };
    const RenderText = () =>{
        if (props.success) {
            return 'Added'
        }
        if (props?.error) {
            return 'Error';
        }
        return 'Save'
    }
    return (
        <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Box sx={{m: 1, position: 'relative'}}>
                <Button
                    variant="contained"
                    sx={buttonSx}
                    disabled={props.loading || props.disabled}
                    onClick={() => {
                        if (props.success) {
                            props.onClickWhenSuccess?.();
                        }else{
                            props.onClick?.();
                        }
                    }}
                    startIcon={props.success ? <CheckIcon/> : <SaveIcon/>}
                    {...props.buttonProps}
                >
                    {RenderText()}
                {props.loading && (
                    <CircularProgress
                        size={24}
                        sx={{
                            color: green[500],
                            position: 'absolute',
                        }}
                    />
                )}
                </Button>
            </Box>
        </Box>
    );
};

export default ProgressButton;
