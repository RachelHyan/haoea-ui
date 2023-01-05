import { componentPath,pkgPath } from "../utils/path";
import run from "../utils/run";
import {src,dest} from "gulp";

// // 复制package.json
// export const copyPackage = async () => {
//     return src(`${componentPath}/haoea-ui/package.json`)
//         .pipe(dest(`${componentPath}/haoea-ui`))
// }

// 发布
export const publish = async () => {
    // 升级版本号
    run(`pnpm version patch`,`${componentPath}/haoea-ui`)
    // 复制
    // await copyPackage()
    // 发布
    // 发布公共包：pnpm publish --access public
    run(`pnpm publish --access public`,`${componentPath}/haoea-ui`)
}