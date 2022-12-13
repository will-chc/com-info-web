// 时间转换

// 时间戳转使劲按格式
export const timeFormat = (timemap, format) => {
    const date = new Date(Number(timemap));
    console.log(date,'@@@');
    const Y = date.getFullYear() + '-';

    const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';

    const D = date.getDate() + ' ';

    const h = date.getHours() + ':';

    const m = date.getMinutes() + ':';

    const s = date.getSeconds();

    return Y + M + D + h + m + s;
}