<template>
  <div class="upload content-box">
    <!-- 单图上传 -->
    <div class="card img-box">
      <span class="text">单图片上传组件 🚀🚀🚀🚀(上传图片接口:http://zyao.yaoyaoqiekenao.com/api/upload)</span>
      <div class="upload-list">
        <UploadImg v-model:image-url="avatar1" :file-size="3">
          <template #tip> 上传图片最大为 3M </template>
        </UploadImg>
        <UploadImg v-model:image-url="avatar2" :drag="true" border-radius="50%">
          <template #empty>
            <el-icon>
              <Avatar />
            </el-icon>
            <span>请上传头像</span>
          </template>
          <template #tip> 圆形组件（可拖拽上传） </template>
        </UploadImg>
      </div>
      <el-descriptions title="配置项 ⚙" :column="1" border>
        <el-descriptions-item label="imageUrl">
          双向绑定的 imageUrl 值，使用示例： v-model:image-url="avatar"
        </el-descriptions-item>
        <el-descriptions-item label="api">
          上传图片的 api 方法，一般项目上传都是同一个 api 方法，在组件里直接引入即可（非必传）
        </el-descriptions-item>
        <el-descriptions-item label="drag"> 是否支持拖拽上传图片，默认为 true </el-descriptions-item>
        <el-descriptions-item label="disabled"> 是否禁用 上传、删除 功能，可查看图片 </el-descriptions-item>
        <el-descriptions-item label="fileSize"> 单个图片文件大小限制，默认为 5M </el-descriptions-item>
        <el-descriptions-item label="fileType">
          图片类型限制，默认类型为 ["image/jpeg", "image/png", "image/gif"]
        </el-descriptions-item>
        <el-descriptions-item label="height"> 组件高度样式，默认为 "150px" </el-descriptions-item>
        <el-descriptions-item label="width"> 组件宽度样式，默认为 "150px" </el-descriptions-item>
        <el-descriptions-item label="borderRadius"> 组件边框圆角样式，默认为 "8px" </el-descriptions-item>
      </el-descriptions>
    </div>
    <!-- 多图上传 -->
    <div class="card img-box">
      <span class="text">多图片上传组件 🚀🚀🚀🚀</span>
      <UploadImgs v-model:file-list="fileList" :drag="false">
        <template #empty>
          <el-icon>
            <Picture />
          </el-icon>
          <span>请上传照片</span>
        </template>
        <template #tip> 圆形组件，图片最大为 5M </template>
      </UploadImgs>
      <!-- 描述 -->
      <el-descriptions title="配置项 ⚙（其它参数和单图上传组件相同）" :column="1" border>
        <el-descriptions-item label="fileList">
          双向绑定的 fileList 值，使用示例： v-model:file-list="fileList"
        </el-descriptions-item>
        <el-descriptions-item label="limit"> 最大图片上传数，默认为 5 张 </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script setup lang="ts">
import UploadImg from '@/components/Upload/img.vue'
import UploadImgs from '@/components/Upload/imgs.vue'
const formData = ref<any>({
  imageUrl: []
})
const fileList = ref([])
const avatar1 = ref('')
const avatar2 = ref('')
</script>

<style scoped>
.upload {
  height: auto;

  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    .upload-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      width: 90%;
      margin: 10px 0;
    }
  }

  .img-box {
    margin-bottom: 10px;
  }

  .form-box {
    display: flex;
    justify-content: space-around;
    width: 100%;

    .card {
      margin-right: 10px;

      &:last-child {
        margin-right: 0;
      }

      .el-form {
        width: 100%;
      }
    }
  }
}
</style>