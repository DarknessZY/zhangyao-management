import { defineStore, createPinia } from 'pinia'
import { GlobalState } from './interface'
export const GlobalStore = defineStore({
    id: 'GlobalState',
    state: (): GlobalState =>({
      token: '',//token
      userInfo: '',//用户信息
    }),
    getters: {

    },
    actions: {
      // setToken
      setToken(token: string) {
        this.token = token;
      },
      // setUserInfo
      setUserInfo(userInfo: any) {
        this.userInfo = userInfo;
      },
    },
    persist: {
      enabled: true , // 这个配置代表存储生效，而且是整个store都存储
    }
});
const pinia = createPinia();

export default pinia;