import { RouteRecordRaw } from "vue-router";
// 友情链接
const LinkRouter:Array<RouteRecordRaw>= [
	{
		path: "/friendLink",
		component:  () => import("@/layout/index.vue"),
		children: [
			{
				path: "/friendLink",
				name: "friendLink",
				component: () => import("@/views/friendLink/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: false,
					title: "友情链接",
					key: "friendLink"
				}
			}
		]
	}
];

export default LinkRouter;
