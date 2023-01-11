<template>
    <div class="h-icon">
        <svg class="icon" :style="{color:color,fontSize:size + 'px'}" aria-hidden="true">
            <use :xlink:href="`#${name}`"></use>
        </svg>
        <div v-if="dot" class="h-info" :class="styleDot">{{ badge }}</div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { iconProps } from './types';
import './font/iconfont.js';
import './style/index.less';

export default defineComponent({
    name: 'h-icon',
    props: iconProps,
    setup (props) {
        const styleDot = computed(() => {
            return {
                ['h-dot']: props.dot && !props.badge
            }
        })

        const badge = computed(() => {
            if(props.badge) {
                return props.badge > 99 ? '99+' : props.badge;
            }
        })

        return {
            styleDot,
            badge
        }
    }
})
</script>

<style scoped>

</style>