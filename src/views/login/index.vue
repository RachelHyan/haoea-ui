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
		<div class="login-container flex-c">
			<div class="login-box flex-c">
				<Motion :delay="50">
					<h2>
						<Print values="HAOEA UI" :cursor="false" :speed="100" />
					</h2>
				</Motion>

				<el-form
					v-if="currentPage === 0"
					ref="formRef"
					:model="formModel"
					:rules="loginRules"
					class="login-form"
				>
					<Motion :delay="100">
						<el-form-item props="username">
							<el-input
								clearable
								v-model="formModel.username"
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
								v-model="formModel.password"
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

					<Motion :delay="250">
						<el-form-item>
							<div class="flex-b w-full">
								<el-checkbox v-model="checked">
									{{ t("记住密码") }}
								</el-checkbox>
								<el-button
									link
									type="primary"
									@click="useUserStoreHook().SET_CURRENTPAGE(4)"
								>
									{{ t("忘记密码?") }}
								</el-button>
							</div>
							<el-button
								type="primary"
								:loading="loading"
								class="w-full"
								@click="onLogin(formRef)"
							>
								{{ t("登录") }}
							</el-button>
						</el-form-item>
					</Motion>

					<Motion :delay="300">
						<el-form-item>
							<div class="w-full flex-b">
								<el-button
									v-for="(item, index) in operates"
									:key="index"
									@click="useUserStoreHook().SET_CURRENTPAGE(index + 1)"
								>
									{{ t(item.title) }}
								</el-button>
							</div>
						</el-form-item>
					</Motion>

					<Motion :delay="350" v-if="currentPage === 0">
						<el-form-item>
							<el-divider>
								{{ t("第三方登录") }}
							</el-divider>
							<div class="w-full flex-e">
								<span
									v-for="(item, index) in thirdParty"
									:key="index"
									:title="item.title"
								>
									<Icon
										:icon="`ri:${item.icon}-fill`"
										width="20"
										class="flex-c"
									/>
								</span>
							</div>
						</el-form-item>
					</Motion>
				</el-form>

				<!-- 手机登录 -->
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { useDataThemeChange } from "@/layout/hooks/useThemeChange";
import { useTranslationLang } from "@/layout/hooks/useTranslationLang";
import { t } from "@/plugins/i18n";
import { useUserStoreHook } from "@/store/modules/user";
import { computed, defineComponent, reactive, ref, watch } from "vue";
import dayIcon from "@/assets/svg/day.svg?component";
import darkIcon from "@/assets/svg/dark.svg?component";
import globalization from "@/assets/svg/globalization.svg?component";
import { Icon } from "@iconify/vue";
import Motion from "./utils/motion";
import { FormInstance } from "element-plus";
import { loginRules } from "./utils/rules";
import { Print, ImageVerify } from "@/components";
import { operates, thirdParty } from "./utils/enums";
import { useRouter } from "vue-router";

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
		const formRef = ref<FormInstance>();
		const formModel = reactive({
			username: "admin",
			password: "admin23",
			verifyCode: "",
		});
		const imgCode = ref("");
		const checked = ref(false);
		const loading = ref(false);
		const router = useRouter();
		const currentPage = computed(() => {
			return useUserStoreHook().currentPage;
		});

		const { isDark, darkThemeToggle } = useDataThemeChange();
		const { locale, getDropdownItemStyle, translationCh, translationEn } =
			useTranslationLang();

		const onLogin = async (formEl: FormInstance | undefined) => {
			loading.value = true;
			if (!formEl) return;
			await formEl.validate(async (valid, fields) => {
				if (valid) {
					useUserStoreHook()
						.loginByUsername({
							username: "common11",
							password: "123456",
						})
						.then((res) => {
							// @ts-ignore
							if (res.success) {
								loading.value = false;
								router.push({ path: "/" });
								console.log(router);
							}
						});
				} else {
					loading.value = false;
					return fields;
				}
			});
		};

		watch(imgCode, (value) => {
			useUserStoreHook().SET_VERIFYCODE(value);
		});

		return {
			formRef,
			formModel,
			loginRules,
			imgCode,
			checked,
			loading,
			operates,
			thirdParty,
			currentPage,
			dayIcon,
			darkIcon,
			t,
			locale,
			isDark,
			getDropdownItemStyle,
			useUserStoreHook,
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

.login-container {
	width: 100vw;
	height: 100vh;

	.login-box {
		width: 360px;
		box-sizing: border-box;
		flex-direction: column;

		h2 {
			text-transform: uppercase;
		}

		:deep(.el-input-group__append, .el-input-group__prepend) {
			padding: 0 !important;
		}

		.login-form {
			width: 100%;
		}

		.third-login {
			font-size: x-small;
		}
	}
}
</style>
