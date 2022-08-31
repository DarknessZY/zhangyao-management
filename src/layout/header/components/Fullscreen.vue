<template>
	<div class="fullscreen">
		<el-tooltip effect="dark" :content="isFullscreen ? '退出大屏' : '超大屏'" placement="bottom">
        <el-icon  @click="toggle" class="icon-style" >
            <component :is=" isFullscreen? 'Aim' : 'FullScreen'"></component>
        </el-icon>
		</el-tooltip>
	</div>
</template>

<script setup lang="ts">
import { useFullscreen } from "@vueuse/core";
const { toggle, isFullscreen } = useFullscreen();
</script>

<style scoped lang="scss">
@import "../index.scss";
</style>
