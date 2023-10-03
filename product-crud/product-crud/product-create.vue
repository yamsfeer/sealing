<script setup>
import { reactive } from 'vue'
import ProductForm from './product-form.vue'

const formData = reactive({
  id: '',
  name: '',
  price: '',
  count: '',
  desc: '',
})

const createProduct = (form) => {
  console.log('创建', form)
}

const emit = defineEmits(['cancel'])

const onCancel = () => {
  emit('cancel', false)
}
</script>
<template>
  <ProductForm
    @submit="createProduct"
    :form-data="formData"
    @cancel="onCancel"
  />
</template>
