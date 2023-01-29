import { lazy } from 'react';
const TestPage = lazy(() => import('../../views/TestPage'));
const Contest = lazy(() => import('../../views/Contest'));
const UserPage = lazy(() => import('../../views/UserPage'));
const MessagePage = lazy(() => import('../../views/MessagePage'));
const AccountExamine = lazy(() => import('../../views/AccountExamine'));
const WorkExamine = lazy(() => import('../../views/WorkExamine'));
const TrackMsg = lazy(() => import('../../views/TrackMsg'));

export default [
    {
        path: '/home',
        key: 'home',
        name: '首页',
        component: MessagePage,

    },
    {
        path:'/constanter',
        key:'constanter',
        name:'个人中心',
        component: UserPage
    },
    {
        path: '/joinin',
        key: 'joinIn',
        name: '报名',
        component: Contest
    },

    {
        path: '/examine/account',
        key: 'examine',
        name: '账号审核',
        component: AccountExamine
    },
    {
        path: '/examine/work',
        key: 'workexamine',
        name: '作品审核',
        component: WorkExamine
    },
    {
        path: '/trackMsg',
        key: 'trackMsg',
        name: '赛道管理',
        component: TrackMsg
    },
]