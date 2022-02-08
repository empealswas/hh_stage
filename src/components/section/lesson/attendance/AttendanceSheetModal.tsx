import React, {useContext, useState} from 'react';

import {
    Button,
    Card,
    CardContent,
    Container,
    Dialog,
    DialogContent,
    IconButton,
    Toolbar,
    Typography
} from "@mui/material";
import AttendanceSheetTable from "./AttendanceSheetTable";
import Iconify from "../../../Iconify";
import AttendanceSheetContainer from "./AttendanceSheetContainer";
import useSettings from "../../../../hooks/useSettings";


const query = `query MyQuery($id: ID = "") {
  getTeacher(id: $id) {
    classrooms {
      items {
        classroom {
          name
          id
        }
      }
    }
  }
}
`;
const getPupilsOfClassroomAttendanceQuery = `query MyQuery($eq: ID = "", $id: ID = "") {
  getClassroom(id: $id) {
    pupils {
      items {
        pupil {
          id
          firstName
          lastName
          Attendances(filter: {lessonID: {eq: $eq}}) {
            items {
              id
              pupilID
              present
            }
          }
        }
      }
    }
  }
}
`

const AttendanceSheetModal = (props: { lessonId: string }) => {
    const [open, setOpen] = React.useState(false);
    const settings = useSettings();
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <>
            <Button variant={'outlined'} color={'primary'} onClick={handleOpen}>
                Attendance Sheet
            </Button>
            <Dialog fullScreen open={open} onClose={handleClose}>
                <Container maxWidth={settings.themeStretch ? false: 'lg'}>

                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <Iconify icon={'eva:close-square-outline'} sx={{fontSize: 30}}/>
                    </IconButton>
                    <Typography variant="h6">
                        Attendance sheet
                    </Typography>
                </Toolbar>
                <DialogContent>
                    <Card>
                        <CardContent>
                            {/*<AttendanceSheetTable/>*/}
                            <AttendanceSheetContainer />
                        </CardContent>
                    </Card>
                </DialogContent>
                </Container>
            </Dialog>
        </>
    );
}
export default AttendanceSheetModal;
