import http from '@/service/http'

// * 获取表格列表
export const upLoadImg = (params:any) => {
	return http.upload("/api/upload",params)
};