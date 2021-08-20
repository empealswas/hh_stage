import React, {useContext, useState} from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {SchoolsContext} from "../../pages/Schools";
import {School} from "../../API";
import {useNavigate} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import {Button, Typography} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import {Link as RouterLink} from 'react-router-dom';

const SchoolsTable = (props: { filterOption: string }) => {
    const [loading, setLoading] = useState(false);
    const schools = useContext(SchoolsContext);
    return (
        <TableContainer component={Paper} style={{display: 'flex', flexWrap: 'wrap'}}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell/>
                        <TableCell> School</TableCell>
                        <TableCell align="left">Country</TableCell>
                        <TableCell align="left">Region</TableCell>
                        <TableCell align="left">Principal</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {schools == null ?
                        [0, 1, 2, 3].map((value, index) => (
                            <SkeletonRow key={index}/>
                        ))
                        :
                        schools.filter(value => value?.name?.toLowerCase().includes(props.filterOption.toLowerCase())).map((row) => (
                            <Row key={row.name} school={row}/>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
const Row = (props: { school: School }) => {
    const {school} = props;
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    return (
        <React.Fragment>
            <TableRow>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {school.name}
                </TableCell>
                <TableCell align="left">{school.country}</TableCell>
                <TableCell align="left">{school.region}</TableCell>
                <TableCell align="left">{school.principal}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Actions
                            </Typography>
                            <Button variant="contained" style={{backgroundColor: 'red'}} onClick={() => {
                                // deleteSchoolById(school).then(response => {
                                //     console.log(response);
                                // })
                            }}>
                                Delete School
                            </Button>
                            <Button component={RouterLink} to={`${school.id}/manage`} variant='contained'
                                    style={{backgroundColor: 'darkorange', marginLeft: '10px'}}>
                                Manage
                            </Button>
                            <Button component={RouterLink} to={`${school.id}/classrooms`} variant='contained'
                                    style={{backgroundColor: 'lightgreen', marginLeft: '10px'}}>
                                Classrooms
                            </Button>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

function SkeletonRow() {
    const [open, setOpen] = React.useState(false);
    return (
        <React.Fragment>
            <TableRow>
                <TableCell>
                    <Skeleton variant={'circular'} width={30} height={30}/>
                </TableCell>
                <TableCell component="th" scope="row">
                    <Skeleton variant={'text'}/>
                </TableCell>
                <TableCell align="left"><Skeleton variant={'text'}/></TableCell>
                <TableCell align="left"><Skeleton variant={'text'}/></TableCell>
                <TableCell align="left"><Skeleton variant={'text'}/></TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default SchoolsTable