import React from 'react'
import { Suspense } from 'react';
import RenderRoute from './RenderRoute.js';

//根据权限生成路由表
const  getAuthRoute = (auth,definedRoutes)=>{
    const routes = definedRoutes.map((route)=>{
        let thisRoute;
        auth.some((item,index)=>{
            if(route.path == item.route){
                thisRoute = {
                    path:route.path,
                    key:route.key,
                    component:route.component
                };
                if(route.children){
                    thisRoute.children = getAuthRoute(auth[index].children,route.children);
                }
                return true ;
            }else{
                
                return false ;
            }
        });
        return thisRoute
    });
    return routes;
}

export default function createRoutes(auth,definedRoutes) {
    const routes = getAuthRoute(auth,definedRoutes);
    return (
            <Suspense fallback={<div>Loading...</div>}>
               <RenderRoute routes = {routes}/>
            </Suspense>
    )

}

