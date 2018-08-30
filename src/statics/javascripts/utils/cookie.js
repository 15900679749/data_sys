/*
 * @description  操作浏览器cookie
 */

export default {
	/**
	 * @desc  获取浏览器cookie
	 * @param {string} name - a cookie name
	 * */
	getCookie(name) {
		let strCookie = document.cookie;
		let arrCookie = strCookie.split(";");
		for(var i = 0; i < arrCookie.length; i++) {
			var arr = arrCookie[i].split("=");
			if(arr[0] == name) {
				return arr[1];
			}
		}
		return "";
	},
	getAllCookie() {
		let strCookie = document.cookie;
		let arrCookie = strCookie.split(";");
		if(arrCookie.length > 0) {
			return arrCookie;
		} else {
			return [];
		}
	},
	/**
	 * @desc 设置浏览器cookie
	 * @param {string} name - a cookie name
	 * @param {string} value  - a cookie value
	 * @param {object} [options] - an optional the cookie option
	 * */
	setCookie(name, value, day = 7) {
		var date = new Date();
		date.setTime(date.getTime() + day * 24 * 3600 * 1000);
		document.cookie = name + "=" + value + ";expires=" + date.toGMTString() + ";path=/";
		return document.cookie;
	},
	/**
	 * @desc 移除浏览器cookie
	 * @desc {string} [name] - 移除的cookie的key,如果没有传,则清空所有
	 * */
	delCookie(name) {
		var date = new Date();
		date.setTime(date.getTime() - 10000);
		document.cookie = name + "=0; expires=" + date.toGMTString() + ";path=/";
	}
}