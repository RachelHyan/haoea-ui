import { useUserStoreHook } from "@/store/modules/user";
import Cookies from "js-cookie";

export interface DataInfo<T> {
	/** token */
	accessToken: string;
	/** `accessToken`的过期时间（时间戳） */
	expires: T;
	/** 用于调用刷新accessToken的接口时所需的token */
	refreshToken: string;
	/** 用户名 */
	username?: string;
	/** 当前登陆用户的角色 */
	roles?: Array<string>;
}

export const sessionKey = "user-info";
export const TokenKey = "authorized-token";

/** 获取 Token */
export const getToken = (): DataInfo<number> => {
	return Cookies.get(TokenKey)
		? JSON.parse(Cookies.get(TokenKey) as string) // 解析令牌信息
		: sessionStorage.getItem(sessionKey); // 返回令牌信息
};

/**
 * @description 设置`token`以及一些必要信息并采用无感刷新`token`方案
 * 无感刷新：后端返回`accessToken`（访问接口使用的`token`）、`refreshToken`（用于调用刷新`accessToken`的接口时所需的`token`，`refreshToken`的过期时间（比如30天）应大于`accessToken`的过期时间（比如2小时））、`expires`（`accessToken`的过期时间）
 * 将`accessToken`、`expires`这两条信息放在key值为authorized-token的cookie里（过期自动销毁）
 * 将`username`、`roles`、`refreshToken`、`expires`这四条信息放在key值为`user-info`的sessionStorage里（浏览器关闭自动销毁）
 */
export const setToken = (data: DataInfo<Date>) => {
	let expires = 0;
	const { accessToken, refreshToken } = data;
	expires = new Date(data.expires).getTime(); // 如果后端直接设置时间戳，将此处代码改为expires = data.expires，然后把上面的DataInfo<Date>改成DataInfo<number>即可
	const cookieString = JSON.stringify({ accessToken, expires });

	expires > 0
		? Cookies.set(TokenKey, cookieString, {
				expires: (expires - Date.now()) / 86400000,
		  })
		: Cookies.set(TokenKey, cookieString);

	const setSessionKey = (username: string, roles: Array<string>) => {
		useUserStoreHook().SET_USERNAME(username);
		useUserStoreHook().SET_ROLES(roles);

		const sessionData = {
			refreshToken,
			expires,
			username,
			roles,
		};

		sessionStorage.setItem(sessionKey, JSON.stringify(sessionData));
	};

	if (data.username && data.roles) {
		const { username, roles } = data;
		setSessionKey(username, roles);
	} else {
		const sessionDataString = sessionStorage.getItem(sessionKey);
		const sessionData = sessionDataString
			? JSON.parse(sessionDataString)
			: null;
		const { username = "", roles = [] } = sessionData ?? {};
		setSessionKey(username, roles);
	}
};

/** 删除`token`以及key值为`user-info`的session信息 */
export const removeToken = () => {
	Cookies.remove(TokenKey);
	sessionStorage.clear();
};

/** 格式化token（jwt格式） */
export const formatToken = (token: string): string => {
	return "Bearer " + token;
};
