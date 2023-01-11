<template>
  <button
    type="button"
    class="h-button"
    :disabled="disabled || loading"
    :class="styleClass"
  >
  <template v-if="!circle">
    <Icon
      name="loading"
      class="h-button-icon--left is-loading"
      v-if="loading"
    />
    <Icon
      class="h-button-icon--left"
      v-if="!loading && icon && iconPosition === 'left'"
      :name="icon"
    ></Icon>
    <span class="h-button-text" v-if="slots.default">
      <slot />
    </span>
    <Icon
      class="h-button-icon--right"
      v-if="icon && iconPosition === 'right'"
      :name="icon"
    ></Icon>
    <Icon
      class="h-button-icon"
      v-if="!loading && icon && !iconPosition"
      :name="icon"
    ></Icon>
  </template>
   <Icon :name="icon" v-else />
  </button>
</template>

<script lang="ts">
import { computed, defineComponent, useSlots } from "vue";
import "./style/index.less";
import Icon from "../icon/icon.vue";
import { buttonProps } from "./types";

export default defineComponent({
  name: "h-button",
  props: buttonProps,
  components: {
    Icon,
  },
  setup(props) {
    const styleClass = computed(() => {
      const { type, size, circle, border, round, link } = props;
      return {
        [`h-button--${type}`]: type,
        [`h-button--${size}`]: size,
        "is-border": border,
        "is-round": round,
        "is-circle": circle,
        "is-link": link,
      };
    });

    const slots = useSlots();

    return {
      styleClass,
      slots,
    };
  },
});
</script>

<style scoped></style>
