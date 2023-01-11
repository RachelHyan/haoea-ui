import {createApp} from 'vue';
/**
 * 编译器报错：找不到模块“./app.vue”或其相应的类型声明。
 * 原因：vue3.0中，ts默认不支持导入.vue文件，需要新建vue-dev.d.ts文件，声明模块
 */
import App from './app.vue';
const app = createApp(App);

import Haoeaui from 'haoea-ui';
// import {Button} from 'haoea-ui';
app.use(Haoeaui);
// app.use(Button);

app.mount('#app');