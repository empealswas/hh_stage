import {Navigate, Outlet, useRoutes} from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';
import Schools from "./pages/Schools";
import ParentSection from "./pages/ParentSection";
import Lessons from "./pages/Lessons";
import CurriculumOverview from "./components/Lesson/YearPage/CurriculumOverview";
import CurriculaComponents from "./components/Lesson/YearPage/CurriculaComponents";
import SubjectOutlet from "./components/Lesson/Subject/SubjectOutlent";
import TermElements from "./components/Lesson/Term/TermElements";
import TermOutlet from "./components/Lesson/Term/TermOutlet";
import LessonElements from "./components/Lesson/LessonContent/LessonElements";
import LessonOutlet from "./components/Lesson/LessonContent/LessonOutlet";
import LessonOverview from "./components/Lesson/LessonContent/LessonOerview";
import SchoolOutlet from "./components/School/SchoolOutlet";
import SchoolManagement from "./components/School/SchoolManagement";
import ClassroomOverview from "./components/classrooms/ClassroomOverview";
import PupilOverview from "./components/pupil/PupilOverview";
import ReportPage from "./pages/ReportPage";
import ClassroomPageNew from "./components/classrooms/ClassroomPageNew";
import SchoolHousesPage from "./pages/SchoolHousesPage";

import PEForm from "./components/Lesson/pe/PEForm";
import ParentOverview from "./components/parent/ParentOverview";
import SectionOverview from "./components/Sections/SectionOverview";
import Wearables from "./components/_dashboard/wearables/Wearables";
import NotYetConfirmedPage from "./pages/NotYetConfirmedPage";


export function PreLoginRouter(){
    return useRoutes([
        {
            path: '/',
            element: <LogoOnlyLayout/>,
            children: [
                {path: 'login', element: <Login/>},
                {path: 'register', element: <Register/>},
                {path: '404', element: <NotFound/>},
                {path: 'confirmation', element: <NotYetConfirmedPage/>},
                {path: '/', element: <Navigate to="/login"/>},
                {path: '*', element: <Navigate to="/login"/>}
            ]
        },
        {path: '*', element: <Navigate to="/404" replace/>}

    ]);
}

export default function Router() {
    return useRoutes([
        {
            path: '/dashboard',
            element: <DashboardLayout/>,
            children: [
                {element: <Navigate to="/dashboard/app" replace/>},
                {
                    path: 'schools', element: <SchoolOutlet/>, children: [
                        {element: <Schools/>},
                        {
                            path: ':id', element: <SchoolOutlet/>, children: [
                                {
                                    path: 'manage', element: <Outlet/>, children: [
                                        {element: <SchoolManagement/>},
                                        {
                                            path: 'parent', element: <Outlet/>, children: [
                                                {path: ':parentId', element: <ParentOverview/>}
                                            ]
                                        }
                                    ]
                                },

                                {
                                    path: 'classrooms', element: <Outlet/>, children: [
                                        {element: <ClassroomOverview/>},
                                        {path: ':classroomId', element: <ClassroomPageNew/>}
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {path: 'wearables', element: <Outlet/>, children: [
                        {element: <Wearables/>}
                    ]},
                {
                    path: 'reports', element: <Outlet/>, children: [
                        {element: <ReportPage/>},
                    ]
                },
                {path: 'parent', element: <ParentSection/>},
                {path: 'section', element: <SectionOverview/>,
                    children: [{
                        path: ':sectionId', element: <SectionOverview/>
                    },
                    ]
                },
                {
                    path: 'lessons', element: <LessonOutlet/>, children: [
                        {path: ':lessonId', element: <LessonOverview/>}
                    ]
                },
                {
                    path: 'curricula', element: <Lessons/>, children: [
                        {element: <CurriculaComponents/>},
                        {path: 'pe', element: <PEForm/>},
                        {path: ':id', element: <CurriculumOverview/>},
                        {
                            path: 'subjects', element: <SubjectOutlet/>, children: [
                                {path: ':id', element: <TermElements/>},
                                {element: <Navigate to={'../../curricula'}/>},
                                {
                                    path: 'terms', element: <TermOutlet/>, children: [
                                        {path: ':id', element: <LessonElements/>},
                                        {
                                            path: 'lessons', element: <LessonOutlet/>, children: [
                                                {path: ':lessonId', element: <LessonOverview/>}
                                            ]
                                        }

                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    path: 'pupils', element: <Outlet/>, children: [
                        {path: ':pupilId', element: <PupilOverview/>}
                    ]
                },
                {
                    path: 'houses', element: <Outlet/>, children: [
                        {element: <SchoolHousesPage/>},
                    ]
                },
                {path: 'app', element: <DashboardApp/>},
                {path: 'user', element: <User/>},
                {path: 'products', element: <Products/>},
                {path: 'blog', element: <Blog/>},
            ]
        },
        {path: '*', element: <Navigate to="/dashboard/app" replace/>}
        ,
    ]);
}
