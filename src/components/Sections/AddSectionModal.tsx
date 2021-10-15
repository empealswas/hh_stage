import React from 'react';
import * as Yup from "yup";
import {FormikProvider, useFormik} from "formik";
import {TextField} from "@material-ui/core";
import {useParams} from "react-router-dom";
import AddingDialog from "../../utils/AddingDialog";
import {AmplifyS3ImagePicker} from "@aws-amplify/ui-react";
import {PhotoPicker} from "aws-amplify-react";
import {API, graphqlOperation} from "aws-amplify";
import {createSection, updateSection} from "../../graphql/mutations";
import {Section} from "../../API";

const AddSectionModal = () => {
    const RegisterSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(100, 'Too Long!')
            .required('Section name is required'),

    });
    const {sectionId} = useParams();

    const formik = useFormik({
        initialValues: {
            name: ''
        },
        validationSchema: RegisterSchema,
        onSubmit: async () => {
            API.graphql(graphqlOperation( createSection, {
                input: {
                    name: getFieldProps('name').value,
                    parentID: sectionId

                }
            }))
        }
    });
    const {errors, touched, handleSubmit, isSubmitting, getFieldProps, isValid} = formik;
    return (
        <FormikProvider value={formik}>
            <AddingDialog title={ "Adding new Section"}
                          buttonName={ 'Add Section'}
                          onSubmit={async () => {
                handleSubmit();
            }}>
                <TextField
                    fullWidth
                    required={true}
                    label="Name of the Section"
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                />
            </AddingDialog>
        </FormikProvider>
    );
};

export default AddSectionModal;
