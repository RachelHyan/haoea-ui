import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// import DefineOptions from 'unplugin-vue-define-options/vite'

export default defineConfig({
    plugins: [
        vue(),
       // DefineOptions() // typescript setup 模式下，name 属性的使用
    ],
})