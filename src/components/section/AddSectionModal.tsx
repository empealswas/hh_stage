import React, {SetStateAction, useEffect, useState} from 'react';
import * as Yup from "yup";
// @ts-ignore
import {FormikProvider, useFormik} from "formik";
import {useParams} from "react-router-dom";
import {API, graphqlOperation} from "aws-amplify";
import {createRolesThatCanAccess, createSection, createSectionOptions, updateSection} from "../../graphql/mutations";
import {CreateOrganizationInput, CreateSectionInput, CreateSectionOptionsInput, Section, UserRole} from "../../API";
import AddingDialog from "../dialog/AddingDialog";
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    FormLabel,
    TextField,
    Typography
} from "@mui/material";
import LessonOptionComponent from "./lesson/LessonOptionComponent";
import LoadingScreen from "../LoadingScreen";
import RolesThatCanAccess from "../../pages/dashboard/section/RolesThatCanAccess";
import {onCreateRolesThatCanAccess} from "../../graphql/subscriptions";

const getRolesQuery = `query MyQuery($id: ID = "") {
  getOrganization(id: $id) {
    roles {
      items {
        id
        name
      }
    }
  }
}`;
const AddSectionModal = () => {
    const RegisterSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(100, 'Too Long!')
            .required('Section name is required'),
        activities: Yup.array().min(1, 'Choose at least one'),
        periods: Yup.array().min(1, 'Choose at least one'),
        deliveredBy: Yup.array().min(1, 'Choose at least one'),

    });
    const {sectionId, organizationId} = useParams();
    const [roles, setRoles] = useState<{ role: UserRole, selected: boolean }[] | null>(null);
    useEffect(() => {
        const getRolesAsync = async () => {
            setRoles(null);
            const result: any = await API.graphql(graphqlOperation(getRolesQuery, {id: organizationId}));
            setRoles(result.data.getOrganization.roles.items.map((role: UserRole) => {
                return {
                    role: role,
                    selected: false,
                }
            }));
        }
        getRolesAsync()
        return () => {

        };
    }, []);


    const formik = useFormik({
        initialValues: {
            name: '',
            activities: [],
            periods: [{key: -2, label: '15', chosenAsDefault: false}, {
                key: -1,
                label: '30',
                chosenAsDefault: true
            }, {key: -3, label: '45', chosenAsDefault: false}, {key: -4, label: '60', chosenAsDefault: false}],
            deliveredBy: [{key: -1, label: 'Coach', chosenAsDefault: true}]

        },
        validationSchema: RegisterSchema,
        isInitialValid: false,
        onSubmit: async () => {
            let activities = getFieldProps('activities').value;
            activities = [...activities.filter((value: { chosenAsDefault: any; }) => value.chosenAsDefault),
                ...activities.filter((value: { chosenAsDefault: any; }) => !value.chosenAsDefault)
            ];
            let durations = getFieldProps('periods').value;
            durations = [...durations.filter((value: { chosenAsDefault: any; }) => value.chosenAsDefault),
                ...durations.filter((value: { chosenAsDefault: any; }) => !value.chosenAsDefault)
            ];
            let deliveredBy = getFieldProps('deliveredBy').value;
            deliveredBy = [...deliveredBy.filter((value: { chosenAsDefault: any; }) => value.chosenAsDefault),
                ...deliveredBy.filter((value: { chosenAsDefault: any; }) => !value.chosenAsDefault)
            ];
            console.log(deliveredBy)
            const sectionInput: CreateSectionOptionsInput = {
                Activities: activities.map((value: any) => value.label),
                Durations: durations.map((value: any) => value.label),
                DeliveredBy: deliveredBy.map((value: any) => value.label)
            }
            console.log('Section Input', sectionInput);
            const createResult: any = await API.graphql(graphqlOperation(createSectionOptions, {
                input: sectionInput
            }))

            const input: CreateSectionInput = {
                name: getFieldProps('name').value,
                parentID: sectionId,
                sectionSectionOptionsId: createResult.data.createSectionOptions.id
            };
            if (organizationId) {
                input.organizationID = organizationId
            }
            const result: any = await API.graphql(graphqlOperation(createSection, {
                input
            }));
            for (let role of roles ?? []) {
                if (role.selected) {
                    const data: any = await API.graphql(graphqlOperation(createRolesThatCanAccess, {
                        input: {
                            sectionID: result.data.createSection.id,
                            userRoleID: role.role.id,
                        }
                    }));
                    console.log(data.data);
                }
            }

        }
    });
    const {errors, touched, handleSubmit, isSubmitting, getFieldProps, isValid, setFieldValue} = formik;

    if (!roles) {
        return (
            <LoadingScreen/>
        )
    }

    return (
        <FormikProvider value={formik}>
            <AddingDialog title={"Adding new Section"}
                          buttonName={'Add Section'}
                          onSubmit={async () => {
                              await formik.submitForm();
                          }}>
                <TextField
                    fullWidth
                    required={true}
                    label="Name of the Section"
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                />
                <LessonOptionComponent name={'Activity Type'} actionName={'Add Activity'} entityName={'activities'}
                                       info={'Define the types of activities for this section. Then choose the default option. If you specify only one type of activity,it will automatically create all lessons within this section to be that type.'}/>
                <LessonOptionComponent name={'Period'} actionName={'Add period (in minutes)'} entityName={'periods'}
                                       type={'number'}
                                       info={'Provide time periods possible for these types of lessons, leave only one for it to be predetermined'}/>
                <LessonOptionComponent name={'Delivered By'} actionName={'Add Delivered By Type'}
                                       entityName={'deliveredBy'}
                                       info={'Provide roles that can deliver lessons in this section'}/>
                <RolesThatCanAccess roles={roles} setRoles={setRoles}/>
            </AddingDialog>
        </FormikProvider>
    );
};


export default AddSectionModal;
