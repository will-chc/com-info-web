import { Button, Input } from "antd";
import React, { useEffect, useState } from "react";
import styles from './index.less'

const VerifyInput = (props) => {
    const [second, setSecond] = useState(props.countDownTime);
    const [disabled, setDisabled] = useState(localStorage.getItem(props.timeKey));
    let timer;
    useEffect(()=>{
        if(disabled){
            timerDown();
        }
    },[])

    const handleClick = async ()=>{
        let flag = await props.onClick();
        if(flag){
            setDisabled(true);
            if(localStorage.getItem(props.timeKey)){
                setSecond(localStorage.getItem(props.timeKey));
            }
            else{
                localStorage.setItem(props.timeKey,second);
                timerDown();
            }
        }
    }
    const timerDown = ()=>{
        timer = setInterval(()=>{
            if(localStorage.getItem(props.timeKey)<= 0){
                clearInterval(timer);
                setSecond(props.countDownTime);
                setDisabled(false);
                localStorage.removeItem(props.timeKey)
            }
            else{
                console.log(second);
                let nowSecond = localStorage.getItem(props.timeKey);
                localStorage.setItem(props.timeKey,--nowSecond);
                setSecond(()=>nowSecond);
            }
        },1000);
    }
    return (
             <>
                <Button disabled={disabled} style={{width:props.buttonWidth}} type="primary"onClick={handleClick}>{disabled?`${second}秒后重新获取`:'点击获取验证码'}</Button>
            </>
       
    )
};
export default VerifyInput;