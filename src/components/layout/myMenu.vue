<template>
  <a-menu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
    >
    <template v-for="item in list" :key="item.key">
      <template v-if="!item.children">
        <a-menu-item :key="item.key">
          <template #icon>
            <svg-icon v-if="item.meta.icon" :icon-class="item.meta.icon" />
          </template>
          <router-link :to="item.path">
            {{ item.meta.title }}
          </router-link>
        </a-menu-item>
      </template>
      <template v-else>
        <MySubMenu :key="item.key" :menu-info="item" />
      </template>
    </template>
  </a-menu>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'
  import { useRoute, onBeforeRouteUpdate } from 'vue-router'
  import { usePermissionStore } from '@/store/permission'
  import MySubMenu from './mySubMenu.vue'

  defineProps<{
    collapsed?: boolean
  }>()

  const { addRouters } = usePermissionStore()
  const setMenu = (list: any[], parentKey: string) => {
    const list_:any[] = []
    list.forEach((item: any, i) => {
      item.meta = item.meta || {}
      item.key = item.path || (item.children ? 'submenu_' : 'menuitem_') + parentKey + '_' + i
      if (item.hidden) return
      if (item.children && item.children.length) {
        let parentKey_ = parentKey + '_' + i
        item.children = setMenu(item.children, parentKey_)
      }
      list_.push(item)
    })
    return list_
  }
  const list = setMenu(addRouters[0].children, '0')
  
  const selectedKeys = ref<any[]>([])
  const openKeys = ref<any[]>([])
  const route = useRoute()
  const setSelectKeys = (route: any, r: any) => {
    // const route = route.matched.concat()
    if (route.length >= 4 && r.meta.hidden) {
      route.pop()
      selectedKeys.value = [ route[2].path ]
    } else {
      selectedKeys.value = [ route.pop().path ]
    }
    route.forEach((item: any) => {
      openKeys.value.push(item.path)
    })
  }
  setSelectKeys(route.matched.concat(), route)
  watch(() => route.path,
  () => {
    setSelectKeys(route.matched.concat(), route)
  })

</script>

<style lang="less" scoped>

</style>