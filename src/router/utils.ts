/** 判断是否是有效的 URL */
const isUrl = (url) => {
	try {
		new URL(url);
		return true;
	} catch (error) {
		return false;
	}
};

/** 打开超链接 */
const openLink = (link: string) => {
	window.open(link, "_blank");
};

/** 静态路由按照 meta.rank 排序 */
const ascending = (arr: any[]) => {
	return arr.sort((a, b) => a.meta.rank - b.meta.rank);
};

/** 计算两个数组之间的交集 */
const intersection = (a: Array<string>, b: Array<string>): Array<string> => {
	return a.filter((value) => b.includes(value));
};

/** 判断两个数组彼此是否存在相同值 */
const isOneOfArray = (a: Array<string>, b: Array<string>) => {
	return Array.isArray(a) && Array.isArray(b)
		? intersection(a, b).length > 0
			? true
			: false
		: true;
};

export { openLink, isUrl, ascending, isOneOfArray };
