<template>
  <div class="bg">
    <div class="content">
      <div class="login-left">
        <div class="date">{{ date }}</div>
        <div class="englishTitle">KANGYANG</div>
        <div class="title">数字康养服务平台</div>
      </div>
      <div class="login-right">
        <div class="login-title">
          数字康养 <img class="img" src="../../assets/vue.svg" alt="" />
        </div>
        <a-form :model="form" class="login-form" @finish="submit">
          <a-form-item name="username" style="margin-bottom:30px;" :rules="[{ required: true, message: '请输入用户名' }]">
            <a-input v-model:value="form.username" size="large" placeholder="用户名">
               <template #prefix>
                <UserOutlined style="color: #444;font-size:15px;font-weight:300;" />
               </template>
            </a-input>
          </a-form-item>
          <a-form-item name="password" style="margin-bottom:30px;" :rules="[{ required: true, message: '请输入密码!' }]">
            <a-input-password v-model:value="form.password" type="password" size="large" placeholder="密码">
              <template #prefix>
                <LockOutlined style="color: #444;font-size:15px;font-weight:300;" />
              </template>
            </a-input-password>
          </a-form-item>
          <a-form-item style="padding-top:25px">
            <a-button type="primary" size="large" html-type="submit" class="login-form-button" :loading="loading">登录</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref, onBeforeMount } from 'vue'
  import { useUserStore } from '@/store/user'
  import { notification } from 'ant-design-vue'
  import { useRouter } from 'vue-router'
  import moment from 'moment'
  import { login, getUser } from '@/api/user'

  const { setToken, setUserInfo } = useUserStore()
  const userSotre = useUserStore()
  const router = useRouter()
  const loading = ref(false)
  const form = reactive({
    username: '',
    password: '',
  })
  const submit = async(values: any) => {
    let data = {
      "username": values.username,
      "password": values.password
    }
    loading.value = true
    await login(data).then((res: any) => {
      if (res.success) {
        let token = res.data.tokenHead + res.data.token
        setToken(token)
      }
    }).catch(err => {
      notification[ 'error' ]({
        message: err.code,
        description: `${err.message}，欢迎回来`,
        duration: 2
      })
    })
    if (!userSotre.token) {
      loading.value = false
      return
    }
    await getUser().then((res: any) => {
      if (res.success) {
        setUserInfo(res.data)
        notification[ 'success' ]({
          message: '欢迎',
          description: `${res.data.realname}，欢迎回来`,
          duration: 2
        })
        router.push({ path: '/' })
      }
    })
    loading.value = false
  }

  const date = ref(moment().format('YYYY-MM-DD HH:mm:ss'))
  onBeforeMount(() => {
    setInterval(() => {
      date.value = moment().format('YYYY-MM-DD HH:mm:ss')
    }, 1000)
  })
</script>

<style lang="less" scoped>
body{
  background: url('../../assets/images/loginBG.jpg') no-repeat;
}
.bg{
  height: 100vh;
  width: 100%;
  background: url('../../assets/images/loginBG.jpg') no-repeat;
  background-size:cover;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
.content{
  width: 1000px;
  height:500px;
  margin: 0 auto;
  display: flex;
  box-shadow: -4px 5px 10px rgba(0,0,0,.4);
  border-radius: 5px;
  .login-left {
    background-color: hsla(0,0%,100%,.3);
    width: 500px;
    padding: 25px;
    .date {
      color: #666;
      font-size: 17px;
      font-weight: 200;
      opacity: .9;
    }
    .englishTitle {
      color: #444;
      font-size: 45px;
      font-weight: 600;
      letter-spacing: 4px;
      text-align: center;
      margin-top: 100px;
    }
    .title {
      color: #444;
      font-size: 25px;
      letter-spacing: 4px;
      margin-top: 100px;
      text-align: center;
      font-weight: 700;
    }
  }
  .login-right {
    background-color:hsla(0,0%,100%,.8);
    width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .login-title {
      text-align:center;
      color:#333;
      white-space: nowrap;
      font-size: 22px;
      margin: 30px 0 40px;
      letter-spacing: 2px;
      .img {
        width: 26px;
        margin-left: 2px;
        display: inline;
      }
    }
    .login-form{
      width: 330px;
      height: 280px;
      // background:#fff;
      border-radius: 5px;
      padding:15px;
      box-sizing: border-box;
      h3{
        font-size: 16px;
        color: #333;
        text-align: center;
        margin-bottom:20px;
        font-weight:600;
      }
      .login-form-forgot {
        float: right;
      }
      .login-form-button {
        width: 100%;
      }
      :deep(.ant-input) {
        // background: rgba(0,0,0,.2);
      }
      :deep(.ant-input-affix-wrapper) .ant-input:not(:first-child) {
        background: unset;
        border: 0;
        border-bottom: 1px solid #fff;
        border-radius: 0;
        outline: 0 !important;
      }
    }
  }
  
}
:deep(input::-webkit-input-placeholder) { /* WebKit browsers */ 
    color: rgba(0,0,0,.35);
    font-size: 14px;
} 
:deep(input:-moz-placeholder) { /* Mozilla Firefox 4 to 18 */ 
    color: rgba(0,0,0,.35);
} 
:deep(input::-moz-placeholder) { /* Mozilla Firefox 19+ */ 
    color: rgba(0,0,0,.35);
} 
:deep(input:-ms-input-placeholder) { /* Internet Explorer 10+ */ 
    color: rgba(0,0,0,.35);
}
</style>
