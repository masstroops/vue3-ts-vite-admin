<template>
  <a-modal :visible="visible" :title="title" @ok="submit" @cancel="cancel" width="800px">
    <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-row>
        <a-col :span="12">
          <a-form-item label="项目名称" v-bind="validateInfos.name">
            <a-input v-model:value="modelRef.name" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="生态厂商" v-bind="validateInfos.region">
            <a-select v-model:value="modelRef.region" placeholder="please select your zone">
              <a-select-option value="shanghai">Zone one</a-select-option>
              <a-select-option value="beijing">Zone two</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="项目地址" v-bind="validateInfos.name">
            <a-input v-model:value="modelRef.name" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { Form } from 'ant-design-vue'
import { reactive, toRaw, watch, ref } from 'vue';

const props = defineProps<{
  visible: boolean;
  id?: any;
}>()
const emit = defineEmits(['update:visible'])

const title = ref('新增项目信息')
watch(() => props.visible, (val) => {
  if (val) {
    if (props.id) title.value = '编辑项目信息'
    else title.value = '新增项目信息'
  }
})

const cancel = () => {
  emit('update:visible', false)
}
const labelCol = { style: { width: '120px' } }
const wrapperCol = { span: 20 }

const submit = () => {
  validate().then(() => {
    console.log(toRaw(modelRef));
    
  }).catch((err) => {
    console.error(err);
  })
  emit('update:visible', false)
}
const useForm = Form.useForm
const modelRef = reactive({
  name: '',
  region: '',
})
const rulesRef = reactive({
  name: [
    { required: true, message: '请输入名称' },
  ],
  region: [
    { required: true, message: '请输入名称' },
  ],
})
const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef, {
  onValidate: (...args) => console.log(...args),
})

</script>

<style scoped>

</style>