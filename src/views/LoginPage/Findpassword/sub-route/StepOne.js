import { Button, Form, Input, message } from "antd";
import React from "react";
import styles from './index.less';
import VerifyInput from "../../../../component/VerifyInput";
import { checkAccount } from "../../../../utils/check";
import request from "../../../../server/request";
const FormItem = Form.Item;
const Stepone = (props) => {
    const [form] = Form.useForm();
    const layout = {
        labelCol:{span:4},
        wrapperCol:{span:14}
    }
    const isSend = async () => {
        await form.validateFields(['account']);
        return true
    }
    const identify = async () => {
        await form.validateFields(['account','verifyCode']);
        const { account } = form.getFieldsValue();
        const res = await request('/login',{account});
        if (!res[0]) {
            message.error('邮箱错误');
            return ;
        }
        // 请求
        props.history.push({
            pathname:'/findpassword/steptwo',
            state:{
                token:'step2',
                account
            }
        });
        props.setCurrent(1);
    }
    return (
        <div className={styles.contanier}>
            <Form form={form} labelAlign="right">
                <FormItem label='邮箱' name='account'  {...layout} 
                    rules = {[
                        { required:true, validator:checkAccount}
                    ]}
                >
                    <Input />
                </FormItem>
                <Form.Item {...layout} label='验证码' name='verifyCode' rules={[{ required: true, message: '请输入六位数字', pattern: /^\d{6}$/ }]}>
                    <div>
                        <Input style={{ width: 'calc(100% - 130px)' }} maxLength={6} />
                        <VerifyInput buttonWidth='130px' timeKey={'registerPage'} onClick={isSend} countDownTime={60} />
                    </div>
                </Form.Item>
            </Form>
            <Button type="danger" className={styles.button} onClick={identify}>验证身份</Button>
        </div>
    )
};

export default Stepone;
