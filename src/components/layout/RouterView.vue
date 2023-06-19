<template>
  <div>
    <keep-alive v-if="keepAlive">
      <router-view />
    </keep-alive>
    <router-view v-else />
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'

  const keepAlive = computed(() => {
    return useRoute().meta.keepAlive
  })
</script>