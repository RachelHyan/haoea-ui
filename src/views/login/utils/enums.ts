import { t } from "@/plugins/i18n";

const operates = [
	{
		title: t("手机登录"),
	},
	{
		title: t("二维码登录"),
	},
	{
		title: t("注册"),
	},
];

const thirdParty = [
	{
		title: t("微信登录"),
		icon: "wechat",
	},
	{
		title: t("支付宝登录"),
		icon: "alipay",
	},
	{
		title: t("QQ登录"),
		icon: "qq",
	},
	{
		title: t("微博登录"),
		icon: "weibo",
	},
];

export { operates, thirdParty };
