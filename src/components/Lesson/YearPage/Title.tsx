import React, {ReactElement} from 'react';
import {Container, IconButton, Stack, Typography} from "@material-ui/core"
import EditIcon from '@mui/icons-material/Edit';
import {Skeleton, Tooltip} from "@mui/material";
import AddingDialog from "../../../utils/AddingDialog";
import editFill from "@iconify/icons-eva/edit-fill";
import YearPageForm from "./YearPageForm";
import YearPageEditionModal from "./YearPageEditionModal";


type TitleProps = {
    title: string | null,
    editingForm: ReactElement,
    deletionModal: ReactElement,
}
const Title = (props: TitleProps) => {
    return (
        <Container>
            <Stack direction={'row'} mb={5} justifyContent={'center'} alignItems="center" spacing={2}>
                <Typography variant={'h2'}>
                    {props.title ?
                        props.title :
                        <Skeleton width={'20vw'}/>
                    }
                </Typography>
                {props.editingForm}
                {props.deletionModal}
            </Stack>
        </Container>
    );
};

export default Title;
