import { lazy } from 'react';
const TestPage = lazy(() => import('../../views/TestPage'));
const Contest = lazy(() => import('../../views/Contest'));
const UserPage = lazy(() => import('../../views/UserPage'));
const MessagePage = lazy(() => import('../../views/MessagePage'));

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
        path: '/file/1',
        key: 'file1',
        name: '文件1',
        component: TestPage
    },
    {
        path: '/file/2',
        key: 'file2',
        name: '文件2',
        component: TestPage
    },
    {
        path: '/file/3',
        key: 'file3',
        name: '文件4',
        component: TestPage
    },
]