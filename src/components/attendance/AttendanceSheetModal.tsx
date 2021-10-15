import React, {useContext, useState} from 'react';
import Fade from '@material-ui/core/Fade';
import {
    Button,
    Card,
    Checkbox,
    CircularProgress,
    Dialog, DialogActions, DialogContent,
    FormControlLabel,
    InputLabel,
    Paper,
    Select,
    Stack
} from "@material-ui/core";
import {Attendance, Classroom, Pupil} from "../../API";
import {Connect} from "aws-amplify-react";
import {API, graphqlOperation} from "aws-amplify";
import {IConnectState} from "aws-amplify-react/lib/API/GraphQL/Connect";
import ProgressButton from "../Buttons/ProgressButton";
import {createAttendance, updateAttendance} from "../../graphql/mutations";
import {UserContext} from "../../App";
import {TransitionProps} from "@material-ui/core/transitions";
import Slide from "@material-ui/core/Slide";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import AttendanceSheetTable from "./AttendanceSheetTable";
import LessonDetails from "./LessonDetails";


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
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const AttendanceSheetModal = (props: { lessonId: string }) => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setAttendanceByPupil(null);
        setSuccess(false);
        setOpen(false);
    };
    const handleAttendance = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAttendanceByPupil(prevState => (
            {...prevState, [event.target.name]: event.target.checked})
        );
        console.log('attendance!!!', attendanceByPupil);
    };


    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [selectedClassroom, setSelectedClassroom] = useState<string>('');
    const [attendanceByPupil, setAttendanceByPupil] = useState<{ [name: string]: boolean } | null>(null);
    const handleChange = (event: any) => {
        setSelectedClassroom(event.target.value)
    };
    const user = useContext(UserContext);
    console.log('user', user)

    function updateAttendanceSheet(pupils: Pupil[]) {
        return async () => {
            if (!attendanceByPupil) return;
            setLoading(true);
            pupils.map(async pupil => {
                if (pupil.Attendances?.items?.length == 0) {
                    const input = {
                        lessonID: props.lessonId,
                        pupilID: pupil.id,
                        present: attendanceByPupil[pupil.id]
                    }
                    await API.graphql(graphqlOperation(createAttendance, {input}))
                } else {
                    let [attendance] = pupil.Attendances?.items as Attendance[]
                    console.log('updating attendance', attendance)
                    if (attendance) {

                        const input = {
                            id: attendance.id,
                            pupilID: pupil.id,
                            lessonID: props.lessonId,
                            present: attendanceByPupil[pupil.id]
                        };
                        await API.graphql(graphqlOperation(updateAttendance, {input}))
                    }
                }
            })
            setLoading(false);
            setSuccess(true);


        };
    }

    return (
        <div>
            <Button variant={'outlined'} color={'primary'} onClick={handleOpen}>
                Attendance Sheet
            </Button>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon/>
                    </IconButton>
                    <Typography variant="h6">
                        Attendance sheet
                    </Typography>
                </Toolbar>
                <DialogContent>
                    <Card style={{
                        padding: '20px',
                        margin: '30px'
                    }}>
                        <AttendanceSheetTable/>
                    </Card>
                    <DialogContent>

                    </DialogContent>
                </DialogContent>
            </Dialog>
        </div>
    );
}
export default AttendanceSheetModal;
