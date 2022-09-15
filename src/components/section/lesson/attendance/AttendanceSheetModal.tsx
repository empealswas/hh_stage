import React, {useContext, useState} from 'react';

import {
    Button,
    Card, CardActionArea,
    CardContent,
    Container,
    Dialog,
    DialogContent,
    IconButton, Stack,
    Toolbar,
    Typography
} from "@mui/material";
import AttendanceSheetTable from "./AttendanceSheetTable";
import Iconify from "../../../Iconify";
import AttendanceSheetContainer from "./AttendanceSheetContainer";
import useSettings from "../../../../hooks/useSettings";
import {BoxMask} from "../../../settings";
import {styled} from "@mui/material/styles";


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
const BoxStyle = styled(CardActionArea)(({theme}) => ({
    height: 72,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'solid 2px black',
    borderRadius: Number(theme.shape.borderRadius),
}));
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
            <Container style={{display: 'flex', justifyContent: 'center'}}>
                <BoxStyle
                    sx={{
                        padding: 5,
                        width: 100
                    }}
                    onClick={handleOpen}
                >
                    <Stack direction={'column'} alignItems={'center'} justifyContent={'center'}>
                        <Iconify
                            icon={'lucide:sheet'}
                            width={28}
                            height={28}
                        />
                        <Typography variant={'subtitle1'}>Attendance sheet</Typography>
                    </Stack>
                    <BoxMask value={'ltr'}/>
                </BoxStyle>
            </Container>
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
