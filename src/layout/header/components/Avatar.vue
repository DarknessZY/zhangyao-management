<template>
	<el-dropdown trigger="click">
		<div class="avatar">
			<img src="@/assets/images/lingguang.jpg" alt="avatar" />
		</div>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item @click="openDialog">修改密码</el-dropdown-item>
				<el-dropdown-item @click="logout" divided>退出登录</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
	<!-- passwordDialog -->
	<PasswordDialog ref="passwordRef"></PasswordDialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import PasswordDialog from "./PasswordDialog.vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { GlobalStore } from "@/store";

const router = useRouter();
const globalStore = GlobalStore();

// 退出登录
const logout = () => {
	ElMessageBox.confirm("您是否确认退出登录?", "温馨提示", {
		confirmButtonText: "确定",
		cancelButtonText: "取消",
		type: "warning"
	}).then(() => {
		router.replace('/');
		//清空
		globalStore.setToken("");
		ElMessage({
			type: "success",
			message: "退出登录成功！"
		});
	});
};

interface DialogExpose {
	openDialog: () => void;
}
const infoRef = ref<null | DialogExpose>(null);
const passwordRef = ref<null | DialogExpose>(null);
// 打开修改密码和个人信息弹窗
const openDialog = () => {
	passwordRef.value?.openDialog();
};
</script>

<style scoped lang="scss">
@import "../index.scss";
</style>
