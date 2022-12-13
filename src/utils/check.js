// 表单项校验

// 校验账号
export const checkAccount = (rule, value) => {
    const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(reg.test(value)) return Promise.resolve();
    return Promise.reject('请输入正确的邮箱格式');
}
// j校验密码
export const checkPassword = (rule, value) => {
    const reg = /^(?=.*[0-9])(?=.*[a-zA-Z])(.{6,})$/
    if(reg.test(value)) return Promise.resolve();
    return Promise.reject('请输入正确的密码格式');
}

export const nameReg = /^(?:[\u4e00-\u9fa5·]{2,16})$/;