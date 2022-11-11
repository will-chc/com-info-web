import React from "react";
import { Button, Form, Input,message } from "antd";
import styles from './index.less'
import VerifyInput from "../../component/VerifyInput";
const LoginPage = (props) => {
    const [form] = Form.useForm();
    const layout = {
        labelCol:{span:6},
        wrapperCol:{span:15}
    }
    const handleSubmit =  async ()=>{
        const {validateFields} = form; 
        let bool = true;
        await validateFields().then((res)=>{},(reason)=>{bool=false;})
        if(bool){
            //登录请求
            console.log(form.getFieldsValue());
            message.success('登录成功');

        }

    }
    const isSend = async ()=>{
        let bool = true;
        const {validateFields} = form; 
        await validateFields(['username','password']).then((res)=>{},(reason)=>{bool=false;})
        if(bool){
            // 发请求
            console.log('发请求了');
        }
        return bool;
    }
    const checkeName = (rule,value)=>{
        if(!value){
            return Promise.resolve();
        }
        return Promise.resolve();
    }
    const checkPassword = (rule,value,callback)=>{
        if(!value){
            return Promise.reject('err');
        }
        return Promise.resolve();
    }
    const findPassword = () =>{

    }
    const hanldeRegister = ()=>{
        const {history} = props;
        history.push('/register');
    }
    return (
        <div className={styles.container}>
            <div className={styles.loginform}>
                <div className={styles.header}>
                    登录
                </div>
                <div className={styles.form}>
                    <Form {...layout} form = {form} name='loginForm'>
                        <Form.Item name='username' label='用户名' rules={[{required:true,message:'不能为空'},{validator:checkeName}]}>
                            <Input/>
                        </Form.Item>
                        {/* <Form.Item name='password' label='密码' rules={[{required:true,message:'不能为空'}]}> */}
                        <Form.Item name='password' label='密码' rules={[{validator:checkPassword}]}>
                            <Input.Password/>
                        </Form.Item>
                        <Form.Item  label='验证码'>
                        <Form.Item name='verifyCode' rules={[{required:true,message:'请输入六位数字',pattern:/^\d{6}$/}]}>
                            <div>
                                <Input style={{width:'calc(100% - 130px)'}} maxLength={6}/>
                                <VerifyInput  buttonWidth='130px' timeKey ={'page'} onClick={isSend} countDownTime={6}/>
                            </div>
                        </Form.Item>
                        </Form.Item>
                 
                        <div className={styles.confirmButton}>
                            <Button type="primary" onClick={handleSubmit}>登录</Button>
                        </div>
                    </Form>
                    <div className={styles.footer}>
                        <span onClick={hanldeRegister}>注册账号</span>
                        <span onClick={findPassword}>找回密码</span>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default LoginPage;