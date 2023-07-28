import { RouteRecordRaw } from "vue-router";
// 数据展示模块
const dataShow: Array<RouteRecordRaw> = [
	{
		path: "/dataShow",
		component:  () => import("@/layout/index.vue"),
        redirect: "/dataShow/echartsUse",
        meta: {
			title: "数据展示"
		},
		children: [
			{
				path: "/dataShow/echartsUse",
				name: "echartsUse",
				component: () => import("@/views/dataShow/echartsUse/index.vue"),
				meta: {
					keepAlive: false,
					requiresAuth: true,
					title: "Echarts使用",
					key: "dataShow"
				}
			},
			{
				path: "/dataShow/tableUse",
				name: "tableUse",
				component: () => import("@/views/dataShow/tableUse/index.vue"),
				meta: {
					keepAlive: false,
					requiresAuth: true,
					title: "表格使用以及封装",
					key: "dataShow"
				}
			},
			{
				path: "/dataShow/threeJsShow",
				name: "threeJsShow",
				component: () => import("@/views/dataShow/threeJsShow/index.vue"),
				meta: {
					keepAlive: false,
					requiresAuth: true,
					title: "threeJS使用",
					key: "dataShow"
				}
			}
		]
	}
];

export default dataShow;