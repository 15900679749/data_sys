/*
 * @description  操作浏览器cookie
 */

import {isUndefined} from './';
export default {
    /**
     * @desc  获取浏览器cookie
     * @param {string} name - a cookie name
     * */
    get(name) {
        let
            result = _normalCookies();
        return !isUndefined(result) && !isUndefined(result[name]) ? decodeURIComponent(result[name]) : false;
    },
    /**
     * @desc 设置浏览器cookie
     * @param {string} name - a cookie name
     * @param {string} value  - a cookie value
     * @param {object} [options] - an optional the cookie option
     * */
    set(name, value, options) {
        let
            cookie = [name + '=' + encodeURIComponent(value)],
            key,
            expires;
        if ((isUndefined(name) || isUndefined(value))) {
            return false;
        }
        for (key in options) {
            if (options.hasOwnProperty(key)) {
                if (key === 'expires') {
                    expires = new Date();
                    expires.setTime(expires.getTime() + (options[key] - 0));
                    options[key] = expires.toUTCString();
                }
                if (key === 'maxAge') {
                    cookie.push('max-Age=' + options[key]);
                } else {
                    cookie.push(key + '=' + options[key]);
                }
            }
        }
        document.cookie = cookie.join(';');
        return this;
    },
    /**
     * @desc 移除浏览器cookie
     * @desc {string} [name] - 移除的cookie的key,如果没有传,则清空所有
     * */
    remove(name) {
        let
            result = _normalCookies(),
            key;
        if (name) {
            this.set(name, '', {
                expires: -1,
                path: '/'
            });
        } else {
            for (key in result) {
                if (result.hasOwnProperty(key)) {
                    this.set(key, '', {
                        expires: -1,
                        path: '/'
                    });
                }
            }
        }
        return this;
    }
}
/**
 * @desc normalize  browser cookie
 * */
function _normalCookies () {
    let
        cookies = document.cookie.split(';'),
        single,
        result = {},
        len = cookies.length;
    while (len--) {
        single = cookies[len].split('=');
        result[single[0].trim()] = single[1];
    }
    return result;
}
