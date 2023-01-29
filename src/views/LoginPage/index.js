import React, { useEffect, useRef } from "react";
import { Button, Form, Input, message } from "antd";
import styles from './index.less'
import VerifyInput from "../../component/VerifyInput";
import Background from "./Background";
import { checkAccount, checkPassword } from "../../utils/check";
import request from "../../server/request";
const LoginPage = (props) => {
    const [form] = Form.useForm();
    const canvasRef = useRef();
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 15 }
    }
    const handleSignIn = async () => {
        const { validateFields } = form;
        let bool = true;
        await validateFields();
        console.log(form.getFieldsValue());
        const { username:account, password } = form.getFieldsValue();
        const res = await request('/login',{ account, password });
        console.log(res);
        if(res.length <= 0){
            message.error('账号或密码错误');
            return ;
        }
        const { name, id } = res[0];
        localStorage.setItem('user',JSON.stringify({account, name, id}));
        message.success('登录成功');
        props.history.push('/home');
    }
    const isSend = async () => {
        let bool = true;
        const { validateFields } = form;
        await validateFields(['username', 'password']).then((res) => { }, (reason) => { bool = false; });
        if (bool) {
            console.log('发请求了');
        }
        return bool;
    }
    const findPassword = () => {
        props.history.push('/findpassword');
    }
    const hanldeRegister = () => {
        const { history } = props;
        history.push('/register');
    }
  
        return (
            <div className={styles.outter}>
                {/* <Background id='black'/> */}
                <div className={styles.container}>
                    <div className={styles.loginform}>
                        <div className={styles.header}>
                            登录
                        </div>
                        <div className={styles.form}>
                            <Form {...layout} form={form} name='loginForm'>
                                <Form.Item name='username' label='用户名' rules={[{ required: true, message: '不能为空', validator: checkAccount },]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name='password' label='密码' rules={[{ validator: checkPassword }]}>
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item label='验证码'>
                                    <Form.Item name='verifyCode' rules={[{ required: true, message: '请输入六位数字', pattern: /^\d{6}$/ }]}>
                                        <div>
                                            <Input style={{ width: 'calc(100% - 130px)' }} maxLength={6} />
                                            <VerifyInput buttonWidth='130px' timeKey={'page'} onClick={isSend} countDownTime={60} />
                                        </div>
                                    </Form.Item>
                                </Form.Item>

                                <div className={styles.confirmButton}>
                                    <Button type="primary" onClick={handleSignIn}>登录</Button>
                                </div>
                            </Form>
                            <div className={styles.footer}>
                                <span onClick={hanldeRegister}>注册账号</span>
                                <span onClick={findPassword}>找回密码</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    export default LoginPage;