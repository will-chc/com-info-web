import { Form, Modal, Button, Input, message } from "antd";
import { CloseCircleOutlined } from '@ant-design/icons';
import React, { useEffect, useLayoutEffect, useState } from "react";
import { nameReg } from "../../utils/check";
import styles from './index.less';
import request from "../../server/request";
const FormItem = Form.Item;
const FormItemLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 8 }
}
const editLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 12 }
}
const userInfo = {
    account: '1132381819',
    header: '天青色',
    teamName: '回家的诱惑',
    members: [
        '邓烟雨',
        '陆静',
        '卢静',
        '阚达'
    ],
    school: '加利顿大学',
    teacher: '风火轮',
    des: `门有车马宾，金鞍曜朱轮。
    谓从丹霄落，乃是故乡亲。
    呼儿扫中堂，坐客论悲辛。
    对酒两不饮，停觞泪盈巾。
    叹我万里游，飘飘三十春。
    空谈帝王略，紫绶不挂身。
    雄剑藏玉匣，阴符生素尘。
    廓落无所合，流离湘水滨。
    借问宗党间，多为泉下人。
    生苦百战役，死托万鬼邻。
    北风扬胡沙，埋翳周与秦。
    大运且如此，苍穹宁匪仁。
    恻怆竟何道，存亡任大钧 `,
    connect: '1132381819@985.com'

}
const UserPage = (props) => {
    //state 
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [members, setMembers] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const [account, setAccount] = useState("");
    //hook
    useLayoutEffect(() => {
        //获取信息
        initData();
    }, [])

    // function 
    const handleEdit = () => {
        setOpen(true);
    }

    const initData = async () => {
        const { account } = JSON.parse(localStorage.getItem('user'));
        const res = await request('/userInfo', { account });
        form.setFieldsValue(res[0]);
        form.setFieldValue('account', account);
        setAccount(account);
        setMembers(res[0].members);
        setUserInfo(res[0])
    }

    const delMember = (i) => {
        const m = [...members];
        if (members.length === 1) {
            message.error('必须有一个成员');
            return;
        }
        m.splice(i, 1);
        setMembers(m);
    }
    const handleAdd = () => {
        const item = null;
        const m = [...members];
        m.push(item);
        setMembers(m);
    }
    const handleChange = (e, i) => {
        const m = [...members];
        m[i] = e.target.value;
        setMembers(m);
    }
    const handleSubmit = async () => {
        await form.validateFields();
        const { id } = JSON.parse(localStorage.getItem('user'));
        const status = "0";
        //编辑
        try {
            const res = await request('/userInfo/' + id, { ...form.getFieldsValue(), members, status }, 'PATCH');
            if (res.error) {
                await  request('/userInfo', { ...form.getFieldsValue(), members, status }, 'POST');
            }
        } catch (err) {
            console.log(err);
        }
        setOpen(false);
        message.success('编辑成功');
        initData();

    }
    return (
        <div className={styles.container}>
            <header className={styles['header']}>账号信息</header>
            <div className={styles['content']}>
                <Form labelAlign="left" className={styles['form']} >
                    <FormItem label='用户名' {...FormItemLayout}>
                        <span>{account}</span>
                    </FormItem>
                    <FormItem label='团队名称' {...FormItemLayout}>
                        <span>{userInfo.teamName}</span>
                    </FormItem>

                    <FormItem label='队长' {...FormItemLayout}>
                        <span>{userInfo.header}</span>
                    </FormItem>
                    <FormItem label='成员' {...FormItemLayout}>
                        <span>{userInfo.members?.join('，')}</span>
                    </FormItem>
                    <FormItem label='院校' {...FormItemLayout}>
                        <span>{userInfo.school}</span>
                    </FormItem>
                    <FormItem label='指导老师' {...FormItemLayout}>
                        <span>{userInfo.teacher}</span>
                    </FormItem>
                    <FormItem label='团队介绍' {...FormItemLayout}>
                        <article>{userInfo.des}</article>
                    </FormItem>
                    <FormItem label='联系方式' {...FormItemLayout}>
                        <span>{userInfo.connect}</span>
                    </FormItem>

                </Form>
                <Button
                    className={styles['edit']}
                    onClick={handleEdit}
                    type='primary'
                >编辑资料</Button>
            </div>
            <Modal
                title='编辑账号资料'
                open={open}
                onCancel={() => { setOpen(false) }}
                onOk={handleSubmit}
            >
                <Form form={form} name='editForm'>
                    <FormItem
                        label='用户名'
                        name='account'
                        {...editLayout}
                    >
                        <Input disabled />
                    </FormItem>
                    <FormItem
                        label='团队名称'
                        name='teamName'
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
                        label='队长'
                        name='header'
                        rules={[
                            { required: true, message: '请输入正确的中文名', pattern: nameReg }
                        ]}
                        {...editLayout}
                    >
                        <Input />
                    </FormItem>
                    <FormItem
                        label='成员'
                        {...editLayout}
                    >
                        <div className={styles['min-input']} >
                            {members && members.map((m, i) => {
                                return (
                                    <Input
                                        key={m}
                                        className={styles['item']}
                                        addonAfter={<CloseCircleOutlined className={styles['del']} onClick={() => { delMember(i) }} />}
                                        defaultValue={m}
                                        onBlur={(e) => { handleChange(e, i) }}
                                    />
                                )
                            })}
                            {members.length < 5 && (
                                <div className={styles['add']} onClick={handleAdd}>+</div>
                            )}
                        </div>
                    </FormItem>
                    <FormItem
                        label='院校'
                        name='school'
                        rules={[
                            { required: true, message: '请输入学校名' }
                        ]}
                        {...editLayout}
                    >
                        <Input />
                    </FormItem>
                    <FormItem
                        label='指导老师'
                        name='teacher'
                        rules={[
                            { required: true, message: '请输入正确的姓名', pattern: nameReg }
                        ]}
                        {...editLayout}
                    >
                        <Input />
                    </FormItem>
                    <FormItem
                        label='团队介绍'
                        name='des'
                        rules={[
                            { required: true, message: '请输入20-400字的介绍', max: 400, min: 20 }
                        ]}
                        {...editLayout}
                    >
                        <Input.TextArea rows={5} />
                    </FormItem>
                    <FormItem
                        label='联系方式'
                        name='connect'
                        rules={[
                            { required: true, message: '请输入联系方式' }
                        ]}
                        {...editLayout}
                    >
                        <Input />
                    </FormItem>
                </Form>
            </Modal>
        </div>
    )
};
export default UserPage;