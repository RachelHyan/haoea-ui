import { src,dest } from 'gulp'
import { componentPath } from '../utils/path'
import delPath from '../utils/delpath'
import run from '../utils/run'
import less from 'gulp-less'
import autoprefixer from 'gulp-autoprefixer'

// 删除dist目录
export const removeDist = async () => {
    return delPath(`${componentPath}/haoea-ui`)
}

// 处理样式
export const buildStyle = () => {
    return src(`${componentPath}/src/**/style/**.less`)
        .pipe(less())
        .pipe(
            autoprefixer()
        )
        .pipe(dest(`${componentPath}/haoea-ui/lib/src`))
        .pipe(dest(`${componentPath}/haoea-ui/es/src`));
};

// 处理组件
export const buildComponent = async () => {
    run(`pnpm run build`,componentPath)
}