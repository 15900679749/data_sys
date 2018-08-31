/*
 * @desc 初始化本地localStorage,如果被阻止,使用cookie存储
 */
import cookie from './cookie';
let
	localStorage = {
		isSet: function() {
			let b = true;
			try {
				window.localStorage.setItem("testKey", 1);
				window.localStorage.removeItem("testKey");
			} catch(err) {
				b = false;
			}
			return b;
		},
		set: function(key, value, day = 7) {
			if(this.isSet()) {
				window.localStorage.setItem(key, value);
			} else {
				cookie.setCookie(key, value, day);
			}
		},
		remove: function(key) {
			window.localStorage.removeItem(key);
		},
		clear: function() {
			window.localStorage.clear();
		},
		get(key) {
			if(this.isSet()) {
				return window.localStorage.getItem(key);
			} else {
				return cookie.getCookie(key);
			}
		},
		getObject(key) {
			if(this.isSet()) {
				return JSON.parse(window.localStorage.getItem(key));
			} else {
				return cookie.getCookie(key);
			}
		}
	};

export default localStorage;