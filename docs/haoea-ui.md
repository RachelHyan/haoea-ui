# 目录结构

```bash
|- .vscode/	# 该项目在 vscode 的配置
		|- settings.json	# vscode 设置文件
|- locales/
		|- zh-CN.yaml	# 中文包
		|- en.yaml		# 英文包
|- mock/	# 模拟数据管理
|- public/	# 不经过打包的静态资源
|- src/			# 项目资源
		|- api/	# 服务层代码，后端接口
		|- assets/		# 经过打包的静态资源
		|- base-ui		# 基础 UI 组件，如按钮、输入框、表格等
		|- components/	# 通用组件
		|- directives/	# 指令
		|- layout/		# 整体布局
				|- hook/	# 全局 hook
						|- useDataThemeChange.ts	# 主题
		|- plugins/		# 插件扩展
		|- router/		# 路由配置
				|- modules/		# 页面路由集合
						|- error.ts		# 错误页面的路由
						|- ...
						|- remaining.ts	# 不参与菜单的路由
				|- index.ts
		|- store/		# 状态管理
				|- modules/	# 状态集合
				|- types/	# 类型管理
						|- index.ts	# 类型
				|- index.ts
		|- style/		# 项目通用样式
				|- index.sass		# 整体入口
				|- reset.sass		# 对基础html默认样式的重置
		|- types/		# 类型管理
				|- env.d.ts	# 环境变量类型
				|- router.d.ts	# 路由类型
		|- utils/		# 工具函数
				|- http		# axios封装
						|- index.ts
						|- types.d.ts
				|- progress		# 进度加载条配置
						|- index.ts
		|- views/		# 页面组件
		|- App.vue	# 项目的根组件 - 定义全局路由导航、全局样式等
		|- main.ts	# 入口ts文件 - 创建实例、配置全局插件、路由器、状态管理等，还可以挂载根组件到 DOM 上
|- index.html		# 入口的html文件
|- .env	# 全局环境变量配置
|- .env.development	# 开发环境配置
|- .env.production	# 生产环境配置
|- vite.config.ts	# vite 配置文件
|- tsconfig.json	# ts 配置文件
|- .eslintrc.js		# eslint 配置文件
|- .eslintignore	# eslint 忽略文件
```

# 暗黑模式

## 安装依赖

```js
pnpm install @vueuse/core
```

## 定义 css

```scss
- /src/style/dark.scss
@use "element-plus/theme-chalk/dark/css-vars.css";

/* 暗黑模式适配 */
html.dark {
	/* 自定义深色背景颜色 */
	--el-bg-color: #626aef;
}


- /src/style/index.scss
@import "./dark.scss";


- /src/layout/hooks/useDataThemeChange.ts
/** 主题 */
import { useDark, useToggle } from "@vueuse/core";

export function useDataThemeChange() {
	/** 日、夜切换 */
	const isDark = useDark();
	const toggleDark = useToggle(isDark);
	const darkThemeToggle = () => toggleDark;

	return {
		isDark,
		darkThemeToggle,
	};
}



- 使用
<template>
	<div>
		<el-switch v-model="isDark" @change="darkThemeToggle()" />
	</div>
</template>

<script lang="ts">
import { useDataThemeChange } from "@/layout/hooks/useDataThemeChange";
import { defineComponent } from "vue";

export default defineComponent({
	name: "Login",
	setup() {
		const { isDark, darkThemeToggle } = useDataThemeChange();

		return {
			isDark,
			darkThemeToggle,
		};
	},
});
</script>

```

# 国际化

## 安装依赖

```ts
pnpm install vue-i18n
pnpm install -D @iconify/vue
```

## 定义语音包

```ts
- src/locales/zh-CN.js
export default {
	登录: "登录",
	账号: "账号",
};


- src/locale/en.js
export default {
	登录: "Login",
	账号: "Username",
};
```

## 创建实例

```ts
- src/plugins/i18n.ts
// element-plus国际化
import { createI18n, type I18n } from "vue-i18n";
import en from "../../locales/en.js";
import zh from "../../locales/zh-CN.js";

const messages = {
	zh,
	en,
};

const i18n: I18n = createI18n({
	legacy: false,	// 使用 Composition API 模式，则要设为 false
	globalInjection: true, // 全局生效$t
	locale: sessionStorage.getItem("locale") ?? "zh",
	messages,
});

/** 翻译 */
export const t = (message) => {
	if (!message) return;
	// @ts-ignore
	return i18n.global.t(message);
};

export default i18n;

```

## 注册

```ts
- main.ts
import i18n from "@/plugins/i18n";

app.use(i18n);
```

## 使用

```ts
- 页面切换
<template>
	<div>
		<el-button @click="translationCh">中文</el-button>
		<el-button @click="translationEn">English</el-button>
		{{ $t("登录") }}
	</div>
</template>

<script lang="ts">
import { useTranslationLang } from "@/layout/hooks/useTranslationLang";
import { defineComponent } from "vue";

export default defineComponent({
	name: "Login",
	setup() {
		const { translationCh, translationEn } = useTranslationLang();

		return {
			translationCh,
			translationEn,
		};
	},
});
</script>


- useTranslationLang()   src/layout/hooks/useTranslationLang.ts
import { onBeforeMount, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { useNav } from "./useNav";

/** 国际化 */
export function useTranslationLang() {
	const { changeTitle } = useNav();
	const { locale, t } = useI18n();
	const route = useRoute();

	const translationCh = () => {
		sessionStorage.setItem("locale", "zh");
		locale.value = "zh";
	};

	const translationEn = () => {
		sessionStorage.setItem("locale", "en");
		locale.value = "en";
	};

    /** 文档标题切换 */
	watch(
		() => locale.value,
		() => {
			changeTitle(route.meta);
		},
	);

	onBeforeMount(() => {
		locale.value = sessionStorage.getItem("locale") ?? "zh";
	});

	return {
		t,
		route,
		locale,
		translationCh,
		translationEn,
	};
}


- changeTitle()		src/layout/hooks/useNav.ts
/** 路由 菜单 */
import { t } from "@/plugins/i18n";
import { routeMetaType } from "../types";

export function useNav() {
	/** 动态 title */
	const changeTitle = (meta: routeMetaType) => {
		document.title = `${t(meta.title)} | Haoea UI`;
	};

	return {
		changeTitle,
	};
}

```

### 模板

```vue
{{ $t("登录") }}
```

### JS

```js
import { getCurrentInstance } from "vue"
const { proxy } = getCurrentInstance()
procy.$t('hello')


import i18n from '@plugins/i18n'
i18n.global.t('hello')


import { useI18n } from "vue-i18n";
const { t } = useI18n();
t('hello')
```

# 工具库
## svg 组件化使用 - vite-svg-loader
### 安装依赖
```js
pnpm install vite-svg-loader -D
```
### 配置
```js
- vite.config.ts
import svgLoader from "vite-svg-loader";
plugins: [
	// svg 组件化支持
	svgLoader(),
]


- tsconfig.json
"compilerOptions": {
	"types": ["vite-svg-loader"],
}
```
### 使用
```ts
- 在路径后添加 ?component
import dayIcon from "@/assets/svg/day.svg?component";


- 可直接加样式进行修改
<dayIcon class='x'>
```
## 动画库 - @vueuse/motion

### 安装依赖

```js
pnpm install @vueuse/motion
```

### 注册

```js
- main.ts
import { MotionPlugin } from "@vueuse/motion";
app.use(MotionPlugin);
```

### 封装

```ts
import { h, defineComponent, withDirectives, resolveDirective } from "vue";

/** 封装@vueuse/motion动画库中的自定义指令v-motion */
export default defineComponent({
	name: "Motion", // 定义名为 Motion 的组件
	props: {
		delay: {
			type: Number,
			default: 50,
		},
	},
	render() {
		const { delay } = this;
		// resolveDirective - 解析指令
		const motion = resolveDirective("motion");
		return withDirectives(
			h(
				"div",
				{},
				{
					default: () => [this.$slots.default()],
				},
			),
			[
				[
					motion,
					{
						// 初始状态
						initial: { opacity: 0, y: 100 },
						// 进入状态
						enter: {
							opacity: 1,
							y: 0,
							transition: {
								delay,
							},
						},
					},
				],
			],
		);
	},
});
```
### 使用
```vue
import Motion from "./utils/motion";

components: {
	Motion
}

<Motion :delay='50'>
	<div></div>
</Motion>
```
## 图标库 - @iconify/vue
https://iconify.design/
### 安装依赖
```js
pnpm install @iconify/vue -D
```
### 使用
```js
import { Icon } from "@iconify/vue";

components: {
	Icon
}

<Icon	icon="xxx"/>

```
## 打字机效果 - typeit
### 安装依赖
```js
pnpm install typeit
```
### 封装
```ts
import { h, defineComponent } from "vue";
import TypeIt from "typeit";

// 打字机效果组件（只是简单的封装下，更多配置项参考 https://www.typeitjs.com/docs/vanilla/usage#options）
export default defineComponent({
	name: "TypeIt",
	props: {
		/** 打字速度，以每一步之间的毫秒数为单位，默认`200` */
		speed: {
			type: Number,
			default: 200,
		},
		values: {
			type: String,
			defalut: '',
		},
		className: {
			type: String,
			default: "type-it",
		},
		cursor: {
			type: Boolean,
			default: true,
		},
	},
	render() {
		return h(
			"span",
			{
				class: this.className,
			},
			{
				default: () => [],
			},
		);
	},
	mounted() {
		new TypeIt(`.${this.className}`, {
			strings: this.values,
			speed: this.speed,
			cursor: this.cursor,
		}).go();
	},
});
```
### 使用
```vue
import TypeIt from "@/components/print/print";

components: {
	TypeIt,
}

<TypeIt values="HAOEAUI" :cursor="false" :speed="150" />
```

## 数字验证码

```ts
src/components/ImageVerify/hooks.ts
import { ref, onMounted } from "vue";

/**
 * 绘制图形验证码
 * @param width - 图形宽度
 * @param height - 图形高度
 */
export const useImageVerify = (width = 120, height = 40) => {
	const domRef = ref<HTMLCanvasElement>();
	const imgCode = ref("");

	function setImgCode(code: string) {
		imgCode.value = code;
	}

	function getImgCode() {
		if (!domRef.value) return;
		imgCode.value = draw(domRef.value, width, height);
	}

	onMounted(() => {
		getImgCode();
	});

	return {
		domRef,
		imgCode,
		setImgCode,
		getImgCode,
	};
};

function randomNum(min: number, max: number) {
	const num = Math.floor(Math.random() * (max - min) + min);
	return num;
}

function randomColor(min: number, max: number) {
	const r = randomNum(min, max);
	const g = randomNum(min, max);
	const b = randomNum(min, max);
	return `rgb(${r},${g},${b})`;
}

function draw(dom: HTMLCanvasElement, width: number, height: number) {
	let imgCode = "";

	const NUMBER_STRING = "0123456789";

	const ctx = dom.getContext("2d");
	if (!ctx) return imgCode;

	ctx.fillStyle = randomColor(180, 230);
	ctx.fillRect(0, 0, width, height);
	for (let i = 0; i < 4; i += 1) {
		const text = NUMBER_STRING[randomNum(0, NUMBER_STRING.length)];
		imgCode += text;
		const fontSize = randomNum(18, 41);
		const deg = randomNum(-30, 30);
		ctx.font = `${fontSize}px Simhei`;
		ctx.textBaseline = "top";
		ctx.fillStyle = randomColor(80, 150);
		ctx.save();
		ctx.translate(30 * i + 15, 15);
		ctx.rotate((deg * Math.PI) / 180);
		ctx.fillText(text, -15 + 5, -15);
		ctx.restore();
	}
	for (let i = 0; i < 5; i += 1) {
		ctx.beginPath();
		ctx.moveTo(randomNum(0, width), randomNum(0, height));
		ctx.lineTo(randomNum(0, width), randomNum(0, height));
		ctx.strokeStyle = randomColor(180, 230);
		ctx.closePath();
		ctx.stroke();
	}
	for (let i = 0; i < 41; i += 1) {
		ctx.beginPath();
		ctx.arc(randomNum(0, width), randomNum(0, height), 1, 0, 2 * Math.PI);
		ctx.closePath();
		ctx.fillStyle = randomColor(150, 200);
		ctx.fill();
	}
	return imgCode;
}

/src/components/ImageVerify/index.vue
<template>
	<canvas ref="domRef" width="120" height="40" @click="getImgCode" />
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import { useImageVerify } from "./hooks";

export default defineComponent({
	name: "ImageVerify",
	props: {
		code: String,
	},
	emits: ["update:code"],
	setup(props, { emit }) {
		const { domRef, imgCode, setImgCode, getImgCode } = useImageVerify();

		watch(
			() => props.code,
			(val) => {
				setImgCode(val as string);
			},
		);

		watch(imgCode, (val) => {
			emit("update:code", val);
		});

		return {
			domRef,
			getImgCode,
		};
	},
});
</script>

<style scoped></style>


使用
const imgCode = ref("");
<ImageVerify v-model:code="imgCode" />
```

# Token

## 安装依赖

```ts
pnpm install js-cookie
pnpm install @types/js-cookie -D
```

## 使用

- 设置 - utils/auth.ts

```ts
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
```

- http 完善获取 token - utiles/http/index.ts

```js
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import Axios from "axios";
import NProgress from "../progress";
import type {
	HttpError,
	HttpRequestConfig,
	HttpResponse,
	RequestMethods,
} from "./types.d";
import { getToken, formatToken } from "../auth";
import { useUserStoreHook } from "@/store/modules/user";

/** 配置请求选项 */
const defaultConfig: AxiosRequestConfig = {
	// 请求超时时间
	timeout: 10000,
	headers: {
		Accept: "application/json, text/plain, */*",
		"Content-Type": "application/json",
		"X-Requested-With": "XMLHttpRequest",
	},
};

/** 封装对 HTTP 请求的处理 */
class Http {
	constructor() {
		this.httpInterceptorsRequest();
		this.httpInterceptorsResponse();
	}

	/** 保存当前 Axios 实例对象 */
	private static axiosInstance: AxiosInstance = Axios.create(defaultConfig);

	/** 初始化配置对象 */
	private static initConfig: HttpRequestConfig = {};

	/** 防止重复刷新 token */
	private static isRefreshing = false;

	/** token 过期后，暂存待执行的请求 */
	private static requests = [];

	/** 重连原始请求
	 * @description 遇到需要认证的错误（比如token过期），会将当前请求存入一个请求队列中，
	 * 并返回一个Promise对象，该Promise对象会在后续获取到新的有效token后被resolve，
	 * 并将新的token添加到请求的headers中，然后重新发起请求
	 */
	private static retryOriginalRequest(config: HttpRequestConfig) {
		return new Promise((resolve) => {
			// @ts-ignore
			Http.requests.push((token: string) => {
				// @ts-ignore
				config.headers["Authorization"] = "Bearer " + token;
				resolve(config);
			});
		});
	}

	/** 请求拦截 */
	private httpInterceptorsRequest(): void {
		Http.axiosInstance.interceptors.request.use(
			async (config: HttpRequestConfig): Promise<any> => {
				// 开启进度条动画
				NProgress.start();

				// 优先判断post/get等方法是否传入回调，否则执行初始化设置等回调
				if (typeof config.beforeRequestCallback === "function") {
					config.beforeRequestCallback(config);
					return config;
				}
				if (Http.initConfig.beforeRequestCallback) {
					Http.initConfig.beforeRequestCallback(config);
					return config;
				}

				/** 请求白名单，放置一些不需要token的接口（通过设置请求白名单，防止token过期后再请求造成的死循环问题） */
				const whiteList = ["/refreshToken", "/login"];
				// 判断请求的url是否在白名单中
				return whiteList.find((url) => url === config.url)
					? config // 在 - 直接返回配置对象
					: new Promise((resolve) => {
							// 不在
							// 获取 token
							const data = getToken();
							if (data) {
								// 判断是否过期
								const now = new Date().getTime();
								const expired = data.expires - now <= 0;
								if (expired) {
									if (!Http.isRefreshing) {
										Http.isRefreshing = true;
										// token 过期刷新 refreshToken
										useUserStoreHook()
											.handRefreshToken({ refreshToken: data.refreshToken })
											.then((res) => {
												const token = res.data.accessToken;
												// 重新设置请求头的 Authorization 字段
												// @ts-ignore
												config.headers["Authorization"] = formatToken(token);
												// @ts-ignore
												Http.requests.forEach((cb) => cb(token));
												Http.requests = [];
											})
											.finally(() => {
												Http.isRefreshing = false;
											});
									}
									// 执行之前暂存的待执行请求
									resolve(Http.retryOriginalRequest(config));
								} else {
									// @ts-ignore
									config.headers["Authorization"] = formatToken(
										data.accessToken,
									);
									resolve(config);
								}
							} else {
								resolve(config);
							}
					  });
			},
			(error) => {
				return Promise.reject(error);
			},
		);
	}

	/** 响应拦截 */
	private httpInterceptorsResponse(): void {
		Http.axiosInstance.interceptors.response.use(
			(response: HttpResponse) => {
				const $config = response.config;

				// 关闭进度条动画
				NProgress.done();

				// 优先判断post/get等方法是否传入回调，否则执行初始化设置等回调
				if (typeof $config.beforeResponseCallback === "function") {
					$config.beforeResponseCallback(response);
					return response.data;
				}
				if (Http.initConfig.beforeResponseCallback) {
					Http.initConfig.beforeResponseCallback(response);
					return response.data;
				}

				return response.data;
			},
			(error: HttpError) => {
				const $error = error;
				$error.isCancelRequest = Axios.isCancel($error);

				// 关闭进度条动画
				NProgress.done();

				// 所有的响应异常 区分来源为取消请求/非取消请求
				return Promise.reject($error);
			},
		);
	}

	/** 通用请求工具函数 */
	public request<T>(
		method: RequestMethods,
		url: string,
		param?: AxiosRequestConfig,
		axiosConfig?: HttpRequestConfig,
	): Promise<T> {
		const config = {
			method,
			url,
			...param,
			...axiosConfig,
		} as HttpRequestConfig;

		// 单独处理自定义请求/响应回调
		return new Promise((resolve, reject) => {
			Http.axiosInstance
				.request(config)
				.then((response: any) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}

	/** 单独抽离的post工具函数 */
	public post<T, P>(
		url: string,
		params?: AxiosRequestConfig<T>,
		config?: HttpRequestConfig,
	): Promise<P> {
		return this.request<P>("post", url, params, config);
	}

	/** 单独抽离的get工具函数 */
	public get<T, P>(
		url: string,
		params?: AxiosRequestConfig<T>,
		config?: HttpRequestConfig,
	): Promise<P> {
		return this.request<P>("get", url, params, config);
	}
}

export const http = new Http();
```



