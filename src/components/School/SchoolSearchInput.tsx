/* eslint-disable no-use-before-define */
import React, {useContext} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import {SchoolsContext} from "../../pages/Schools";

interface SchoolSearchInputProps {
    setFilterOption: React.Dispatch<React.SetStateAction<string>>
}

export const SchoolSearchInput = (props: SchoolSearchInputProps) => {
    const schools = useContext(SchoolsContext);
    return (
        <div >
            {schools == null ? (
                    <Typography variant={"h2"}>
                        <Skeleton variant={'text'}/>
                    </Typography>
                )
                :
                <Autocomplete
                    id="free-solo-demo"
                    freeSolo
                    options={schools.map((option) => option.name)}
                    renderInput={(params) => (
                        <TextField {...params} label="Search..." margin="normal" variant="outlined"/>
                    )}
                    onChange={(event, value) => {
                        console.log(value);
                    }}
                    onInputChange={(event, value) => {
                        if (value) {
                            props.setFilterOption(value);
                        } else {
                            props.setFilterOption('');
                        }
                    }}
                />
            }
        </div>);
}



