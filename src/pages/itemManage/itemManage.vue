<template>
  <div class="pagebg1">
    <div class="flex justify-between mb-[16px]">
      <div class="w-[25%] flex">
        <a-input v-model:value="itemValue" placeholder="请输入" />
        <a-button class="ml-[16px]">查询</a-button>
      </div>
      <div>
        <a-button type="primary">新增</a-button>
      </div>
    </div>
  
    <a-table
      :columns="columns"
      :data-source="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
      @resizeColumn="handleResizeColumn"
    >
      <!-- <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === 'name'">{{ text.first }} {{ text.last }}</template>
      </template> -->
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue";

const itemValue = ref('')

onMounted(() => {
  onload()
})

const columns = ref([
  {
    title: 'Name',
    dataIndex: 'name',
    width: '20%',
    resizable: true,
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    width: '20%',
    resizable: true,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    resizable: true,
  },
])
const data = ref<any[]>([])
const loading = ref(false)
const current = ref(1)
const pageSize = ref(10)
const total = ref(0)
const pagination = computed(() => ({
  total: total.value,
  current: current.value,
  pageSize: pageSize.value,
  showTotal: (total:any) => `共 ${total} 条`,
}))
const handleTableChange = (pag:any, filters:any, sorter:any) => {
  current.value = pag.current
  pageSize.value = pag.pageSize
  onload()
}
const onload = () => {
  loading.value = true
  const params = {

  }
  setTimeout(() => {
    let list:any[] = []
    new Array(10).fill(1).forEach((item:any, i:any) => {
      list.push({
        name: '名称'+i,
        gender: '男',
        email: '1@2.com',
        key: new Date().getTime()
      })
    })
    data.value = list
    total.value = Math.ceil(Math.random()*1000)
    loading.value = false
  }, 2000)
}
const handleResizeColumn = (w:any, col:any) => {
  col.width = w;
}
</script>

<style lang="less" scoped>

</style>