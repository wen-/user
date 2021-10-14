import axios from 'axios';
import { hostName } from '../config/url';

const TIMEOUT = 50000;
const TIMEOUT_MSG = '请求超时！';

// 不需要，后端设置Access-Control-Allow-Origin
// axios.defaults.withCredentials = true;
// axios.defaults.crossDomain = true;

axios.interceptors.response.use(
    res => res,
    error => {
        //code
        return Promise.reject(error);
    },
);

const toKeyValuePairs = (params) => {
    let paramStr = '';
    if (typeof params == 'object') {
        Object.keys(params).forEach(key => {
            paramStr += key + '=' + params[key] + '&';
        });
        paramStr = paramStr.substring(0, paramStr.length - 1);
    }
    return paramStr;
}

const apiFetch = (method, url, header, body, options)=>{
    const reqHeaders = {
        // 'Content-Type': 'application/json;charset=utf-8',
        'Content-Type': 'application/x-www-form-urlencoded',
        ...header,
    };
    // reqHeaders['Authorization'] = 'Bearer ' + token;
    const reqUrl = hostName + url;

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const id = setTimeout(
        () => source.cancel(TIMEOUT_MSG),
        TIMEOUT,
    );
    //show loading
    return axios.request(reqUrl, {
        method: method.toLowerCase(),
        headers: reqHeaders,
        data: body,
        timeout: options?.timeout || TIMEOUT,
        cancelToken: source.token,
    }).then(response => response.data).then(data => {
        clearTimeout(id);
        //hide loading
        return data;
    }).catch(error => {
        clearTimeout(id);
        //show error msg;
    });
};

const doGet = (url, params, options, header) => {
    const paramStr = toKeyValuePairs(params);
    const reqUrl = `${url}${url.includes('?')?'&':'?'}${paramStr}`;
    return apiFetch('GET', reqUrl, header, '', options);
}

const doPost = (url, params, options, header) => {
    const reqBody = JSON.stringify(params);
    return apiFetch('POST', url, header, reqBody, options);
}

export {
    doGet,
    doPost,
}