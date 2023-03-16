import { RouteRecordRaw } from "vue-router";
// 首页模块
const homeRouter= [
	{
		path: "/home",
		component:  () => import("@/layout/index.vue"),
		redirect: "/home/index",
		children: [
			{
				path: "/home/index",
				name: "home",
				component: () => import("@/views/home/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: false,
					title: "首页",
					key: "home"
				}
			}
		]
	}
];

export default homeRouter;
