// * Menu
declare namespace Menu {
	interface MenuOptions {
		path: string;
		title?: string;
		icon : string;
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
    
    type TypeProp = "index" | "selection" | "expand"| "image"| "date";
    
    type FixedProp = "left" | "right";
    type DateFormat = 'YYYY-MM-DD' | 'YYYY-MM-DD HH:mm:ss' | 'YYYY-MM-DD HH:mm' | 'YYYY-MM'
    type AlignProp = "left" | "right" | "center";
    interface ColumnProps {
        type?: TypeProp; // index | selection | expand（其他特殊类型）
        prop?: string; // 单元格数据（非特殊类型必填）
        label?: string; // 单元格标题（非特殊类型必填）
        width?: number | string; // 列宽
        minWidth?: number | string; // 最小列宽
        isShow?: boolean; // 是否显示在表格当中
        sortable?: boolean; // 是否可排序（静态排序）
        dataFormat?:DateFormat;//显示在页面中的日期格式
        fixed?: FixedProp; // 固定列
        align?:AlignProp;
        tag?: boolean; // 是否是标签展示
        search?: boolean; // 是否为搜索项
        searchType?: SearchType; // 搜索项类型
        searchProps?: { [key: string]: any }; // 搜索项参数，根据 element 文档来，标签自带属性 > props 属性
        searchInitParam?: string | number | boolean | any[]; // 搜索项初始值
        enum?: EnumProps[] | (() => Promise<any>); // 枚举类型（渲染值的字典）
        render?: (row?:any, index?: any) => VNodeChild // 渲染函数，渲染这一列的每一行的单元格
    }
    interface _options {
        pagination?: boolean; // 是否需要分页组件 ==> 非必传（默认为true）
        border?: boolean; // 表格是否显示边框 ==> 非必传（默认为true）
        stripe?: boolean; // 是否带斑马纹表格 ==> 非必传（默认为false）
        toolButton?: boolean; // 是否显示表格功能按钮 ==> 非必传（默认为true）
        childrenName?: string; // 当数据存在 children 时，指定 children key 名字 ==> 非必传（默认为"children"）
        fit?: boolean;//列的宽度是否自撑开
        lazy?:boolean;//是否懒加载子节点数据
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
