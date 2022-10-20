import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { GlobalStore } from "@/store/index";
import { MenuStore } from "@/store/modules/menu";
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
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/login.vue'),
    meta: { title: '登录', icon: '', parent: { name: '' } }
  },
  {
    path: '/layout',
    name: 'Layout',
    component: () => import('@/layout/index.vue'),
  },
  ...routerArray,
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  strict: false,
	// 切换页面，滚动到最顶部
	scrollBehavior: () => ({ left: 0, top: 0 })
})

router.beforeEach((to, from, next) => {
  const globalStore = GlobalStore()
  const menuStore = MenuStore()
  const token = globalStore.token
  // const token = sessionStorage.getItem("token")
  const menuList = menuStore.menuList
  if (to.path == '/login') {
    console.log("login!!!!!!!!!!!")
    next()
  } else if (!token) {
    console.log('!token');
  } else if (to.path == '/' || to.path == '') {
    next({path: '/'})
  } else if (menuList) {
    next()
  }
})
export default router
