import { Button, Modal, Pagination, Tabs } from "antd";
import { CoffeeOutlined } from '@ant-design/icons'
import React, { useState } from "react";
import styles from './index.less';
import CardTable from "../../../../component/CardTable";
const dataSource = [
    {
        name: '科技与很活',
        key: 'track1',
        des: `这是简介可靠的解放军发电技术的开发精
              神科大夫尖峰时刻的飞机喀什地方精神科大夫
              角度xczcas让罚款扣分扣分罚款看是否精神科大夫尽快发顺丰`,
        workAsk: ['号就打架大家', 'djhdjda', 'wwiiwi']
    },
    {
        name: '科技与很活',
        key: 'track2',
        des: `这是简介可靠的解放军发电技术的开发精
              神科大夫尖峰时刻的飞机喀什地方精神科大夫
              角度xczcas让罚款扣分扣分罚款看是否精神科大夫尽快发顺丰`,
        workAsk: ['号就打架大家', 'djhdjda', 'wwiiwi']
    },
    {
        name: '科技与很活',
        key: 'track3',
        des: `这是简介可靠的解放军发电技术的开发精
              神科大夫尖峰时刻的飞机喀什地方精神科大夫
              角度xczcas让罚款扣分扣分罚款看是否精神科大夫尽快发顺丰`,
        workAsk: ['号就打架大家', 'djhdjda', 'wwiiwi']
    },
    {
        name: '科技与很活',
        key: 'track4',
        des: `这是简介可靠的解放军发电技术的开发精
              神科大夫尖峰时刻的飞机喀什地方精神科大夫
              角度xczcas让罚款扣分扣分罚款看是否精神科大夫尽快发顺丰`,
        workAsk: ['号就打架大家', 'djhdjda', 'wwiiwi']
    },
    {
        name: '科技与很活',
        key: 'track5',
        des: `这是简介可靠的解放军发电技术的开发精
              神科大夫尖峰时刻的飞机喀什地方精神科大夫
              角度xczcas让罚款扣分扣分罚款看是否精神科大夫尽快发顺丰`,
        workAsk: ['号就打架大家', 'djhdjda', 'wwiiwi']
    },
    {
        name: '科技与很活',
        key: 'track6',
        des: `这是简介可靠的解放军发电技术的开发精
              神科大夫尖峰时刻的飞机喀什地方精神科大夫
              角度xczcas让罚款扣分扣分罚款看是否精神科大夫尽快发顺丰`,
        workAsk: ['号就打架大家', 'djhdjda', 'wwiiwi']
    },
    {
        name: '科技与很活',
        key: 'track7',
        des: `这是简介可靠的解放军发电技术的开发精
              神科大夫尖峰时刻的飞机喀什地方精神科大夫
              角度xczcas让罚款扣分扣分罚款看是否精神科大夫尽快发顺丰`,
        workAsk: ['号就打架大家', 'djhdjda', 'wwiiwi']
    },
    {
        name: '科技与很活',
        key: 'track8',
        des: `这是简介可靠的解放军发电技术的开发精
              神科大夫尖峰时刻的飞机喀什地方精神科大夫
              角度xczcas让罚款扣分扣分罚款看是否精神科大夫尽快发顺丰`,
        workAsk: ['号就打架大家', 'djhdjda', 'wwiiwi']
    },
]
const List = (props) => {
    // state 
    const [visible, setVisible] = useState(false);
    const [curModalData, setCurModalData] = useState({});
    const [ activeKey, setActivekey ] = useState('track');
    // options
    const actions = [
        {
            label: '查看详情',
            action: (record) => {
                console.log(record);
                setCurModalData(record);
                setVisible(true);
            }
        },
        {
            label: '点击报名',
            action: (item) => { 
                console.log('props',props);
                const {push} = props.history;
                push('/joinin/add',item);
            }
        }
    ]
    const columns = [
        {
            label: '简介',
            key: 'des',
        },
        {
            label: '作品要求',
            key: 'workAsk'
        },
    ]
    // function

    const RenderList = () => {
        return (
            <div className={styles['list-container']}>
                <CardTable
                    dataSource={dataSource}
                    actions={actions}
                    columns={columns}
                />
                <Pagination className={styles.pagination} simple current={1} total={10} pageSize={8} />
            </div>
        )
    };

    const RenderMyJoin = () => {
        return (
            <div className={styles['my-container']}>
                <div className={styles['my-content-none']}>
                    <CoffeeOutlined />
                    <h5 className={styles['tips']}>暂无报名信息</h5>
                    <Button onClick={()=>{setActivekey('track')}}>点击前往报名</Button>
                </div>
            </div>
        )
    }


    const items = [
        {
            label: '赛道信息',
            key: 'track',
            children: <RenderList />
        },
        {
            label: '我的报名',
            key: 'my',
            children: <RenderMyJoin/>
        },
    ]

    return (
        <div className={styles.container}>
            <Tabs 
            activeKey={activeKey}
            type="card" 
            items={items} 
            onChange = {(key)=>{setActivekey(key)}}
            />
            <div className={styles.pagination}>
            </div>
            {visible && (
                <Modal
                    open={visible}
                    title={curModalData.name}
                    footer={[]}
                    onCancel={() => { setVisible(false) }}
                >
                    <h2>简介：</h2>
                    <div>{curModalData.des}</div>
                    <h2>作品要求：</h2>
                    <div>
                        <ul>
                            {curModalData.workAsk.map(w => {
                                return (
                                    <li>
                                        {w}
                                    </li>
                                )
                            })}
                        </ul>

                    </div>
                </Modal>
            )}
        </div>
    )
}

export default List;