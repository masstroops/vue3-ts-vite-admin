<template>
  <div>
    {{ arr }}
  </div>
</template>

<script>
import { watch } from '@vue/runtime-core'
export default {
  props: ['arr'],
  setup (props) {
    // watch(props.arr, (count, prevCount) => {
    //   /* ... */
    //   console.log(count);
    // })

    return {}
  }
}
</script>
