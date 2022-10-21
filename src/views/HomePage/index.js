import React, { useLayoutEffect, useState } from "react";
import { RouteContext } from './context'
import IndexLayout from "../../component/IndexLayout";
const HomePage = (props) => {
    const [routes,setRoutes] = useState(['1','2']);
    useLayoutEffect(()=>{
        // setRoutes(['1','2'])/
    },[]);
    return (
        <RouteContext.Provider value={routes}>
            <IndexLayout/>
        </RouteContext.Provider>
        
    )
}
export default HomePage;