import crypto from 'crypto-js';
/**
 * @desc 时间格式化，兼容移动端不支持（YYYY-MM-dd hh:mm:ss）格式的问题
 * @param {Stirng} DateStr 时间字符串
 * @return {Date}
 */
export const stringToDate = DateStr => {
	if (typeof DateStr == 'undefined') return new Date();
	if (typeof DateStr == 'date') return DateStr;
	const converted = Date.parse(DateStr);
	let myDate = new Date(converted);
	if (isNaN(myDate)) {
		DateStr = DateStr.replace(/:/g, '-');
		DateStr = DateStr.replace(' ', '-');
		DateStr = DateStr.replace('.', '-');
		const arys = DateStr.split('-');
		switch (arys.length) {
		  case 7:
			myDate = new Date(arys[0], --arys[1], arys[2], arys[3], arys[4], arys[5], arys[6]);
			break;
		  case 6:
			myDate = new Date(arys[0], --arys[1], arys[2], arys[3], arys[4], arys[5]);
			break;
		  default:
			myDate = new Date(arys[0], --arys[1], arys[2]);
			break;
		};
	};
	return myDate;
};
/**
 * @desc 日期格式转换
 * @param {Stirng} input 支持年月日时分秒
 * @return {String} eg. 3分钟前
 */
export const dateFormat = input => {
    if (input == undefined || input == '' || input == null) return;
    const t = stringToDate(input),
        e_t = new Date(t).getTime(),
        now = new Date().getTime(),
        new_year = new Date(t).getFullYear(),
        to_year = new Date().getFullYear(),
        l_t = parseInt((now - e_t) / 1000),
        day = Math.floor((l_t / 3600) / 24),
        hour = day > 0 ? parseInt(day) * 24 : Math.floor((l_t / 3600)),
        minu = hour > 0 ? parseInt(hour) * 60 : Math.floor(l_t / 60),
        sec = minu > 0 ? parseInt(minu) * 60 : l_t;
    let md = input.split(' ')[0],
        hm = input.split(' ')[1];
    md = md.slice(5, md.length);
    hm = hm.slice(0, hm.length - 3);
    if (day > 2) { // 超过两天
        if (new_year == to_year) { // 如果在今年内，就返回 mm-dd hh:mm
            return md + ' ' + hm;
        } else {
            return input.slice(0, input.length - 3); // 否则返回 yy-mm-dd hh:mm
        }
    } else if (day <= 2 && day >= 1) { // 两天内 返回天数
        return day + '天前';
    } else if (day < 1) { // 一天内 返回小时
        if (hour >= 1) {
            return hour + '小时前'
        } else if (hour < 1) { // 一小时内 返回分钟
            if (minu >= 1) {
                return minu + '分钟前'
            } else {          // 十分钟内 返回秒数
                if (sec >= 10) {
                    return sec + '秒前'
                } else {        // 否则 返回 '刚刚'
                    return '刚刚'
                }
            }
        }
    }
}
/**
 * @desc 生成随机字符串
 * @return {String}
 */
export const makeNonceStr = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

/**
 * @desc 查看附件
 * @return {String}
 */
export const jumpUrl = (url,id) => {
	console.log(url + id)
 	supeapp.goOutWeb(url + id)
};
/**
 * @desc 拼接请求所需URL
 * @param {string} url
 * @param {string} data 参数
 * @returns {string} 拼接后的URL
 */
export const mosaicUrl = (url, data) => {
	if (!data) return url;
	const queryString = [];
	Object.keys(data).forEach(key => {
		let value = data[key];
		if (value !== undefined && value !== null) {
			queryString.push(`${key}=${value}`);
		}
	});
	const qStr = queryString.join('&');
	if (url.indexOf('?') < 0) {
		url += `?${qStr}`;
	} else if (url.endsWith('&')) {
		url += qStr;
	} else if (url.endsWith('?')) {
		url += qStr;
	} else {
		url += `&${qStr}`;
	}
	return url;
}
/**
 * @desc 时间格式化
 * @param {string} date
 * @param {string} separator 分隔符 默认 '-'
 * @returns {string} yyyy-MM-dd HH:mm:ss
 * yearOmit 年份简写保留后两位数字
 */
export const transferDate = (date, separator = '-', containHour = false , yearOmit,separatorCH) => {
	try {
		const year = date.slice(0, 4);
		const month = date.slice(4,6);
		const day = date.slice(6,8);
		const hour = date.slice(8, 10);
		const minute = date.slice(10, 12);
		let tStr
		if(separator === 'CH'){
			tStr = `${year}年${month}月${day}日 ${hour}时${minute}分`;
		}else{
			tStr = `${year}${separator}${month}${separator}${day} ${hour}:${minute}`;
		}
		
		if(!containHour && yearOmit == 'on'){
			return tStr.slice(2).split(' ')[0];
		}else if(containHour && yearOmit == 'on'){
			return tStr.slice(0)
		}else{
			return tStr.split(' ')[0];
		}
		
		return tStr;
	} catch (err) {
		return !!date ? date : '--'
	}
}
/**
 * @desc 日期格式化 年-月-日
 */
export const formatDate = (date) =>{
	  try{
		  if (date === null || date === "" || date === undefined) {
			return ""
		  }
		  var pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/
		  var formatedDate = date.replace(pattern, "$1-$2-$3 $4:$5:$6")
		 console.log(formatedDate,pattern)
		  return formatedDate
	  }catch (err) {
		return !!date ? date : '--'
		}
	}
	
/**
 * @desc 日期格式化 年-月-日-时-分-秒
 */
export const formatDate2 = (date) =>{
	  try{
		  if (date === null || date === "" || date === undefined) {
			return ""
		  }
		  var pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/
		  var formatedDate = date.replace(pattern, "$1-$2-$3 $4:$5:$6")
		  return formatedDate
	  }catch (err) {
		return !!date ? date : '--'
		}
	}
/**
 * @desc 时间戳转化为时间格式 年-月-日-时-分-秒
 */
export const formatDate3 = (now) =>{
	var time = new Date(now);

	var dateMonth = parseInt(time.getMonth()) + 1;
	if(dateMonth < 10) {
		dateMonth = "0" + dateMonth;
	}
	var dayStr = time.getDate();
	if(dayStr < 10) {
		dayStr = "0" + dayStr;
	}
	var _nowDate = time.getFullYear() + "-" + dateMonth + "-" + dayStr + " " + time.getHours() + ":" + time.getMinutes();
	return _nowDate;
}
	
/**
 * @desc 两个日期相差天数
 */
export const transferDatePlus = (dateString1,dateString2)=> {
   const  startDate = Date.parse(dateString1);
   const  endDate = Date.parse(dateString2);
   const days=(endDate - startDate)/(1*24*60*60*1000);
   return  parseInt(days);
}

	
/**
 * 计算项目开始日期
 */
export const countTodayTime = (date) => {
	try {
		const year = date.slice(0, 4);
		const month = date.slice(4, 6);
		const day = date.slice(6, 8);
		const hour = date.slice(8, 10);
		const minute = date.slice(10, 12);
		let tStr = `${year}/${month}/${day} ${hour}:${minute}`;
		// 取时间戳
		let dateTimestamp = new Date(tStr).getTime();
		if (Number.isNaN(dateTimestamp)) return 0
		let timestamp = new Date().getTime() - dateTimestamp
		// 取绝对值
		timestamp = Math.abs(timestamp)
		timestamp = timestamp / (24 * 3600 * 1000);
		// 取整
		timestamp = Math.floor(timestamp);
		// tStr,dateTimestamp,timestamp
		// console.log('计算时间', dateTimestamp, timestamp)
		return timestamp;
	} catch (err) {
		return !!date ? date : '--'
	}
}
/**
 * @desc 敏感信息加密
 * @param {string} str
 * @return {string}
 */
export const aesEncryto = (str, keys) => {
	const key = crypto.enc.Utf8.parse(keys);
	const cipher = crypto.AES.encrypt(str, key, {
		mode: crypto.mode.ECB,
		padding: crypto.pad.Pkcs7
	});
	return cipher.ciphertext.toString(crypto.enc.Base64);
}
/**
 * @desc 深拷贝
 * @param {object} obj
 * @return {object}
 */
export const deepClone = (obj) => {
	if (!obj || typeof obj !== 'object') return obj;
	let newObj = Array.isArray(obj) ? [] : {};
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			newObj[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]
		}
	}
	return newObj;
}