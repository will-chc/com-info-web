import React, { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import styles from './index.less';
import request from "../../../../server/request";

const FormItem = Form.Item;
const FormItemLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 10 },
}

const Detail = (props) => {
    const userInfo = props.location.state.record;
    const { account } = userInfo;
    const back = () => {
        props.history.push('/examine/account');
    }
    const handleExamine = async (status) => {
        //1：通过 2：不通过
        const resId = await request('/userInfo', { account });
        const { id } = resId[0];
        await request(`/userInfo/${ id }`, { status }, "PATCH");
        message.success('审核成功')
        back();
    }
    return (
        <div className={styles.container}>
            <Button type="primary" onClick={back}>返回</Button>
            <div className={styles.center}>
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
            <div className={styles.options}>
                <Button type="danger" style={{marginRight:20}} onClick={() => {handleExamine("2")}}>不通过</Button>
                <Button type="primary" onClick={() => {handleExamine("1")}}>通过</Button>
            </div>
            </div>
        </div>
    )
}

export default Detail;