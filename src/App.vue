<script setup lang="ts">
import zhCn from "element-plus/lib/locale/lang/zh-cn";

let locale = zhCn
</script>

<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<style scoped>
</style>
