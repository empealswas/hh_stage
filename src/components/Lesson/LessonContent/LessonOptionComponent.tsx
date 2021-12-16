import React, {useState} from 'react';
import {
    Alert,
    Button, Card, CardActions, CardHeader,
    Chip,
    FormControl,
    FormGroup,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField, Tooltip
} from "@mui/material";
import {styled} from '@mui/material/styles'
import TagFacesIcon from '@mui/icons-material/TagFaces';
import {Form, useFormik, useFormikContext} from "formik";
import {CardContent, SelectChangeEvent} from "@material-ui/core";
import DoneIcon from '@mui/icons-material/Done';

type LessonOptionProps = {
    name: string,
    actionName: string,
    entityName: string,
    info: string,
    type?: 'number'
}


const LessonOptionComponent = (props: LessonOptionProps) => {


    return (
        <Stack direction={{sm: 'row', md: 'column'}}>
            <ChipsArray {...props}/>
        </Stack>
    );
};
const ChipsArray = (props: LessonOptionProps) => {
    const {name, entityName, actionName, info} = {...props}
    const [key, setKey] = useState(0);

    const [showHelperText, setShowHelperText] = useState(false);
    const [activity, setActivity] = useState('');
    const formik: any = useFormikContext();
    let values = formik.getFieldProps(entityName).value;

    const setValuesForm = (chips: any) => {
        formik.setFieldValue(entityName, chips, true);
    }
    const handleDelete = (chipToDelete: ChipData) => () => {
        let copy = [...formik.getFieldProps(entityName).value];
        copy = copy.filter((chip) => chip.key !== chipToDelete.key);
        if (chipToDelete.chosenAsDefault && copy.length > 0) {
            copy[0].chosenAsDefault = true;
        }
        setValuesForm(copy);
    };


    const addActivity = () => {
        if (!activity) {
            return;
        }
        let activityFormatted = activity.trim();
        activityFormatted = activityFormatted.charAt(0).toUpperCase() + activityFormatted.slice(1).toLowerCase()
        if (values.filter((value: any) => value.label === activityFormatted).length > 0) {
            return;
        }
        setKey(prevState1 => prevState1 + 1);
        setValuesForm([...values, {
            label: activityFormatted,
            key: key,
            chosenAsDefault: values.length === 0
        }])
        setActivity('');

    };
    const ActivitiesList = () => {
        if (formik.getFieldProps(entityName).value.length === 0) {
            return (
                <Chip color={'warning'} label={'Nothing Selected'}/>
            );
        }
        return (<>
            {formik.getFieldProps(entityName).value.map((data: any) => {
                let icon;
                if (data.chosenAsDefault) {
                    icon = <DoneIcon/>;
                }
                return (
                    <ListItem key={data.key}>
                        <Tooltip title={'Choose as default option'} enterDelay={1000}>

                            <Chip
                                icon={icon}
                                color={data.chosenAsDefault ? 'success' : 'default'}
                                onClick={() => {
                                    const copy = [...formik.getFieldProps(entityName).value];
                                    copy.forEach(value => {
                                        if (value.chosenAsDefault) {
                                            value.chosenAsDefault = false;
                                        }
                                        if (value.key === data.key) {
                                            value.chosenAsDefault = true;
                                        }
                                    });
                                    setValuesForm(copy);
                                }}
                                label={data.label}
                                onDelete={data.label === 'React' ? undefined : handleDelete(data)}
                            />
                        </Tooltip>
                    </ListItem>
                );
            })}
        </>)
    }
    return (
        <Card variant={'outlined'} sx={{width: '100%'}}>
            <CardHeader title={name}/>
            <CardContent>
                <Stack direction={'column'} spacing={2}>

                    <Stack direction={{xs: 'column', sm: 'row'}} spacing={{xs: 2, sm: 0}}
                           justifyContent={{xs: 'center', sm: 'space-between'}}>
                        <TextField type={props.type ?? "text"} onKeyPress={event => {
                            if (event.key === 'Enter') {
                                addActivity()
                            }
                        }} value={activity} onChange={event => setActivity(event.target.value)}
                                   label={actionName}/>
                        <Button onClick={addActivity} variant={'outlined'}>Add</Button>
                    </Stack>
                    <Paper
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            listStyle: 'none',
                            p: 0.5,
                            m: 0,
                        }}
                        component="ul"
                    >
                        <ActivitiesList/>
                    </Paper>
                    {formik.errors[entityName] &&
                    <Alert severity={'error'}>
                        {formik.errors[entityName]}
                    </Alert>
                    }
                    {showHelperText &&
                    <Alert severity="info" onClose={event => setShowHelperText(false)}>{info}</Alert>
                    }
                </Stack>
            </CardContent>
            <CardActions>
                <Button onClick={() => {
                    setShowHelperText(prevState => !prevState)
                }} variant={'text'} color={'secondary'}>Info</Button>
            </CardActions>
        </Card>

    );
}

interface ChipData {
    key: number;
    label: string;
    chosenAsDefault: boolean;
}

const ListItem = styled('li')(({theme}) => ({
    margin: theme.spacing(0.5),
}));

export default LessonOptionComponent;
