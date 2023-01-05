import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import {resolve} from 'path'

export default defineConfig({
    build:{
        target:'modules',
        outDir:'es', // 打包后的目录
        minify:true, // 压缩
        emptyOutDir: false, // 不清空打包目录
        // cssCodeSplit:true, // css分离
        rollupOptions:{
            external:['vue',/\.less/,'@haoea-ui/utils'], // 忽略打包文件
            input:['index.ts'], // 入口文件
            output:[
                {
                    format:'es', // 打包格式
                    entryFileNames:'[name].mjs', // //不用打包成.es.js,这里把它打包成.mjs
                    preserveModules:true, // 保留模块，让打包目录和源码目录一致
                    exports:'named', // 导出方式
                    dir: resolve(__dirname, './haoea-ui/es') // 配置打包根目录
                },
                {
                    format:'cjs', // 打包格式
                    entryFileNames:'[name].js', // //不用打包成.cjs
                    preserveModules:true, // 保留模块，让打包目录和源码目录一致
                    exports:'named', // 导出方式
                    dir: resolve(__dirname, './haoea-ui/lib') // 配置打包根目录
                }
            ]
        },
        lib: {
            entry: './index.ts', // 入口文件
            name: 'haoea', // 打包后的包名
        }
    },
    plugins: [
        vue(),
        dts({
            entryRoot: 'src',
            outputDir: [resolve(__dirname,'./haoea-ui/es/src'),resolve(__dirname,'./haoea-ui/lib/src')],
            // 指定使用的tsconfig.json为整个项目根目录下的,如果不配置,也可以在components下新建tsconfig.json
            tsConfigFilePath:'../../tsconfig.json'
        }),
        {
            name:'style',
            generateBundle(config, bundle){
                // 获取打包后的文件目录及代码code
                const files = Object.keys(bundle)

                // 遍历文件
                for(const file of files){
                    const bundler:any = bundle[file as any]
                    //rollup内置方法,将所有输出文件code中的.less换成.css,因为当时没有打包less文件
                    this.emitFile({
                        type:'asset',
                        fileName: file,
                        source: bundler.code.replace(/\.less/g,'.css')
                    })
                }
            }
        }
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        }
    },
})