// * Menu
declare namespace Menu {
	interface MenuOptions {
		path: string;
		title?: string;
		icon ?: string;
		isLink?: string;
		close?: boolean;
		children?: MenuOptions[];
	}
}
declare type TabsOptions = Menu.MenuOptions & {};
// table表格
declare namespace Table{
    interface EnumProps {
        label: string; // 选项框显示的文字
        value: any; // 选项框值
        disabled?: boolean; // 是否禁用此选项
        tagType?: string; // 当 tag 为 true 时，此选择会指定 tag 显示类型
        children?: EnumProps[]; // 为树形选择时，可以通过 children 属性指定子选项
        [key: string]: any;
    }
    
    type SearchType =
        | "text"
        | "select"
        | "multipleSelect"
        | "treeSelect"
        | "multipleTreeSelect"
        | "date"
        | "daterange"
        | "timerange"
        | "datetimerange";
    
    type TypeProp =  'index' | 'selection' | 'expand' | 'image' | 'date' | 'operation' | 'imageList'
    
    type FixedProp = "left" | "right";
    type DateFormat = 'YYYY-MM-DD' | 'YYYY-MM-DD HH:mm:ss' | 'YYYY-MM-DD HH:mm' | 'YYYY-MM'
    type AlignProp = "left" | "right" | "center";
    interface ColumnProps {
       /** index | selection | expand（其他特殊类型） */
		type?: TypeProp
		/** 单元格数据（非特殊类型必填） */
		prop?: string
		/** 单元格标题（非特殊类型必填） */
		label?: string
		/** 列宽 */
		width?: number | string
		/** 最小列宽 */
		minWidth?: number | string
		/** 是否显示在表格当中 */
		isShow?: boolean
		/** 是否可排序（静态排序） */
		sortable?: boolean
		/** 显示在页面中的日期格式 */
		dataFormat?: DateFormat
		/** 固定列 */
		fixed?: FixedProp
		/** 对齐方式 */
		align?: AlignProp
		/** 是否是标签展示 */
		tag?: boolean
		/** 是否为搜索项 */
		search?: boolean
		/** 是否为table列 */
		isTable?: boolean
		/** 超出表格宽度是否以tooltip提示展示 */
		tooltip?: boolean
		/** 搜索项类型 */
		searchType?: SearchType
		/** 搜索项参数，根据 element 文档来，标签自带属性 > props 属性 */
		searchProps?: { [key: string]: any }
		/** 搜索项初始值 */
		searchInitParam?: string | number | boolean | any[]
		/** 枚举类型（渲染值的字典） */
		enum?: EnumProps[] | (() => Promise<any>) | (() => void)
		/** 渲染函数，渲染这一列的每一行的单元格 */
		render?: (row?: any, index?: any) => VNodeChild
		/** 多选返回的回调函数， 可以判断选项的禁用与否 */
		selectableCallBack?: (row?: any, index?: any) => boolean
		/** 日期范围选择更改事件 */
		change?: (val: string | any[]) => void
		/** 清空事件 */
		clear?: (val: string | any[]) => void
		/** 下拉框更改事件 */
		selectChange?: (val: any) => void
		/** 默认值 */
		default: string | number
		/** 表单验证规则 */
		rules?: {
			/** 是否必传 */
			required?: boolean
			/** 校验规则 */
			validator?: (rule: any, value: any, callback: any) => void
			/** 触发方式 */
			trigger?: string | Array<string>
			/** 正则*/
			pattern?: RegExp
			/** 提示*/
			message?: string
		}[]
		/** 值left 左对齐*/
		class?: string
    }
    interface _options {
      /** 是否需要分页组件 ==> 非必传（默认为true） */
		pagination?: boolean
		/** 是否需要表单组件 ==> 非必传（默认为true） */
		tableShowSearch?: boolean
		/** 表格是否显示边框 ==> 非必传（默认为true） */
		border?: boolean
		/** 是否带斑马纹表格 ==> 非必传（默认为false） */
		stripe?: boolean
		/** 是否显示表格功能按钮 ==> 非必传（默认为true） */
		toolButton?: boolean
		/** 当数据存在 children 时，指定 children key 名字 ==> 非必传（默认为"children"） */
		childrenName?: string
		/** 列的宽度是否自撑开 */
		fit?: boolean
		/** 是否懒加载子节点数据 */
		lazy?: boolean
		/** form表单 labelWidth */
		labelWidth?: string
		/** form表单校验规则 */
		rules?: Array
		/** 表格右上的icon是否显示*/
		isShowSearchIcon?: boolean
    }
}

/* FileType */
declare namespace File {
  type ImageMimeType =
    | "image/apng"
    | "image/bmp"
    | "image/gif"
    | "image/jpeg"
    | "image/pjpeg"
    | "image/png"
    | "image/svg+xml"
    | "image/tiff"
    | "image/webp"
    | "image/x-icon";

  type ExcelMimeType = "application/vnd.ms-excel" | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
}
// * Vite
declare type Recordable<T = any> = Record<string, T>;

declare interface ViteEnv {
	VITE_API_URL: string;
	VITE_PORT: number;
	VITE_OPEN: boolean;
	VITE_GLOB_APP_TITLE: string;
	VITE_DROP_CONSOLE: boolean;
	VITE_PROXY_URL: string;
	VITE_BUILD_GZIP: boolean;
	VITE_REPORT: boolean;
}
