import {DataGrid, GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import Iconify from "../../../../src/components/Iconify";
import React, {useEffect, useState} from 'react';
import {
    Button,Modal,Box,Typography,TextField,FormControl,FormLabel,
    FormControlLabel,
    RadioGroup,Radio
} from "@mui/material";

import useAuth from "../../../hooks/useAuth";
import useSettings from "../../../hooks/useSettings";
import {Classroom, Organization, Pupil, User} from "../../../API";
import {useParams} from "react-router-dom";
import {API, graphqlOperation} from "aws-amplify";
import {getWearablesData, TerraWearables} from "../../../apiFunctions/apiFunctions";
import {format, subDays} from "date-fns";
//import "./styles.css";

const query = `query MyQuery($id: ID = "") {
    getOrganization(id: $id) {
        Classrooms {
            items {
                id
                name
                members {
                    items {
                        userInOrganization {
                            user {
                                lastName
                                firstName
                                terraId
                                id
                            }
                        }
                    }
                }
            }
        }
    }
}

`
export default function UserAssessments() {  
  const {user} = useAuth();
  const {organizationId}=useParams();
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [classrooms, setClassrooms] = useState<Classroom[] | null>(null);
  const [assessment_sections,setAssessmentSection]=useState<string[]>([]);
  const [open, setOpen] = React.useState(false);
  const [pupilName,setPupilName]=useState("");
  const [modal_user, setUser]=useState("");
  const [assessmentDate,setAssessentDate]=useState("");
  const [current_date,setCurrentDate] = useState("");
  const [previous_date,setPreviousDate]=useState("");
  const [assessmentData,setAssessmentData]=useState<string[]>([]);
  const [selectedClassroom, setSelectedClassroom] = React.useState<Classroom | null>(null);  
  const [assessmentList,setAssessmentList]=useState<string[]>([]);
  const [options,setOptions]=useState({} as any);
  const [report_open,setReportOpen]=useState(false);
  const [report_message,setReportMessage]=useState("");
  const [report_start_date,setReportStartDate] = useState("");
  const [report_end_date,setReportEndDate] = useState("");
  const [report_file_path,setReportPath]=useState("");
  const [individual_id,setIndividualId]=useState("");
  const [assessment_data,setAssessmnet]=useState([{organization_assessment_id:'','org_id':'','question':'','options':''}]);
  const [current_index,setCurrentIndex]=useState(-1);
  const [student_report_open,setStudentReportOpen]=useState(false);
  const [class_name,setClassName]=useState();

  const getAllowedAssessmentSectionList=()=>{
    fetch('https://c27olhip4i.execute-api.eu-west-2.amazonaws.com/dev/lambda-rds-python-dev-get-allowed-assessment-section', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            }) 
            .then((response) => {return response.json()})
            .then((data)=>setAssessmentSection(data));
  };
  const getOrganizationAsync = async () => {
      setOrganization(null);
      const result: any = await API.graphql(graphqlOperation(query, {id: organizationId}))
      setClassName(result.data.getOrganization.Classrooms.items[0].name);
      setOrganization(result.data.getOrganization);
      setClassrooms(result.data.getOrganization?.Classrooms?.items);
  }

  const formatCurrentDate=()=>
    {
        let today = new Date();        

        let year = today.getFullYear();
        var month = ""+today.getMonth();
        var date = ""+today.getDate();
        let pyear = ""+today.getFullYear();

        if (today.getMonth()<9)
            pyear = ""+(today.getFullYear()-1);
            
        let pmonth = "09";
        let pdate = "01";

        if(today.getMonth()>=1 && today.getMonth()<=9)
            month="0"+(today.getMonth()+1);
        if(today.getDate()>=1 && today.getDate() <=9)
            date = "0"+date        

        let date_string=`${year}-${month}-${date}`;
        let previous_date_string=`${pyear}-${pmonth}-${pdate}`;

        console.log("date = ", date_string+" "+previous_date_string);
        setCurrentDate(date_string);
        setPreviousDate(previous_date_string);
            
    }
  const getAssessmentList = ()=>{
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
        .then((data)=>setAssessmentList(data));
  } 

  const getuserOrganizationAssessmentList = () =>
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
  
  function getExistingAssessmentData()
  {
    fetch('https://bohlw16mv6.execute-api.eu-west-2.amazonaws.com/dev/lambda-rds-python-dev-user-assessment-lessons-record',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    lesson: {'lessonId':"",'org_id':organizationId}
                }),
            })
            .then((response) => {return response.json()})
            .then((data)=>setAssessmentData(data.elements));
  }
  useEffect(() => {
      formatCurrentDate();
      getuserOrganizationAssessmentList();
      getAllowedAssessmentSectionList();
      getOrganizationAsync();
      getAssessmentList();
      getExistingAssessmentData();

      return () => {
      };
  }, [organizationId]);    

  function openModal(cell_value:any)
  {
      setAssessentDate(current_date);
      setUser(cell_value);
      setPupilName(cell_value.row.firstName+" "+cell_value.row.lastName+"'s");
      setOpen(true); 
  }

  function individualReportView(userId:any)
    {
        const ass_data = [...assessmentData];
        ass_data.splice(0, 0,userId);
        setAssessmentData(ass_data);
    }
  function storeAssessment(value:any)
    {  
       let store_date = current_date;
        if(assessmentDate)
            store_date  = assessmentDate;

        if(store_date>current_date)
            alert("Future date is not allowed");
        else{

        const teacherName =user?.firstName+" "+user?.lastName; 
        const className = class_name;
        
        const json_data = {
            'userId':value.modal_user.row.id,
            'organization_id':organizationId,
            'lesson_id':"",
            'first_name':value.modal_user.row.firstName,
            'last_name':value.modal_user.row.lastName,
            'assessment':options,
            'class':className,
            'teacher':teacherName,
            'assessent_date':store_date,
        };
        fetch('https://qu9pa2dm25.execute-api.eu-west-2.amazonaws.com/dev/insert-user-assessment-data', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              user_assessment: json_data
          }),
          }) .then((response) => {return response.json()})
             .then((data)=>individualReportView(data.user_id))
            .then(()=>setOpen(false));
        }
    }
  function testradio(event:any,question:any)
  {
      const opt= {...options};
      if(options[question]===undefined)
      {
          opt[question] = {}
      }
      opt[question]=event.target.value;
      setOptions(opt);
  }

  function openReportodal(cell_value:any)
    {     
        let index:any = organization?.Classrooms?.items[0]?.members?.items.findIndex(obj=>obj?.userInOrganization?.user?.id===cell_value.row.id);
        setCurrentIndex(index);
        setReportOpen(true);
        downloadIndividualReport(cell_value.id);
        
    }

    function handleCloseReportModal()
    {
        setReportStartDate(previous_date);
        setReportEndDate(current_date);
        setReportPath("");
        setReportOpen(false);
    }

    function getPreviousReport(){

        if((current_index-1)>=0){
           let id = organization?.Classrooms?.items[0]?.members?.items[current_index-1]?.userInOrganization?.user?.id;
           downloadIndividualReport(id); 
           setCurrentIndex(current_index-1);
           setReportPath("");
        }
    }

    function getNextReport()
    {
        if(current_index+1<(organization?.Classrooms?.items[0]?.members?.items.length??0))
        {
            let id = organization?.Classrooms?.items[0]?.members?.items[current_index+1]?.userInOrganization?.user?.id;
            downloadIndividualReport(id); 
            setCurrentIndex(current_index+1);
            setReportPath("");
        }
        
    }

    function downloadIndividualReport(user_id="")
    {
        setReportPath("");
        let start = previous_date;
        let end = current_date;
        if(report_start_date)
            start = report_start_date;
        if(report_end_date)
            end = report_end_date
        
        if(start>current_date)
            alert("Invalid start date");
        else if(end>current_date || end<start)
            alert("Invalid end date");
        else{
        setReportMessage('Report generation in progress');
        const json_data = {
            'user_id': user_id===""?organization?.Classrooms?.items[0]?.members?.items[current_index]?.userInOrganization?.user?.id:user_id,
            'lesson_id':'',
            'org_id':organizationId,
            'assessment_data':assessment_data,
            'start_date':start,
            'end_date':end
        };
        
        fetch('https://qu9pa2dm25.execute-api.eu-west-2.amazonaws.com/dev/get-pdf-report', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    assessment: json_data, 
                }),
            }).then((res) =>res.json())

             .then((data)=>setReportPath(data.message))
             .then(()=>setReportMessage(""))
             .catch((err) => setReportMessage('Report is not available currently! Please try again.'));;
        }

    }


    async function openOverallreportModal(rowData:any){
        setReportPath("");
        setStudentReportOpen(true);
        setReportMessage("Downloading..");
        
        let userId = rowData.row.terraId;
        const teacherName =user?.firstName+" "+user?.lastName; 
        const studentName = rowData.row.firstName+" "+rowData.row.lastName;
        let stepResult: any ="";
        let sleepResult: any = "";
        
        if(userId){
            const stepdata: TerraWearables = {
                idList: [userId as string],
                grouping: "user",
                category: "daily",
                subtype: "steps",
                period: "day",
                startDate: format(subDays(new Date(), 7), 'yyyy-MM-dd'),
                endDate: format(new Date(), 'yyyy-MM-dd'),
                returnType: "total"
            };
            const sleepdata: TerraWearables = {
                idList: [userId as string],
                grouping: "user",
                category: "sleep",
                subtype: "durationTotal",
                period: "day",
                startDate: format(subDays(new Date(), 8), 'yyyy-MM-dd'),
                endDate: format(subDays(new Date(), 1), 'yyyy-MM-dd'),
                returnType: "total"
            };
            stepResult = await getWearablesData(stepdata);
            sleepResult = await getWearablesData(sleepdata);
        }

        const id = rowData.row.id;
        const json_data = {
            'id':id,
            'studentName':studentName,
            'teacherName':teacherName,
            'stepResult':stepResult!=''?stepResult.data:'',
            'sleepResult':sleepResult!=''?sleepResult.data:'',
            'organizationId':organizationId,
            'className':class_name,
        };
        fetch('https://9fgb00vxgc.execute-api.eu-west-2.amazonaws.com/dev/test-detailed-report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                report: json_data
            }),
            })
            .then((response) => response.json())
            .then((data)=>setReportPath(data.message))
            .then(()=>setReportMessage(""))
            .catch(() => setReportMessage('Something went wrong! Please try again.'));
        
    }
    

    const style = {
        position: 'absolute' as 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60%',
        height:'400px',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        overflow:'scroll',
      };
    
      const modalCloseStyle={
        position: 'absolute' as 'absolute',
        top: '10%',
        left: '90%',
        width:30,
        height:30,
        cursor:'pointer'
    }
    
    const report_style={
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        overflow:'scroll',   
    }
    const reportmodalCloseStyle={
        position: 'absolute' as 'absolute',
        top: '2%',
        left: '92%',
        width:30,
        height:30,
        cursor:'pointer'
        }   

    const columns: GridColDef[] = [
      {field: 'id', flex: 0.2, headerName: 'Id', hide: true},
      {field: 'terraId', flex: 0.2, headerName: 'TerraId', hide: true},
      {
          field: 'firstName',
          headerName: 'First Name',
          headerClassName: 'super-app-theme--header',
          flex: 1,
          editable: false
      },
      {
          field: 'lastName',
          headerName: 'Last Name',
          headerClassName: 'super-app-theme--header',
          flex: 1,
          editable: false
      },
      {
          field: 'assessment',
          headerName: 'Assessment',
          headerClassName: 'super-app-theme--header',
          flex: 1,
          editable: false,
          headerAlign: 'center',
          align:'center',
          renderCell:(cellValues)=>{  
            if(assessmentData.indexOf(cellValues.row.id)>-1)
            {
                return (
                    <Iconify icon={'clarity:form-line'} sx={{width: 20, height: 20}} onClick={(event)=>openReportodal(cellValues)}/>
                )
            } 
            else{
            return (
                <Button onClick={(event)=>openModal(cellValues)}> Assessment </Button>
                )
            }
        }
      },
      {
        field:'studentReport',
        headerName:'Student Report',
        headerClassName: 'super-app-theme--header',
        flex: 1,
        editable: false,
        headerAlign: 'center',
        align:'center',
        renderCell:(cellValues)=>{  
          return <Iconify icon={'line-md:download-loop'} sx={{width: 20, height: 20}} onClick={(event)=>openOverallreportModal(cellValues)}/>
        }
      }
  ];

  return (

    <>
    <Box
      sx={{
        height: 300,
        width: '100%',
        '& .super-app-theme--header': {
          backgroundColor: 'rgb(40,196,105)',
          color:'rgb(255,255,255)',
        },
      }}
    >
    <DataGrid
        rows={selectedClassroom ? selectedClassroom?.members?.items.map(value => value?.userInOrganization.user as User) ?? []
            : classrooms?.flatMap(value => value.members?.items).map(value => value?.userInOrganization.user as User) ?? []
          }
        disableSelectionOnClick
        columns={columns}
        autoHeight={true}
        pageSize={8}
        autoPageSize={true}
        sx={{
            boxShadow: 2,
            border: 2,
            borderColor: 'rgb(235,248,242)',
            '& .MuiDataGrid-cell:hover': {
              color: 'rgb(118,132,144)',
            },
          }}
    />
    </Box>


    <Modal
        open={report_open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={report_style}>
            <Iconify icon="mdi:close-circle"  onClick={handleCloseReportModal} sx={reportmodalCloseStyle}/>
            <Typography variant='subtitle1' align='center'>{report_message}</Typography>
            <TextField
                id="date"
                label="Start Date"
                type="date"
                defaultValue={previous_date}
                style={{margin:'20px'}}
                InputLabelProps={{
                shrink: true,
                }}
                onChange={(event)=>setReportStartDate(event.target.value)}
            />

            <TextField
                id="date"
                label="End Date"
                type="date"
                defaultValue={current_date}
                style={{margin:'20px',marginLeft:'40px'}}
                InputLabelProps={{
                shrink: true,
                }}
                onChange={(event)=>setReportEndDate(event.target.value)}
            />
                <Button  variant="contained" style={{margin:'20px',height:'50px'}} onClick={()=>downloadIndividualReport(individual_id)}>
                    Generate Report
            </Button>

            <div style={{paddingLeft:'180px'}} >
                {/* <Button  variant="contained" style={{marginRight:'20px'}} onClick={getPreviousReport}> Previous Report </Button> */}
                    
                    <iframe src={report_file_path} style={{height:'500px'}} />
                
                {/* <Button  variant="contained" style={{marginLeft:'20px'}} onClick={getNextReport}> Next Report </Button> */}
                
            </div>

            
        </Box>    
    </Modal>

    <Modal
            open={open}               
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Iconify icon="mdi:close-circle"  onClick={()=>setOpen(false)} sx={modalCloseStyle}/>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                {pupilName} Assessment 
                </Typography>   
                <TextField
                    id="date"
                    label="Assessment Date"
                    type="date"
                    defaultValue={current_date}
                    style={{marginTop:'20px',marginBottom:'20px'}}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    onChange={(event)=>setAssessentDate(event.target.value)}
                />

                {assessmentList.map((assessment:any)=>(
                    <div key={assessment.question}>
                    <FormControl >
                            <FormLabel id="demo-row-radio-buttons-group-label">{assessment.question}</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                onChange={(event)=>testradio(event,assessment.question)}
                            >
                                { assessment.options.split( ',' ).map( ( item:any ) =>
                                  <FormControlLabel key={item} value={item} control={<Radio />} label={item} />
                                  )}    
                            </RadioGroup>
                    </FormControl>
                    </div>
                ))}
                <div style={{marginTop:'20px'}}><Button  variant="contained" onClick={(event)=>storeAssessment({modal_user})}>Save Assessment </Button></div>
                
            </Box>
        </Modal>

        <Modal
                open={student_report_open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={report_style}>
                    <Iconify icon="mdi:close-circle"  onClick={()=>setStudentReportOpen(false)} sx={reportmodalCloseStyle}/>
                    <Typography variant='subtitle1' align='center'>{report_message}</Typography>     

                     <div style={{}}>
                        {/* <Button  variant="contained" style={{marginRight:'20px'}} onClick={getPreviousStudentReport}> Previous Report </Button> */}
                            <iframe src={report_file_path} style={{height:'500px'}} />               
                        {/* <Button  variant="contained" style={{marginLeft:'20px'}} onClick={getNextStudentReport}> Next Report </Button> */}
                     </div>
                </Box>              
                
                
            </Modal>
        
    </>
    
  );
}