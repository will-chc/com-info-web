import React from 'react';
import { lazy } from 'react';
const LoginPage = lazy(() => import('../views/LoginPage'));
const RegisterPage = lazy(() => import('../views/RegisterPage'));
const HomePage = lazy(() => import('../views/HomePage'));
const UserPage = lazy(() => import('../views/UserPage'));
const TestPage = lazy(() => import('../views/TestPage'));
const Upload = lazy(()=>import('../views/Upload'))
// import App from '../App.jsx'

export default [
    {
        path: '/login',
        name: '登录',
        key: 'login',
        component: LoginPage,
    },
    {
        path: '/register',
        name: '注册',
        key: 'register',
        component: RegisterPage,


    },
    {
        path: '/',
        key: 'Home',
        name: '首页',
        redirect: {
            to: '/',
            jump: '/home'
        },
        component: HomePage,
        children: [
            {
                path: '/home',
                key: 'home',
                name: '首页',
                component: TestPage,

            },
            {
                path: '/utils',
                key: 'utils',
                name: '工具',
                component: UserPage
            },

            {
                path: '/file/1',
                key: 'file1',
                name: '文件1',
                component: Upload
            },
            {
                path: '/file/2',
                key: 'file2',
                name: '文件2',
                component: UserPage
            },
            {
                path: '/file/3',
                key: 'file3',
                name: '文件4',
                component: TestPage
            },


        ]

    },
    // {
    //     path:'*',
    //     key:'404',
    //     component:()=> <h1>404</h1>
    // }

]