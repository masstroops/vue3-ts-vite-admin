<template>
  <a-sub-menu :key="menuInfo.key">
    <template #icon>
      <component v-if="menuInfo.meta.icon" :is="menuInfo.meta.icon" />
    </template>
    <template #title>{{ menuInfo.meta.title }}</template>
    <template v-for="item in menuInfo.children" :key="item.key">
      <template v-if="!item.children">
        <a-menu-item :key="item.key">
          <template #icon>
            <component v-if="item.meta.icon" :is="item.meta.icon" />
          </template>
          <router-link :to="item.path">
            {{ item.meta.title }}
          </router-link>
        </a-menu-item>
      </template>
      <template v-else>
        <my-sub-menu :menu-info="item" :key="item.key" />
      </template>
    </template>
  </a-sub-menu>
</template>

<script setup lang="ts">
  defineProps<{
    menuInfo: any
  }>()
</script>
