import { defineStore } from "pinia";
import { MenuState } from "../interface";

// MenuStore
export const MenuStore = defineStore({
	id: "MenuState",
	state: (): MenuState => ({
		// menu collapse 侧边菜单是否展开
		isCollapse: false,
		// menu List 菜单路由表
		menuList: []
	}),
	getters: {},
	actions: {
		async setCollapse() {
			this.isCollapse = !this.isCollapse;
		},
		async setMenuList(menuList: Menu.MenuOptions[]) {
			this.menuList = menuList;
		}
	},
	persist: {
		enabled: true , // 这个配置代表存储生效，而且是整个store都存储
	}
});
