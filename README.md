# Vue3 Start Template

- 集成自适应（使用设计稿 px,自动转换 rem）
- 集成`i18n`国际化多语言配置
- 集成`element-plus`Ui 组件,tempalte 里面直接使用，不用引入。script 使用需单独引入
- 集成代码格式规范和编辑器自动格式化
- 使用 Vue3 最新 SFC setup 语法，推荐使用[https://vue3js.cn/docs/zh/guide/composition-api-setup.html#%E5%8F%82%E6%95%B0](https://vue3js.cn/docs/zh/guide/composition-api-setup.html#%E5%8F%82%E6%95%B0)

## 使用

1. 修改`.env`的`VITE_Design_Size`的自适应配置,`VITE_AppName`:应用名称;`VITE_AppDescription`:应用描述
2. 修改 publice 目录下对应图标
3. 图标推荐使用 svg 格式。有两种使用方式,
   1. 多色图标 `import` 引入使用,可以自由编辑 svg 每个部分， 使用方法[vite-svg-loader](https://github.com/jpkleemans/vite-svg-loader)
   2. 单色图标 使用全局组件 `<Icon />`，使用方法查看下面 全局组件部分内容
4. 布局推荐使用`flex`,`flex`全局快捷样式查看`/src/assets//styles/flex.scss`
5. 卸载旧的浏览器`Vue.js devtools`插件，安装最新版本[https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg](https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg)
6. 页面标题统一在`router.ts`路由文件，根据`meta.title`字段配置，通过配置`meta.isAuth`字段是否需要登录才可访问
7. 页面是否缓存,统一在`router.ts`路由文件，根据`meta.keepAlive`字段配置
8. 推荐使用`pnpm`
9. 推荐使用`pnpm run create`创建页面

## 快速创建页面

- 使用`pnpm run create`创建初始页面
- 现在提供了以下几种页面便于快速生成：

1. `page`： 简洁的初始化页面
2. `component`: 组件初始化页面

## 全局组件

- `Icon`: `svg`图标雪碧图组件（减少资源请求，不用引入使用）,把`svg`图标放在`/src/assets/icons/`目录下，使用方法 `/src/components/Icon/Icon.vue`

## VSCode 设置

安装推荐插件即可
