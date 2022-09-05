import { RouteRecordRaw } from "vue-router";
// 数据展示模块
const dataShow: Array<RouteRecordRaw> = [
	{
		path: "/permissions",
		component:  () => import("@/layout/index.vue"),
        redirect: "/permissions/roleManagement",
        meta: {
			title: "权限管理"
		},
		children: [
			{
				path: "/permissions/roleManagement",
				name: "roleManagement",
				component: () => import("@/views/permissions/roleManagement/index.vue"),
				meta: {
					keepAlive: false,
					requiresAuth: true,
					title: "角色权限",
					key: "permissions"
				}
			},
            {
				path: "/permissions/menuManagement",
				name: "menuManagement",
				component: () => import("@/views/permissions/menuManagement/index.vue"),
				meta: {
					keepAlive: false,
					requiresAuth: true,
					title: "角色权限",
					key: "permissions"
				}
			},
            {
				path: "/permissions/userManagement",
				name: "userManagement",
				component: () => import("@/views/permissions/userManagement/index.vue"),
				meta: {
					keepAlive: false,
					requiresAuth: true,
					title: "角色权限",
					key: "permissions"
				}
			}
		]
	}
];

export default dataShow;