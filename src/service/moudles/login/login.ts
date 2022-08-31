import http from '@/service/http'
import * as T from './types'
import Menu from "@/assets/json/menu.json";
export const loginApi: T.ILoginApi = {
    login(params){
        return http.post('/login', params)
    }

}
// * 获取菜单列表
export const getMenuList = () => {
	// return http.get<Menu.MenuOptions[]>('/menu/list');
	// 如果想让菜单变为本地数据，注释上一行代码，并引入本地 Menu.json 数据
	return Menu;
};