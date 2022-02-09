import {UserRole} from "../../../API";
import React, {SetStateAction} from "react";
import {Checkbox, FormControl, FormControlLabel, FormGroup, Typography} from "@mui/material";

const RolesThatCanAccess = ({
                                roles,
                                setRoles
                            }: { roles: { role: UserRole, selected: boolean }[], setRoles: React.Dispatch<React.SetStateAction<{ role: UserRole, selected: boolean }[] | null>> }) => {


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRoles(prevState => {
            if (prevState) {
                const copy = [...prevState];
                const role = copy.find(value => value.role.id === event.target.name);
                if (role) {
                    role.selected = event.target.checked;
                }
                return copy;
            }
            return prevState;
        });
    }
    return (<FormControl sx={{m: 3}} component="fieldset" variant="standard">
        <Typography>Who can access this section</Typography>
        <FormGroup>
            {roles.map(role => (
                <FormControlLabel
                    key={role.role.id}
                    control={
                        <Checkbox checked={role.selected} onChange={handleChange} name={role.role.id}/>
                    }
                    label={role.role.name}
                />
            ))}
        </FormGroup>
    </FormControl>)
}
export default RolesThatCanAccess;