<template>
    <div class="card table-search">
        <el-form ref="formRef" :v-model="searchParam" :inline="true" label-width="100px" style="`max-width: ${maxWidth}px`">
            <template v-for="item in getSearchList" :key="item.prop">
                <el-form-item :label="`${item.label} :`">
					<SearchFormItem :item="item" :searchParam="searchParam" />
				</el-form-item>
            </template>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import SearchFormItem from "./components/SearchFormItem.vue";
import { Delete, Search, ArrowDown, ArrowUp } from "@element-plus/icons-vue";

interface MyTableProps {
	columns: Partial<Table.ColumnProps>[]; // 搜索配置列
	searchParam: any; // 搜索参数
	search: (params: any) => void; // 搜索方法
	reset: (params: any) => void; // 重置方法
}

// 默认值
const props = withDefaults(defineProps<MyTableProps>(), {
	columns: () => [],
	searchParam: {}
});

//展开的表单的最大数
const maxLength = ref<number>(4);
//根据展开最大宽度来完成自适应
const maxWidth = ref<number>(1260);
// 是否展开搜索项
const searchShow = ref(false);
// 根据是否展开配置搜索项长度
const getSearchList = computed((): Partial<Table.ColumnProps>[] => {
	if (searchShow.value) return props.columns;
	return props.columns.slice(0, maxLength.value);
});
</script>

<style scoped>

</style>