import React from 'react'
import { Suspense } from 'react';
import RenderRoute from './RenderRoute.js';



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
    return res;
}

export default function createRoutes(auth,definedRoutes) {
    const routes = getAuthRoute(auth,definedRoutes);
    console.log('render',routes);
    return (
            <Suspense fallback={<div>Loading...</div>}>
               <RenderRoute routes = {routes}/>
            </Suspense>
    )

}

