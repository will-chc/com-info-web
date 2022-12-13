import React, { useState } from "react";
import MyUpload from "./MyUpload";

const Uploader = (props) => {
    const { max, imgs } = props;
    const [imgsdata, setImgData] = useState(new Array(max).fill(undefined));
    
    // function
    const setImgs = (index, value) =>{
        const arr = [...imgsdata];
        arr[index] = value;
        setImgData(arr);
        console.log('imgs', imgsdata);
    }
 return (
    <div className='upload-container' >
        {imgsdata.map((m, i)=>{
            console.log('@@', (!m && imgsdata[i-1]), (m && i === max - 1));
            if ( i === 0 || (!m && imgsdata[i-1]) || m) {
                return <MyUpload key={i} index={i} setImgs ={setImgs} />
            }
        })}
        {/* <MyUpload /> */}
    </div>
 )
};

export default Uploader;