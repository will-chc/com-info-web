import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React, { useState,useEffect } from 'react';
import {withRouter} from "react-router-dom"
import routes from './mock'
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
    console.log(performance.getEntriesByType('navigation'));
}

const LeftNav = (props) => {
    // 获取菜单项
    const items = getMenu(routes);
    const rootSubmenuKeys = items.map(item=>{
        return item.route;
    });
    const [openKeys, setOpenKeys] = useState(['/']);
    const [selectedKeys, setselectedKeys] = useState(['/img']);
    const onSelect = (item)=>{
        setselectedKeys([item.key]);
        props.history.push(item.key);
    }

    // 菜单选中
    useEffect(()=>{
        console.log(props);
        window.onload = ()=>{
            pMonitor.getLoadingTime();
        }
        console.log(1233);
        setselectedKeys([props.history.location.pathname]);
    
    },[props.history.location.pathname]);

    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };
    return (
        <>
            <Menu
                mode="inline"
                // openKeys={openKeys}
                selectedKeys={selectedKeys}
                // onOpenChange={onOpenChange}
                onSelect={onSelect}
                style={{ width: 256 }}
                items={items}
            />
        </>

    )
}
export default withRouter(LeftNav);