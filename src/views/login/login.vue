<template>
  <div class="login-box">
    <div class="login-wrapper">
      <div class="title">用户登录</div>
      <div class="login-form">
        <el-form :model="form" autocomplete="off" @submit.prevent="">
          <el-form-item>
            <el-input v-model="form.userName" placeholder="请输入您的账号" @keydown.enter="focusNextInput" autocomplete="off"
              clearable>
              <template #prefix>
                <img class="input-img" :src="usernameImg" alt="" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input ref="passwordInput" v-model="form.passWord" placeholder="请输入您的密码" :type="inputType"
              @keydown.enter="passWordEnter" autocomplete="off">
              <template #prefix>
                <img class="input-img" :src="passwordImg" alt="" />
              </template>
              <template #suffix>
                <img v-show="form.passWord" class="input-img-suffix" :src="eyeImg" alt="" @click="handlePwImg" />
              </template>
            </el-input>
          </el-form-item>
        </el-form>
        <!-- 校验的错误的信息 -->
        <div v-if="errInfo" class="err-info">{{ errInfo }}</div>
        <el-button class="login-btn" type="primary" :disabled="isDisabled" @click="handleLogin">立即登录</el-button>
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts" name="login">
import { computed, defineComponent, reactive, ref } from "vue";
import { loginApi } from "@/service/moudles/login/login"
import { GlobalStore } from '@/store/index'
import router from "@/router";
import usernameImg from "@/assets/images/username.png";
import passwordImg from "@/assets/images/password.png";
import eyeCloseImg from "@/assets/images/eye-close.png";
import eyeOpenImg from "@/assets/images/eye-open.png";

const form = reactive({
  userName: "",
  passWord: "",
});
const errInfo = ref("");
const passwordInput: any = ref(null)
const focusNextInput = (event: any) => {
  if (event.keyCode === 13) {
    passwordInput.value.focus()
  }
}
const passWordEnter = (event: any) => {
  if (event.keyCode === 13) {
    if (localStorage.getItem('token')) return
    handleLogin()
  }
}
//计算监听用户输入是否为空，以此判断按钮是否能用
const isDisabled = computed(() => {
  return form.userName === "" || form.passWord === "";
});
//登录跳转
const goHome = async () => {
  const globalStore = GlobalStore()
  const res = await loginApi.login(form)
  console.log('登录res', res.data);
  if (res.data) {
    globalStore.token = res.data.token
    globalStore.userInfo = res.data.userInfo
    router.push({
      path: "/home/index",
    });
  }

};
const handleLogin = () => {
  goHome();
};
//密码的显示+
const inputType = ref("password");
const eyeImg = computed(() => {
  return inputType.value === "password" ? eyeOpenImg : eyeCloseImg;
});
const handlePwImg = () => {
  inputType.value = inputType.value === "password" ? "text" : "password";
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>