<template>
    <div>
        <Mytable :tableData="tableData" :columns="columns"/>
    </div>
</template>

<script setup lang="ts">
import {ref,reactive, onMounted} from "vue"
import Mytable from "@/components/Mytable/index.vue"
import {getUseTableList} from "@/service/moudles/usetable/usetable"
const columns:Table.Column[] = [
    {prop:'username',label:'姓名'},
    {prop:'age',label:'年龄'},
    {prop:'phone',label:'手机号'},
    {prop:'hobby',label:'爱好'}

]
const tableData = ref()
const getTableList = () =>{
    const mytableData = getUseTableList().data
    tableData.value = mytableData
    console.log(tableData.value );

}
onMounted(() => {
    getTableList()
    })
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>