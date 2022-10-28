import React, { useEffect, useRef, useState } from "react";
import {Icon} from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import styles from './index.less'
const MyUpload = (props) => {
    const fileBtn = useRef();
    const [loading, setLoading] = useState(false);
    const [dataUrl, setDataUrl] = useState();

    const inputFile = () => {
        const input = fileBtn.current;
        const reader = new FileReader();
        reader.onload = () => {
            setDataUrl(reader.result);
            setLoading(false);

        }
        
        input.click();
        input.onchange = async (e) => {
            const file = e.target.files[0];
            const isUpload = props.beforeUpload?props.beforeUpload(file):true;
            if(!isUpload) return 
            setDataUrl(null);
            setLoading(true);
            console.log('file',file);
            reader.readAsDataURL(file);
        }
    }
    const clearFile = ()=>{
        setDataUrl(null);
        input.outerHtml = input.outerHTML; 
    }
    return (
        <div>
            <input style={{ display: 'none' }} type='file' ref={fileBtn} />
            <div>
                {!dataUrl
                    ? (<div className={styles.upload_box} onClick={inputFile}>
                        {loading ? <LoadingOutlined /> : <PlusOutlined />}
                    </div>
                    )
                    : (<div className={styles.img}>
                        <div className={styles.close_icon} onClick={clearFile}>
                            x
                        </div>
                        <img onClick={inputFile} style={{ width: 100, height: 100 }} src={dataUrl} />
                    </div>
                    )
                }
            </div>

        </div>
    )
}
export default MyUpload;