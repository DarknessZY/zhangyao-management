<template>
  <div :class="['puzzle-container', isShow ? 'show_' : '']">
    <div class="puzzle-box" @mousedown.stop @touchstart.stop>
      <!-- 图片区域 -->
      <div class="content" :style="`height:${contentInfo.contentHeight}px;width:${contentInfo.contentWidth}px`">
        <!-- 验证成功后展示一瞬间完整图 -->
        <div :class="[infoBoxShow ? 'show_img' : 'notshow_img']">
          <img :src="contentInfo.imageUrl" :height="contentInfo.contentHeight" :width="contentInfo.contentWidth" />
        </div>
        <!-- 服务端给的主图 -->
        <div v-if="contentInfo.bigImage" :class="[infoBoxShow ? 'notshow_img' : 'show_img']">
          <img :src="contentInfo.bigImage" :height="contentInfo.contentHeight" :width="contentInfo.contentWidth" />
        </div>
        <!-- 服务端给的切片图(一般带了点阴影)  其中后面减去2px是阴影或者border的宽度  25是设置的padding需要+加上-->
        <div v-if="contentInfo.smallImage" :class="['image-smallImage', infoBoxShow ? 'notshow_img' : 'show_img']" :style="`position: fixed;top:${25 + contentInfo.yheight}px;left:${styleWidth - sliderBaseSize + Math.floor(contentInfo.smallWidth / 2) - 2
          }px;`">
          <img :src="contentInfo.smallImage" :height="contentInfo.smallHeight" :width="contentInfo.smallWidth" />
        </div>
        <!-- 提示信息 -->
        <div :class="{
          'info-box': true,
          show: infoBoxShow,
          fail: infoBoxFail
        }">
          {{ infoBoxShow ? successText : failText }}
        </div>
        <!-- 刷新 -->
        <div :class="{ flash: true }">
          <img class="reset" @click="reset" :src="resetImage" />
        </div>
      </div>
      <!-- 滑块区域 -->
      <div class="control">
        <div class="range-box" :style="`height:40px`">
          <div class="range-text">{{ sliderText }}</div>
          <div class="range-slider" ref="rangeSlider" :style="`width:${styleWidth}px`">
            <div :class="{ 'range-btn': true, isDown: mouseDown }" :style="`width:${sliderBaseSize}px`"
              @mousedown="onRangeMouseDown($event)" @touchstart="onRangeMouseDown($event)">
              <!-- 用于设置伪类，滑块active时的效果 -->
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import bg from '@/assets/images/bgCode.png'
import gap from '@/assets/images/gap.png'
import resetSvg from '@/assets/images/reset.png'
import type { ContentInfo } from './types/puzzleCode'
const props = defineProps({
  isShowParams: Boolean,
  contentInfoParams: Object
})
const emits = defineEmits(['sliderVerify', 'codeImgReset'])
watch(
  () => props.isShowParams,
  newVal => {
    isShow.value = newVal
  }
)
// eslint-disable-next-line
watch(props.contentInfoParams, newVal => {
  Object.assign(contentInfo, newVal)
})

onMounted(() => {
  // 监听鼠标按下拖动滑块时的移动，用于计算滑块移动距离
  document.addEventListener('mousemove', onRangeMouseMove, false)
  document.addEventListener('touchmove', onRangeMouseMove, {
    passive: false
  })
  // 监听鼠标按下拖动滑块松开时
  document.addEventListener('mouseup', onRangeMouseUp, false)
  document.addEventListener('touchend', onRangeMouseUp, false)
})
onBeforeUnmount(() => {
  clearTimeout(timer1.value)
  // 监听鼠标按下拖动滑块时的移动，用于计算滑块移动距离
  document.removeEventListener('mousemove', onRangeMouseMove, false)
  document.removeEventListener('touchmove', onRangeMouseMove)
  // 监听鼠标按下拖动滑块松开时
  document.removeEventListener('mouseup', onRangeMouseUp, false)
  document.removeEventListener('touchend', onRangeMouseUp, false)
})
const isShow = ref<boolean>(false) // 拼图验证是否展示

const contentInfo = reactive<ContentInfo>({
  contentWidth: 275, // 主图宽度
  contentHeight: 180, // 主图高度
  smallWidth: 55, // 拼图宽度
  smallHeight: 45, // 拼图高度
  bigImage: bg, // 主图 base64码
  smallImage: gap, // 小拼图 base64码
  imageUrl: bg, // 完整图 s3地址
  yheight: 50, // 小拼图在y轴的高度
  requestNo: '' // 请求流水号
})
const resetImage = ref<string>(resetSvg) // 刷新的图片
const infoText = ref<string>('') // 提示信息
const sliderText = ref<string>('拖动滑块完成拼图')

const mouseDown = ref<boolean>(false) //鼠标是否在按钮上按下
const startX = ref<number>(0) // 鼠标按下时的X
const newX = ref<number>(0) // 鼠标当前的偏移X
const sliderBaseSize = ref<number>(contentInfo.smallWidth) // 滑块的大小和拼图大小最好一致
const startWidth = ref<number>(sliderBaseSize.value) // 滑块默认在的位置
const rangeSlider = ref<any>(null) //滑块dom
/** 计算滑块的位置*/
const styleWidth = computed(() => {
  const w = startWidth.value + newX.value - startX.value
  const res = w < sliderBaseSize.value ? sliderBaseSize.value : w > contentInfo.contentWidth ? contentInfo.contentWidth : w
  return res
})
/**
 * 鼠标按下准备拖动
 * @param event
 */
const onRangeMouseDown = (e: any) => {
  mouseDown.value = true
  startWidth.value = rangeSlider.value.clientWidth
  newX.value = e.clientX || e.changedTouches[0].clientX
  startX.value = e.clientX || e.changedTouches[0].clientX
}
/**
 * 鼠标移动
 * @param event
 */
const onRangeMouseMove = (e: any) => {
  if (mouseDown.value) {
    e.preventDefault()
    newX.value = e.clientX || e.changedTouches[0].clientX
  }
}
/**
 * 鼠标抬起,并调用接口开始判断
 */
const onRangeMouseUp = () => {
  if (mouseDown.value) {
    mouseDown.value = false
    submit()
  }
}
/**
 * 验证结果
 */
const timer1 = ref<any>(null)
const infoBoxShow = ref<boolean>(false)
const infoBoxFail = ref<boolean>(false)
const successText = ref<string>('验证通过！')
const failText = ref<string>('验证失败，请重试')
const submit = () => {
  const XMoveLength = styleWidth.value - sliderBaseSize.value
  emits('sliderVerify', contentInfo.requestNo, XMoveLength)
  timer1.value = clearTimeout(timer1.value)
  timer1.value = setTimeout(() => {
    reset()
  }, 800)
}
/**
 * 成功回调
 */
const successShow = () => {
  infoBoxFail.value = false
  infoBoxShow.value = true
}
/**
 * 失败回调
 */
const failShow = () => {
  infoBoxShow.value = false
  infoBoxFail.value = true
}
/**
 * 重新加载图片
 */
const reset = () => {
  // 位置初始化
  startX.value = 0
  newX.value = 0
  // 提示初始化
  infoBoxShow.value = false
  infoBoxFail.value = false
  timer1.value = clearTimeout(timer1.value)
  infoText.value = sliderText.value
  emits('codeImgReset')
}

defineExpose({
  successShow,
  failShow
})
</script>

<style lang="scss">
.puzzle-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  pointer-events: none;
  background-color: rgb(0 0 0 / 30%);
  opacity: 0;
  transition: opacity 200ms;

  &.show_ {
    pointer-events: auto;
    opacity: 1;
  }
}

.puzzle-box {
  position: absolute;
  top: 45%;
  left: 50%;
  padding: 25px;
  user-select: none;
  background: #ffffff;
  border-radius: 3px;
  box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
  transform: translate(-50%, -50%);

  .content {
    position: relative;
    overflow: hidden;
    border-radius: 3px;

    .notshow_img {
      display: none;
    }

    .show_img {
      display: inline-block;
    }

    .image-smallImage {
      // position: fixed;
      // box-shadow: 0 0 1px rgb(0 0 0 / 50%);
    }

    .info-box {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 10;
      width: 100%;
      height: 30px; // 提示框高度
      overflow: hidden;
      font-size: 13px;
      line-height: 30px;
      color: #ffffff;
      text-align: center;
      background-color: #83ce3f;
      opacity: 0;
      transition: all 200ms;
      transform: translateY(24px);

      &.show {
        opacity: 0.95;
        transform: translateY(0);
      }

      &.fail {
        background-color: #ce594b;
        opacity: 0.95;
        transform: translateY(0);
      }
    }

    .flash {
      position: absolute;
      top: 3%;
      right: 3%;
      z-index: 3;

      & img {
        width: 30px;
      }

      &:hover img {
        cursor: pointer;
        transition: transform 0.3s ease;
        transform: rotate(90deg);
      }
    }
  }

  .control {
    position: relative;
    top: 50%;
    height: 60px;

    .range-box {
      position: absolute;
      width: 100%;
      margin-top: 20px;
      background-color: #eef1f8;
      border-radius: 3px;
      box-shadow: 0 0 8px rgb(240 240 240 / 60%) inset;

      .range-text {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        overflow: hidden;
        font-size: 14px;
        color: #b7bcd1;
        text-align: center;
        text-overflow: ellipsis;
        white-space: nowrap;
        transform: translate(-50%, -50%);
      }

      .range-slider {
        position: absolute;
        width: 50px;
        height: 100%;
        background-color: rgb(106 160 255 / 80%);
        border-radius: 3px;

        .range-btn {
          position: absolute;
          right: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 100%;
          cursor: pointer;
          background-color: #ffffff;
          border-radius: 3px;
          box-shadow: 0 0 4px #cccccc;

          &>div {
            width: 0;
            height: 40%;
            border: solid 1px #6aa0ff;
            transition: all 200ms;

            &:nth-child(2) {
              margin: 0 4px;
            }
          }

          &:hover,
          &.isDown {
            &>div:first-child {
              height: 0;
              border: solid 4px transparent;
              border-right-color: #6aa0ff;
            }

            &>div:nth-child(2) {
              height: 0;
              margin: 0 6px;
              border-width: 3px;
              border-right-color: #6aa0ff;
              border-radius: 3px;
            }

            &>div:nth-child(3) {
              height: 0;
              border: solid 4px transparent;
              border-left-color: #6aa0ff;
            }
          }
        }
      }
    }
  }
}
</style>
