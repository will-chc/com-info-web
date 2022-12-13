import { Button, Form, Input, message } from "antd";
import React, { useLayoutEffect } from "react";
import styles from './index.less';
import { checkPassword } from "../../../../utils/check";
const FormItem = Form.Item;
const Stepone = (props) => {
    const [form] = Form.useForm();
    const layout = {
        labelCol:{span:5},
        wrapperCol:{span:14}
    }
    const checkSame = async () => {
        await form.validateFields(['account']);
        const { password, samePassword } = form.getFieldsValue();
        if(password === samePassword) return Promise.resolve();

        return Promise.reject('两次密码不一致');
    }
    const hadleModify = async () => {
        await form.validateFields(['password','samePassword']);
        // 请求
        const {password} = form.getFieldValue('password');
        message.success('修改成功');
        props.history.push('/login');
    }
    return (
        <div className={styles.contanier}>
            <Form form={form} labelAlign="right">
                <FormItem label='新密码' name='password'  {...layout} 
                    rules = {[
                        { required:true, validator:checkPassword}
                    ]}
                >
                    <Input.Password visibilityToggle={true} />
                </FormItem>
                <FormItem label='确认新密码' name='samePassword'  {...layout} 
                    rules = {[
                        { required:true, validator:checkSame}
                    ]}
                >
                    <Input.Password visibilityToggle={true} />
                </FormItem>
            </Form>
            <Button type="danger" className={styles.button} onClick={hadleModify}>修改密码</Button>
        </div>
    )
};

export default Stepone;
