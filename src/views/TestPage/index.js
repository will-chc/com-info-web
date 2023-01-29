import { Input } from "antd";
import React, { useState } from "react";
import CountDown from "./child";
const TestPage = (props)=>{
    const [ s , setSecond] = useState(0);
    const [ tip , setTip] = useState("");
    const handleChange = (e) => {
        setSecond(e.target.value);
    }
    
    return (
        <div>
            <Input value={s} onChange={handleChange} />
            <CountDown second={s}  cb = {(tip)=>{setTip(tip)}} />
            <span>{tip}</span>
        </div>
    )
} 
export default TestPage;