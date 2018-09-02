import axios from "axios";
axios.defaults.timeout = 5000;
axios.defaults.headers.common['Authorization'] = "222AUTH_TOKEN1111111333";
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//axios.interceptors.request.use(
//	config => {
//		config.data = config.data;
//		config.headers["Authorization"]="3333";
//		config.headers = {
//			'Authorization':"12345",
//			'Content-Type': 'application/x-www-form-urlencoded'
//		}
//		return config;
//	},
//	err => {
//		return Promise.reject(err);
//	}
//)

axios.defaults.transformRequest = [function(data) {
	let res = '';
	for(let it in data) {
		res += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
	}
	res = res.substring(0, res.length - 1);
	return res;
}];

export function get(url, params = {}) {
	return new Promise((resolve, reject) => {
		axios.get(url, {
				params: params
			})
			.then(response => {
				resolve(response.data);
			})
			.catch(err => {
				reject(err)
			})
	})
}

export function post(url, data = {}) {
	return new Promise((resolve, reject) => {
		axios.post(url, data)
			.then(response => {
				resolve(response.data);
			})
			.catch(err => {
				reject(err)
			})
	})
}