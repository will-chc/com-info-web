import { Button, Form, Input, message, Modal, Select, Table } from "antd";
import { CloseCircleOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from "react";
import styles from './index.less';
import request from "../../server/request";
const FormItem = Form.Item;
const editLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 12 }
}
const TrackMsg = (props) => {

    const [dataSource, setDataSourece] = useState([]);
    const [total, setTotal] = useState(0);
    const [trackName, setTrackName] = useState('');
    const [pagination, setPagination] = useState({ current: 1, pageSize: 6 });
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [workAsk, setWorkAsk] = useState([]);
    const [current, setCurrent] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    useEffect(() => {
        init();
    }, []);
    const init = async () => {
        const res = await request('/track');
        const total = res.length;
        const data = await request('/track', { _page: pagination.current, _limit: pagination.pageSize });
        setTotal(total);
        setDataSourece([...data]);
    }

    const handleChange = async (pagination) => {
        const { current, pageSize } = pagination;
        setPagination({ current, pageSize });
        const data = await request('/track', { _page: current, _limit: pageSize });
        setDataSourece([...data]);
    }
    const handleInputChange = (e, i) => {
        const a = [...workAsk];
        a[i] = e.target.value;
        setWorkAsk(a);
    }
    const handleSearch = async (value) => {
        let name = value;
        if (name.length === 0) {
            init();
        }
        else {
            const data = await request('/track', { _page: pagination.current, _limit: pagination.pageSize, name });
            setDataSourece([...data]);
            setTotal(data.length);
        }

    }
    const handleSubmit = async () => {

        const { name, des } = form.getFieldsValue();
        if (isEdit) {
            await request(`/track/${current.id}`, { name, des, workAsk }, "PATCH");
        } else {
            await request(`/track`, { name, des, workAsk }, "POST");
        }
        setOpen(false);
        init();
    }
    const handleOpen = (record) => {
        if (record) {
            setIsEdit(true);
            form.setFieldsValue(record);
            setCurrent(record);
            setWorkAsk(record.workAsk);
        } else {
            setIsEdit(false);
        }
        setOpen(true);
    }
    const delMember = (i) => {
        const a = [...workAsk];
        if (a.length === 1) {
            message.error('必须有一个参赛要求');
            return;
        }
        a.splice(i, 1);
        setWorkAsk(a);
    }
    const handleAdd = () => {
        const item = null;
        const a = [...workAsk];
        a.push(item);
        setWorkAsk(a);
    }

    const columns = [
        {
            dataIndex: "name",
            title: "赛道名称"
        },
        {
            dataIndex: "des",
            title: "介绍",
            render: (v) => {
                let res = v;
                if (v.length > 20) {
                    res = v.slice(0, 20);
                    res += '...';
                }
                return res;
            }
        },

        {
            dataIndex: "workAsk",
            title: "赛道要求",
            render: (v) => {
                return v.join(';');
            }
        },
        {
            dataIndex: "options",
            title: "操作",
            render: (v, record) => {
                return (
                    <Button type="primary" onClick={() => { handleOpen(record) }}>编辑</Button>
                )
            }
        }
    ]
    return (
        <div className={styles.container}>
            <div className={styles.searchbox}>
                <Form layout='inline'>
                    <FormItem label="赛道名称" >
                        <Input.Search onSearch={handleSearch} />
                    </FormItem>
                </Form>

            </div>
            <div className={styles.table}>
                <Table
                    title={() => <div><span>赛道信息管理</span><Button type="danger" className={styles.addBtn} onClick={() => { handleOpen() }}>添加赛道</Button></div>}
                    columns={columns}
                    dataSource={dataSource}
                    pagination={{ ...pagination, total }}
                    onChange={handleChange}
                    rowKey={(record) => record.id }
                />
            </div>
            <Modal
                title='修改赛道信息'
                open={open}
                onCancel={() => { setOpen(false) }}
                onOk={handleSubmit}
            >
                <Form form={form} name='editForm'>
                    <FormItem
                        label='赛道名称'
                        name='name'
                        rules={[
                            {
                                required: true,
                                message: '请输入2-8个字的名称',
                                max: 8,
                                min: 2,
                            }
                        ]}
                        {...editLayout}
                    >
                        <Input />
                    </FormItem>
                    <FormItem
                        label='赛道介绍'
                        name='des'
                        rules={[
                            { required: true, message: '请输入20-400字的介绍', max: 400, min: 20 }
                        ]}
                        {...editLayout}
                    >
                        <Input.TextArea rows={5} />
                    </FormItem>
                    <FormItem
                        label='参赛要求'
                        {...editLayout}
                    >
                        <div className={styles['min-input']} >
                            {workAsk && workAsk.map((m, i) => {
                                return (
                                    <Input
                                        key={m}
                                        className={styles['item']}
                                        addonAfter={<CloseCircleOutlined className={styles['del']} onClick={() => { delMember(i) }} />}
                                        defaultValue={m}
                                        onBlur={(e) => { handleInputChange(e, i) }}
                                    />
                                )
                            })}
                            {workAsk.length < 5 && (
                                <div className={styles['add']} onClick={handleAdd}>+</div>
                            )}
                        </div>
                    </FormItem>
                </Form>
            </Modal>
        </div>
    )
};

export default TrackMsg;