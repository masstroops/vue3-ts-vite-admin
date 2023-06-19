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


createApp(App)
.use(Antd)
.use(router)
.use(createPinia())
.mount('#app')
