import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React, { useState,useEffect } from 'react';
import {withRouter} from "react-router-dom"
import mock from './mock'
import definedRoutes from '../../routes/definedRoutes';
import {getAuthRoute} from '../../routes/routes'
function getItem(label, key, icon, children,type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
function getMenu(routes){
    if(!routes||routes.length<1){
        return []
    }
    const menus = routes.map(item=>{
        if(item.children){
            return getItem(item.name,item.route,item.icon,getMenu(item.children))
        }else{
            return getItem(item.name,item.route,item.icon)
        }
    });
    return menus
}
const pMonitor = {}
pMonitor.getLoadingTime = ()=>{
    const[{domComplete}] = performance.getEntriesByType('navigation');
    console.log('@@:',domComplete);
}

const LeftNav = (props) => {
    // 获取菜单项
    const items = getMenu(mock);
    const [selectedKeys, setselectedKeys] = useState(['/img']);
    const onSelect = (item)=>{
        setselectedKeys([item.key]);
        props.history.push(item.key);
    }

    // 菜单选中
    useEffect(()=>{
        window.onload = ()=>{
            pMonitor.getLoadingTime();
        }
        setselectedKeys([props.history.location.pathname]);
    
    },[props.history.location.pathname]);

 
    return (
        <div >
            <Menu
                mode="inline"
                selectedKeys={selectedKeys}
                onSelect={onSelect}
                style={{ width: 256 }}
                items={items}
            />
        </div>

    )
}
export default withRouter(LeftNav);