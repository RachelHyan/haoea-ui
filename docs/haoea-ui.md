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

# 路由

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
					default: () => (this.$slots.default ? [this.$slots.default()] : []),
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

