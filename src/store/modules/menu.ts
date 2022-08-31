import { defineStore } from "pinia";
import { MenuState } from "../interface";
import piniaPersistConfig from "@/config/piniaPersist";

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
	persist: piniaPersistConfig("MenuState")
});
