import http from '@/service/http'
import * as T from './types'
// import usetable from "@/assets/json/usetable.json";

// * 获取表格列表
export const getUseTableList = () => {
	return http.get("/usetable.json")
	// return usetable
};