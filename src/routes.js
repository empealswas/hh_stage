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
import Organizations from "./pages/Organizations";
import {Navigate, useRoutes} from 'react-router-dom';
import {Outlet} from 'react-router-dom';
import ChildOverview from "./components/parent/ChildOverview";
import ChildOverviewMenu from "./components/parent/ChildOverviewMenu";
import OrganizationManage from "./components/organizations/OrganizationManage";
import OrganizationAdminOverview from "./components/organizations/OrganizationAdminOverview";
import PupilsAcceptList from "./components/organizations/PupilsAcceptList";
import {UserContext} from "./App";
import {useContext} from "react";
import OrganizationsOverview from "./components/parent/childTabs/OrganizationsOverview";
import OrganizationTeamOverview from "./components/organizations/OrganizationTeamOverview";

export function PreLoginRouter() {
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
    const user = useContext(UserContext);
    return useRoutes([

            {
                path: '/dashboard',
                element: <DashboardLayout/>,
                children: [
                    {element: <Navigate to="/dashboard/app" replace/>},
                    {
                        path: 'organization', element: <Outlet/>, children: [

                            {
                                path: ':organizationId', element: <OrganizationAdminOverview/>, children: [
                                    {
                                        path: 'section', element: <SectionOverview/>,
                                        children: [{
                                            path: ':sectionId', element: <SectionOverview/>
                                        },
                                        ]
                                    },

                                ]
                            },
                            {
                                path: 'lessons', element: <LessonOverview/>, children: [
                                    {path: ':lessonId', element: <LessonOverview/>}
                                ]
                            },
                        ]
                    },
                    {path: 'organizationsList', element: <OrganizationsOverview/>},
                    {
                        path: 'organizationManage',
                        element: <Navigate to={`/dashboard/organizationManagement/${user.email}`} replace/>,
                        children: []
                    },
                    {
                        path: 'organizationManagement', element: <Outlet/>, children: [
                            {
                                path: ':organizationId', element: <Outlet/>, children: [
                                    {
                                        path: '/dashboard/organizationManagement/:organizationId',
                                        element: <OrganizationManage/>
                                    },
                                    {
                                        path: '/dashboard/organizationManagement/:organizationId/classrooms/:classroomId',
                                        element: <OrganizationTeamOverview/>
                                    },
                                    {
                                        path: '/dashboard/organizationManagement/:organizationId/classrooms',
                                        element: <ClassroomOverview/>,
                                        children: [

                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        path: 'schools', element: <SchoolOutlet/>, children: [
                            {path: '/dashboard/schools', element: <Schools/>},
                            {
                                path: ':id', element: <SchoolOutlet/>, children: [
                                    {
                                        path: 'manage', element: <Outlet/>, children: [
                                            {path: '/dashboard/schools/:id/manage', element: <SchoolManagement/>},
                                            {
                                                path: 'parent', element: <Outlet/>, children: [
                                                    {path: ':parentId', element: <ParentOverview/>}
                                                ]
                                            }
                                        ]
                                    },

                                    {
                                        path: 'classrooms', element: <Outlet/>, children: [
                                            {path: '/dashboard/schools/:id/classrooms', element: <ClassroomOverview/>},
                                            {path: ':classroomId', element: <ClassroomPageNew/>}
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        path: 'reports', element: <Outlet/>, children: [
                            {path: '/dashboard/reports', element: <ReportPage/>},
                        ]
                    },
                    {path: 'parent', element: <ParentSection/>},

                    {
                        path: 'lessons', element: <LessonOverview/>, children: [
                            {path: ':lessonId', element: <LessonOverview/>}
                        ]
                    },
                    {
                        path: 'curricula', element: <Lessons/>, children: [
                            {path: '/dashboard/curricula', element: <CurriculaComponents/>},
                            {path: 'pe', element: <PEForm/>},
                            {path: ':id', element: <CurriculumOverview/>},
                            {
                                path: 'section', element: <SectionOverview/>,
                                children: [{
                                    path: ':sectionId', element: <SectionOverview/>
                                },
                                ]
                            },
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
                            {path: ':pupilId', element: <ChildOverviewMenu/>}
                        ]
                    },
                    {
                        path: 'houses', element: <Outlet/>, children: [
                            {path: '/dashboard/houses/', element: <SchoolHousesPage/>},
                        ]
                    },

                    {path: 'app', element: <DashboardApp/>},
                    {path: 'organizations', element: <Organizations/>},
                    {
                        path: 'wearables', element: <Wearables/>, children: [
                            {element: <Wearables/>},
                        ]
                    },
                    {path: 'user', element: <User/>},
                    {path: 'products', element: <Products/>},
                    {path: 'blog', element: <Blog/>},
                ]
            },
            {
                path: '/',
                element: <LogoOnlyLayout/>,
            },

            {path: '*', element: <Navigate to="/dashboard/app" replace/>}
        ]
    );
}
