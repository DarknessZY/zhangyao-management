/* MenuState 菜单状态管理*/
export interface MenuState {
	isCollapse: boolean;
	menuList: Menu.MenuOptions[];
}
/* AuthState 权限状态管理*/
export interface AuthState {
	authButtons: {
		[key: string]: any;
	};
	authRouter: string[];
}
/* TabsState 标签栏状态管理*/
export interface TabsState {
	tabsMenuValue: string;
	tabsMenuList: TabsOptions[];
}
