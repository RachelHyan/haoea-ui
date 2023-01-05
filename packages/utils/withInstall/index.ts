import type {App,Plugin} from 'vue';
export type SFCWithIndtall<T> = T & Plugin;
export default <T>(comp:T) => {
    (comp as SFCWithIndtall<T>).install = (app:App) => {
        // 当组件是 script setup 的形式时，会自动以为文件名注册，会挂载到组件的__name 属性上
        // 所以要加上这个条件
        const name = (comp as any).name || (comp as any).__name;
        // 注册组件
        app.component(name,comp as SFCWithIndtall<T>);
    }
    return comp as SFCWithIndtall<T>;
}