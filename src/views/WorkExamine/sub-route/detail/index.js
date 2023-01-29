import React, { useEffect, useState } from "react";
import { Button, Form, Input, message } from "antd";
import styles from './index.less';
import request from "../../../../server/request";

const FormItem = Form.Item;
const FormItemLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 12 },
}
const TYPE = {
    1: "数字作品",
    0: "实物作品"
}
const STATUS = {
    0: "未审核",
    1: "审核通过",
    2: "审核不通过"
}

const Detail = (props) => {
    const userInfo = props.location.state.record;
    const { account } = userInfo;
    const [teamName, setTeamName] = useState("");
    const [status, setStatus] = useState(0);
    useEffect(() => {
        init();
    }, []);
    const init = async () => {
        const data = await request('/userInfo', { account });
        setTeamName(data[0]?.teamName);
        setStatus(data[0]?.status);
    }
    const back = () => {
        props.history.push('/examine/work');
    }
    const handleExamine = async (status) => {
        //1：通过 2：不通过
        const id = userInfo.id;
        await request(`/contest/${id}`, { status }, "PATCH");
        message.success('审核成功')
        back();
    }
    const renderStatus = (s) => {
        switch (s) {
            case '0':
                return <span className={styles.status} style={{backgroundColor: 'yellow'}}>未审核</span>
            case '1':
                return <span className={styles.status} style={{backgroundColor: 'green' , color: "white"}}>审核通过</span>
            case '2':
                return <span className={styles.status} style={{backgroundColor: 'red', color: "white"}}>审核不通过</span>
            default:
                break;
        }
    }
    return (
        <div className={styles.container}>
            <Button type="primary" onClick={back}>返回</Button>
            <div className={styles.center}>
                <Form labelAlign="left" className={styles['form']} >
                    <FormItem label='作品名称' {...FormItemLayout}>
                        <span>{userInfo.worksName}</span>
                    </FormItem>
                    <FormItem label='参赛账号' {...FormItemLayout}>
                        <span>{userInfo.account}</span>
                        {renderStatus(status)}
                    </FormItem>
                    <FormItem label='团队名称' {...FormItemLayout}>
                        <span>{teamName}</span>
                    </FormItem>
                    <FormItem label='参赛赛道' {...FormItemLayout}>
                        <span>{userInfo.trackName}</span>
                    </FormItem>
                    <FormItem label='作品类型' {...FormItemLayout}>
                        <span>{TYPE[userInfo.type]}</span>
                    </FormItem>
                    <FormItem label='作品介绍' {...FormItemLayout}>
                        <span>{userInfo.decription}</span>
                    </FormItem>
                    <FormItem label='作品资料' {...FormItemLayout}>
                        {userInfo.imgs.map((img) => {
                            return <img className={styles.img} src={img} />
                        })}
                    </FormItem>
                </Form>
                <div className={styles.options}>
                    <Button type="danger" style={{ marginRight: 20 }} onClick={() => { handleExamine("2") }}>不通过</Button>
                    <Button type="primary" onClick={() => { handleExamine("1") }}>通过</Button>
                </div>
            </div>
        </div>
    )
}

export default Detail;