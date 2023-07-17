<template>
    <div class="table-box">
        <Mytable ref="myTable" :columns="columns" :requestApi="getUseTableList" :_options="options">
            <template v-slot:exportsO>
                <slot name="exportsO">
                    <ElButton type="primary" :icon="Download" @click="handleClickExportBtn">导出</ElButton>
                </slot>
            </template>
            <template #tableHeader="scope">
                <el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增用户</el-button>
            </template>
        </Mytable>
    </div>
</template>

<script setup lang="ts">
import Mytable from "@/components/Mytable/index.vue"
import { getUseTableList } from "@/service/moudles/usetable/usetable"
import { ElMessage, ElButton } from "element-plus"
import { CirclePlus, Download } from "@element-plus/icons-vue";
import { h } from 'vue'
interface User {
    username: string,
    age: string,
    phone: string,
    userhobbyame: string,
}
// 表格设置
const options: Table._options = {
    pagination: true,
    border: true,
    stripe: false,
    toolButton: true,
    childrenName: "children"
}
const columns: Partial<Table.ColumnProps>[] = [
    { type: "selection", width: 80, fixed: "left", isTable: true, },
    { type: "index", label: "序号", width: 80, isTable: true, },
    { prop: 'username', label: '姓名', align: "center", search: true, isTable: true, tooltip: true },
    { prop: 'age', label: '年龄', align: "center", search: true, isTable: true, },
    { prop: 'phone', label: '手机号', align: "center", search: true, isTable: true, },
    { prop: 'hobby', label: '爱好', align: "center", search: true, isTable: true, },
    { prop: 'hobby', label: '54645', align: "center", isTable: false, },
    { prop: 'hobby', label: '45645', align: "center", isTable: false, },
    { prop: 'hobby', label: '45654', align: "center", isTable: false, },
    {
        width: 140,
        label: '操作',
        render: (row: User, index: number) =>
            h('div', null, [
                h(
                    ElButton,
                    {
                        type: 'primary',
                        size: 'small',
                        onClick: () => handleRenderEdit(row, index)
                    },
                    { default: () => '编辑' }
                ),
                h(
                    ElButton,
                    {
                        type: 'danger',
                        size: 'small',
                        onClick: () => handleRenderDelete(row, index)
                    },
                    { default: () => '删除' }
                )
            ])
    }
]

const handleRenderEdit = (row: User, index: number) => {
    ElMessage.success(`${row.username} ----- ${index}`)
}
const handleRenderDelete = (row: User, index: number) => {
    ElMessage.success(`${row.username} ----- ${index}`)
}
const openDrawer = (title: string) => {
    ElMessage.success("我是新增")
}
const handleClickExportBtn = () => {
    console.log('我是导出')
}
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>