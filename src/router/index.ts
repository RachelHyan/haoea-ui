import {
	RouteRecordRaw,
	Router,
	createRouter,
	createWebHistory,
} from "vue-router";
import NProgress from "../utils/progress";
/** 不参与菜单的路由 */
import remainingRouter from "./modules/remaining";
import { isUrl, ascending, isOneOfArray, openLink } from "./utils";
import { t } from "@/plugins/i18n";
import { sessionKey } from "@/utils/auth";
/**
 * 自动导入全部静态路由，无需再手动导入
 * 匹配 src/router/modules 目录（任何嵌套级别）中具有 .ts 扩展名的所有文件，除了 remaining.ts 文件
 * import.meta.glob 为 vite 提供的特殊导入方式，它可以将模块中全部内容导入并返回一个Record对象
 *  默认为懒加载模式 加入配置项 eager 取消懒加载
 */
const modules: Record<string, any> = import.meta.glob(
	["./modules/**/*.ts", "!./modules/**/remaining.ts"],
	{
		eager: true,
	},
);

/** 原始静态路由（未做任何处理） */
const routes: Array<RouteRecordRaw> = [];

/** 将路由全部导入数组 */
Object.keys(modules).forEach((key) => {
	routes.push(modules[key].default);
});

/** 创建路由实例 */
const router: Router = createRouter({
	history: createWebHistory(),
	routes: ascending(routes).concat(...(remainingRouter as any)),
});

/** 路由白名单 */
const whiteList = ["/login"];

router.beforeEach((to, _from, next) => {
	const userInfo = sessionStorage.getItem(sessionKey);
	NProgress.start();

	// 动态设置文档标题
	const externalLink = isUrl(to?.name as string);
	if (!externalLink) {
		to.matched.some((item) => {
			if (!item.meta.title) return "";
			document.title = `${t(item.meta.title)} | Haoea UI`;
		});
	}

	/** 如果已经登录并存在登录信息后不能跳转到路由白名单，而是继续保持在当前页面 */
	const toCorrectRoute = () => {
		whiteList.includes(to.fullPath) ? next(_from.fullPath) : next();
	};

	if (userInfo) {
		// 无权限跳转403页面
		if (
			to.meta?.roles &&
			!isOneOfArray(to.meta?.roles, JSON.parse(userInfo)?.roles)
		) {
			next({ path: "/error/403" });
		}

		// if (_from?.name) {
		// name为超链接
		if (externalLink) {
			openLink(to?.name as string);
			NProgress.done();
		} else {
			toCorrectRoute();
		}
		// }
	} else {
		// 路由跳转
		if (to.path !== "/login") {
			if (whiteList.indexOf(to.path) !== -1) {
				next();
			} else {
				next({ path: "/login" });
			}
		} else {
			next();
		}
	}
});

router.afterEach(() => {
	NProgress.done();
});

export default router;
