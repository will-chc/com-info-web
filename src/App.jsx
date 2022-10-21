import React from 'react'
import { useEffect } from 'react';
import RenderRoute from './routes/RenderRoute';
function App (props){
    useEffect(()=>{
        console.log('@@@@@@',props.route);
    },[])
    return (
        <div>
            <RenderRoute routes={props.route.children}/>
        </div>
    )
}
export default App;