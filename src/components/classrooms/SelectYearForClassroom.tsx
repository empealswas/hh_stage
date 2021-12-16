import React, {useEffect, useState} from 'react';
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@material-ui/core";
import {API, graphqlOperation} from "aws-amplify";
import {updateClassroom} from "../../graphql/mutations";
import {Curriculum} from "../../API";
import {useParams} from "react-router-dom";
import {listCurricula} from "../../graphql/queries";

const query = `query MyQuery($id: ID = "") {
  getClassroom(id: $id) {
    yearGroupID
    pupils {
      items {
        pupil {
          firstName
          lastName
        }
      }
    }
    teachers {
      items {
        teacher {
          lastName
          firstName
          email
        }
      }
    }
  }
}`
const SelectYearForClassroom = () => {
    const [curricula, setCurricula] = useState<Curriculum[] | null>(null);
    const {classroomId, id} = useParams();
    const [curriculumOfClassroom, setCurriculumOfClassroom] = useState('');

    useEffect(() => {
        const fetchYearGroups = async (): Promise<any> => {
            try {
                const curriculaData: any = await API.graphql(
                    graphqlOperation(listCurricula)
                );
                const curricula: Curriculum[] = curriculaData.data.listCurricula.items;
                setCurricula(curricula)

                const classroomData: any = await API.graphql(graphqlOperation(query, {id: classroomId}))
                setCurriculumOfClassroom(classroomData.data.getClassroom.yearGroupID)
            } catch (err) {
                console.log("error fetching posts: ", err);
            }
        };
        fetchYearGroups()
    }, []);
    const handleChange = (event: SelectChangeEvent) => {
        let yearPageId: string | null = event.target.value;
        if (!yearPageId) {
            yearPageId = null;
        }
        API.graphql(graphqlOperation(updateClassroom, {
            input: {
                id: classroomId,
                yearGroupID: yearPageId
            }
        }));
        if (yearPageId) {
        setCurriculumOfClassroom(yearPageId);
        }
    };
    if (!curricula) {
        return <></>
    }
    console.log(curricula)
    return (
        <FormControl sx={{minWidth: 200}}>
            <InputLabel id="demo-simple-select-label">Year Group</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={curriculumOfClassroom}
                label="Year Group"
                onChange={handleChange}
            >
                <MenuItem value={''}>
                    <em>None</em>
                </MenuItem>
                {curricula.map(curriculum => (
                    <MenuItem value={curriculum.id} key={curriculum.id}>{curriculum.name}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
export default SelectYearForClassroom;
