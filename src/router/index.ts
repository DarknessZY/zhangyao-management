import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const Layout = () => import('@/layout/index.vue')

// * 导入所有router
// const metaRouters = import.meta.globEager("./modules/*.ts");
const metaRouters:any =import.meta.glob('./modules/*.ts', { eager: true })
// * 处理路由表
export const routerArray: RouteRecordRaw[] = [];
Object.keys(metaRouters).forEach(item => {
	Object.keys(metaRouters[item]).forEach((key: any) => {
    console.log(metaRouters[item][key]);
		routerArray.push(...metaRouters[item][key]); 
	});
});
console.log('我是路由表',routerArray);

/**
 * @description 路由配置简介
 * @param path ==> 路由路径
 * @param name ==> 路由名称
 * @param redirect ==> 路由重定向
 * @param component ==> 路由组件
 * @param meta ==> 路由元信息
 * @param meta.requireAuth ==> 是否需要权限验证
 * @param meta.keepAlive ==> 是否需要缓存该路由
 * @param meta.title ==> 路由标题
 * @param meta.key	==> 路由key,用来匹配按钮权限
 * */
const routes: RouteRecordRaw[] = [
  ...routerArray,
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  strict: false,
	// 切换页面，滚动到最顶部
	scrollBehavior: () => ({ left: 0, top: 0 })
})

export default router
