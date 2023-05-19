import { createApp } from 'vue'
import App from './App.vue'

// #Element-plus styles
import 'normalize.css/normalize.css'
import 'element-plus/lib/components/loading/style/index'
import 'element-plus/lib/components/message/style/index'
import 'element-plus/lib/components/message-box/style/index'
import 'element-plus/lib/components/overlay/style/index'
import 'element-plus/lib/components/drawer/style/index'
import 'element-plus/lib/components/switch/style/index'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './index.scss'

import { router } from '@/router'
import * as filters from '@/utils/filters'
import i18n from '@/utils/i18n'
import { ElLoading } from 'element-plus'
import './utils/permission' // 路由控制
import 'virtual:svg-icons-register'
import Icon from '@/components/Icon/Icon.vue'
import { createPinia } from 'pinia'
import { StartSentry } from './utils/sentry'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

const app = createApp(App)

// # Sentry
// StartSentry({ app, router })

// 挂载全局过滤器
// @ts-ignore
app.config.globalProperties.$filters = {
  ...filters,
}
const pinia = createPinia()

// 全局组件

app.component('Icon', Icon)

app
  .use(pinia)
  .use(router)
  .use(ElLoading)
  .use(i18n)
  .mount('#app')
