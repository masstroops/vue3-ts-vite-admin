<template>
  <div>
    汇总视图
    <a href="javascript:;" @click="goto">跳转</a>
    <!-- <Demo2 /> -->
    <child :arr="arr" />
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import Child from './child.vue'

// import Demo2 from '../../components/demo/demo2.vue'
export default {
  components: {
    Child,
    // Demo2,
  },
  setup() {
    const router = useRouter()
    const goto = () => router.push({ path: '/404' })

    const arr = ref([])
    let num = 0
    setInterval(() => {
      num += 1
      arr.value[0] = num
    }, 1000)
    return {
      goto,
      arr,
    }
  },
}
</script>