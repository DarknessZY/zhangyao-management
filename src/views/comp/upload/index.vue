<template>
  <div class="upload content-box">
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
    </div>
    <!-- 单图上传 -->
    <div class="card img-box">
      <span class="text">单图片上传组件 🚀🚀🚀🚀</span>
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