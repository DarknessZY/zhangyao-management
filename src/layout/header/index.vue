<template>
    <div class="header">
        <div class="header-left flex-center">
            <!-- 折叠 -->
            <CollapseIcon id="collapseIcon" />
            <!-- 面包屑导航 -->
            <Breadcrumb id="Breadcrumb" />
        </div>
        <div class="header-right flex-center">
            <div class="header-icon flex-center">
				<!-- SearchMenu 菜单搜索-->
				<SearchMenu id="searchMenu" />
				<!-- Full screen 超大屏展示-->
				<Fullscreen id="fullscreen" />
			</div>
			<!-- User name -->
			<span class="username">Zhangyao</span>
			<!-- Avatar 头像-->
			<Avatar />
        </div>
    </div>
</template>

<script setup lang="ts">
import CollapseIcon from './components/CollapseIcon.vue'
import Breadcrumb from './components/Breadcrumb.vue'
import Avatar from './components/Avatar.vue'
import Fullscreen from './components/Fullscreen.vue'
import SearchMenu from './components/SearchMenu.vue'
</script>

<style scoped>
@import "./index.scss";
</style>