import React from 'react';
import {Accordion, AccordionDetails, Button, Stack, Typography} from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import Iconify from "../../../../components/Iconify";
import {DataGrid, GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import {User} from "../../../../API";
import MemberRolesMenu from "../MemberRolesMenu";
import UserMoreMenu from "../UserMoreMenu";
import {Link} from "react-router-dom";
type Props = {
    users: User[]
}
const UsersDetailsAccordion = ({users}: Props) => {
    const MemberTableItem = (params: GridRenderCellParams) => {

        const terraId = params.getValue(params.id, 'terraId');
        if (!terraId) {
            return <Button variant={'contained'} disabled={true}>Not Connected</Button>
        }
        return (
            <Button variant={'contained'} component={Link} to={`${terraId}`} >Details</Button>
        );
    }
    const columns: GridColDef[] = [
        {field: 'id', flex: 0.2, headerName: 'Id', hide: true},
        {field: 'terraId', flex: 0.2, headerName: 'TerraId', hide: true},
        {
            field: 'firstName',
            headerName: 'First Name',
            flex: 1,
            editable: false
        },
        {
            field: 'lastName',
            headerName: 'Last Name',
            flex: 1,
            editable: false
        },
        {
            field: 'roles',
            headerName: 'Actions',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            flex: 0.6,
            align: 'center',
            headerAlign: 'center',
            renderCell: MemberTableItem,
        },


    ];
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<Iconify icon={'ic:baseline-expand-more'} sx={{width: 40, height: 40}}/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>Show Users</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <div style={{width: '100%', display: 'flex'}}>
                    <DataGrid
                        rows={users}
                        disableSelectionOnClick
                        columns={columns}
                        autoHeight={true}
                    />
                </div>
            </AccordionDetails>
        </Accordion>
    );
};

export default UsersDetailsAccordion;
