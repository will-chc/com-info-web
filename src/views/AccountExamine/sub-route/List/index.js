import { Button, Form, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import styles from './index.less';
import request from "../../../../server/request";
const FormItem = Form.Item;

const AccountExamine = (props) => {

    const [ dataSource, setDataSourece ] = useState([]);
    const [ total, setTotal ] = useState(0);
    const [ pagination, setPagination ] = useState({current: 1, pageSize: 10});

    useEffect(() => {
        init();
    }, []);
    const init = async (status) => {
        const res = await request('/userInfo');
        const total = res.length;
        const data = await request('/userInfo', {_page: pagination.current, _limit: pagination.pageSize, status })
        setTotal(total);
        setDataSourece(data);
    }
    const handleClick = (record) => {
        console.log(props,"props");
        props.history.push('/examine/account/detail', { record } );
    }

    const handleChange = (pagination) => {
        const { current, pageSize } = pagination;
        setPagination({ current, pageSize});
        init();
    }
    
    const handleSearch = (status) => {
        if (status == -1) {
            init();
        } else {
            init(status);
        }
    }

    const columns = [
        {
            dataIndex:"account",
            title: "账号"
        },
        {
            dataIndex:"teamName",
            title: "团队名称"
        },
        {
            dataIndex:"header",
            title: "队长"
        },
        {
            dataIndex:"school",
            title: "学校"
        },
        {
            dataIndex:"teacher",
            title: "指导老师"
        },
        {
            dataIndex:"status",
            title:'审核状态',
            render: (v) => {
                const STATUS = {
                    0: "未审核",
                    1: "通过",
                    2: '不通过'
                } 
                const COLOR = {
                    0: "#fff",
                    1: "#6bff6b",
                    2: "#e68989"
                }
                return (
                    <span style={{backgroundColor: `${COLOR[v]}`}}>{STATUS[v]}</span>
                )
            }
        },
        {
            dataIndex: "options",
            title: "操作",
            render: (v , record) => {
                return (
                    <Button type="primary" onClick={()=>{handleClick(record)}}>查看详情</Button>
                )
            }
        }
    ]
    return (
        <div className={styles.container}>
            <div className={styles.searchbox}>
                <Form layout='inline'>
                    <FormItem label="审核状态" >
                        <Select style={{width:100}} defaultValue='-1' onChange={handleSearch} > 
                            <Select.Option value='1'>审核通过</Select.Option>
                            <Select.Option value='2'>审核未通过</Select.Option>
                            <Select.Option value='0'>未审核</Select.Option>
                            <Select.Option value='-1'>全部</Select.Option>
                        </Select>
                    </FormItem>
                </Form>

            </div>
            <div className={styles.table}>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    pagination={{...pagination, total}}
                    onChange = {handleChange}
                 />
            </div>
        </div>
    )
};

export default AccountExamine;