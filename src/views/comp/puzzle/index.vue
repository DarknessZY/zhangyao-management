<template>
  <div>
    <div>
      <el-button type="primary" @click="open">打开拼图验证</el-button>
    </div>
    <el-icon v-if="isShowParams" size="35" style="position: fixed; z-index: 1000;color: white;left: 68%;" @click="close">
      <CloseBold />
    </el-icon>
    <puzzleCode ref="puzzleCodeRef" :isShowParams="isShowParams" :contentInfoParams="contentInfoParams"
      @sliderVerify="sliderVerify" @codeImgReset="codeImgReset"></puzzleCode>
  </div>
</template>

<script setup lang="ts">
import puzzleCode from '@/views/comp/puzzle/components/puzzle.vue'
import { ElMessage } from 'element-plus';
const isShowParams = ref<boolean>(false)
const contentInfoParams = reactive({
  contentWidth: 275, // 主图宽度
  contentHeight: 180, // 主图高度
  smallWidth: 55, // 拼图宽度
  smallHeight: 45, // 拼图高度
  bigImage: '', // 主图 base64码
  smallImage: '', // 小拼图 base64码
  imageUrl: '', // 完整图 s3地址
  yHeight: '' // 小拼图在y轴的高度
})

/**
 * 更新拼图验证图片
 */
const codeImgReset = async () => {
  ElMessage.success('我刷新了')
}

const puzzleCodeRef: any = ref(null) // 拼图验证弹窗ref容器
/**
 * 拼图验证回调
 * @param requestNo
 * @param moveLength
 */
const sliderVerify = async (requestNo: any, moveLength: any) => {
  if (moveLength > 100 && moveLength < 150) {
    puzzleCodeRef.value.successShow()
  } else {
    puzzleCodeRef.value.failShow()
  }
}
const open = () => {
  isShowParams.value = true
}
const close = () => {
  isShowParams.value = false
}
onMounted(() => {
  isShowParams.value = true
  ElMessage.success('因为不会抠图，拼图移动到中间就算成功')
})
</script>

<style lang="scss" scoped></style>