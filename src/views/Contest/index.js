import React, { useLayoutEffect } from "react";
import { Switch,Route } from "react-router-dom";
import Brumb from "../../component/Brumb";
import styles from './index.less';
import List from './sub-route/List'
import Add from './sub-route/Add'
const Contest = (props) => {
    const dataSource = [
        {
            label:'报名参赛',
            path:'/joinin'
        }
    ]
    return (
        <div className={styles.container}>
            <Brumb dataSource={dataSource}/>
            <div className={styles.content}>
                <Switch>
                     <Route
                        path='/joinin/add'
                        key='add'
                        component={(props)=> <Add {...props}/>}
                    />
                     <Route 
                        path='/'
                        key='join'
                        component={(props)=> <List {...props}/>}
                    />
                </Switch>
                
            </div>
        </div>
    )
}

export default Contest;