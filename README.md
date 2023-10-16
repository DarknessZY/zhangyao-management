# Vuejs3.2+Vite2+ElementPlus后台管理系统模板

## 简介

1.一个免费开源的后台管理系统模板。使用最新的主流技术开发，开箱即用（主要是对自己的学习技术的运用，读万卷书不如行万里路，敲出bug才有感觉）。
2.主要向以下两个高star的后台管理系统模板的源码进行学习，并根据需求进行取舍和优化改进。

```
vue-vben-admin 使用了最新的vue3 ,vite2,TypeScript,antdv等主流技术开发 (代码量非常庞大和复杂...)
vue-element-admin 是一个后台前端解决方案，它基于vuu2 和 element ui (作者还没开发出vue3版本)
同时搭建时还主要看了：
    1.https://juejin.cn/post/7036745610954801166#heading-21
    2.https://juejin.cn/post/7112997234505383950
    3.https://juejin.cn/user/3456520289517608/posts
 el-table的二次封装借鉴了：
    1.https://juejin.cn/post/7114572243518095373 
    刚毕业，会的技术和开发经验也不多，主要依葫芦画瓢，有很多不懂得地方就没做，所以看起来东西很少，后面慢慢学吧
image.png
```

<br/>

## 目录结构

```
src/
!--- assets 公共文件(放图片，自定义图标，json文件等）
!--- components 公共组件
!--- config 全局设置 
!--- hooks 逻辑钩子封装
!--- layout 页面整体布局及各组件
!--- plugins 插件（自定义图标插件等)
!--- service 接口
!--- store pinia的各模块
!--- styles 公共样式
!--- typings 全局命名空间
!--- utils 常用工具方法
!--- view 页面
!--- App.vue 根节点
!--- mian.js 入口文件
```

## 技术

```
1.Vue.js 3.2 ： 一套用于构建用户界面的渐进式框架
2.Vite 3 ：基于ESM 的新型前端构建工具，能够显著提升前端开发体验
3.Vue Router 4 ：Vue.js 的官方路由。它与 Vue.js 核心深度集成
4.Pinia ：状态管理库，Vuex的替代者 (已成为官方项目)
5.Element Plus ：基于 Vue 3.0 的桌面端组件库
6.axios ：基于promise的HTTP请求库
7.echarts ：基于 JavaScript 的开源可视化图表库（还没开始）
8.SCSS ：动态样式语言，是强化CSS的辅助工具
```

## 特性

```
1.使用最新的前端主流技术栈进行开发
2.没有Vuex 这个用起来是真的麻烦！在vue3中更没必要加入它（个人看法）
3.详细的代码注释 注释多多益善，有总比没有好（个人看法）
4.SVG 插件
5.快捷导航
6.暂时没有登录，数据用的json
7.el-table二次封装方便你我他
```
