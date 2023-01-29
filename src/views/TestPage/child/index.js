import React, { useEffect, useState } from "react";
import { Button } from "antd";
const CountDown = (props) => {
    const [second, setSecond] = useState(props.second);
    const [timer, setTimer] = useState(null);
    useEffect(() => {
        setSecond(props.second);
    }, [props.second])
    const countDown = (iscontinue) => {
        let s;
        
        if (!iscontinue){
            console.log(111);
            pause();
            s = props.second;
            setSecond(s);
        }else{
            s = second;
        }
        let timer = setInterval(() => { 
            console.log(s);
            s--;
            setSecond(s);
            if(s<=0){
                clearInterval(timer);
                props.cb('倒计时结束');
            }
        }, 1000);
        setTimer(timer);
    }
    const pause = () => {
        clearInterval(timer);
    }
    return (
        <div>
            <span>{second}</span>
            <Button onClick={()=>countDown(false)}>开始计时</Button>
            <Button onClick={pause}>暂停计时</Button>
            <Button onClick={()=>{countDown(true)}}>继续计时</Button>
        </div>
    )
}
export default CountDown;