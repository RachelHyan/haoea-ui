import { getLogin, refreshTokenApi } from "@/api/user";
import pinia from "@/store";
import { defineStore } from "pinia";
import { UserState } from "../types";
import { UserResult, RefreshTokenResult } from "@/api/user";
import { setToken } from "@/utils/auth";

export const useUserStore = defineStore(
	// 唯一ID
	"user",
	{
		state: (): UserState => ({
			username: "admin",
			roles: [],
			// 前端生成的验证码（按实际需求替换）
			verifyCode: "",
			// 判断登录页面显示哪个组件（0：登录（默认）、1：手机登录、2：二维码登录、3：注册、4：忘记密码）
			currentPage: 0,
		}),
		getters: {
			// 保存需要二次处理的数据
		},
		actions: {
			/** 存储用户名 */
			SET_USERNAME(username: string) {
				this.username = username;
			},
			/** 存储角色 */
			SET_ROLES(roles: Array<string>) {
				this.roles = roles;
			},
			/** 存储前端生成的验证码 */
			SET_VERIFYCODE(verifyCode: string) {
				this.verifyCode = verifyCode;
			},
			/** 存储登录页面显示哪个组件 */
			SET_CURRENTPAGE(value: number) {
				this.currentPage = value;
			},
			// 封装方法，和更新 state 数据
			/** 登录 */
			async loginByUsername(data) {
				return new Promise<UserResult>((resolve, reject) => {
					getLogin(data)
						.then((data) => {
							if (data) {
								setToken(data.data);
								resolve(data);
							}
						})
						.catch((error) => {
							reject(error);
						});
				});
			},
			/** 刷新`token` */
			async handRefreshToken(data) {
				return new Promise<RefreshTokenResult>((resolve, reject) => {
					refreshTokenApi(data)
						.then((data) => {
							if (data) {
								setToken(data.data);
								resolve(data);
							}
						})
						.catch((error) => {
							reject(error);
						});
				});
			},
		},
		persist: {
			// 持久化
			key: "userInfo",
			storage: sessionStorage, // 指定存储方式
			paths: ["username"], // 指定 state 里要进行持久化的属性路径列表
		},
	},
);

export function useUserStoreHook() {
	return useUserStore(pinia);
}
