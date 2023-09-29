
import React, { useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {
    Grid, Box, Button, InputAdornment, TextField, MenuItem, FormControl, InputLabel,Modal
} from "@mui/material";
import Iconify from '../../../components/Iconify';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { json } from 'node:stream/consumers';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

export default function AssessmentForm() {

    const {organizationId} = useParams();
    const [assessment_name_list, setAssessmentNameList] = useState([]);
    const [name_list,setNameList]=useState([{ assessment_id: '', assessment_name: '' }]);
    
    // validation
    const [message,setMessage]=useState("");
    const [message_question_answer,setMessageQuestionAnswer]=useState("");
    const [score_message,setScoreMessage]=useState("");
    const [assessment_message,setAssessmentMessage]=useState("");
    const [master_assessment_name,setMasterAssessmentName]=useState("");

    const [assessment_name, setAssessmentName] = useState<string[]>([]);
    const [assessment_score, setAssessmentScore] = useState<string[]>([]);

    const [inputList, setinputList] = useState([{ assessmentName: '', score: '' }]);
    const [duration,setDuration]=useState("0");

    const [assessment_data,setAssessmnet]=useState([{organization_assessment_id:'','org_id':'','question':'','options':''}]);

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
        };
    const handleClose = () => {
        setOpen(false);   
        setMessage("");     
        };

    function storeAssessmentName()
    {
        
        if(master_assessment_name==="")
            setMessage("Please give a name");
        else{
            setMessage("Insertion is in progress");
            const json_data = {
                'name':master_assessment_name,
            };
            fetch('https://qu9pa2dm25.execute-api.eu-west-2.amazonaws.com/dev/insert-master-assessment-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    assessment_name: json_data
                }),
                })
                .then((response) => {return response.json()})
                .then((data)=>setMessage(data.message))
                .then(()=>getAssessmentList())
                .then(()=>getMasterAssessmentList());
            }
    }
    function removeMasterAssessment(row_data:any)
    {
        const json_data = {
            'id':row_data.id,
        };
    fetch('https://pcnb9bpbxi.execute-api.eu-west-2.amazonaws.com/dev/lambda-rds-python-dev-remove-master-assessment-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                assessment_name: json_data
            }),
            })
            .then((response) => {return response.json()})
            .then((data)=>setMessage(data.message))
            .then(()=>getAssessmentList())
            .then(()=>getMasterAssessmentList());

    }
    function removeOrganizationAssessment(row_data:any)
    {
        const json_data = {
            'id':row_data.id,
        };
        fetch('https://n2sotgrw6c.execute-api.eu-west-2.amazonaws.com/dev/lambda-rds-python-dev-remove-organization-assessment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                assessment_name: json_data
            }),
            })
            .then((response) => {return response.json()})
            .then((data)=>setMessageQuestionAnswer(data.message))
            .then(()=>getuserOrganizationAssessmentList());
    }
    function getName(event:any)
    {
        setMasterAssessmentName(event.target.value);
    }
    const columns: GridColDef[] = [
        { field: 'assessment_name', headerName: 'Name', width: 400 },
        {
            field: 'action',
            headerName: 'Action',
            flex: 1,
            editable: false,
            headerAlign: 'center',
            align:'center',
            width:100,
            renderCell:(cellValues)=>{
                return (
                    <Button color='error' onClick={()=>removeMasterAssessment(cellValues)}> Remove </Button>
                )
            }
        }
    ];

    const assessment_columns:GridColDef[] = [
        { field: 'question', headerName: 'Question', width: 100 },
        { field: 'options', headerName: 'Options', width: 500 },
        {
            field: 'action',
            headerName: 'Action',
            flex: 1,
            editable: false,
            headerAlign: 'center',
            align:'center',
            width:100,
            renderCell:(cellValues)=>{
                return (
                    <Button color="error" onClick={()=>removeOrganizationAssessment(cellValues)}> Remove </Button>
                )
            }
        }
    ];
    function openModal()
    {
       getMasterAssessmentList();
        handleOpen();

    }
    function getMasterAssessmentList()
    {
        fetch("https://qu9pa2dm25.execute-api.eu-west-2.amazonaws.com/dev/get-master-assessment-list")
        .then((response) => response.json())
        .then((data) => setNameList(data));
    }
    function getAssessmentList()
    {
        fetch("https://qu9pa2dm25.execute-api.eu-west-2.amazonaws.com/dev/get-assessments-list")
            .then((response) => response.json())
            .then((data) => setAssessmentNameList(data));
    }

    function getuserOrganizationAssessmentList()
    {
        const json_data = {
            'org_id':organizationId,
        };
        fetch('https://sqvoov9my9.execute-api.eu-west-2.amazonaws.com/dev/lambda-rds-python-dev-get-organization-assessment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                assessment: json_data
            }),
            }) 
            .then((response) => {return response.json()})
            .then((data)=>setAssessmnet(data));
    }

    function getOrganizatonDuration(){
        const json_data = {
            'org_id':organizationId,
        };
        fetch('https://2iu7crbtli.execute-api.eu-west-2.amazonaws.com/dev/lambda-rds-python-dev-get-organization-assessment-duration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                assessment: json_data
            }),
            }) 
            .then((response) => {return response.json()})
            .then((data)=>setDuration(data.message));
    }

    useEffect(() => {
        getAssessmentList();
        getuserOrganizationAssessmentList();
        getOrganizatonDuration();

    }, [])


    const storeOrganizationDuration =()=>{
        const json_data = {
            'org_id':organizationId,
            'duration':duration
        };
        
        fetch('https://zuw4i2p03j.execute-api.eu-west-2.amazonaws.com/dev/lambda-rds-python-dev-insert-organization-assessment-duration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                assessment: json_data
            }),
            }) 
            .then((response) => {return response.json()})
            .then((data)=>alert(data.message));

    }

    const handleChange = (index: any, event: SelectChangeEvent) => {
        
        const list = [...inputList];
        list[index].assessmentName=event.target.value;
        setinputList(list);
        setAssessmentName([...assessment_name, `${event.target.value}`]);
        setAssessmentMessage("");
    };

    const handleaddclick = () => {
        setinputList([...inputList, { assessmentName: '', score: '' }]);
        
    };

    const handleScoreChange = (index: any, event: any) => {
        const list = [...inputList];
        list[index].score = event.target.value;

        const score = [...assessment_score];
        if(event.target.value!=""){
            score.splice(index, 1);
            score.splice(index, 0,event.target.value);
            setAssessmentScore(score);
            // // clearing error message
            setScoreMessage("");
        }
        console.log(score);
    };

    const handleremove = (index: any) => {
       
        const list = [...inputList];
        const names = [...assessment_name];
        const score = [...assessment_score];
        
        names.splice(index, 1);
        score.splice(index, 1);
        list.splice(index, 1);

        setinputList(list);
        setAssessmentName(names);
        setAssessmentScore(score);
        
    };

    

    // This event will perform when clicked on Store data button
    const storeRecord = () => {
        
        if(assessment_name.length==0)
            setAssessmentMessage("Please select at least one assessment")
        else if(assessment_score.length==0)
            setScoreMessage("Please give assessment score")
        else{
            setScoreMessage("");setAssessmentMessage("");
            }
        
        if(assessment_name.length>0 && assessment_score.length>0 ) {
            setMessageQuestionAnswer("Storing your record...");
        
            const json_data = {
                'organization_id':organizationId,
                'assessment_name': assessment_name,
                'assessment_score': assessment_score
            };
            fetch('https://7yki6pzbob.execute-api.eu-west-2.amazonaws.com/dev/lambda-rds-python-dev-insert-organization-assessment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    assessment: json_data, // Use your own property name / key
                }),
                })
                //.then((res) => console.log("here",res.json())) // insertion success 
                .then((res) => setMessageQuestionAnswer("Record inserted successfully")) // insertion success 
                .then(()=>getuserOrganizationAssessmentList())
                .then(()=>setinputList([{ assessmentName: '', score: '' }]))
                .then(()=>setAssessmentName([]))
                .then(()=>setAssessmentScore([]))
                
                .catch((err) => setMessageQuestionAnswer('Something went wrong. Please try again'));
            } 
            
        };

    return (

        <Box>
            <Grid container spacing={8} style={{margin:'10px 0px 10px 0px'}}>
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Assessment Duration</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={duration}
                        label="Assessment Duration"
                        onChange={(event)=>setDuration(event.target.value)}
                        style={{width:'300px'}}
                    >
                        <MenuItem value={0}> Select Duration </MenuItem>
                        <MenuItem value={1}> Monthly </MenuItem>
                        <MenuItem value={3} > Quarterly </MenuItem>
                        <MenuItem value={12}> Annually </MenuItem>
                    </Select>
                </FormControl>
                
                <Button variant="contained" onClick={storeOrganizationDuration} color="success" style={{ color: 'white', height:'55px', marginLeft: '5px',marginBottom:'10px' }}>
                    Save Duration
                </Button>
            </Grid>
            <Grid container spacing={12}>
                 <Grid item xs={12} sx={{marginLeft:'0px'}}>
                    <Box sx={{ width: '100%' }}>
                        <h5>{message_question_answer}</h5>
                        <DataGrid
                                getRowId={(item) => item.organization_assessment_id}
                                rows={assessment_data}
                                columns={assessment_columns}
                                autoPageSize={true}
                                pageSize={5}
                                autoHeight
                                rowsPerPageOptions={[5]}
                                sx={{border:'2px solid #f1f3f4',borderRadius:'5px'}}
                            /> 
                    </Box>   
                </Grid>

                <Grid item xs={12}>
                    <Button variant="contained" color="success" sx={{color:'#FFFFFF',marginBottom:'15px'}} onClick={openModal}>Add new Assessment Name</Button>
                    <h5>{assessment_message}{score_message}</h5>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        {
                            inputList.map((singleAssessment, i) => {
                                return (
                                    
                                    <Grid container spacing={2} key={i}>
                                        <Grid item xs={12}>
                                        <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
                                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                                    Assessment Name : 
                                                </InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-standard-label"
                                                    id="demo-simple-select-standard"
                                                    value={singleAssessment.assessmentName}
                                                    onChange={(event) => handleChange(i, event)}
                                                    label="Assessment Name"
                                                >
                                                {Object.entries(assessment_name_list).map(([key, value]) => {
                                                    return (
                                                        <MenuItem value={value} key={key}>{value}</MenuItem>
                                                    );
                                                })}
                                                </Select>                                            
                                                
                                        </FormControl>

                                            <TextField
                                                label="Options"
                                                id="standard-start-adornment"
                                                sx={{ m: 1, width: '20ch' }}
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                                                }}
                                                value={singleAssessment.score}
                                                variant="standard"
                                                onChange={(event) => handleScoreChange(i, event)}
                                            />    
                                            {
                                                inputList.length !== 1 &&
                                                <Iconify icon={'ic:baseline-remove-circle'} onClick={() => handleremove(i)} style={{ marginTop: '1em', color: '#FF0000', height: '30px', width: '30px', cursor: 'pointer' }} />
                                            }

                                            {inputList.length - 1 === i &&
                                                <Iconify icon={'material-symbols:add-circle-rounded'} onClick={handleaddclick}
                                                    style={{ marginTop: '1em', color: '#00ab55', height: '30px', width: '30px', cursor: 'pointer' }} />

                                            }
                                        
                                        </Grid>
                                    </Grid>
                                );
                            })}
                        <Grid container spacing={1}>
                            <Grid item xs={8}>
                                <Button variant="contained" onClick={storeRecord} color="success" style={{ color: 'white', width: '30%', marginTop: '1em', marginLeft: '5px',marginBottom:'10px' }}>Store Data</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>




            {/* Modal start */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                    >
                    <Box sx={{ ...style, width: 800 }}>
                        <Iconify icon={'mdi:close-circle'} style={{ marginTop: '0em', height: '30px',marginLeft:'45em', width: '30px', cursor: 'pointer' }} onClick={handleClose} />
                        <h2 id="parent-modal-title">Assessment Details </h2>
                        <h5>{message}</h5>
                        <TextField
                            label="New Assessment name"
                            id="standard-start-adornment"
                            sx={{ m: 1, width: '52ch' }}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"></InputAdornment>,
                            }}
                            variant="standard"    
                            onChange={(event)=>getName(event)}  
                        />
                        <Button variant="contained" color="success" sx={{color:'#FFFFFF',width:'20%',marginTop:'25px',marginLeft:'15px'}} onClick={storeAssessmentName}>Save</Button>
                        <Box sx={{ height: 400, width: '95%' }}>
                            <DataGrid
                                getRowId={(row) => row.assessment_id}
                                rows={name_list}
                                columns={columns}
                                autoPageSize={true}
                                pageSize={5}
                                autoHeight
                                rowsPerPageOptions={[5]}
                            />    
                        </Box>

                    </Box>
                    </Modal>

            {/* Modal end */}
        </Box>
    );
}