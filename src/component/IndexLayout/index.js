import React, { useEffect } from "react";
import createRoutes from "../../routes/routes";
import LeftNav from "../LeftNav/LeftNav";
import styles from './index.less';
import mock from "../LeftNav/mock";
import { Breadcrumb } from "antd";
const IndexLayout = (props) => {

    return (
        <div className={styles.container}>
            <header className={styles.header}></header>
            <div className={styles.main_container}>
                <div className={styles.nav} >
                    <LeftNav />
                </div>
                <div className={styles.content}>
                        {createRoutes(mock,props.route.children)}
                </div>
            </div>
        </div>
    )
}
export default IndexLayout;