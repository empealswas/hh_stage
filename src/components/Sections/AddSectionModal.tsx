import React from 'react';
import * as Yup from "yup";
import {FormikProvider, useFormik} from "formik";
import {TextField} from "@material-ui/core";
import {useParams} from "react-router-dom";
import AddingDialog from "../../utils/AddingDialog";
import {PhotoPicker} from "aws-amplify-react";
import {API, graphqlOperation} from "aws-amplify";
import {createSection, createSectionOptions, updateSection} from "../../graphql/mutations";
import {CreateOrganizationInput, CreateSectionInput, CreateSectionOptionsInput, Section} from "../../API";
import LessonOptionComponent from "../Lesson/LessonContent/LessonOptionComponent";

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

    const formik = useFormik({
        initialValues: {
            name: '',
            activities: [],
            periods: [{key: -2, label: '15', chosenAsDefault: false}, {
                key: -1,
                label: '30',
                chosenAsDefault: true
            }, {key: -3, label: '45', chosenAsDefault: false}],
            deliveredBy: [{key: -1, label: 'Teacher', chosenAsDefault: true}]

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

            console.log('Create Result', result);
        }
    });
    const {errors, touched, handleSubmit, isSubmitting, getFieldProps, isValid, setFieldValue} = formik;
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
                <LessonOptionComponent name={'Period'} actionName={'Add period (in minutes)'} entityName={'periods'} type={'number'}
                                       info={'Provide time periods possible for these types of lessons, leave only one for it to be predetermined'}/>
                <LessonOptionComponent name={'Delivered By'} actionName={'Add Delivered By Type'}
                                       entityName={'deliveredBy'}
                                       info={'Provide roles that can deliver lessons in this section'}/>

            </AddingDialog>
        </FormikProvider>
    );
};

export default AddSectionModal;
