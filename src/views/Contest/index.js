import React, { useLayoutEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Brumb from "../../component/Brumb";
import styles from './index.less';
import List from './sub-route/List'
import Add from './sub-route/Add'
import request from "../../server/request";
const Contest = (props) => {
    const dataSource = [
        {
            label: '报名参赛',
            path: '/joinin'
        }
    ];
    const [contestInfo, setContestInfo] = useState({});
    useLayoutEffect(() => {
        (async () => {
            const { account } = JSON.parse(localStorage.getItem('user'));
            const contestInfo = await request('/contest', { account });
            if (contestInfo[0]) setContestInfo(contestInfo[0]);
        })();
    }, []);
    return (
        <div className={styles.container}>
            <Brumb dataSource={dataSource} />
            <div className={styles.content}>
                <Switch>
                    <Route
                        path='/joinin/add'
                        key='add'
                        component={(props) => <Add {...props} contestInfo={contestInfo} />}
                    />
                    <Route
                        path='/'
                        key='join'
                        component={(props) => <List {...props} contestInfo={contestInfo} />}
                    />
                </Switch>

            </div>
        </div>
    )
}

export default Contest;