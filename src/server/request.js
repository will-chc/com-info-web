import axios from "axios";

const request = async (url, data = {}, method = 'GET') => {
    const baseURL = 'http://localhost:3000';
    let res = {};
    try {
        switch (method) {
            case 'GET':
                res = await axios({
                    url,
                    method: 'GET',
                    baseURL,
                    params: data
                });
                break;
            case 'PATCH':
                res = await axios({
                    url,
                    method: 'PATCH',
                    baseURL,
                    data
                });
                break;
            case "POST":
                res = await axios({
                    url,
                    method: 'POST',
                    baseURL,
                    data
                });
                break;
        }
    } catch (err) {
        console.log('有bug');
        return { error: true};
    }

    return res.data;
}
export default request;