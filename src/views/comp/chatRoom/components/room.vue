<template>
  <div class="chat-container">
    <ElButton @click="leave">退出房间</ElButton>
    <p class="tc title">{{ connected ? `房间号：${state.roomId}` : '加入房间失败' }}</p>
    <p class="tc title">{{ `当前房间在线人数：${onlineUser}` }}</p>
    <div class="message">
      <div :class="{
        'center': item.type === 'join' || item.type === 'leave',
        'item': item.type !== 'join' && item.type !== 'leave',
        'item1': item.name !== state.name && item.type !== 'join' && item.type !== 'leave',
      }" v-for="(item, index) in receivedMessages" :key="index">
        <p class="join" v-if="item.type === 'join'">
          {{ item.message }}
        </p>
        <p class="leave" v-if="item.type === 'leave'">
          {{ item.message }}
        </p>
        <p class="msg">
          {{ item.text }}
        </p>
        <div class="user">
          <div class="user">{{ item.name }}</div>
        </div>
      </div>
    </div>
    <div v-if="connected">
      <textarea maxlength="100" class="message-input" v-model="message" placeholder="输入消息..." />
      <button class="submit" @click="sendMessage">发送</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElButton } from 'element-plus'
import { socket } from './socket'

const props: any = defineProps(['state'])
const emit = defineEmits(['changeRoom'])
const connected = ref(false);  // 是否成功链接到socket.io
const message = ref(''); // 发送的消息
const receivedMessages: any = ref([]); // 接受所有消息的集合
const onlineUser = ref<number>(0); // 当前房间的人数
/**
 * 创建或加入房间
 */
const createOrJoinRoom = () => {
  socket.emit("join", { roomId: props.state.roomId, name: props.state.name });
}
/**
 * 发送消息
 */
const sendMessage = () => {
  socket.emit('newMessage', { message: message.value, roomId: props.state.roomId, name: props.state.name, });
  message.value = '';
};
/**
 * 获取当前房间的人数
 */
const getOnlineUser = () => {
  socket.emit('getRoomUsers', { roomId: props.state.roomId });

}
/**
 * 退出房间
 */
const leave = () => {
  socket.emit('leave', { roomId: props.state.roomId, name: props.state.name });
  getOnlineUser()
  emit('changeRoom', { roomId: '', name: '' });
}
/**
 * 初始时 创建或加入房间 并监听消息
 */
onMounted(() => {
  createOrJoinRoom()
  getOnlineUser()
  socket.on('join', (e) => {
    connected.value = true;
    const arr = { message: e, type: 'join' };
    receivedMessages.value.push(arr);
  });
  socket.on('leave', (e) => {
    const arr = { message: e, type: 'leave' };
    receivedMessages.value.push(arr);
  })
  socket.on('newMessage', (e) => {
    receivedMessages.value.push(e)
  });
  socket.on('getRoomUsers', (e) => {
    onlineUser.value = e
  })
});
</script>


<style scoped lang="scss">
.chat-container {
  width: 45vw;
  margin: 0 auto;
  padding: 1vw;
  height: 100%;

  .title {
    font-size: 20px;
    font-weight: 600;
  }
}

.message-input {
  width: 100%;
  display: block;
  min-height: 10vh;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 1vw;
}

.message {
  overflow-y: auto;
  height: 40vh;
  margin-top: 2vh;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 1vh;
}

.center {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;

  .join {
    max-width: 45vw;
    color: rgb(121, 216, 233);
  }

  .leave {
    max-width: 45vw;
    color: rgb(255, 123, 0);
  }
}

.item {
  margin-bottom: 10px;
  padding: 5px 10px;

  display: flex;
  justify-content: flex-end;
  align-items: center;

  .msg {
    color: #fff;
    padding: 1vw;
    margin-right: 1vh;
    max-width: 60vw;
    height: 100%;
    overflow: hidden;
    background-color: #5d46da;
    border: 1px solid #eee;
    border-radius: 2vh;
    order: 1;
  }

  .user {
    display: flex;
    justify-content: flex-end;
    align-items: end;
    flex-direction: column;
    order: 2;

  }
}

.item1 {
  justify-content: flex-start;

  .user {
    order: 2;
    align-items: flex-start;
  }

  .msg {
    order: 3;
    margin-left: 1vh;
    margin-right: 0;
    background-color: #7dad6a;

  }
}

.submit {
  padding: 10px;
  background-color: #3e3cd4;
  width: 15vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  margin-top: 2vh;
  font-weight: 700;
  font-size: 16px;
  color: #fff;
  border-radius: 1vh;

  &:hover {
    background-color: #1410eb;
  }
}

.tc {
  text-align: center;
}
</style>
