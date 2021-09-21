import * as React from 'react';
import {DataGrid, GridColDef, GridValueGetterParams} from '@material-ui/data-grid';
import {useContext, useEffect, useState} from "react";
import {SchoolManagementContext} from "./SchoolManagement";
import {API, graphqlOperation} from "aws-amplify";
import {Button} from "@material-ui/core";
import CachedIcon from '@material-ui/icons/Cached';
import {Pupil, Teacher} from "../../API";
import {onCreateTeacher} from "../../graphql/subscriptions";
import {updatePupil, updateTeacher} from "../../graphql/mutations";

const columns: GridColDef[] = [
    {field: 'id', headerName: 'Email', flex: 1},
    {
        field: 'firstName',
        headerName: 'First name',
        flex: 1,
        editable: true,
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        flex: 1,
        editable: true,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        flex: 1,
        valueGetter: (params: GridValueGetterParams) =>
            `${params.getValue(params.id, 'firstName') || ''} ${
                params.getValue(params.id, 'lastName') || ''
            }`,
    },
];


export default function TeachersTable() {
    const school = useContext(SchoolManagementContext);

    async function getTeachers() {
        console.log(school)
        return API.graphql(graphqlOperation(`query MyQuery($filter: ModelTeacherFilterInput = {}) {
  listTeachers(filter: $filter) {
    items {
      id
      firstName
      lastName
    }
  }
}
`, {filter: {schoolID: {eq: school?.id}}}));
    }

    function loadTeachers() {
        setTeachers(null);
        getTeachers().then((teachers: any) => {
            console.log(teachers);
            setTeachers(teachers.data.listTeachers.items);
        })
    }

    function getOnCreateTeacherSubscriber() {
        // @ts-ignore
        return API.graphql(graphqlOperation(onCreateTeacher)).subscribe({
            next: (data: any) => (
                loadTeachers()
            ),
            error: () => {

            }
        });

    }

    useEffect(() => {
        loadTeachers()
        let subscriber: any = getOnCreateTeacherSubscriber();
        return () => {
            subscriber.unsubscribe();
        }
    }, [])
    const [teachers, setTeachers] = useState<Teacher[] | null>(null);
    return (
        <div>

            <div style={{width: '100%', display: 'flex'}}>
                <DataGrid
                    rows={teachers?.map((teacher, index) => ({
                        id: teacher.id,
                        lastName: teacher.lastName,
                        firstName: teacher.firstName,
                    })) ?? []}
                    onCellEditCommit={(params, event, details) => {
                        const teacher = teachers?.find(teacher => teacher.id === params.id) as Teacher;

                        const res = API.graphql(graphqlOperation(updateTeacher, {
                            input: {
                                id: teacher.id,
                                [params.field]: params.value
                            }
                        }))
                        console.log(res)
                    }}
                    columns={columns}
                    loading={!teachers}
                    rowsPerPageOptions={[5,20,100]}
                    autoHeight
                />
            </div>
            <Button startIcon={<CachedIcon/>} onClick={() => {
                loadTeachers();
            }}/>
        </div>
    );
}
