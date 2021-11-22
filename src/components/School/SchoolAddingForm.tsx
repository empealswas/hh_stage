import React, {useState} from 'react';
import {Card, FormControl, FormGroup, FormHelperText, TextField} from "@material-ui/core";
import {API, graphqlOperation} from "aws-amplify";
import {createSchool} from "../../graphql/mutations";
import ProgressButton from "../Buttons/ProgressButton";
import { styled, createTheme, ThemeProvider } from '@material-ui/system';

interface SchoolProperties {
    schoolName: string,
    country: string,
    contactNumber: string,
    region: string,
    principal: string,
    email: string,
    addressLineOne: string,
    addressLineTwo: string,
    postcode: string
}

interface FieldCorrectness {
    isCorrect?: boolean,
    errorText?: string;
}

const SchoolAddingForm = () => {
    const [schoolProperties, setSchoolProperties] = useState<SchoolProperties>({
        schoolName: '',
        country: '',
        contactNumber: '',
        region: '',
        principal: '',
        email: '',
        addressLineOne: '',
        addressLineTwo: '',
        postcode: ''
    });
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSchoolProperties({...schoolProperties, [event.target.name]: event.target.value});
    };
    const schoolNameValidator = (): FieldCorrectness => {
        const schoolName = schoolProperties.schoolName;
        if (!schoolName) {
            return {isCorrect: false, errorText: 'Field is required'}
        }
        if (schoolName.length < 2) {
            return {isCorrect: false, errorText: 'School Name should be longer than 2 characters.'}
        }
        return ({isCorrect: true})
    }
    const countryNameValidator = (): FieldCorrectness => {
        const country = schoolProperties.country;
        if (!country) {
            return {isCorrect: false, errorText: 'Field is required'}
        }
        if (country.length < 2) {
            return {isCorrect: false, errorText: 'Country name should be longer than 2 characters.'}
        }
        return ({isCorrect: true})

    }
    const principalNameValidator = (): FieldCorrectness => {
        const country = schoolProperties.principal;
        if (!country) {
            return {isCorrect: false, errorText: 'Field is required'}
        }
        if (country.length < 2) {
            return {isCorrect: false, errorText: 'Country name should be longer than 2 characters.'}
        }
        return ({isCorrect: true})

    }
    const formIsValid = (): boolean => {
        if (!schoolNameValidator().isCorrect) {
            return false;
        }
        if (!countryNameValidator().isCorrect) {
            return false;
        }
        if (!principalNameValidator().isCorrect) {
            return false;
        }
        return true;
    }

    async function uploadSchoolToDatabase() {
        const input = {
            principal: schoolProperties.principal,
            country: schoolProperties.country,
            region: 'UK',
            name: schoolProperties.schoolName
        }
        API.graphql(graphqlOperation(createSchool, {input}));
    }

    const [uploadedSuccessfully, setUploadedSuccessfully] = useState(false);
    const [uploadingLoading, setUploadingLoading] = useState(false);


    async function uploadSchool() {
        if (!formIsValid()) {
            return;
        }
        setUploadingLoading(true);
        uploadSchoolToDatabase()
            .then(result => {
            setUploadedSuccessfully(true);
            setUploadingLoading(false);
            setUploadedSuccessfully(true);
        }).catch(error => {
                setUploadingLoading(false);
                setUploadedSuccessfully(false);
            })
    }
    const StyledTextField = styled(TextField)(({ theme }) => ({
        color: theme.palette.primary.contrastText,
        width: 'calc(200px + 15vw)'
    }));

    return (
        <div>
            <Card style={{
                padding: '20px',
                margin: '30px',
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                display:'flex'
            }}>
                <FormControl required error={!formIsValid()} component="fieldset">
                    <FormGroup>
                        {/*<FormLabel component="legend">Add School Information</FormLabel>*/}
                        <TextField
                            sx={{
                                width: 'calc(200px + 15vw)',
                            }}
                            error={!schoolNameValidator().isCorrect}
                            id="outlined-error-helper-text"
                            label="School Name"
                            helperText={schoolNameValidator().errorText}
                            value={schoolProperties.schoolName}
                            //@ts-ignore
                            variant={'outlined'}
                            name="schoolName"
                            required={true}
                            onChange={handleChange}
                        />
                        <TextField style={{marginTop: '15px'}}
                                   error={!countryNameValidator().isCorrect}
                                   id="outlined-error-helper-text"
                                   label="Country"
                                   helperText={countryNameValidator().errorText}
                                   variant="outlined"
                                   value={schoolProperties.country}
                                   name="country"
                                   required={true}
                                   onChange={handleChange}
                        />
                        <TextField style={{marginTop: '15px'}}
                                   error={!principalNameValidator().isCorrect}
                                   id="outlined-error-helper-text"
                                   label="Principal"
                                   helperText={principalNameValidator().errorText}
                                   variant="outlined"
                                   value={schoolProperties.principal}
                                   name="principal"
                                   required={true}
                                   onChange={handleChange}
                        />
                    </FormGroup>
                    <FormHelperText
                        style={{marginTop: '10px'}}>
                        {formIsValid() ?
                            <h3 style={{color: 'forestgreen'}}>
                                Your form is valid
                            </h3>
                            :
                            <h3>
                                Your form contains errors
                            </h3>
                        }
                    </FormHelperText>
                    <ProgressButton success={uploadedSuccessfully} loading={uploadingLoading} disabled={!formIsValid()} onClick={uploadSchool}/>
                </FormControl>
            </Card>
            {/*<Button size={'large'} style={{backgroundColor: 'red'}}>Cancel</Button>*/}
        </div>
    );
};

export default SchoolAddingForm;
