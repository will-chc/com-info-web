import React, { useEffect, useLayoutEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import styles from './index.less';
const Brumb = (props) => {
    const [dataSource,setDataSource] = useState([]);
    useLayoutEffect(()=>{
        setDataSource(props.dataSource);
    },[])
    const jump = (target) =>{
        const {push} = props.history;
        push(target);
    }
    return (
        <div className={styles['container']}>
            {dataSource.map((item, index) => {
                if(index != dataSource.length-1) return (<><span onClick={()=>{jump(item.path)}} key={item.path}>{item.label}</span><span>/</span></>); 
                return (<span onClick={()=>{jump(item.path)}} key={item.path}>{item.label}</span>) 
            })}
        </div>
    )
}

export default withRouter(Brumb);