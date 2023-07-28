import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { createPinia } from "pinia"
import piniaPersist from 'pinia-plugin-persist'
import SvgIcon from './components/SvgIcon/index.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import '@/assets/iconfont/iconfont.js'
import '@/assets/iconfont/iconfont.css'
import "element-plus/dist/index.css"
//样式
import './styles/index.scss'
import print from 'vue3-print-nb'
const pinia = createPinia()
pinia.use(piniaPersist)
const app = createApp(App)
// 注册element Icons组件
Object.keys(ElementPlusIconsVue).forEach(key => {
	app.component(key, ElementPlusIconsVue[key as keyof typeof ElementPlusIconsVue]);
});
app.use(print).use(router).use(pinia).component('svg-icon', SvgIcon).mount('#app')
