<template>
    <div class="table-box">
        <Mytable ref="myTable" :columns="columns" :requestApi="getUseTableList" :_options="options"></Mytable>
    </div>
</template>

<script setup lang="ts">
import {ref,reactive, onMounted} from "vue"
import Mytable from "@/components/Mytable/index.vue"
import { getUseTableList } from "@/service/moudles/usetable/usetable"
import { ElMessage,ElButton } from "element-plus"
import { h } from 'vue'
interface User {
    username:string,
    age:string,
    phone:string,
    userhobbyame:string,
}
// 表格设置
const options:Table._options = {
        pagination: true,
        border: true,
        stripe: false,
        toolButton: true,
        childrenName: "children"
}
const columns:Partial<Table.ColumnProps>[] = [
    { type: "selection", width: 80, fixed: "left" },
    { type: "index", label: "序号", width: 80 },
    {prop:'username',label:'姓名',align: "center"},
    {prop:'age',label:'年龄',align: "center"},
    {prop:'phone',label:'手机号',align: "center"},
    {prop:'hobby',label:'爱好',align: "center"},
    {
        width:140,
        label:'操作',
        render:(row:User,index:number) =>
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

const handleRenderEdit = (row:User, index:number) => {
    ElMessage.success(`${row.username} ----- ${index}`)
}
const handleRenderDelete = (row:User, index:number) => {
    ElMessage.success(`${row.username} ----- ${index}`)
}
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>