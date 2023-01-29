import { Button, Form,Input, message, Modal, Select } from "antd";
import React, { useEffect, useLayoutEffect, useState } from "react";
import styles from './index.less';
import MyUpload from "../../../../component/Upload/MyUpload";
import Uploader from "../../../../component/Upload";
import request from "../../../../server/request";

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
const AddContest = (props) => {
    const [form] = Form.useForm();
    const [ imgs, setImgs ] = useState([]);
    const FormItemLayout = {
        labelCol : { span: 8 },
        wrapperCol : { span: 16 },
    }
    const state = props.location.state;
    const user = JSON.parse(localStorage.getItem('user'));
    const typeOption = [
        {
            label:'实物作品',
            value:'0'
        },
        {
            label:'数字作品',
            value:'1'
        },
    ]

    useEffect(()=> {
        console.log('ppp', props);
        if(props.contestInfo.account){
            Modal.confirm({
                title: "你已报名",
                content: "在我的报名处查看报名信息",
                onOk: () => {
                    props.history.push('/joinin');
                },
                onCancel: () => {
                    props.history.push('/joinin');
                }
            })
        }
    })
    // function
    const handleConfirm = async () => {
        await form.validateFields();
        const params = form.getFieldsValue();
        const { account } = JSON.parse(localStorage.getItem('user'));
        const data = { ...params, account, trackName: state.name, trackId: state.id, imgs };
        await request('/contest', data, 'POST');
        message.success('提交成功');
    }
    return (
        <div className={styles['add-container']}>
            <div className={styles['form']}>
                <h2>填写报名信息</h2>
                <Form form={form}>
                    <FormItem label='赛道' {...FormItemLayout}>
                        <Input value={state.name} disabled/>
                    </FormItem>
                    <FormItem label='队伍名称' {...FormItemLayout}>
                        <Input value={user.name} disabled/>
                    </FormItem>
                    <FormItem 
                        label='参赛作品名称' 
                        name='worksName' 
                        rules={[
                            {
                                required: true,
                                max: 20,
                                min: 4,
                                message: '作品名称要求4-20字'
                            }
                        ]}
                        
                        {...FormItemLayout}>
                        <Input maxLength={20}/>   
                    </FormItem>
                    <FormItem 
                        label='参赛作品类型' 
                        name='type' 
                        rules={[
                            {
                                required: true,
                                message: '请选择作品类型'
                            }
                        ]}
                        
                        {...FormItemLayout}>
                        <Select>
                            {typeOption.map((option)=>{
                                return <Option value={option.value} key={option.value}>{option.label}</Option>
                            })}
                        </Select>  
                    </FormItem>
                    <FormItem 
                        label='参赛作品介绍' 
                        name='decription' 
                        rules={[
                            {
                                required: true,
                                min: 20,
                                max: 200,
                                message: '请填写大于20字少于200字的作品介绍'
                            }
                        ]}
                        
                        {...FormItemLayout}>
                       <TextArea
                            rows={4}
                            maxLength={200}
                       /> 
                    </FormItem>
                    <FormItem
                        label='辅助资料' 
                        {...FormItemLayout}                   
                    >
                        {/* <MyUpload /> */}
                        <Uploader
                            max={3}
                            imgs={imgs}
                            onChange={setImgs}
                        />
                    </FormItem>
                </Form>
                <Button type="primary" className={styles.confirm} onClick={handleConfirm}>确认报名</Button>
            </div>
        </div>
    )
}
export default AddContest;