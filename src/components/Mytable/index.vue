<template>
    <div>
        <el-table
            :data="tableData"
           	v-bind="_options"
            @selection-change="handleSelectionChange"
            @row-click="handleRowClick"
            @cell-click="handleCellClick">
            <template v-for="(col, index) in columns" :key="index">
                <!---复选框, 序号 (START)-->
                <el-table-column
                    v-if="col.type === 'index' || col.type === 'selection' || col.type === 'expand'"
                    :align="col.align"
                    :label="col.label"
                    :type="col.type"
                    :index="indexMethod"
                    :width="col.width" />
                <!---复选框, 序号 (END)-->
                <!---图片 (START)-->
                <el-table-column
                    v-else-if="col.type === 'image'"
                    :align="col.align"
                    :label="col.label"
                    :width="col.width">
                    <template #default="{ row }">
                        <!-- 如需更改图片size，可自行配置参数 -->
                        <el-image
                           preview-teleported
                           :hide-on-click-modal="true"
                           :preview-src-list="[row[col.prop!]]"
                           :src="row[col.prop!]"
                           fit="cover"
                           style="width:40px;height:40px;border-radius:8px" />
                    </template>
                </el-table-column>
                <!---图片 (END)-->
                <!--- 日期格式化 (START)-->
                <el-table-column
                    v-else-if="col.type === 'date'"
                    :align="col.align"
                    :label="col.label"
                    :width="col.width">
                    <template #default="{ row }">
                        <span>{{ dayjs(row[col.prop!]).format(col.dateFormat ?? 'YYYY-MM-DD') }}</span>
                    </template>
                </el-table-column>
                <!---日期格式化 (END)-->
                <!-- 自定义slot (START) -->
                <el-table-column
                    :show-overflow-tooltip="col.showOverflowTooltip"
                    v-else-if="col.slot"
                    :align="col.align"
                    :label="col.label"
                    :width="col.width">
                    <template #default="scope">
                        <slot :name="col.slot" :row="scope.row" :index="scope.$index"></slot>
                    </template>
                </el-table-column>
                <!-- 自定义slot (END) -->
                <!-- 如果传递按钮数组，就展示按钮组 START-->
                <el-table-column
                    v-else-if="col.buttons?.length"
                    :align="col.align"
                    :label="col.label"
                    :width="col.width">
                    <template #default="scope">
                        <el-button-group>
                            <el-button
                                v-for="(btn, index) in col.buttons"
                                size="small"
                                :key="index"
                                :type="btn.type"
                                @click="handleAction(btn.command, scope)"
                                >{{ btn.name }}</el-button
                            >
                        </el-button-group>
                    </template>
                </el-table-column>
                <!-- 如果传递按钮数组，就展示按钮组 END-->
                <!-- render函数 (START) -->
                <el-table-column
                    :show-overflow-tooltip="col.showOverflowTooltip"
                    v-else-if="col.render"
                    :label="col.label"
                    :prop="col.prop"
                    :align="col.align"
                    :width="col.width">
                    <template #default="scope">
                        <!-- Expand组件代码下方有贴出来 -->
                        <Expand :render="col.render" :row="scope.row" :index="scope.$index" />
                    </template>
                </el-table-column>
                <!-- render函数 (END) -->
                <!-- 默认渲染列 (START) -->
                <el-table-column
                    :show-overflow-tooltip="col.showOverflowTooltip"
                    v-else
                    :label="col.label"
                    :prop="col.prop"
                    :align="col.align"
                    :width="col.width" />
                <!-- 默认渲染列 (END) -->
            </template>
        </el-table>
        <!-- 分页器 -->
        <div v-if="_options.showPagination" class="mt20">
            <el-pagination
                v-bind="_paginationConfig"
                @size-change="pageSizeChange"
                @current-change="currentPageChange" />
        </div>
    </div>
</template>
<script lang="ts" setup>
import dayjs from 'dayjs' // 日期格式化，需自行下载此依赖
import { ComputedRef, computed } from 'vue'
import Expand from './components/Expand' //  使用的tsx形式的组件
interface TableProps {
    tableData: Array<object> // table的数据
    columns: Table.Column[] // 每列的配置项
    options?: Table.Options
}
const props = defineProps<TableProps>()
// 设置option默认值，如果传入自定义的配置则合并option配置项
const _options: ComputedRef<Table.Options> = computed(() => {
    const option = {
        stripe: false,
        tooltipEffect: 'dark',
        showHeader: true,
        showPagination: false,
        rowStyle: () => 'cursor:pointer' // 行样式
    }
    return Object.assign(option, props?.options)
})
// 合并分页配置
const _paginationConfig = computed(() => {
    const config = {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30, 40, 50, 100],
        layout: 'total, sizes, prev, pager, next, jumper'
    }
    return Object.assign(config, _options.value.paginationConfig)
})
interface EmitEvent {
    (e: 'selection-change', params: any): void // 当选择项发生变化时会触发该事件
    (e: 'row-click', row: any, column: any, event: Event): void // 当某一行被点击时会触发该事件
    (e: 'cell-click', row: any, column: any, cell: any, event: Event): void // 当某个单元格被点击时会触发该事件
    (e: 'command', command: Table.Command, row: any): void // 按钮组事件
    (e: 'size-change', pageSize: number): void // pageSize事件
    (e: 'current-change', currentPage: number): void // currentPage按钮组事件
    (e: 'pagination-change', currentPage: number, pageSize: number): void // currentPage或者pageSize改变触发
}
const emit = defineEmits<EmitEvent>()
// 自定义索引
const indexMethod = (index: number) => {
        const tabIndex = index + (_paginationConfig.value.currentPage - 1) * _paginationConfig.value.pageSize + 1
        return tabIndex
    }
// 切换pageSize
const pageSizeChange = (pageSize: number) => {
    emit('size-change', pageSize)
    emit('pagination-change', 1, pageSize)
}
// 切换currentPage
const currentPageChange = (currentPage: number) => {
    emit('current-change', currentPage)
    emit('pagination-change', currentPage, _paginationConfig.value.pageSize)
}
// 按钮组事件
const handleAction = (command: Table.Command, scope: any) => {
    emit('command', command, scope.row)
}
// 多选事件
const handleSelectionChange = (val: any) => {
    emit('selection-change', val)
}
// 当某一行被点击时会触发该事件
const handleRowClick = (row: any, column: any, event: Event) => {
    emit('row-click', row, column, event)
}
// 当某个单元格被点击时会触发该事件
const handleCellClick = (row: any, column: any, cell: any, event: Event) => {
    emit('cell-click', row, column, cell, event)
}
</script>
<style lang="scss" scoped>
:deep(.el-image__inner) {
    transition: all 0.3s;
     cursor: pointer;
     &:hover {
         transform: scale(1.2);
     }
}
</style>

