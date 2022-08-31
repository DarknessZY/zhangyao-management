import http from '@/service/http'
import * as T from './types'
import usetable from "@/assets/json/usetable.json";

// * 获取表格列表
export const getUseTableList = () => {
	// 如果想让菜单变为本地数据，注释上一行代码，并引入本地 Menu.json 数据
	// return http.get("@/assets/json/usetable.json");
	return usetable
	
};