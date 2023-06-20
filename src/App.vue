<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN'
console.log(import.meta.env.VITE_LOCATION)
</script>

<template>
  <a-config-provider :locale="zhCN">
    <RouterView />
  </a-config-provider>
</template>

<style scoped>
</style>
