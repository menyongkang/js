function toObj(params) {
	let newObj = params.reduce((acc, cur) => {
		var [key, value] = cur.split('=');
		acc[key] = (value - 0) || undefined;
		return acc;
	}, {})
	return newObj
};

function toStr(params) {
	var arr = [];
	for (let [key, value] of Object.entries(params)) {
		arr.push(`${key}=${value}`)
	}
	return arr.join('&');
}

/**
 * 向 url 添加 query 参数
 *
 * @param {string} targetUrl
 * @param {object} params
 */
function addQueryParam(targetUrl, params) {
	// TODO
	var a, b, c,
		toQ, newUrl;

	a = targetUrl.slice(0, targetUrl.indexOf('?') + 1);
	b = targetUrl.slice(targetUrl.indexOf('?') + 1, targetUrl.lastIndexOf('#'));
	var hash = targetUrl.slice(targetUrl.lastIndexOf('#'))

	if (targetUrl.indexOf('?') !== -1) {
		if (b) {
			c = b.split('&');
			params = Object.assign(toObj(c), params);
		}
	}
	toQ = toStr(params);

	if (a) {
		newUrl = `${a}${toQ}${hash}`
	} else {
		newUrl = `${b}?${toQ}${hash}`
	}
	return newUrl
}


addQueryParam('https://cloud.tencent.com#hash', {a: 1,b: 1,c: 1})
// 返回 https://cloud.tencent.com?a=1&b=1&c=1#hash

console.log(addQueryParam('https://cloud.tencent.com?a=1&b=1#hash', {
	b: 1
}))
// 返回 https://cloud.tencent.com?a=1&b=1#hash

console.log(addQueryParam('https://cloud.tencent.com?a=1&b=1#hash', {
	b: 2
}))
// 返回 https://cloud.tencent.com?a=1&b=2#hash