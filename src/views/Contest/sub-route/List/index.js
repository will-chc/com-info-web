import { Button, Modal, Pagination, Tabs, Form } from "antd";
import { CoffeeOutlined } from '@ant-design/icons'
import React, { useLayoutEffect, useState } from "react";
import styles from './index.less';
import CardTable from "../../../../component/CardTable";
import request from "../../../../server/request";
import FormItem from "antd/es/form/FormItem";
const defaultLayout = {
    labelCol: { span: 12 },
    wrapperCol: { span: 10 },
}
const TYPE = {
    0: "实物作品",
    1: "数字作品"
}
const List = (props) => {
    // state 
    const [visible, setVisible] = useState(false);
    const [curModalData, setCurModalData] = useState({});
    const [activeKey, setActivekey] = useState('track');
    const [dataSource, setDataSource] = useState([]);
    const [total, setTotal] = useState(0);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

    useLayoutEffect(() => {
        init();
    }, []);

    const init = async () => {
        let total = await request('/track');
        const { current: _page, pageSize: _limit } = pagination;
        let res = await request('/track', { _page, _limit });
        setTotal(total.length);
        setDataSource(res);
    }
    // options
    const actions = [
        {
            label: '查看详情',
            action: (record) => {
                console.log(record);
                setCurModalData(record);
                setVisible(true);
            }
        },
        {
            label: '点击报名',
            action: (item) => {
                console.log('props', props);
                const { push } = props.history;
                push('/joinin/add', item);
            }
        }
    ]
    const columns = [
        {
            label: '简介',
            key: 'des',
        },
        {
            label: '作品要求',
            key: 'workAsk'
        },
    ]
    // function
    const onChange = async (current, pageSize) => {
        setPagination({
            current,
            pageSize
        });
        let res = await request('/track', { _page: current, _limit: pageSize });
        setDataSource(res);
    }
    const RenderList = () => {
        return (
            <div className={styles['list-container']}>
                <CardTable
                    dataSource={dataSource}
                    actions={actions}
                    columns={columns}
                />
                <Pagination className={styles.pagination} total={total} {...pagination} onChange={onChange} />
            </div>
        )
    };

    const RenderMyJoin = (props) => {
        return (
            <div className={styles['my-container']}>
                {props.contestInfo.account
                    ? (
                        <div className={styles['my-content']}>
                            <h2>报名信息</h2>
                            <Form className={styles.form}>
                                <FormItem label='参赛赛道' {...defaultLayout}>
                                    <span className={styles['track']}>{props.contestInfo.trackName}</span>
                                </FormItem>
                                <FormItem label='作品名称' {...defaultLayout}>
                                    <span >{props.contestInfo.worksName}</span>
                                </FormItem>
                                <FormItem label='作品类型' {...defaultLayout}>
                                    <span className={styles['track']}>{TYPE[props.contestInfo.type]}</span>
                                </FormItem>
                                <FormItem label='作品介绍' {...defaultLayout}>
                                    <span >{props.contestInfo.decription}</span>
                                </FormItem>
                                <FormItem label='作品信息' {...defaultLayout}>
                                    {props.contestInfo.imgs.map((img) => {
                                        return <img className={styles.img} src={img}/>
                                    })}
                                </FormItem>
                                
                            </Form>
                        </div>)
                    : (
                        <div className={styles['my-content-none']}>
                            <CoffeeOutlined />
                            <h5 className={styles['tips']}>暂无报名信息</h5>
                            <Button onClick={() => { setActivekey('track') }}>点击前往报名</Button>
                        </div>
                    )}

            </div>
        )
    }


    const items = [
        {
            label: '赛道信息',
            key: 'track',
            children: <RenderList />
        },
        {
            label: '我的报名',
            key: 'my',
            children: <RenderMyJoin contestInfo={props.contestInfo}/>
        },
    ]

    return (
        <div className={styles.container}>
            <Tabs
                activeKey={activeKey}
                type="card"
                items={items}
                onChange={(key) => { setActivekey(key) }}
            />
            <div className={styles.pagination}>
            </div>
            {visible && (
                <Modal
                    open={visible}
                    title={curModalData.name}
                    footer={[]}
                    onCancel={() => { setVisible(false) }}
                >
                    <h2>简介：</h2>
                    <div>{curModalData.des}</div>
                    <h2>作品要求：</h2>
                    <div>
                        <ul>
                            {curModalData.workAsk.map(w => {
                                return (
                                    <li>
                                        {w}
                                    </li>
                                )
                            })}
                        </ul>

                    </div>
                </Modal>
            )}
        </div>
    )
}

export default List;