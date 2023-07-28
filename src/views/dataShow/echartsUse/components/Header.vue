<template>
	<div class="warp">
		<div class="unit" v-for="(item, index) in dataMoney" :key="index">
			<div class="icon-warp">
				<svg class="icon-font">
					<use :xlink:href="item.type"></use>
				</svg>
			</div>
			<div class="show-money">
				<div class="money" :style="{ color: item.color }">{{ item.value }}</div>
				<div class="txt">{{ item.title }}</div>
			</div>
			<div class="line" v-show="item.type != '#icon-huakou'"></div>
		</div>
	</div>
</template>
<script setup lang="ts">
const dataMoney = ref([
	{ value: 146677, title: '收款金额', color: '#007aff', type: '#icon-shoukuan' },
	{ value: 147788, title: '支付金额', color: '#ff3a30', type: '#icon-zhifu' },
	{ value: 147788, title: '提现金额', color: '#ff9502', type: '#icon-tixian1' },
	{ value: 147788, title: '还款金额', color: '#35c758', type: '#icon-huankuan' },
	{ value: 147788, title: '还款金额', color: '#5756d7', type: '#icon-huakou' }
])
</script>
<style lang="scss" scoped>
.warp {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-around;
	height: 100%;
	margin-right: 20px;
	margin-left: 20px;
	.unit {
		display: flex;
		justify-content: space-around;
		width: 20%;
		.icon-warp {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 75px;
			height: 75px;
			background-color: #fafafa;
			border-radius: 19px;
			.icon-font {
				width: 50px;
				height: 50px;
			}
		}
		.show-money {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding-left: 15px;
			.money {
				font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
				font-size: 16px;
				font-weight: bold;
			}
			.txt {
				padding-top: 15px;
				font-size: 16px;
				color: #c7c7c7;
			}
		}
		.line {
			width: 2px;
			height: 60px;
			margin-top: 8px;
			margin-left: 40px;
			background-color: #c7c7c7;
		}
	}
}
</style>
