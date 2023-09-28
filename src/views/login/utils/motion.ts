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
					// @ts-ignore
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
