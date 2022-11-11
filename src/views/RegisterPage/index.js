import React, { lazy }  from "react";
import { Switch, Route} from 'react-router-dom'
const FirstStpe = lazy(()=>import('./sub-route/firstStep'))
import styles from './index.less'

const RegisterPage = (props) => {
    return (
        <div className={styles.contanier}>
            <header className={styles.header}>
               <span>返回首页</span> 
            </header>
            <div className={styles.content}>
                    <Switch>
                        <Route path='/abc' component={FirstStpe}/>
                    </Switch>
            </div>
        </div>
    )
}
export default RegisterPage;