<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <!-- <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <user-outlined />
          <span>nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <video-camera-outlined />
          <span>nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <upload-outlined />
          <span>nav 3</span>
        </a-menu-item>
      </a-menu> -->
      <!-- <SMenu mode="inline" theme="dark" :menu="menus" /> -->
      <MyMenu :collapsed="collapsed" />
    </a-layout-sider>
    <a-layout style="height: 100%;overflow-y: scroll;">
      <a-layout-header>
        <a-row justify="space-between" align="middle">
          <a-col :span="3">
            <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
            <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
          </a-col>
          <a-col :span="21" style="text-align:right;">
            <PageHeader />
          </a-col>
        </a-row>
      </a-layout-header>
      <a-layout-content :style="{ minHeight: '280px' }">
        <PageContent />
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script setup lang="ts">
  import { UserOutlined, VideoCameraOutlined, UploadOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
  import { ref } from 'vue';
  import PageContent from './pageContent.vue'
  import PageHeader from './pageHeader.vue'
  import MyMenu from './myMenu.vue'
  import { routes } from '@/routers'


  const selectedKeys = ref(['1'])
  const collapsed = ref(false)
  const menus = routes
</script>
<style lang="less">
#components-layout-demo-custom-trigger {
  height: 100vh;
  .ant-layout-sider {
    height: 100%;
    overflow-y: scroll;
  }
  .ant-layout-header {
    background: #fff;
    padding: 0;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    position: relative;
  }
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
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
::-webkit-scrollbar {
  width:5px;
  height:10px;
}
/* 滚动条的滑轨背景颜色 */
::-webkit-scrollbar-track {
  background-color: #b46868;
  display: none;
} 
/* 滑块颜色 */
::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2); 
  border-radius: 2px;
} 
/* 滑轨两头的监听按钮颜色 */
::-webkit-scrollbar-button {
  background-color: #7c2929;
  display: none;
}
</style>