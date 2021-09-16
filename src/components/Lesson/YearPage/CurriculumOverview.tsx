import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {API, graphqlOperation} from "aws-amplify";
import SubjectElements from "../Subject/SubjectElements";
import HeaderOptions from "./Title";
import YearPageForm from "./YearPageForm";
import {getCurriculum} from "../../../graphql/queries";
import {deleteCurriculum} from "../../../graphql/mutations";
import {onUpdateCurriculum} from "../../../graphql/subscriptions";
import DeletionModal from "./DeletionModal";
import {useSnackbar} from "notistack";
import {Can} from "../../../utils/Ability";


const CurriculumOverview = () => {
    const {id} = useParams();
    const [name, setName] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchName = async () => {
            const result: any = await API.graphql(graphqlOperation(getCurriculum, {id: id}));
            console.log(result.data)
            setName(result.data.getCurriculum.name);

        }
        const createSubscription: any = API.graphql(graphqlOperation(onUpdateCurriculum));
        const updateSubscription = createSubscription.subscribe({
            next: (postData: any) => {
                fetchName();
            }
        })
        fetchName()
        return () => {
            updateSubscription.unsubscribe();
        };
    }, []);

    const deleteYearPage = async () => {
        API.graphql(graphqlOperation(deleteCurriculum, {
            input: {
                id: id
            }
        }))
    }
    return (
        <>
            <HeaderOptions title={name}
                           editingForm={
                               <Can I={'update'} a={'curriculum'}>
                                   <YearPageForm/>
                               </Can>
                           }
                           deletionModal={
                               <Can I={'delete'} a={'curriculum'}>
                                   <DeletionModal title={'Do you want to delete this Year Group?'}
                                                  onDelete={async () => {
                                                      const result: any = await deleteYearPage();
                                                      // enqueueSnackbar(`You\'ve successfully deleted Year Group: ${result.data.deleteCurriculum.name}`)
                                                      navigate(-1);
                                                  }}/>
                               </Can>
                           }
                           />
            <SubjectElements/>
        </>
    );
};

export default CurriculumOverview;
