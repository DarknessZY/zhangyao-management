<template>
	<div class="list">
		<ul>
			<li v-for="(item, index) in props.merchantList" :key="index">
				<div class="content">
					<div class="left">
						<div class="indexStyle">{{ index + 1 }}</div>
						<div class="nameStyle">{{ item.name }}</div>
					</div>
					<div class="right">{{ item.value }}</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
type Iprops = {
	merchantList: any
}
const props = withDefaults(defineProps<Iprops>(), {
	merchantList: []
})
// const rankingList = ref([
// 	{ name: '唱', value: 1000 },
// 	{ name: '跳', value: 999 },
// 	{ name: 'rap', value: 888 },
// 	{ name: '篮球', value: 7894 },
// 	{ name: '唱', value: 1000 },
// 	{ name: '跳', value: 999 },
// 	{ name: 'rap', value: 888 },
// 	{ name: '篮球', value: 7894 },
// 	{ name: '唱', value: 1000 },
// 	{ name: '跳', value: 999 }
// ])
</script>

<style lang="scss" scoped>
.list {
	width: 90%;
	height: 100%;
	margin-top: 10px;

	.content {
		display: flex;
		justify-content: space-between;
		padding: 10px;
		border-bottom: #f0f2f5 1px solid;

		.left {
			display: flex;
			align-items: center;
			justify-content: start;

			.nameStyle {
				margin-left: 8px;
			}
		}
	}
}

li:nth-child(1) {
	.indexStyle {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		font-size: 14px;
		font-weight: 500;
		line-height: 24px;
		color: #ffffff;
		text-align: center;
		background: #ff3a30;
		border-radius: 50%;
	}
}

li:nth-child(2) {
	.indexStyle {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		font-size: 14px;
		font-weight: 500;
		line-height: 24px;
		color: #ffffff;
		text-align: center;
		background: #ff9502;
		border-radius: 50%;
	}
}

li:nth-child(3) {
	.indexStyle {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		font-size: 14px;
		font-weight: 500;
		line-height: 24px;
		color: #ffffff;
		text-align: center;
		background: #02bb7a;
		border-radius: 50%;
	}
}

li:nth-child(n + 4) {
	.indexStyle {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		font-size: 14px;
		font-weight: 500;
		line-height: 24px;
		color: #ffffff;
		text-align: center;
		background: #c7c7cc;
		border-radius: 50%;
	}
}
</style>
