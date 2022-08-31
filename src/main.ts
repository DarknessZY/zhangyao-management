import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { createPinia } from "pinia"
import SvgIcon from './components/SvgIcon/index.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import "element-plus/dist/index.css"
//样式
import './styles/index.scss'

const app = createApp(App)
// 注册element Icons组件
Object.keys(ElementPlusIconsVue).forEach(key => {
	app.component(key, ElementPlusIconsVue[key as keyof typeof ElementPlusIconsVue]);
});
app.use(router).use(createPinia()).component('svg-icon', SvgIcon).mount('#app')
