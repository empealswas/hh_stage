import React, {useEffect, useState} from 'react';
import {testWearables} from "../apiFunctions/apiFunctions";
import {Button, Container, Stack, TextareaAutosize} from "@mui/material";
import {LoadingButton} from "@mui/lab";

const TestPage = () => {
    const [value, setValue] = useState<string>('');
    const [loading, setLoading] = useState(false);
    return (
        <Container>
            <Stack direction={'column'} spacing={4}>
                <LoadingButton loading={loading} variant={'contained'} onClick={() => {
                    setLoading(true);
                    testWearables({}).then(value => {
                        setValue(JSON.stringify(value));
                        console.log('VALUE', value);
                    }).catch(error => {
                        console.error(error);
                        setValue(error.message);
                    }).finally(() => {
                        setLoading(false);
                    });
                }}>Test</LoadingButton>
                <TextareaAutosize minRows={5} value={value}></TextareaAutosize>
            </Stack>
        </Container>
    );
};

export default TestPage;
