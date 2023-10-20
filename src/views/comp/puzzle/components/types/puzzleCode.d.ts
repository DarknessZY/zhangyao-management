declare namespace PuzzleType {
	interface PuzzleOption {
		isShow?: boolean
	}
}

export interface ContentInfo extends PuzzleType.PuzzleOption {
	contentWidth: number // 主图宽度
	contentHeight: number // 主图高度
	smallWidth: number // 拼图宽度
	smallHeight: number // 拼图高度
	bigImage: string // 主图 base64码
	smallImage: string // 小拼图 base64码
	imageUrl?: string // 完整图 s3地址
	yheight: number // 小拼图在y轴的高度
	requestNo?: string | number // 请求流水号 如果是配合服务端一般是有这个的
}
