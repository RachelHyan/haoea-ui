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
