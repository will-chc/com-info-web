import { Button, Card } from "antd";
import React, { useState } from "react";
import styles from './index.less'
const CardTable = (props) => {
    // state
    const { dataSource, actions, columns } = props;
    
    // function
    const actionOption = (record) =>{
        return actions.map(item=>{
            return <Button type="primary" onClick={()=>{item.action(record)}}>{item.label}</Button>
        })
    }
    const renderContent = (data, column) => {
        let value =  data[column.key];
        // 数组
        if(Array.isArray(value)){
            if(value.length>2){
                value = [value[0],value[1]];
            }
            return (<ul>
                {value.map(v=>{
                    return (
                        <li key={v}>
                            {v}
                        </li>
                    )
                })}
                ...
            </ul>)
        }
        // 非数组
        if(value.length>20) value = value.slice(0, 40) + '...';
        return (
            <div>
                {value}
            </div>
        )
    }
    return (
        <div>
            {dataSource.map(data => {
                return (
                    <Card
                        key={data.key}
                        className={styles['card']}
                        title={data.name}
                        bordered={true}
                        hoverable={true}
                        size="small"
                        actions={[...actionOption({...data})]}
                    >
                        {columns.map(column=>{
                            return (
                            <>
                                <h4>{column.label} : </h4>
                                {renderContent(data,column)}
                            </>
                        )
                        })}
                    </Card>
                )
            })}
        </div>
    )
};

export default CardTable;