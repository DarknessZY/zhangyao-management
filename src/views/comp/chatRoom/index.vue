<template>
  <div class="chatRoom content-box">
    <CreateChat v-if="!state.roomId" @changeRoom="changeRoom"></CreateChat>
    <room v-else :state="state" @changeRoom="changeRoom"></room>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import room from '@/views/comp/chatRoom/components/room.vue'
import CreateChat from '@/views/comp/chatRoom/components/createChat.vue'

const state = reactive({
  name: '',
  roomId: 0,
  type: ''
})
const changeRoom = (newInfo: any) => {
  state.name = newInfo.name
  state.roomId = newInfo.roomId
  state.type = newInfo.type
}
</script>
<style lang="scss" scoped>
.chatRoom {
  height: auto;
}
</style>