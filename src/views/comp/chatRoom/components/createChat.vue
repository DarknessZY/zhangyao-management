// CreateChat.vue
<template>
  <div>
    <ElButton type="primary" @click="newRoom('create')">{{ title.create }}</ElButton>
    <ElButton @click="newRoom('join')">{{ title.join }}</ElButton>

    <ElDialog v-model="state.roomShow" :title="title[state.type]" width="22%">
      <ElInput v-model.trim="state.room" @keyup.enter="handleOk" placeholder="请输入4位数字房间号" />
      <ElInput style="margin-top: 2vh; display: block;" v-model.trim="state.name" @keyup.enter="handleOk"
        placeholder="请输入姓名" />
      <div class="button">
        <ElButton type="primary" @click="handleOk"> 确定 </ElButton>
        <ElButton @click="close">取消</ElButton>
      </div>
    </ElDialog>
  </div>
</template>
<script lang="ts" setup>
type DataType = {
  newMessage: string;
  room: number | '';
  roomShow: boolean;
  messages: {
    id: Date;
    text: string;
    name: string;
  }[];
  socket: any;
  name: string;
  type: string
};

import { ElButton, ElInput, ElMessage, ElDialog } from "element-plus";
import { reactive } from "vue";

const emit = defineEmits(['changeRoom'])
const state: DataType = reactive({
  newMessage: "",
  roomShow: false,
  room: '',
  name: '',
  messages: [],
  socket: null,
  type: ''
});
const title = ref<any>({
  create: '创建房间',
  join: '加入房间'
})

const newRoom = (type: string) => {
  state.roomShow = true;
  state.type = type
};

const handleOk = () => {
  const reg = /^\d{4}$/
  if (!state.room || !state.name) {
    ElMessage.error('请输入正确的房间号和名字')
    return
  }
  if (!reg.test(String(state.room))) {
    ElMessage.error('请输入正确4位数字的房间号')
    return
  }
  state.roomShow = false;
  emit('changeRoom', { name: state.name, roomId: state.room, type: state.type })
}
const close = () => {
  state.roomShow = false;
}
</script>
  
<style scoped lang="scss">
.el-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.button {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
