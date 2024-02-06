<template>
  <div class="content">
    <div class="friend-link" v-for="(item, index) in friendList" :key="index">
      <a :href="item.url" target="_blank" rel="noopener noreferrer" class="friend-link__link">
        <div class="friend-link__content">
          <img :src="item.imageUrl" :alt="item.name" class="friend-link__image" />
          <span class="friend-link__name">{{ item.name }}</span>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
const friendList = ref([
  {
    name: ' 个人博客',
    url: 'https://yaoyaoqiekenao.com/',
    imageUrl: 'https://i.postimg.cc/4NPP70XZ/20191214133049-yybdz.gif',
  },
  {
    name: ' DarknessZY',
    url: 'hhttps://juejin.cn/user/1781681116679854/columns/',
    imageUrl: 'https://yaoyaoqiekenao.com/images/github.png',
  },
  {
    name: ' 耀耀切克闹灬',
    url: 'https://juejin.cn/user/1781681116679854/columns/',
    imageUrl: 'https://yaoyaoqiekenao.com/images/juejin.png',
  },
  {
    name: ' vite官网',
    url: 'https://cn.vitejs.dev/',
    imageUrl: 'https://cn.vitejs.dev/logo.svg',
  },
  {
    name: ' Vue3官网',
    url: 'https://cn.vuejs.org/',
    imageUrl: 'https://v2.cn.vuejs.org/images/logo.svg',
  },
  {
    name: ' ElementPlus官网',
    url: 'https://element-plus.org/zh-CN/',
    imageUrl: 'https://element-plus.org/images/element-plus-logo.svg',
  },
])
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>