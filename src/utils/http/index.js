// 引入axios
import axios from 'axios'
import queryString from 'querystring'
import { toast } from '@/components/toast'
import { Loading } from 'element-ui';

import {local} from '@/utils'

// loading
let LOAD;

// 超时时间30s
axios.defaults.timeout = 30000;
// 配置请求路径公共部分
// axios.defaults.baseURL = 'https://api.github.com';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

// http请求拦截器
axios.interceptors.request.use(config => {
    // post 启用loading
    if(config.method == 'post'){
        LOAD = Loading.service({
            lock: true,
            spinner: 'el-icon-loading',
            background: 'rgba(255, 255, 255, 0.3)'
        });
    }
    //POST数据转换 上传文件时不做处理
    if(config.headers['Content-Type'] != 'multipart/form-data'){
        var data = config.data;
        config.data = queryString.stringify(data);
    }

    // token
    config.headers.accessToken = local.getObject('session').sessionId

    return config
}, error => {
    if(config.method == 'post'){
        LOAD.close();
    }
    return Promise.reject(error);
})

// http响应拦截器
axios.interceptors.response.use(res => {
    if(res.config.method == 'post'){
        LOAD.close();
    }
    // 统一处理服务端异常错误
    if (!res.data.success) {
        toast({
            iconClass: 'el-icon-error',
            tips: res.data.message || '出错了！但后台未返回错误信息'
        })
    }

    return res
}, error => {
    if(error.config.method == 'post'){
        LOAD.close();
    }
    // 返回状态
    if (error.response) {
        switch (error.response.status) {
            case 401:
                // 401 清除token信息并跳转到登录页面
                toast({
                    iconClass : 'el-icon-warning',
                    tips: '请登录后访问',
                })
                break;
            case 404:
                toast({
                    iconClass : 'i-warn',
                    tips: '请求接口不存在'
                })
                break;
            case 500:
                toast({
                    iconClass : 'i-warn',
                    tips: '后台接口报错'
                })
                break;
            default:
                toast({
                    iconClass : 'i-warn',
                    tips: '错误码：' + error.request.status
                })
        }
    }
    // 请求状态
    if (error.request) {
        switch (error.request.status) {
            case 0:
                toast({
                    iconClass : 'el-icon-warning',
                    tips: (error && error.data && error.data.message) || '请求超时',
                })
                break;
            case 401:
                toast({
                    iconClass : 'el-icon-warning',
                    tips: '请登录后访问',
                })

                break;
            case 404:
                toast({
                    iconClass: 'el-icon-warning',
                    tips: '请求接口不存在'
                })
                break;
            case 500:
                toast({
                    iconClass : 'i-warn',
                    tips: '后台接口报错'
                })
                break;
            default:
                toast({
                    iconClass : 'el-icon-warning',
                    tips: error.data.message,
                })
                break;
        }
    }
    return Promise.reject(error);

})
export const $http = axios;

export default {
    install: function(vm) {
        vm.prototype.$http = axios
    }
}
