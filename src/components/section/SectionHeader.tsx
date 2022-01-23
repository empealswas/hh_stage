import React, {ReactElement} from 'react';
import {Container, Skeleton, Stack, Typography} from "@mui/material";



type TitleProps = {
    title: string | null,
    editingForm: ReactElement,
    deletionModal: ReactElement,
}
const SectionHeader = (props: TitleProps) => {
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

export default SectionHeader;
