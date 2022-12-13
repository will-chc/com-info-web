import React from "react";
import { List } from 'antd';
import styles from './index.less';
import { timeFormat } from "../../utils/timeFormat";
const dataSource = new Array(10).fill(
    {
    id:'001',
    title:'2022王者荣耀世界冠军杯比赛',
    creatAt:'1670837837309'
}
);
const MessagePage = (props) => {
    return (
        <div className={styles['container']}>
            <div className={styles['left']}>
                <div className={styles['content']}>
                    <List
                        size="small"
                        header={<div>消息列表</div>}
                        pagination={{current:2,pageSize:10,total:40}}
                        bordered={false}
                        dataSource={dataSource}
                        renderItem={item => <List.Item>
                            <span className={styles['title']}>{item.title} </span>
                            <span className={styles['list-time']}>{timeFormat(item.creatAt)}</span>
                            </List.Item>}
                    />
                </div>
            </div>
            <div className={styles['right']}>
                <div className={styles['content']}>


                </div>
            </div>
        </div>
    )
}

export default MessagePage;