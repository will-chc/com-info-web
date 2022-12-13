import React from 'react';
import { lazy } from 'react';
const LoginPage = lazy(() => import('../views/LoginPage'));
const RegisterPage = lazy(() => import('../views/RegisterPage'));
const HomePage = lazy(() => import('../views/HomePage'));
const Upload = lazy(()=>import('../views/Upload'));
const FindPassword = lazy(() => import('../views/LoginPage/Findpassword'));

import contestant from './asyncRoutes/contestant';

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
        path: '/findpassword',
        name: '找回密码',
        key: 'fpassword',
        component: FindPassword,
    },
    {
        path: '/',
        key: 'Home',
        name: '首页',
        // redirect: {
        //     to: '/',
        //     jump: '/home'
        // },
        component: HomePage,
        children: [
            ...contestant
        ]

    },
    {
        path:'*',
        key:'404',
        component:()=> <h1>404</h1>
    }

]