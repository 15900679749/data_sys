import axios from "axios";
import { Message } from "element-ui";

let
	config = {
		"timeout": 5000,
		"root": process.env.http.root,
		"Content_Type": "application/json"
	};

axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/json';

//请求拦截 统一处理 
axios.interceptors.request.use(config => {
		config.headers = {
			'Content-Type': config.Content_Type
		};
		return config;
	},
	error => {
		return Promise.reject(error);
	});

//相应拦截
axios.interceptors.response.use(response => {
		return response;
	},
	error => {
		return Promise.reject(error);
	});

export function post(url, data = {}) {
	return new Promise((resolve, reject) => {
		axios.post(url, data)
			.then(response => {
				resolve(response.data);
			}, err => {
				reject(err)
			});
	});
}

export function get(url, data = {}) {
	return new Promise((resolve, reject) => {
		axios.get(url, {
				params: data
			})
			.then(response => {
				resolve(response.data);
			}, err => {
				reject(err)
			});
	});
}