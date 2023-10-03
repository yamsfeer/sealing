<script setup>
import { reactive, watchEffect, computed } from 'vue'
import ProductForm from './product-form.vue'

const props = defineProps({
  formData: {
    type: Object,
    default: () => ({}),
  },
})
let form = reactive(JSON.parse(JSON.stringify(props.formData)))
const formDataKey = computed(() => JSON.stringify(props.formData))

const updateProduct = (form) => {
  console.log('更新', form)
}

watchEffect(() => {
  form = reactive(JSON.parse(JSON.stringify(props.formData)))
})

const emit = defineEmits(['cancel'])

const onCancel = () => {
  emit('cancel', false)
}
</script>
<template>
  <ProductForm
    :key="formDataKey"
    @submit="updateProduct"
    :form-data="form"
    @cancel="onCancel"
  />
</template>
