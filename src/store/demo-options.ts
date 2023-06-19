import { defineStore } from 'pinia'

interface User {
  token: string,
  userInfo: any
}

export const useUserOptionsStore = defineStore('userForOptions', {
  state: (): User => ({
    token: '',
    userInfo: {},
  }),
  getters: {},
  actions: {
    setToken(token: string) {
      this.token = token
    },
    setUserInfo(userInfo: any) {
      this.userInfo = userInfo
    }
  },
})