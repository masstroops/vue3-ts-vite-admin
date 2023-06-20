import { createApp } from 'vue'
import './style.css'
import Antd from 'ant-design-vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css'
import router from './routers'
import { createPinia } from 'pinia'
import './utils/cbfn'
import './mock'
import './permission'
import * as Icons from '@ant-design/icons-vue'

const app = createApp(App)

app.use(Antd)
.use(router)
.use(createPinia())
.mount('#app')

// 全局使用图标，遍历引入
const icons: any = Icons
for (const i in icons) {
  app.component(i, icons[i])
}
