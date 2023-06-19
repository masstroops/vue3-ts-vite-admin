<template>
  <div class="page-content">
    <div class="page-header-index-wide">
      <a-breadcrumb class="breadcrumb">
        <a-breadcrumb-item v-for="(item, index) in breadList" :key="index">
          <router-link v-if="item.name != name" :to="{ path: item.path }">
            {{ item.meta.title }}
          </router-link>
          <span v-else>{{ item.meta.title }}</span>
        </a-breadcrumb-item>
      </a-breadcrumb>
      <div class="slot">
        <slot name="head"></slot>
      </div>
    </div>

    <div class="main">
      <router-view/>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'
  import { useRoute } from 'vue-router'
  const route = useRoute()
  console.log(route);
  const breadList = ref([])
  const name = ref('')
  const getBreadcrumb = (list: any) => {
    let arr = list.map((item: any, i: any) => {
      return {
        path: item.path,
        name: item.name,
        meta: item.meta,
        redirect: item.redirect
      }
    })
    name.value = arr[arr.length - 1].name
    breadList.value = arr
  }
  getBreadcrumb(route.matched)
  watch(
    () => route.matched,
    (list) => {
      getBreadcrumb(list)
    }
  )
</script>

<style lang="less" scoped>
.page-content {
  .page-header-index-wide {
    display: flex;
    justify-content: space-between;
    height: 45px;
    align-items: center;
    background: #fff;
    border-bottom: 1px solid #e8e8e8;
    padding: 0 20px;
  }
  .breadcrumb {
    display: inline-block;
    span:last-child {
      color: rgba(0, 0, 0, .65);
    }
  }
  .main {
    margin: 24px 24px 0;
  }
}
</style>