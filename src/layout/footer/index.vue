<template>
	<div class="footer flex-center">
		<a href="" target="_blank"> 2022/8/23-{{ currentDate }} © zyStudy </a>
	</div>
</template>
<script setup lang="ts">
const currentDate = new Date().toLocaleDateString();
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>
