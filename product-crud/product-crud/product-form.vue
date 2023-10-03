<template>
  <el-form :model="form" :loading="loading" label-width="120px">
    <el-form-item label="name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="price">
      <el-input v-model="form.price" />
    </el-form-item>
    <el-form-item label="count">
      <el-input type="number" v-model="form.count" />
    </el-form-item>
    <el-form-item label="desc">
      <el-input type="textarea" v-model="form.desc"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button @click="onCancel">Cancel</el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
import { reactive, watchEffect } from 'vue'
import { formProps } from './form.js'

const props = defineProps(formProps)
const emit = defineEmits(['submit', 'cancel'])

// 复制一份对象，并包装成响应式
let form = reactive(JSON.parse(JSON.stringify(props.formData)))

watchEffect(() => {
  form = reactive(JSON.parse(JSON.stringify(props.formData)))
})

const onSubmit = () => {
  emit('submit', form)
}

const onCancel = () => {
  emit('cancel')
}
</script>
