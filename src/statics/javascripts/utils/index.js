import cookie from "./cookie"
import storage from "./storage"
const toString = Object.prototype.toString;
/**
 * @desc  格式化时间
 * @param {String} t  - A date time string
 *  y:年
 *  M:月,
 *  d:日,
 *  h:时,
 *  m:分钟,
 *  s:秒,
 *  q:季度,
 *  S:毫秒
 * @param {String} f  - A format string
 * */
export function toTimeFormat(t, f) {
	if(isNull(f) || isEmpty(f) || isUndefined(f)) {
		f = 'yyyy-MM-dd';
	}
	let
		newDate = new Date(t),
		date = {
			"M+": newDate.getMonth() + 1,
			"d+": newDate.getDate(),
			"h+": newDate.getHours(),
			"m+": newDate.getMinutes(),
			"s+": newDate.getSeconds(),
			"q+": Math.floor((newDate.getMonth() + 3) / 3),
			"S+": newDate.getMilliseconds()
		};
	if(/(y+)/i.test(f)) {
		f = f.replace(RegExp.$1, (newDate.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	for(let k in date) {
		if(new RegExp("(" + k + ")").test(f)) {
			f = f.replace(RegExp.$1, RegExp.$1.length === 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
		}
	}
	return f;
}

export function isType(o, type) {
	return toString.call(o).toLowerCase() === `[object ${type}]`;
}

export function isPlainObject(o) {
	return isType(o, 'object');
}
export function isString(str) {
	return isType(str, 'string');
}
export function isFunction(fun) {
	return isType(fun, 'function');
}
export function isReg(reg) {
	return isType(reg, 'regexp');
}
export function isNumber(num) {
	return isType(num, 'number') && Number.isFinite(num);
}
export function isUndefined(value) {
	return isType(value, 'undefined');
}
export function isNull(value) {
	return isType(value, 'null');
}
/**
 * @desc 是否是空字符串,如果字符串都是空格,也会返回true
 * */
export function isEmpty(value) {
	return isString(value) && value.trim().length === 0;
}

/**
 * @desc 字符串掩码
 * @param {string} str - 原始字符串
 * @param {string} [mask] - 掩码
 * @param {Number}  [start] - 开始位置
 * @param {Number}  [end]   - 结束位置
 * */
export function stringMask(str, mask = '*', start = 0, end = str.length) {
	if(!isString(str) || isEmpty(str)) {
		return str;
	}
	if(isNumber(mask)) {
		end = start || str.length;
		start = mask;
		mask = '*';
	}
	return str.substr(0, start) + mask.repeat(end - start) + str.substr(end);
}

export function os() {
	return(function() {
		let
			u = navigator.userAgent;
		return {
			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
			iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
			windowPhone: u.indexOf("Windows Phone") >= 0,
			iPad: u.indexOf('iPad') > -1, //是否iPad
			iPod: u.indexOf('iPod') > -1, //是否iPod
			weChat: u.match(/MicroMessenger/i) !== null, //是否为微信
			bbLinkAPP: u.match(/BBLINKAPP/i) !== null ///是否为微笑妈咪APP
		};
	})();
}
/**
 * @desc 获取iphone版本, 返回 x.x.x 版本或者null
 * @return null/string
 * */
export function getIphoneVersion() {
	let userAgent = navigator.userAgent.toLowerCase()
	let ver = userAgent.match(/cpu iphone os (.*?) like mac os/)
	if(!ver) {
		return null
	}
	return ver[1].replace(/_/g, '.')
}

export function getUrlParamsObj(furl) {
	let geturl = furl || window.location.href;
	if(geturl.indexOf('?') === -1) return {}
	let urlParams = geturl.split('?')[1]
	let paramsArr = urlParams.split('&')
	let keyv = paramsArr.map(v => v.split('='))
	let p = {}
	keyv.map(v => {
		p[v[0]] = v[1]
	})
	return p
}

export function jsNumDX(Num) {
	var tmpnewchar = "";
	var perchar="";
	for(var i = Num.length - 1; i >= 0; i--) {
		Num = Num.replace(",", "") //替换Num中的“,”
		Num = Num.replace(" ", "") //替换Num中的空格
	}
	if(isNaN(Num)) { //验证输入的字符是否为数字
		//alert("请检查小写金额是否正确");
		return;
	}
	//字符处理完毕后开始转换，采用前后两部分分别转换Num
	var part = String(Num).split(".");
	var newchar = "";
	//小数点前进行转化
	for(i = part[0].length - 1; i >= 0; i--) {
		if(part[0].length > 10) {
			//alert("位数过大，无法计算");
			return "";
		} //若数量超过拾亿单位，提示
		tmpnewchar = ""
		perchar = part[0].charAt(i);
		switch(perchar) {
			case "0":
				tmpnewchar = "零" + tmpnewchar;
				break;
			case "1":
				tmpnewchar = "一" + tmpnewchar;
				break;
			case "2":
				tmpnewchar = "二" + tmpnewchar;
				break;
			case "3":
				tmpnewchar = "三" + tmpnewchar;
				break;
			case "4":
				tmpnewchar = "四" + tmpnewchar;
				break;
			case "5":
				tmpnewchar = "五" + tmpnewchar;
				break;
			case "6":
				tmpnewchar = "六" + tmpnewchar;
				break;
			case "7":
				tmpnewchar = "七" + tmpnewchar;
				break;
			case "8":
				tmpnewchar = "八" + tmpnewchar;
				break;
			case "9":
				tmpnewchar = "九" + tmpnewchar;
				break;
		}
		switch(part[0].length - i - 1) {
			case 0:
				tmpnewchar = tmpnewchar;
				break;
			case 1:
				if(perchar != 0) tmpnewchar = tmpnewchar + "十";
				break;
			case 2:
				if(perchar != 0) tmpnewchar = tmpnewchar + "百";
				break;
			case 3:
				if(perchar != 0) tmpnewchar = tmpnewchar + "千";
				break;
			case 4:
				tmpnewchar = tmpnewchar + "万";
				break;
			case 5:
				if(perchar != 0) tmpnewchar = tmpnewchar + "十";
				break;
			case 6:
				if(perchar != 0) tmpnewchar = tmpnewchar + "百";
				break;
			case 7:
				if(perchar != 0) tmpnewchar = tmpnewchar + "千";
				break;
			case 8:
				tmpnewchar = tmpnewchar + "亿";
				break;
			case 9:
				tmpnewchar = tmpnewchar + "十";
				break;
		}
		newchar = tmpnewchar + newchar;
	}
	//替换所有无用汉字，直到没有此类无用的数字为止
	while(newchar.search("零零") != -1 || newchar.search("零亿") != -1 || newchar.search("亿万") != -1 || newchar.search("零万") != -1) {
		newchar = newchar.replace("零亿", "亿");
		newchar = newchar.replace("亿万", "亿");
		newchar = newchar.replace("零万", "万");
		newchar = newchar.replace("零零", "零");
	}
	//替换以“一十”开头的，为“十”
	if(newchar.indexOf("一十") == 0) {
		newchar = newchar.substr(1);
	}
	//替换以“零”结尾的，为“”
	if(newchar.lastIndexOf("零") == newchar.length - 1) {
		newchar = newchar.substr(0, newchar.length - 1);
	}
	return newchar;
}

export {
	cookie,
	storage,

};

const
	Utils = {
		toTimeFormat,
		os,
		cookie,
		storage,
		isPlainObject,
		isString,
		isFunction,
		isReg,
		isNumber,
		isUndefined,
		isNull,
		isEmpty,
		isType,
		stringMask,
		getUrlParamsObj,
	};

Array.prototype.deleteIndex = function(delIndex) {
	var temArray = [];
	for(var i = 0; i < this.length; i++) {
		if(i != delIndex) {
			temArray.push(this[i]);
		}
	}
	return temArray;
}

export default Utils;