<template>
    <div>
        <!--使用 v-bind 属性透传 -->
        <el-table
            height = "575"
            :data="tableData"
            v-bind="_options"
            @selection-change="selectionChange"
			:row-key="getRowKeys"
        >
            <template v-for="item in columns" :key="item">
                <!-- 复选框，序号列 -->
                <el-table-column
					v-if="item.type == 'selection' || item.type == 'index'|| item.type == 'expand'"
					:type="item.type"
					:reserve-selection="item.type == 'selection'"
					:label="item.label"
					:width="item.width"
					:min-width="item.minWidth"
					:fixed="item.fixed"
                    align="center"
				>
				</el-table-column>
                <!-- 图片列 -->
                <el-table-column
					v-if="item.type == 'image'"
					:type="item.type"
					:label="item.label"
					:width="item.width"
					:min-width="item.minWidth"
					:fixed="item.fixed"
                    align="center"
				>
                    <template #default="{row}">
                        <el-image
                        preview-teleported
                            :hide-on-click-modal="true"
                            :preview-src-list="[row[item.prop!]]"
                            :src="row[item.prop!]"
                            fit="cover"
                            style="width:40px;height:40px;border-radius:8px"
                        >
                         <!-- 如需更改图片size，可自行在style配置参数就不搞动态传参配置了 -->
                        </el-image>
                    </template>
				</el-table-column>
                <!-- 日期列 -->
                <el-table-column
                    v-if="item.type == 'date'"
					:type="item.type"
					:label="item.label"
					:width="item.width"
					:min-width="item.minWidth"
					:fixed="item.fixed"
                    :align="item.align"
                >
                    <template #default="{ row }">
                            <span>{{ dayjs(row[item.prop!]).format(item.dataFormat ?? 'YYYY-MM-DD') }}</span>
                    </template>
                </el-table-column>
                <!-- 自定义 -->
                <el-table-column
					v-if="item.render"
					:prop="item.prop"
					:label="item.label"
					:width="item.width"
					:min-width="item.minWidth"
					:sortable="item.sortable"
					:show-overflow-tooltip="item.prop !== 'operation'"
					:resizable="true"
					:fixed="item.fixed"
                    align="center"
				>
					<!-- 自定义 header (使用组件渲染 tsx 语法) -->
					<template #default="scope"  >
						<Expand :render="item.render" :row="scope.row" :index="scope.$index" />
					</template>
				</el-table-column>
                <el-table-column
                    v-if ="!item.type&&!item.render"
                    :label="item.label"
                    :prop="item.prop"
                    :width="item.width"
                    :min-width="item.minWidth" 
                    :align="item.align"
                >
            </el-table-column>
            </template>
        </el-table>
    </div>
</template>

<script setup lang="ts">
import { ComputedRef, computed ,watch } from 'vue'
import { useTable } from '@/hooks/useTable'
import { useSelection } from "@/hooks/useSelection";
import dayjs from 'dayjs' // 日期格式化，需自行下载此依赖 
import Expand from './components/Expand' //  默认使用的tsx形式的组件
import { Refresh, Operation, Search } from "@element-plus/icons-vue";
import { filterEnum, formatValue } from "@/utils/util";
interface ProTableProps {
	columns: Partial<Table.ColumnProps>[]; // 列配置项
	// requestApi: (params: any) => Promise<any>; // 请求表格数据的api ==> 必传
    requestApi:any
    dataCallback?: (data: any) => any; // 返回数据的回调函数，可以对数据进行处理
    initParam?: any; // 初始化请求参数 ==> 非必传（默认为{}）
    _options?:Table._options
}
const props = defineProps<ProTableProps>()
//设置表格基本配置的默认值，如果传入的自定义的配置则合并option配置项
const _options: ComputedRef<Table._options> = computed(() =>{
    const option = {
        pagination: true,
        border: true,
        stripe: false,
        toolButton: true,
        childrenName: "children",
        fit:true,
        lazy:true
    }
    return Object.assign(option, props?._options)
})
// 表格多选 Hooks
const { selectionChange, getRowKeys, selectedListIds, isSelected } = useSelection();
// 表格操作 Hooks
const { tableData, pageable, searchParam, searchInitParam, getTableList, search, reset, handleSizeChange, handleCurrentChange } =
	useTable(props.requestApi,props?.initParam,props?._options?.pagination, props?.dataCallback);
// 监听页面 initParam 改化，重新获取表格数据
watch(
	() => props?.initParam,
	() => {
		getTableList();
	},
	{ deep: true }
);
// 暴露给父组件的参数和方法
defineExpose({ searchParam, refresh: getTableList });
</script>

<style scoped>

</style>
