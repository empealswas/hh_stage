/* eslint-disable no-use-before-define */

import React, {useEffect, useState} from 'react';
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
import {Button, CircularProgress, Container} from "@material-ui/core";
import {Pupil, Subject} from "../../API";
import {createPupilClassroom} from "../../graphql/mutations";
import {onCreatePupilClassroom} from "../../graphql/subscriptions";
import {Stack} from '@material-ui/core';

const icon = <CheckBoxOutlineBlankIcon fontSize="small"/>;
const checkedIcon = <CheckBoxIcon fontSize="small"/>;
const schoolQuery =
    `query MyQuery($id: ID = "") {
  getSchool(id: $id) {
    Pupils {
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
    pupils {
      items {
        pupil {
          id
        }
      }
    }
  }
}
`;
const subscription = `subscription MySubscription {
  onCreatePupilClassroom {
    classroomID
    pupil {
      id
      firstName
      lastName
    }
  }
}
`
export default function PupilsAddingList() {
    const {classroomId, id} = useParams();
    const [selectedPupils, setSelectedPupils] = useState<Pupil [] | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState(false);

    useEffect(() => {
    }, [selectedPupils]);

    const updateItems = (prevData: any, data: any) => {
        console.log(prevData)

        if (data.onCreatePupilClassroom.classroomID !== classroomId) {
            console.log(prevData)
            return prevData;
        }
        let newData = {...prevData};
        console.log(prevData);
        const pupils: Pupil [] = prevData.getClassroom.pupils.items
            .map((item: any) => item.pupil)
            .filter((pupil: Pupil) => pupil.id !== data.onCreatePupilClassroom.pupil.id);

        pupils.push(data.onCreatePupilClassroom.pupil);
        newData.getClassroom.pupils.items = pupils.map(item => ({pupil: {...item}}))
        return newData;
    }
    const addPupilsToClassroom = async () => {
        await selectedPupils?.forEach((pupil) => {
            const input = {
                classroomID: classroomId,
                pupilID: pupil.id
            };
            API.graphql(graphqlOperation(createPupilClassroom, {input}));
        })
        setSelectedPupils(undefined)
    }
    const disabled = !selectedPupils || selectedPupils.length === 0;
    return (
        <Connect query={graphqlOperation(schoolQuery, {id: id})}>
            {(school: IConnectState) => {
                return (
                    <Connect query={graphqlOperation(classroomQuery, {id: classroomId})}
                             subscription={graphqlOperation(subscription)}
                             onSubscriptionMsg={updateItems}>
                        {(classroom: IConnectState) => {

                            if (school.loading || classroom.loading) {
                                return (
                                    <Skeleton variant={'rectangular'} width={500} height={50}/>
                                )
                            }
                            const pupilsInClassroom: Pupil [] = classroom.data?.getClassroom?.pupils?.items?.map((item: any) => item.pupil);
                            const pupilsInSchool: Pupil [] = school.data.getSchool.Pupils.items;
                            return (
                                    <Stack direction={'row'} alignItems={'center'} spacing={10}>
                                        <Autocomplete
                                            multiple
                                            id="checkboxes-tags-demo"
                                            options={pupilsInSchool}
                                            disableCloseOnSelect
                                            getOptionLabel={(pupil: Pupil) => `${pupil.firstName} ${pupil.lastName}`}
                                            getOptionDisabled={(option) => pupilsInClassroom.find(value => value.id === option.id) !== undefined}
                                            renderOption={(props, option: Pupil, {selected}) => (
                                                <li {...props}>
                                                    <Checkbox
                                                        icon={icon}
                                                        checkedIcon={checkedIcon}
                                                        style={{marginRight: 8}}
                                                        checked={selectedPupils?.find(pupil => pupil.id === option.id) !== undefined}
                                                    />
                                                    {`${option.firstName} ${option.lastName}`}
                                                </li>
                                            )}
                                            style={{width: 500}}

                                            renderInput={(params) => (
                                                <TextField {...params} variant="outlined" label="Pupils In Class"
                                                           placeholder="Add Pupils To The Class"/>
                                            )}
                                            onChange={(event: any, newValue: any) => {
                                                setSelectedPupils(newValue);
                                            }}
                                        />
                                        {loading ? <CircularProgress/> :
                                            <Button variant={'contained'} color={'primary'}
                                                    onClick={() => {
                                                        setLoading(true);
                                                        addPupilsToClassroom().then(value => {
                                                            setLoading(false);
                                                        })
                                                    }}
                                                    disabled={disabled}>
                                                Add Selected Pupils
                                            </Button>}
                                    </Stack>

                              );
                        }}
                    </Connect>
                )
            }}
        </Connect>
    );
}

