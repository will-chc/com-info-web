import React, { useEffect } from "react";
import createRoutes from "../../routes/routes";
import LeftNav from "../LeftNav/LeftNav";
import styles from './index.less';
import mock from "../LeftNav/mock";
import definedRoutes from "../../routes/definedRoutes";
const IndexLayout = () => {
    useEffect(()=>{
        console.log(definedRoutes);
        console.log('@@@',);
    },[])
    return (
        <div className={styles.container}>
            <header className={styles.header}></header>
            <div className={styles.main_container}>
                <div className={styles.nav} >
                    <LeftNav />
                </div>
                <div className="content">
                        {createRoutes(mock,definedRoutes.find(item=>item.path=='/').childern)}
                </div>
            </div>
        </div>
    )
}
export default IndexLayout;