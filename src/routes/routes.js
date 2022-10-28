import React from 'react'
import { Suspense } from 'react';
import RenderRoute from './RenderRoute.js';

//根据权限生成路由表
// const  getAuthRoute = (auth,definedRoutes)=>{
//     const routes = definedRoutes.map((route)=>{
//         let thisRoute;
//         auth.some((item,index)=>{
//             if(route.path == item.route){
//                 thisRoute = {
//                    ...route
//                 };
//                 // if(route.redirect){
//                 //     thisRoute.redirect = route.redirect
//                 // }
//                 // if(route.children){
//                 //     // thisRoute.children = getAuthRoute(auth[index].children,route.children);
//                 //     thisRoute.children = route.children;
//                 // }
//                 return true ;
//             }else{
                
//                 return false ;
//             }
//         });
//         return thisRoute;
//     });
//     return routes;
// }

const getAuthRoute = (auths,routes)=>{
    const res = [];
    auths.map(auth=>{
        routes.some(route=>{
            if(auth.route==route.path){
                res.push({...route});
                return true;
            }
            else if(auth.children){
                res.push(...getAuthRoute(auth.children,routes));
                return true;
            }
            return false;
        })
        return res;
    })
    // routes.forEach(route => {
    //     auths.some((item)=>{
    //         if(item.route == route.path){
    //             res.push({...route});
    //             return true;
    //         }
    //         else if(item.children){
    //             console.log('222',item);
    //                 res.push(...getAuthRoute(item.children,routes));
    //                 return true;
    //         }
    //         return false;
    //     })
    // });
    return res;
}

export default function createRoutes(auth,definedRoutes) {
    // console.log(auth,definedRoutes);
    const routes = getAuthRoute(auth,definedRoutes);
    console.log('render',routes);
    return (
            <Suspense fallback={<div>Loading...</div>}>
               <RenderRoute routes = {routes}/>
            </Suspense>
    )

}

