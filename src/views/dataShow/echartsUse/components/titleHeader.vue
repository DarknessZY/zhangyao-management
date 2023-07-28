<template>
	<div class="content">
		<div class="HeaderLeft">
			<div>
				<span>{{ props.title }}</span>
			</div>
		</div>
		<div class="headerRight">
			<el-button
				size="small"
				v-for="(item, index) in dateList"
				:key="index"
				:class="{ btn_active: item.active }"
				@click="changeDate(item.value)"
				>{{ item.title }}</el-button
			>
			<el-date-picker v-model="value" @change="changeDate(value)" type="date" placeholder="Pick a day" size="small" />
		</div>
	</div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import moment from 'moment'
type Iprops = {
	title: string
	icon?: string
}
const props = withDefaults(defineProps<Iprops>(), {
	title: '看板标题'
})

const emits = defineEmits(['getTime'])
/** 时间选择的值*/
const value = ref()

/** 时间*/
const startDate = ref()
const endDate = ref()
const today = () => {
	startDate.value = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss')
	endDate.value = moment().format('YYYY-MM-DD HH:mm:ss')
	dateList.value[1].active = true
	dateList.value[0].active = false
	dateList.value[2].active = false
}
const yesterday = () => {
	startDate.value = moment().subtract(1, 'days').startOf('day').format('YYYY-MM-DD HH:mm:ss')
	endDate.value = moment().subtract(1, 'days').endOf('day').format('YYYY-MM-DD HH:mm:ss')
	dateList.value[0].active = true
	dateList.value[1].active = false
	dateList.value[2].active = false
}
const lastSevenDays = () => {
	startDate.value = moment(new Date().getTime() - 3600 * 24 * 1000 * 6).format('YYYY-MM-DD HH:mm:ss')
	endDate.value = moment().format('YYYY-MM-DD HH:mm:ss')
	dateList.value[2].active = true
	dateList.value[0].active = false
	dateList.value[1].active = false
}
const dateList: Ref<any[]> = ref([
	{ title: '昨日', value: 'yesterday', active: true },
	{ title: '今日', value: 'today', active: false },
	{ title: '最近7日', value: 'lastSevenDays', active: false }
])
/** 选择时间*/
const changeDate = (value: string) => {
	if (value == 'today') {
		today()
	} else if (value == 'yesterday') {
		yesterday()
	} else if (value == 'lastSevenDays') {
		lastSevenDays()
	} else {
		startDate.value = moment(value).startOf('day').format('YYYY-MM-DD HH:mm:ss')
		endDate.value = moment(value).endOf('day').format('YYYY-MM-DD HH:mm:ss')
	}
	// console.log('date', startDate.value, endDate.value)
	emits('getTime', startDate.value, endDate.value)
}
</script>

<style lang="scss" scoped>
.content {
	display: flex;
	justify-content: space-between;
	.HeaderLeft {
		flex-shrink: 0;
		margin-top: 5px;
		margin-left: 10px;
		font-size: 14px;
		font-weight: 500;
	}
	.headerRight {
		flex-shrink: 0;
		margin-top: 5px;
		margin-right: 5px;
		.btn_active {
			color: white;
			background-color: #0bb977;
			border: #0bb977 solid 1px;
		}
	}
}
::v-deep(.el-button + .el-button) {
	margin-left: 0 !important;
}
::v-deep(.el-date-editor.el-input, .el-date-editor.el-input__wrapper) {
	width: 100px;
	margin-left: 8px;
}
</style>
