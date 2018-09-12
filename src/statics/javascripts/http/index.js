import axios from "axios";
import { Message, Loading } from "element-ui";
import storage from 'javascripts/utils/storage';

let
	cfig = {
		"timeout": 4000,
		"root": process.env.http.root,
		"ContentType": "application/x-www-form-urlencoded;charset=UTF-8"
	};

let loading = null;

let loption = {
	lock: true,
	text: '数据加载中',
	spinner: 'el-icon-loading',
	background: 'rgba(0, 0, 0, 0.7)'
};

axios.defaults.timeout = cfig.timeout;
//axios.defaults.headers.post['Content-Type'] = cfig.ContentType;
//请求拦截 统一处理 
axios.interceptors.request.use(config => {
		loading = Loading.service(loption);
		//config.headers["token"] = storage.get("token") || "";
		if(!config.data.hasOwnProperty("token") && !config.url.endsWith("Home/Login/login")) {
			config.data = {
				token: storage.get("token") || "",
				...config.data
			}
		}
		if(config.method == "get") {
			config.data = {
				_t: Date.parse(new Date()) / 1000,
				...config.data
			};
		}
		return config;
	},
	error => {
		loading && loading.close();
		return Promise.reject(error);
	});

//相应拦截
axios.interceptors.response.use(response => {
		loading && loading.close();
		let data = response.data;
		Message.closeAll();
		if(data.code != "200") {
			if(data.code == "500") {
				return location.href = location.protocol + "//" + location.host + location.pathname + "#/login";
			} else {
				return Message({
					showClose: true,
					message: data.msg,
					type: 'warning',
					duration: 3000
				});
			}
		}
		return response;
	},
	error => {
		loading && loading.close();
		if(error.code == "ECONNABORTED") {
			Message({
				showClose: true,
				message: "网络异常,请求接口错误!",
				type: 'warning',
				duration: 3000
			});
		}
		return Promise.reject(error);
	});

// 请求方式 Formdata
axios.defaults.transformRequest = [function(data) {
	let res = '';
	for(let it in data) {
		res += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
	}
	return res.substring(0, res.length - 1);
}];

export function post(url, data = {}) {
	return new Promise((resolve, reject) => {
		axios.post(cfig.root + url, data)
			.then(response => {
				if(response.data) {
					resolve(response.data.data);
				}
			}, err => {
				reject(err);
			});
	});
}

export function get(url, data = {}) {
	return new Promise((resolve, reject) => {
		axios.get(cfig.root + url, {
				params: data
			})
			.then(response => {
				if(response.data) {
					resolve(response.data.data);
				}
			}, err => {
				reject(err)
			});
	});
}