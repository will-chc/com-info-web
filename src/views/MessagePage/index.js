import React, { useLayoutEffect, useState } from "react";
import { List } from 'antd';
import styles from './index.less';
import { timeFormat } from "../../utils/timeFormat";
import request from "../../server/request";
// const dataSource = new Array(10).fill(
//     {
//     id:'001',
//     title:'2022王者荣耀世界冠军杯比赛',
//     creatAt:'1670837837309'
// }
// );
const MessagePage = (props) => {
    const [dataSource, setDataSource] = useState([]);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 8 });
    const [total, setTotal] = useState(0);
    useLayoutEffect(() => {
        // 获取信息列表
        (async () => {
            const total = await request('/message');
            const { current: _page, pageSize: _limit } = pagination;
            const dataSource = await request('/message', { _page, _limit });
            setTotal(total.length);
            setDataSource(dataSource);
        })()
    }, [])
    //
    const onChange = async (current, pageSize) => {
        pagination.current = current;
        pagination.pageSize = pageSize;
        const dataSource = await request('/message', { _page: current, _limit: pageSize });
        setDataSource(dataSource);
        setPagination(pagination);
    }
    return (
        <div className={styles['container']}>
            <div className={styles['left']}>
                <div className={styles['content']}>
                    <List
                        size="small"
                        header={<div>消息列表</div>}
                        bordered={false}
                        pagination={{ ...pagination, onChange, total }}
                        dataSource={dataSource}
                        onChange={(a, b, c) => { console.log(1111, a, b, c); }}
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