import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
import schoolIcon from '@iconify/icons-mdi/school'
import humanMaleChild from '@iconify/icons-mdi/human-male-child';
import bookVariant from '@iconify/icons-mdi/book-variant';
import googleClassroom from '@iconify/icons-mdi/google-classroom';
import chartAreaspline from '@iconify/icons-mdi/chart-areaspline';
import BungalowIcon from '@mui/icons-material/Bungalow';
import FestivalIcon from '@mui/icons-material/Festival';
import homeGroup from '@iconify/icons-mdi/home-group';
import runFast from '@iconify/icons-mdi/run-fast';
import domainIcon from '@iconify/icons-mdi/domain';
import {UserContext} from "../../App";
import {useContext} from "react";
// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;
const sidebarConfig = [
/*  ,
  {
    title: 'user',
    path: '/dashboard/user',
    icon: getIcon(peopleFill)
  },
  {
    title: 'product',
    path: '/dashboard/products',
    icon: getIcon(shoppingBagFill)
  },
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: getIcon(fileTextFill)
  },*/
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'wearables',
    path: '/dashboard/wearables',
    icon: getIcon(runFast)
  },
  {
    title: 'reports',
    path: '/dashboard/reports',
    icon: getIcon(chartAreaspline)
  },
  {
    title: 'schools',
    path: '/dashboard/schools',
    icon: getIcon(schoolIcon)
  },
  {
    title: 'organizations',
    path: '/dashboard/organizations',
    icon: getIcon(domainIcon)
  },  {
    title: 'Organizations Search',
    path: '/dashboard/organizationsList',
    icon: getIcon(domainIcon)
  },
  {
    title: 'Organization Manage',
    path: `/dashboard/organizationManage`,
    icon: getIcon(domainIcon)
  },
  {
    title: 'lessons',
    path: '/dashboard/curricula',
    icon: getIcon(googleClassroom)
  },

  {
    title: 'login',
    path: '/login',
    icon: getIcon(lockFill)
  },
  {
    title: 'houses',
    path: '/dashboard/houses',
    icon: getIcon(homeGroup)
  },

  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon(alertTriangleFill)
  // }
];

export default sidebarConfig;
