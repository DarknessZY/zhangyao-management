<template>
   <el-container>
		<el-aside>
			<Menu />
		</el-aside>
		<el-container>
			<el-header>
				<Header />
				<Tabs />
			</el-header>
			<el-main>
				<router-view v-slot="{ Component, route }">
					<transition appear name="fade-transform" mode="out-in">
						<keep-alive :include="cacheRouter">
							<component :is="Component" :key="route.path"></component>
						</keep-alive>
					</transition>
				</router-view>
			</el-main>
			<el-footer>
                <Footer />
			</el-footer>
		</el-container>
	</el-container>
</template>

<script setup lang="ts">
import Footer from "./footer/index.vue";
import Menu from "./Menu/index.vue";
import Header from './header/index.vue'
import cacheRouter from "@/router/cacheRouter";
import Tabs from "./tabs/index.vue";
</script>

<style lang="scss" scoped>
    @import "./index.scss";
</style>