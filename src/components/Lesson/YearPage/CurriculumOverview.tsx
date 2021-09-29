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
import PECard from "../pe/PECard";


const CurriculumOverview = () => {
    const {id} = useParams();
    const [name, setName] = useState(null);
    const [title, setTitle] = useState('');
    const user = useContext(UserContext);
    const fetchName = async () => {
        const result: any = await API.graphql(graphqlOperation(getCurriculum, {id: id}));
        console.log(result.data)
        setName(result.data.getCurriculum.name);
        return result.data.getCurriculum.name;

    }
    if (user?.isAdmin()) {
        fetchName().then(data => {
            setTitle(data);
        })
    } else {
        user?.getFirstAndLastName().then(data => {
            setTitle(`Lesson plan of ${data.firstName} ${data.lastName}`)
        });
    }
    const navigate = useNavigate();

    useEffect(() => {

        const createSubscription: any = API.graphql(graphqlOperation(onUpdateCurriculum));
        const updateSubscription = createSubscription.subscribe({
            next: (postData: any) => {
                fetchName();
            }
        })
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
