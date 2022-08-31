<template>
	<div class="logo">
		<img src="@/assets/vue.svg" alt="logo" />
		<span  v-show="!isCollapse">Zhanng YAO</span>
	</div>
</template>

<script setup lang="ts">
defineProps<{ isCollapse: boolean }>();
</script>

<style scoped lang="scss">
@import "../index.scss";
</style>
