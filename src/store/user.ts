import { defineStore } from "pinia"
import { ref } from "vue"

export const useUserStore = defineStore('userStore', () => {
  const token = ref<string>('')
  const setToken = (token1: string) => {
    token.value = token1
    localStorage.MY_ACCESS_TOKEN = token1
  }

  const userInfo = ref<any>({})
  const setUserInfo = (userInfo1: any) => {
    userInfo.value = userInfo1
    localStorage.USERINFO = JSON.stringify(userInfo1)
  }

  const logout = () => {
    token.value = ''
    userInfo.value = {}
  }

  const getUserInfo = () => {
    let token2: string = localStorage.getItem('MY_ACCESS_TOKEN') as string || ''
    let info = JSON.parse(localStorage.getItem('USERINFO') as string || '')
    userInfo.value = info || {}
    token.value = token2
  }

  return {
    token,
    setToken,
    userInfo,
    setUserInfo,
    logout,
    getUserInfo,
  }
})