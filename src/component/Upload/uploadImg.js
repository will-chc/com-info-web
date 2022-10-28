import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Upload, Icon } from "antd";
import styles from './index.less';
const UploadImg = (props) => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(false);
    const [fileList, setFileList] = useState([]);
    const beforeUpload = (file, fileList) => {
        // 类型设置
        const isType = file.type === 'image/jpeg';
        console.log('isType-->', isType);
        // return isType;
        return true;
    }
    const customRequest = () => {

    }
    const handleChange = ({file}) => {
        const reader = new FileReader();
        reader.addEventListener('load',()=>{
            // setImageUrl(fileReader.result);
        });
        console.log(file);
        if(file.status === 'done' ){
            console.log(222);
            reader.readAsDataURL(file.orginFileObj);
        }
        

    }
    const uploadButton = (
        <div className={styles.addbox}>
            {loading?<LoadingOutlined/>:<PlusOutlined/>}
        </div>
    )
    
    return (
        <Upload
            name="avatar"
            listType="picture-card"
            // className="avatar-uploader"
            showUploadList={true}
            // maxCount={1}
            // customRequest={customRequest}
            beforeUpload={beforeUpload}
            onChange={handleChange}
        >
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt="avatar"
                    style={{
                        width: '100%',
                    }}
                />
            ) : (
                uploadButton
            )}
        </Upload>
    )
}
export default UploadImg;
