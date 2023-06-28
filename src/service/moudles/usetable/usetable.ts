import http from '@/service/http'

// * 获取表格列表
export const getUseTableList = () => {
	return http.get("/usetable.json")
	// return usetable
};