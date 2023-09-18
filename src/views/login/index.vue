<template>
	<div>
		Hello
		<el-button type="primary" @click="onLogin">按钮</el-button>
	</div>
</template>

<script lang="ts">
import { useUserStoreHook } from "@/store/modules/user";
import { defineComponent } from "vue";

export default defineComponent({
	name: "Login",
	setup() {
		const onLogin = async () => {
			const res = await useUserStoreHook().loginByUsername({
				username: "common11",
				password: "123456",
			});
			console.log(res);
		};
		return {
			onLogin,
		};
	},
});
</script>
