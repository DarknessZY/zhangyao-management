import http from '@/service/http'
import * as T from './types'

// * 获取表格列表
export const getUseTableList = () => {
	return http.get("/usetable.json")
	// return usetable
};