<template>
	<!-- 菜单搜索 -->
	<div class="layout-search-dialog">
		<el-tooltip effect="dark" content="菜单搜索" placement="bottom">
			<el-icon @click="handleOpen" class="icon-style">
				<component :is="Search"></component>
			</el-icon>
		</el-tooltip>
		<el-dialog v-model="isShowSearch" width="300px" :modal="false" :show-close="false" fullscreen destroy-on-close>
			<el-autocomplete v-model="searchMenu" :fetch-suggestions="searchMenuList" ref="menuInputRef"
				placeholder="菜单搜索 ：支持菜单名称、路径" @select="handleClickMenu" @blur="closeSearch">
				<template #prefix>
					<el-icon>
						<Search />
					</el-icon>
				</template>
				<template #default="{ item }">
					<el-icon>
						<component :is="item.icon"></component>
					</el-icon>
					<span> {{ item.title }} </span>
				</template>
			</el-autocomplete>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import { ref, computed, nextTick } from "vue"
import { getFlatArr } from "@/utils/util";//扁平化数组
import { useRouter } from "vue-router";
import { MenuStore } from "@/store/modules/menu";
const router = useRouter();
const menuStore = MenuStore();
const isShowSearch = ref(false)
const searchMenu = ref("")
const menuList = computed((): Menu.MenuOptions[] => getFlatArr(menuStore.menuList));
const searchMenuList = (queryString: string, cb: Function) => {
	const results = queryString ? menuList.value.filter(filterNodeMethod(queryString)) : menuList.value;
	cb(results);
};
// 打开搜索菜单
const menuInputRef = ref();
const handleOpen = () => {
	isShowSearch.value = true;
	searchMenu.value = "";
	nextTick(() => {
		setTimeout(() => {
			menuInputRef.value.focus();
		});
	});
};

// 筛选菜单
const filterNodeMethod = (queryString: string) => {
	return (restaurant: any) => {
		return (
			restaurant.path.toLowerCase().indexOf(queryString.toLowerCase()) > -1 ||
			restaurant.title.toLowerCase().indexOf(queryString.toLowerCase()) > -1
		);
	};
};
// 点击菜单跳转
const handleClickMenu = (menuItem: any) => {
	searchMenu.value = "";
	if (menuItem.isLink) window.open(menuItem.isLink, "_blank");
	router.push(menuItem.path);
	closeSearch();
};
// 搜索窗关闭
const closeSearch = () => {
	isShowSearch.value = false;
};
</script>

<style scoped lang="scss">
@import "../index.scss";
</style>