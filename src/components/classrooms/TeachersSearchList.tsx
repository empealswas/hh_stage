/* eslint-disable no-use-before-define */

import React, {useState} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import {useParams} from "react-router-dom";
import {Connect} from "aws-amplify-react";
import {API, graphqlOperation} from "aws-amplify";
import {IConnectState} from "aws-amplify-react/lib/API/GraphQL/Connect";
import Skeleton from "@material-ui/lab/Skeleton";
import {Button} from "@material-ui/core";
import {Teacher} from "../../API";
import {createTeacherClassroom} from "../../graphql/mutations";
import {onCreateTeacherClassroom} from "../../graphql/subscriptions";

const icon = <CheckBoxOutlineBlankIcon fontSize="small"/>;
const checkedIcon = <CheckBoxIcon fontSize="small"/>;
const schoolQuery =
    `query MyQuery($id: ID = "") {
  getSchool(id: $id) {
    Teachers {
      items {
        id
        lastName
        firstName
      }
    }
  }
}
`;
const classroomQuery = `query MyQuery($id: ID = "") {
  getClassroom(id: $id) {
    teachers {
      items {
        teacher {
          id
        }
      }
    }
  }
}
`;
export default function TeachersSearchList() {
    const {classroomId, id} = useParams();
    const [selectedTeachers, setSelectedTeachers] = useState<Teacher [] | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const addPupilsToClassroom = async () => {
        setLoading(true);
         selectedTeachers?.forEach( (teacher) => {
            setLoading(true);
            const input = {
                classroomID: classroomId,
                teacherID: teacher.id
            };
             API.graphql(graphqlOperation(createTeacherClassroom, {input}));
        });
        setLoading(false);
    }
    const disabled = selectedTeachers?.length == 0;
    return (
        <Connect query={graphqlOperation(schoolQuery, {id: id})}
                 subscription={graphqlOperation(onCreateTeacherClassroom)}
                 onSubscriptionMsg={(prevData, data) => {
                     return prevData;
                 }}>
            {(school: IConnectState) => {
                return (
                    <Connect query={graphqlOperation(classroomQuery, {id: classroomId})}>
                        {(classroom: IConnectState) => {

                            if (school.loading || classroom.loading) {
                                return (
                                    <Skeleton variant={'rectangular'} width={500} height={50}/>
                                )
                            }
                            const pupilsInClassroom: Teacher [] = classroom.data.getClassroom.teachers.items?.map((item: any) => item.teacher);
                            const pupilsInSchool: Teacher [] = school.data.getSchool.Teachers.items;
                            return (
                                <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                                    <Autocomplete
                                        multiple
                                        id="checkboxes-tags-demo"
                                        options={pupilsInSchool}
                                        disableCloseOnSelect
                                        getOptionLabel={(pupil: Teacher) => `${pupil.firstName} ${pupil.lastName}`}
                                        getOptionDisabled={(option) => pupilsInClassroom.find(value => value.id === option.id) !== undefined}
                                        renderOption={(props, option: Teacher, { selected }) => (
                                            <li {...props}>
                                                <Checkbox
                                                    icon={icon}
                                                    checkedIcon={checkedIcon}
                                                    style={{ marginRight: 8 }}
                                                    checked={selected}
                                                />
                                                {`${option.firstName} ${option.lastName}`}
                                            </li>
                                        )}
                                        style={{width: 500}}
                                        renderInput={(params) => (
                                            <TextField {...params} variant="outlined" label="Teachers In Class"
                                                       placeholder="Add Teachers To The Class"/>
                                        )}
                                        onChange={(event: any, newValue: any) => {
                                            setSelectedTeachers(newValue);
                                        }}
                                    />
                                    <Button variant={'contained'} color={'primary'} onClick={addPupilsToClassroom}
                                            disabled={disabled}>
                                        Add Selected Teachers
                                    </Button>
                                </div>);
                        }}
                    </Connect>
                )
            }}
        </Connect>
    );
}

