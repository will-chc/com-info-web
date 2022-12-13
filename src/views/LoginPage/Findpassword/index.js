import React, { useEffect, useState } from "react";
import { Steps } from "antd";
import styles from './index.less';
import StepOne from './sub-route/StepOne';
import StepTwo from './sub-route/StepTwo';
import { Route, Switch } from "react-router-dom";
const Step = Steps.Step;
const FindPassword = (props) => {
    const description = 'This is a description.';
    const stepItem = [
        {
            title: '身份验证'
        },
        {
            title: '设置密码'
        }
    ];
    const [current, setCurrent] = useState(0);
    useEffect(() => {
        if(current==0) props.history.push('/findpassword/stepone');
    },[current])
    return (
        <div className={styles.contanier}>
            <header className={styles.header}>
                <span onClick={() => { props.history.push('/login') }}>返回首页</span>
            </header>
            <div className={styles['content-container']}>
                <div className={styles.steps}>
                    <Steps current={current} progressDot>
                        {stepItem.map((item)=><Step key={item.title} title={item.title}/>)}
                    </Steps>
                </div>
                <div className="content">
                    <Switch>
                        <Route 
                            path='/findpassword/stepone'
                            key='stepOne'
                            component={(props)=> <StepOne {...props} setCurrent={setCurrent} />}
                        />
                        <Route 
                            path='/findpassword/steptwo'
                            key='stepTwo'
                            component={(props)=> <StepTwo {...props} setCurrent={setCurrent} />}
                        />
                    </Switch>
                </div>
            </div>
        </div>
    )
}
export default FindPassword;