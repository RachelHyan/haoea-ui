<template>
	<div>
		<div class="comp-ctrl flex-c">
			<!-- 主题 -->
			<el-switch
				v-model="isDark"
				@change="darkThemeToggle"
				:active-icon="dayIcon"
				:inactive-icon="darkIcon"
				inline-prompt
			/>
			<!-- 国际化 -->
			<el-dropdown class="i18n">
				<globalization class="globalization" />
				<template #dropdown>
					<el-dropdown-menu class="translation">
						<el-dropdown-item
							:style="getDropdownItemStyle(locale, 'zh')"
							@click="translationCh"
						>
							<Icon
								icon="ic:baseline-check"
								color="white"
								v-show="locale === 'zh'"
								class="check"
							/>
							简体中文
						</el-dropdown-item>
						<el-dropdown-item
							:style="getDropdownItemStyle(locale, 'en')"
							@click="translationEn"
						>
							<Icon
								icon="ic:baseline-check"
								color="white"
								v-show="locale === 'en'"
								class="check"
							/>
							English
						</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
		<div class="login-container">
			<Motion :delay="50">
				<h2>
					<Print values="HAOEA UI" :cursor="false" :speed="100" />
				</h2>
			</Motion>

			<el-form ref="formRef" :model="formModel" :rules="loginRules">
				<Motion :delay="100">
					<el-form-item props="username">
						<el-input
							clearable
							v-mode="formModel.username"
							:placeholder="t('账号')"
						>
							<template #prefix>
								<Icon icon="ri:user-fill" />
							</template>
						</el-input>
					</el-form-item>
				</Motion>

				<Motion :delay="150">
					<el-form-item props="password">
						<el-input
							clearable
							v-mode="formModel.password"
							:placeholder="t('密码')"
						>
							<template #prefix>
								<Icon icon="mdi:password" />
							</template>
						</el-input>
					</el-form-item>
				</Motion>

				<Motion :delay="200">
					<el-form-item prop="verifyCode">
						<el-input
							clearable
							v-model="formModel.verifyCode"
							:placeholder="t('验证码')"
						>
							<template #prefix>
								<Icon icon="ri:shield-keyhole-line" />
							</template>
							<template #append>
								<ImageVerify v-model:code="imgCode" />
							</template>
						</el-input>
					</el-form-item>
				</Motion>
			</el-form>
		</div>
	</div>
</template>

<script lang="ts">
import { useDataThemeChange } from "@/layout/hooks/useThemeChange";
import { useTranslationLang } from "@/layout/hooks/useTranslationLang";
import { t } from "@/plugins/i18n";
import { useUserStoreHook } from "@/store/modules/user";
import { defineComponent, reactive, ref } from "vue";
import dayIcon from "@/assets/svg/day.svg?component";
import darkIcon from "@/assets/svg/dark.svg?component";
import globalization from "@/assets/svg/globalization.svg?component";
import { Icon } from "@iconify/vue";
import Motion from "./utils/motion";
import { FormInstance } from "element-plus";
import { loginRules } from "./utils/rules";
import { Print, ImageVerify } from "@/components";
export default defineComponent({
	name: "Login",
	components: {
		globalization,
		Icon,
		Motion,
		Print,
		ImageVerify,
	},
	setup() {
		const imgCode = ref("");
		const formRef = ref<FormInstance>();
		const formModel = reactive({
			username: "admin",
			password: "admin23",
			verifyCode: "",
		});

		const { isDark, darkThemeToggle } = useDataThemeChange();
		const { locale, getDropdownItemStyle, translationCh, translationEn } =
			useTranslationLang();

		const onLogin = async () => {
			const res = await useUserStoreHook().loginByUsername({
				username: "common11",
				password: "123456",
			});
			console.log(res);
		};

		return {
			imgCode,
			formRef,
			formModel,
			loginRules,
			dayIcon,
			darkIcon,
			t,
			locale,
			isDark,
			getDropdownItemStyle,
			onLogin,
			darkThemeToggle,
			translationCh,
			translationEn,
		};
	},
});
</script>

<style lang="scss" scoped>
.comp-ctrl {
	position: absolute;
	top: 3px;
	right: 5px;

	.i18n {
		margin-left: 5px;
	}

	.globalization {
		width: 20px;
		height: 20px;
	}
}

.translation {
	::v-deep(.el-dropdown-menu__item) {
		padding: 5px 40px;
	}

	.check {
		position: absolute;
		left: 20px;
	}
}
</style>
