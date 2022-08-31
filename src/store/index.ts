import { defineStore } from 'pinia'
export const useMainStore = defineStore({
    id: 'mian',
    state: () =>({
      name: '超级管理员'
    })
  })