import axios from 'axios';
import Store from '@/utils/store.js';
import { makeNonceStr, mosaicUrl } from '@/utils/common.js';
import conf from '@/utils/config.js';
export class HttpRequest {
  constructor() {}
  async request(options, mock = false) {
    const instance = axios.create({
		baseURL: (mock ? conf.mockServer : conf.server),
		adapter: config => {
			return new Promise((resolve, reject) => {
				var settle = require('axios/lib/core/settle');
				var buildURL = require('axios/lib/helpers/buildURL');
				uni.request({
					method: config.method.toUpperCase(),
					url: (mock ? conf.mockServer : conf.server) + buildURL(config.url, config.params, config.paramsSerializer),
					header: config.headers,
					data: config.data,
					dataType: config.dataType,
					responseType: config.responseType,
					sslVerify: config.sslVerify,
					complete: function complete(response) {
						response = {
							data: response.data,
							status: response.statusCode,
							errMsg: response.errMsg,
							header: response.header,
							config: config
						};
						settle(resolve, reject, response);
					}
				})
			})
		},
		timeout: 10000,
		headers: {
			post: {
			  'Content-Type': 'application/json'
			},
			common: {
			  apiVersion: conf.apiVersion,
			  appVersion: conf.appVersion,
			  appSource: conf.appSource,
			  sources_type: "H5", 
			  version: ""
			}
		}
    });
    await this.interceptors(instance, options.url);
    return instance(options);
  }
  interceptors(instance, {url}) {
    // 请求拦截
	const {getters: {getUser}} = Store;
	const {getters: {getToken}} = Store;
    instance.interceptors.request.use((config) => {
		//登录接口及密钥接口不传token
		if(getToken && !config.url.includes('loginForApp') && !config.url.includes('/config/list')){
		  config.headers.common['Authorization'] = getToken;
		}
	  config.headers.common['nonceStr'] = makeNonceStr();
	  config.headers.common['timeStamp'] = (new Date().getTime() / 1000);
	  config.headers.common['apiSign'] = '';
	  // 这里处理URL参数
	  if (config.data && config.data.hasOwnProperty('mosaic') && config.data.mosaic) {
		delete config.data.mosaic;
		config.url = mosaicUrl(config.url, config.data);
		config.data = null;
	  }
	  // formdata 提交
	  if (config.data && config.data.hasOwnProperty('formdata') && config.data.formdata) {
		delete config.data.formdata;
		config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
		config.data = mosaicUrl('', config.data).replace(/\?/g, '');
	  }
	  if (config.data && config.data.hasOwnProperty('multipart') && config.data.multipart) {
		delete config.data;
		config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
		// config.headers['Content-Type'] = 'multipart/form-data; boundary=----WebKitFormBoundaryLZnkV5W2bVlQccsb';
		// config.data = mosaicUrl('', config.data).replace(/\?/g, '');
	  }
      return config;
    }, error => {
  //     uni.showToast({
		// title: '系统繁忙，请重新登录！',
		// icon:'none'
	 //  });
    });
    // 响应拦截
    instance.interceptors.response.use((res) => {
      const { data, status } = res;
	  //H5token失效 跳转登录页
	  if(data.code == -2000 || data.code == 2002){
		  console.log('-2000')
			uni.reLaunch({
				url: '/pages/setting/login'
			})
	  }
      if (status === 200 && data) { return data; } // 请求成功
      return requestFail(res); // 失败回调
    }, error => {
      try {
        console.log(`错误码：${error.response.status}`);
      } catch(e) {}
      // uni.showToast({
      // 		title: '系统繁忙，请重新登录！',
      // 		icon:'none'
      // });
    });
  }
}

// 请求失败
const requestFail = (res) => {
	// console.log(res)
  uni.showToast({
  		title: '系统繁忙，请重新登录！',//系统繁忙，请稍后再试！
  		icon:'none'
  });
  const errStr = '网络繁忙,请求失败,请稍后再试！';
  return {
    err: console.error({
      code: res.data.errcode || res.data.code,
      msg: res.data.errmsg || errStr,
    }),
  };
};