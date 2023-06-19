<template>
  <div>
    <a href="javascript:;" @click="goMap" style="margin-right:12px;">数据地图</a>
    <a-dropdown class="userDrop">
      <span class="user-dropdown-menu">
        <span>欢迎 {{ userInfo.username }}</span> <caret-down-outlined />
      </span>
      <template #overlay>
        <a-menu>
          <a-menu-item key="2" style="line-height:30px;width:180px;">
            <div @click="editPassword">
              <edit-outlined style="margin-right:8px;"/>
              <span>修改密码</span>
            </div>
          </a-menu-item>
          <a-menu-item key="1" style="line-height:30px;width:180px;">
            <div @click="logout">
              <logout-outlined style="margin-right:8px;"/>
              <span>退出登录</span>
            </div>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>

    <!-- 修改密码对话框 -->
    <a-modal :visible="editVisible" title="密码修改" :centered="true" @ok="editSubmit" @cancel="editCancel">
      <a-form :model="form">
        <a-row>
          <a-col :span="24">
            <a-form-item name="oldPassWord" label="原始密码" :rules="[{ required: true, message: '请输入原始密码' }]" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-password v-model:value="form.oldPassWord" placeholder="原始密码" style="width: 100%"></a-input-password>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item name="newPassWord" label="新密码" :rules="[{ required: true, message: '请输入新密码' }]" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-password v-model:value="form.newPassWord" placeholder="新密码" style="width: 100%"></a-input-password>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue'
  import { useUserStore } from '@/store/user'
  import { useRouter } from 'vue-router'
  import { CaretDownOutlined, EditOutlined, LogoutOutlined } from '@ant-design/icons-vue'
  
  const router = useRouter()
  const { userInfo, logout: logout2 } = useUserStore()

  const goMap = () => {
    router.push({ path: '/home' })
  }

  const logout = () => {
    logout2()
    router.push({ path: '/login' })
  }

  // 修改密码对话框
  const form = reactive({
    oldPassWord: '',
    newPassWord: '',
  })
  const editVisible = ref(false)
  const editPassword = () => {
    editVisible.value = true
  }
  // 修改密码框 确定事件
  const editSubmit = (values: any) => {
    let parameter = {
      username: userInfo.username,
      oldPassWord: values.oldPassWord,
      newPassWord: values.newPassWord,
    }
    // http('/user/change/password', 'POST', parameter).then((res: any) => {
    //   if(res.success) {
    //     this.$message.success('修改密码成功!')
    //     editVisible.value = false
    //     router.push({
    //       path: '/login'
    //     })
    //   } else {
    //     this.$message.error('修改密码失败!')
    //   }
    // })
  }
  // 修改密码框 取消事件
  const editCancel = () => {
    editVisible.value = false
  }

  const labelCol = { span: 4 }, wrapperCol = { span: 20 }
</script>

<style lang="less" scoped>
.userDrop {
  cursor: pointer;
  padding: 0 12px;
  display: inline-block;
  -webkit-transition: all .3s;
  transition: all .3s;
  height: 100%;
  color: rgba(0,0,0,.65);
  &:hover {
    background: rgba(0,0,0,.025);
  }
}
</style>