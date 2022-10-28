import React from "react";
import UploadImg from "../../component/Upload/uploadImg";
import MyUpload from "../../component/Upload/MyUpload";
import styles from './index.less'
const Upload  = (props)=>{
    const beforeUpload = (file)=>{
      console.log(file);
      if(file.type!='image/jpeg'){
          console.error('图片格式不是jpg');
          return false;
      }
      if(file.size/1025/1024>5){
        console.error('图片大小不能超过5M')
        return false;
      }
      return true;
        
    }
    return (
            <div className={styles.container}>
                <div className={styles.imgUpload}>
                  <UploadImg/>
                </div>
                <div>
                  <MyUpload beforeUpload={beforeUpload}/>
                </div>
        </div>   
    );
}

export default Upload;