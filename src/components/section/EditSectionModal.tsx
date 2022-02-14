import React, {useCallback, useEffect, useMemo, useState} from 'react';
import * as Yup from "yup";
// @ts-ignore
import {FormikProvider, useFormik} from "formik";
import {useParams} from "react-router-dom";
import {API, graphqlOperation, Storage} from "aws-amplify";
import {createFile, createRolesThatCanAccess, deleteRolesThatCanAccess, updateSection} from "../../graphql/mutations";
import {Section, UserRole} from "../../API";
import {Card, CardHeader, CardMedia, TextField} from '@mui/material';
import awsConfig from "../../aws-exports";
import {result} from "lodash";
import AddingDialog from "../dialog/AddingDialog";
import {UploadSingleFile} from "../upload";
import {RHFUploadSingleFile} from "../hook-form";
import RolesThatCanAccess from "../../pages/dashboard/section/RolesThatCanAccess";

const getRolesQuery = `query MyQuery($id: ID = "") {
  getOrganization(id: $id) {
    roles {
      items {
        id
        name
      }
    }
  }
}`
const EditSectionModal = (props: { updateObject: Section }) => {
    const {updateObject} = {...props};
    const {organizationId} = useParams();
    console.log(updateObject);
    const [roles, setRoles] = useState<{ role: UserRole, selected: boolean }[] | null>(null);
    useEffect(() => {
        let keyOfObject = updateObject.ImagePreview?.key;
        if (keyOfObject) {
            Storage.get(keyOfObject, {expires: 10000}).then(result => {
                setLinkToPreview(result);
            })
        }
        formik.setFieldValue('name', updateObject.name);
        const getRoles = async () => {
            const result: any = await API.graphql(graphqlOperation(getRolesQuery, {id: organizationId}))
            let rolesThatCanAccess = updateObject?.rolesThatCanAccess?.items.map(value => value?.userRole);
            const roles: UserRole[] = result.data.getOrganization?.roles?.items;
            const newRoles = roles?.map(role => {
                return {
                    role: role,
                    selected: rolesThatCanAccess?.find(value => value?.id === role.id) !== undefined,
                }
            })as { role: UserRole, selected: boolean }[]

            setRoles(newRoles)
        }
        getRoles();

    }, [props.updateObject])
    const RegisterSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(100, 'Too Long!')
            .required('Section name is required'),

    });
    const {sectionId} = useParams();
    const [linkToPreview, setLinkToPreview] = useState('');


    const formik = useFormik({
        initialValues: {
            name: updateObject.name
        },
        validationSchema: RegisterSchema,
        onSubmit: async () => {
            console.log('submitting')
            let key = updateObject.ImagePreview?.key;
            if (key && selectedFile) {
                await Storage.remove(key)
                await Storage.put(key, selectedFile)
            } else if (selectedFile) {
                console.log('here')
                const fileName = `${Date.now()}-${selectedFile.name.replace(/ /g, '_')}`;
                const uploadedFile: any = await Storage.put(fileName, selectedFile, {
                    contentType: selectedFile.type
                })
                const input: any = {
                    key: uploadedFile.key,
                    bucket: awsConfig.aws_user_files_s3_bucket,
                    region: awsConfig.aws_user_files_s3_bucket_region,
                };
                const result: any = await API.graphql(graphqlOperation(createFile, {input}));
                console.log('result', result);
                console.log(result);
            }
            const result: any = await API.graphql(graphqlOperation(updateSection, {
                input: {
                    id: updateObject.id,
                    name: getFieldProps('name').value,
                    parentID: updateObject.parentID
                }
            }));
            for (let value of updateObject?.rolesThatCanAccess?.items ?? []) {
                await API.graphql(graphqlOperation(deleteRolesThatCanAccess, {
                    input: {
                        id: value?.id,
                    },
                }));
            }
            for (let role of roles ?? []) {
                if (role.selected) {
                    const data: any = await API.graphql(graphqlOperation(createRolesThatCanAccess, {
                        input: {
                            sectionID: result.data.updateSection.id,
                            userRoleID: role.role.id,
                        }
                    }));
                    console.log(data.data);
                }
            }


        }
    });
    const {errors, touched, handleSubmit, isSubmitting, getFieldProps, isValid} = formik;
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const onDrop = useCallback(acceptedFiles => {
        setSelectedFile(acceptedFiles[0]);
    }, []);

    return (
        <FormikProvider value={formik}>
            <AddingDialog edit={true} title={"Update Section"}
                          buttonName={'Update Section'}
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
                <UploadSingleFile file={selectedFile ? URL.createObjectURL(selectedFile) : null} onDrop={onDrop}
                                  accept={['image/*']}/>
                {linkToPreview &&
                    <Card>
                        <CardHeader title={'Uploaded Photo'}/>
                        <CardMedia
                            component={'img'}
                            height="194"
                            image={linkToPreview}
                            alt="Activity image"
                        />
                    </Card>
                }
                {roles &&
                    <RolesThatCanAccess roles={roles} setRoles={setRoles}/>
                }
                {/*                {selectedFile &&
                <Card>
                    <CardHeader title={'Selected Photo'}/>
                    <CardMedia
                        component={'img'}
                        height="194"
                        image={URL.createObjectURL(selectedFile)}
                        alt="Activity image"
                    />
                </Card>
                }*/}

            </AddingDialog>
        </FormikProvider>
    );
};

export default EditSectionModal;
