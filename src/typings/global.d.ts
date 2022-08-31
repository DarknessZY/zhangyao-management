// * Menu
declare namespace Menu {
	interface MenuOptions {
		path: string;
		title: string;
		icon?: string;
		isLink?: string;
		close?: boolean;
		children?: MenuOptions[];
	}
}

declare type TabsOptions = Menu.MenuOptions & {};


// table表格
declare namespace Table {
	type Type = 'selection' | 'index' | 'expand' | 'image'
    type Size = 'large' | 'default' | 'small'
    type Align = 'center' | 'left' | 'right'
    type Command = string | number
    type DateFormat = 'YYYY-MM-DD' | 'YYYY-MM-DD HH:mm:ss' | 'YYYY-MM-DD HH:mm' | 'YYYY-MM'
    interface ButtonItem {
        name: string,
        command: Command,
        type?: 'primary' | 'success' | 'warning' | 'danger' | 'info',
    }
    interface Column {
   		// 对应列的类型。 如果设置了selection则显示多选框； 如果设置了 index 则显示该行的索引（从 1 开始计算）； 如果设置了 expand 则显示为一个可展开的按钮
        type?: Type,
        label?: string,
        prop?: string,
        slot?: string
        width?: string,
        align?: Align,
        dateFormat?: DateFormat // 显示在页面中的日期格式，简单列举了几种格式， 可自行配置
        showOverflowTooltip?: boolean,
        buttons?: ButtonItem[],
        render?: (row?: Record<string, any>, index?: number) => VNodeChild // 渲染函数，渲染这一列的每一行的单元格
    }
    interface Options {
        height?: string | number,
        // Table 的高度， 默认为自动高度。 如果 height 为 number 类型，单位 px；如果 height 为 string 类型，则这个高度会设置为 Table 的 style.height 的值，Table 的高度会受控于外部样式。
        stripe?: boolean, // 是否为斑马纹 table
        maxHeight?: string | number, // Table 的最大高度。 合法的值为数字或者单位为 px 的高度。
        size?: Size // Table 的尺寸
        showHeader?: boolean // 是否显示表头,
        tooltipEffect?: 'dark' | 'light' // tooltip effect 属性
        showPagination?: boolean, // 是否展示分页器
        paginationConfig?: Pagination, // 分页器配置项，详情见下方 paginationConfig 属性,
   	 	rowStyle?: ({ row, rowIndex }) => stirng | object // 行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style。
    }
    interface Pagination {
        total?: number, // 总条目数
        currentPage: number, // 当前页数，支持 v-model 双向绑定
        pageSize: number, // 每页显示条目个数，支持 v-model 双向绑定
        pageSizes?: number[], // 每页显示个数选择器的选项设置
        layout?: string, // 组件布局，子组件名用逗号分隔
        background?: boolean // 是否为分页按钮添加背景色
    }
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
