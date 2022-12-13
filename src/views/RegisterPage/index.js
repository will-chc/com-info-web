import React, { lazy }  from "react";
import { Switch, Route} from 'react-router-dom'
import { Form, Input, Button, Popover, message} from "antd";
import { QuestionCircleOutlined } from '@ant-design/icons'
import VerifyInput from '../../component/VerifyInput'
import { checkAccount, checkPassword } from "../../utils/check";
import styles from './index.less'
const FormItem = Form.Item;
const RegisterPage = (props) => {
    const [form] = Form.useForm();
    const backToLogin = () => {
        props.history.push('/login');
    }
    const isSend = async ()=>{
        let bool = true;
        const {validateFields} = form; 
        await validateFields(['account','password']).then((res)=>{},(reason)=>{bool=false;})
        if(bool){
            // 发请求
            console.log('发请求了');
        }
        return bool;
    }
    
    const handleRegister  = async () =>{
        await form.validateFields();
        const params = form.getFieldValue();
        console.log('注册参数：', params);
        message.success('注册成功，返回登录');
        backToLogin();        
    }
    return (
        <div className={styles.contanier}>
            <header className={styles.header}>
               <span onClick={backToLogin}>返回首页</span> 
            </header>
            <div className={styles.content}>
                <h1 className={styles.title}>注册信息</h1>
                <Form form={form} name='registerForm' labelAlign='right'>
                    <FormItem  label='邮箱' name='account' 
                        rules={[
                            { required: true, validator: checkAccount },
                        ]}
                    >
                        <Input/>
                    </FormItem>
                    <FormItem label='密码' name='password'
                         rules={[
                            {required:true, validator: checkPassword }
                        ]}
                    >
                        <Input.Password 
                            visibilityToggle={true}
                        />
                    </FormItem>
                    <Popover className={styles.tips} content='密码必须包含字母和数字'><QuestionCircleOutlined /></Popover>
                    <Form.Item label='验证码' name='verifyCode' rules={[{required:true,message:'请输入六位数字',pattern:/^\d{6}$/}]}>
                            <div>
                                <Input style={{width:'calc(100% - 130px)'}} maxLength={6}/>
                                <VerifyInput  buttonWidth='130px' timeKey ={'registerPage'} onClick={isSend} countDownTime={60}/>
                            </div>
                        </Form.Item>
                </Form>
                <Button className={styles.button} type="danger" onClick={handleRegister}>注册账号</Button>
            </div>
        </div>
    )
}
export default RegisterPage;