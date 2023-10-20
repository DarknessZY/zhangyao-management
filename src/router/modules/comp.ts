import { RouteRecordRaw } from "vue-router";
// 数据展示模块
const dataShow: Array<RouteRecordRaw> = [
	{
		path: "/comp",
		component:  () => import("@/layout/index.vue"),
        redirect: "/comp/puzzle",
        meta: {
			    title: "组件管理"
		},
		children: [
			{
				path: "/comp/puzzle",
				name: "puzzle",
				component: () => import("@/views/comp/puzzle/index.vue"),
				meta: {
					keepAlive: false,
					requiresAuth: true,
					title: "拼图验证",
					key: "comp"
				}
			},
      {
				path: "/comp/upload",
				name: "upload",
				component: () => import("@/views/comp/upload/index.vue"),
				meta: {
					keepAlive: false,
					requiresAuth: true,
					title: "图片上传",
					key: "comp"
				}
			},
		]
	}
];

export default dataShow;