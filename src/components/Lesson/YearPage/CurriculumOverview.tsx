import React, {useContext, useEffect, useState} from 'react';
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
import {UserContext} from '../../../App';
import ActivityCard from "../pe/ActivityCard";
import {Admin} from "../../../models/Admin";


const CurriculumOverview = () => {
    const {id} = useParams();
    const [name, setName] = useState(null);
    const [title, setTitle] = useState('');
    const user = useContext(UserContext);
    const fetchName = async () => {
        const result: any = await API.graphql(graphqlOperation(getCurriculum, {id: id}));
        console.log(result.data)
        return result.data.getCurriculum.name;

    }

    const navigate = useNavigate();

    useEffect(() => {

        const createSubscription: any = API.graphql(graphqlOperation(onUpdateCurriculum));
        const updateSubscription = createSubscription.subscribe({
            next: (postData: any) => {
                fetchName();
            }
        })
        if (user instanceof Admin) {
            fetchName().then(data => {
                setTitle(data);
            })
        } else {
            setTitle(`Lesson plan of ${user?.firstName} ${user?.lastName}`)
        }
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
            <HeaderOptions title={title}
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
