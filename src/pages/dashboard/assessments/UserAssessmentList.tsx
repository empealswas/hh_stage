import React, { useState, useEffect } from 'react';
import {useParams} from "react-router-dom";
import {
    Button,Autocomplete,TextField,Grid
} from "@mui/material";
import Typography from '@mui/material/Typography';



export default function UserAssessmentRecords() {
  
  const {organizationId} = useParams();
  const [class_name, setClassName] = useState<string|null>(null);
  const [report_message,setReportMessage]=useState("");
  const [existing_class_names,setExistingClassNames]=useState<any[]>([]);
  const [btnDisabled, setBtnDisabled] = useState(true)
  const prepareDownloadFile = (path:any) => {
      window.location.href =path;
  } 

  const download_class_report = () => {
    if (class_name==null)
    {
        setReportMessage('Please Select a class');
    }
    else{
        setReportMessage('Report download in progress');
        const json_data = {
          'org_id': organizationId,
          'class_name':class_name
        };

        fetch('https://audq1praac.execute-api.eu-west-2.amazonaws.com/dev/lambda-rds-python-dev-generate-full-class-report', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                assessment: json_data, 
              }),
          })
          .then((res) =>res.json().then((data)=>prepareDownloadFile(data.message)))
          .then(()=>setReportMessage(''))
          .catch((err) => setReportMessage('Something went wrong! Please try again.'));
    }
  }
  
  const changeClassName =(value:string) =>{
    setClassName(value);
    value==null?setBtnDisabled(true):setBtnDisabled(false);
  }
    useEffect(() => {

      const json_data = {
        'org_id': organizationId,
      };

            fetch("https://ahg4poj388.execute-api.eu-west-2.amazonaws.com/dev/lambda-rds-python-dev-get-user-assessment-classnames",{
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                assessment: json_data, 
              }),
          })
          .then((response) => response.json())
          .then((data) => setExistingClassNames(data.class_names));

        }, []);

  return (
    <>
      <Grid container spacing={1}>
        <Grid xs display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h3">Class Report</Typography>
        </Grid>
      </Grid>      

      <Typography sx={{textAlign:'center'}} variant="subtitle1" gutterBottom> {report_message}</Typography>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={existing_class_names}
        renderInput={(params) => <TextField {...params} label="Class names" />}
        onChange={(event,value)=>changeClassName(value)}
        sx={{width:'300px'}}
      />
      <div style={{marginTop:'20px',width:'300px'}}>
        <Button disabled={btnDisabled} variant="contained" color="success" onClick={download_class_report}>Download Full Class Report </Button>
      </div>
    </>
  );
}