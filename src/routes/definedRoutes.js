import React from 'react';
import { lazy } from 'react';
const LoginPage = lazy(() => import('../views/LoginPage'))
const RegisterPage = lazy(() => import('../views/RegisterPage'))
const HomePage = lazy(() => import('../views/HomePage'))
const UserPage = lazy(() => import('../views/UserPage'))
// import App from '../App.jsx'

export default [
    {
        path: '/login',
        key:'login',
        component: LoginPage,
        // children: [
        //     {
        //         path: '/login/b',
        //         key:'b',
        //         component: LeftNav,
        //     }
        // ]
    },
    {
        path: '/register',
        key:'register',
        component: RegisterPage,

        
    }, 
    {
        path: '/',
        key:'Home',
        component: HomePage,
        childern:[
            {
                path:'/user',
                key:'user',
                component:UserPage
            }
        ]

    },
    {
        path:'*',
        key:'404',
        component:()=> <h1>404</h1>
    }

]