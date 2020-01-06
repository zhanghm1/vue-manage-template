import axios from 'axios';
import {ApiUrl} from '../config';
import {localStorageCommon} from '../common/Server';
const service = axios.create({
    // process.env.NODE_ENV === 'development' //来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    baseURL: ApiUrl,
    timeout: 5000
});
service.interceptors.request.use(
    config => {
        let access_token= localStorageCommon.getItem("access_token");
        let token_type= localStorageCommon.getItem("token_type");
        //重定向需要添加此请求头标识是ajax 请求
        config.headers['X-Requested-With'] = `XMLHttpRequest`;
        if(access_token){
            config.headers['Authorization'] = `${token_type} ${access_token}`;
        }
        return config;
    },
    error => {
        window.console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        window.console.log(response);
        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject();
        }
    },
    error => {
        window.console.log(error);
        return Promise.reject();
    }
);

export default service;