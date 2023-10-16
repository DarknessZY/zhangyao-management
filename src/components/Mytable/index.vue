<template>
	<!-- 查询表单 -->
	<SearchForm :search="search" :reset="reset" :searchParam="searchParam" :columns="searchColumns" v-show="isShowSearch"
		v-if="_options?.tableShowSearch" :rules="_options.rules" :labelWidth="_options.labelWidth">
		<!-- 调用子组件的插槽，向子组件传递内容 -->
		<template v-slot:exportsO>
			<!-- 定义插槽用于接受其父级组件的插槽内容 -->
			<slot name="exportsO"></slot>
		</template>
	</SearchForm>
	<!-- 表格主体 -->
	<div class="card table">
		<!-- 表格头部 操作按钮 -->
		<div class="table-header">
			<div class="header-button-lf">
				<slot name="tableHeader" :ids="selectedListIds" :isSelected="isSelected"></slot>
			</div>
			<div class="header-button-ri">
				<el-button :icon="Refresh" circle @click="getTableList"> </el-button>
				<el-button :icon="Printer" circle v-print="'#printBox'"> </el-button>
				<el-button :icon="isShowSearch ? ArrowUp : ArrowDown" circle v-if="searchColumns.length" @click="showSearch">
				</el-button>
			</div>
		</div>
		<!--使用 v-bind 属性透传 -->
		<el-table ref="tableRef" :data="tableData" v-bind="_options" @selection-change="selectionChange" :row-key="getRowKeys"
			id="printBox" v-loading="loading" @getSelectionRows="getSelectionRows">
			<template v-for="item in tableColumns" :key="item">
				<!-- 复选框，序号列 -->
				<el-table-column v-if="item.type == 'selection' || item.type == 'index' || item.type == 'expand'"
					:type="item.type" :reserve-selection="item.type == 'selection'" :label="item.label" :width="item.width"
					:min-width="item.minWidth" :fixed="item.fixed" align="center">
				</el-table-column>
				<!-- 图片列 -->
				<el-table-column v-if="item.type == 'image'" :type="item.type" :label="item.label" :width="item.width"
					:min-width="item.minWidth" :fixed="item.fixed" align="center">
					<template #default="{ row }">
						<el-image preview-teleported :hide-on-click-modal="true" :preview-src-list="[row[item.prop!]]"
							:src="row[item.prop!]" fit="cover" style="width:40px;height:40px;border-radius:8px">
							<!-- 如需更改图片size，可自行在style配置参数就不搞动态传参配置了 -->
						</el-image>
					</template>
				</el-table-column>
				<!-- 多图片列 -->
				<el-table-column v-if="item.type == 'imageList'" :type="item.type" :label="item.label" :width="item.width"
					:min-width="item.minWidth" :fixed="item.fixed" align="center">
					<template #default="{ row }">
						<el-image preview-teleported :hide-on-click-modal="true" :preview-src-list="row[item.prop!]"
							:src="row[item.prop!]?.[0] || ''" fit="cover" style="width: 40px; height: 40px; border-radius: 8px">
							<!-- 如需更改图片size，可自行在style配置参数就不搞动态传参配置了 -->
						</el-image>
					</template>
				</el-table-column>
				<!-- 日期列 -->
				<el-table-column v-if="item.type == 'date'" :type="item.type" :label="item.label" :width="item.width"
					:min-width="item.minWidth" :fixed="item.fixed" :align="item.align">
					<template #default="{ row }">
						<span>{{ dayjs(row[item.prop!]).format(item.dataFormat ?? 'YYYY-MM-DD') }}</span>
					</template>
				</el-table-column>
				<!-- 自定义 -->
				<el-table-column v-if="item.render" :prop="item.prop" :label="item.label" :width="item.width"
					:min-width="item.minWidth" :sortable="item.sortable" :show-overflow-tooltip="item.prop !== 'operation'"
					:resizable="true" :fixed="item.fixed" align="center">
					<!-- 自定义 header (使用组件渲染 tsx 语法) -->
					<template #default="scope">
						<Expand :render="item.render" :row="scope.row" :index="scope.$index" />
					</template>
				</el-table-column>
				<!-- 普通列 -->
				<el-table-column v-if="!item.type && !item.render" :label="item.label" :prop="item.prop" :width="item.width"
					:min-width="item.minWidth" :align="item.align" :fixed="item.fixed" :class-name="item.class">
					<!-- 普通列文字超出显示内容 -->
					<template #default="scope" v-if="item.tooltip">
						<el-tooltip class="box-item" effect="dark" :content="scope.row[item.prop]" placement="top-start" width="auto">
							<div class="long-text">{{ scope.row[item.prop] }}</div>
						</el-tooltip>
					</template>
				</el-table-column>
				<!-- 操作列的插槽 -->
				<el-table-column v-if="item.type == 'operation'" :prop="item.prop" :label="item.label" :width="item.width"
					:min-width="item.minWidth" :sortable="item.sortable" :resizable="true" :fixed="item.fixed"
					:class-name="item.class === 'left' ? 'text-left' : ''">
					<template #default="scope">
						<slot name="operation" v-bind="scope.row" v-bind:index="scope.$index"></slot>
					</template>
				</el-table-column>
			</template>
		</el-table>
		<!-- 分页组件 -->
		<Pagination v-if="_options?.pagination" :pageable="pageable" :handleSizeChange="handleSizeChange"
			:handleCurrentChange="handleCurrentChange" />
	</div>
</template>

<script setup lang="ts">
import { ComputedRef, computed, watch, ref, onMounted } from 'vue'
import { useTable } from '@/hooks/useTable'
import { useSelection } from "@/hooks/useSelection";
import dayjs from 'dayjs' // 日期格式化，需自行下载此依赖 
import Expand from './components/Expand' //  默认使用的tsx形式的组件
import { Refresh, Printer, ArrowUp, ArrowDown } from "@element-plus/icons-vue";
import SearchForm from '@/components/SearchForm/index.vue'
import Pagination from './components/Pagination.vue'
interface MyTableProps {
	columns: Partial<Table.ColumnProps>[] // 列配置项
	requestApi: (params: any) => Promise<any> // 请求表格数据的api ==> 必传
	dataCallback?: (data: any) => any // 返回数据的回调函数，可以对数据进行处理
	initParam?: any // 初始化请求参数 ==> 非必传（默认为{}）
	_options?: Table._options
	resetFormData?: () => void
	changeCustomColumns?: (arg0: any) => void
	getSelectionRows?: (arg0: any) => void
}
/** table 表单容器*/
const tableRef = ref()
const props = defineProps<MyTableProps>()
//设置表格基本配置的默认值，如果传入的自定义的配置则合并option配置项
const _options: ComputedRef<Table._options> = computed(() => {
	const option = {
		pagination: true,
		tableShowSearch: true,
		border: true,
		stripe: false,
		toolButton: true,
		childrenName: 'children',
		fit: true,
		lazy: true,
		rules: {},
		isShowSearchIcon: false
	}
	return Object.assign(option, props?._options)
})

// 清空选择
const clearSelectionFun = () => {
	tableRef.value.clearSelection()
}
// 表格多选 Hooks
const { selectionChange, getRowKeys, selectedListIds, isSelected, selectedList } = useSelection(props?.getSelectionRows);
// 表格操作 Hooks
// 表格操作 Hooks
const {
	tableData,
	pageable,
	searchParam,
	searchInitParam,
	getTableList,
	search,
	reset,
	handleSizeChange,
	handleCurrentChange,
	loading
} = useTable(
	props.requestApi,
	props?.initParam,
	props?._options?.pagination,
	props?.dataCallback,
	props?.resetFormData,
	props?.changeCustomColumns,
	clearSelectionFun
)
// 监听页面 initParam 改化，重新获取表格数据
// watch(
// 	() => props?.initParam,
// 	() => {
// 		getTableList();
// 	},
// 	{ deep: true }
// );

// 配置项处理（添加 isShow 属性，控制显示/隐藏）
const totalColumns = ref<Partial<Table.ColumnProps>[]>()
// 搜索表单的展示项
const searchColumns = ref()
// 表格的展示项
const tableColumns = ref()

watch(
	() => props?.columns,
	newVal => {
		totalColumns.value =
			newVal.map(item => {
				return {
					...item,
					isShow: item.isShow ?? true
				}
			}) ?? []
		console.log('totalColumns.value', totalColumns.value);

		// 如果当前 enum 为后台数据需要请求数据，则调用该请求接口，获取enum数据
		totalColumns.value.forEach(async item => {
			if (item.enum && typeof item.enum === 'function') {
				const data = await item.enum()
				item.enum = data
			}
		})
		// 搜索的配置项
		searchColumns.value = totalColumns.value.filter(item => item.search)
		// 列表的列
		tableColumns.value = totalColumns.value.filter(item => item.isTable)
		console.log('tableColumns.value', tableColumns.value)
		// 设置搜索表单的默认值
		searchColumns.value.forEach((column: { searchInitParam: null | undefined; prop: any }) => {
			if (column.searchInitParam !== undefined && column.searchInitParam !== null) {
				searchInitParam.value[column.prop!] = column.searchInitParam
			}
		})
	},
	{
		deep: true,
		immediate: true
	}
)
//表单隐藏
const isShowSearch = ref(true)
const showSearch = () => {

	if (isShowSearch.value) {

		isShowSearch.value = false
	} else {
		isShowSearch.value = true
	}

}
// 暴露给父组件的参数和方法
defineExpose({ searchParam, refresh: getTableList, tableData, searchInitParam, clearSelectionFun, selectedList })

onMounted(() => {
	console.log('props.column', totalColumns.value)
})
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
