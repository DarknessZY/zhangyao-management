<template>
	<div class="card table-search">
		<el-form ref="formRef" :model="searchParam" :inline="true" :label-width="labelWidth ?? '100px'" :rules="formRules"
			:validate-on-rule-change="false">
			<template v-for="(item, index) in getSearchList" :key="index">
				<el-form-item v-if="!item.label" :prop="item.prop" class="noMargin"></el-form-item>
				<el-form-item v-else :label="`${item.label} :`" :prop="item.prop">
					<SearchFormItem :item="item" :searchParam="searchParam" />
				</el-form-item>
			</template>
		</el-form>
		<div class="search-operation">
			<div>
				<el-button type="success" :icon="Search" @click="search">查询</el-button>
				<el-button :icon="Refresh" @click="reset">重置</el-button>
				<slot name="exportsO"></slot>
				<el-button type="primary" text class="search-isOpen" @click="searchShow = !searchShow"
					v-if="columns.length > maxLength">
					{{ searchShow ? '收起' : '展开' }}
					<el-icon class="el-icon--right">
						<component :is="searchShow ? ArrowUp : ArrowDown"></component>
					</el-icon>
				</el-button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import SearchFormItem from './components/SearchFormItem.vue'
import { Search, ArrowDown, ArrowUp, Refresh } from '@element-plus/icons-vue'

type MyTableProps = {
	columns: any // 搜索配置列
	searchParam: any // 搜索参数
	search: (params: any) => void // 搜索方法
	reset: (params: any) => void // 重置方法
	rules: any //表单验证规则
	labelWidth?: string // 搜索项label
}

// 默认值
const props = withDefaults(defineProps<MyTableProps>(), {
	columns: () => [],
	searchParam: {},
	rules: {}
})
const searchColumns = props.columns.filter((item: string) => item.search)
//表单验证规则响应式
const formRules = computed(() => {
	const rules = searchColumns.reduce((map: { [x: string]: any }, i: { rules: any; prop: string | number }) => {
		if (i.rules) {
			map[i.prop] = i.rules
		}
		return map
	}, {})
	return rules
})
//展开的表单的最大数
const maxLength = ref<number>(3)
// 是否展开搜索项
const searchShow = ref(false)
// 根据是否展开配置搜索项长度
const getSearchList = computed((): Partial<Table.ColumnProps>[] => {
	if (searchShow.value) return props.columns
	return props.columns.slice(0, maxLength.value)
})
</script>

<style scoped lang="scss">
.noMargin {
	margin: 0;
}
</style>
