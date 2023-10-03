<script setup>
import { ref, reactive } from 'vue'
import ProductCreate from './product-create.vue'
import ProductUpdate from './product-update.vue'

function fetchProducts() {
  const products = new Array(6).fill(0).map((_, index) => ({
    id: Math.random().toString().slice(2),
    name: `product-${index}`,
    price: Math.floor(Math.random() * 1000),
    count: Math.floor(Math.random() * 20),
    desc: `lorem xx ${index}`,
  }))
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(products)
    }, 1000)
  })
}

let editTarget = reactive({})

const handleUpdate = (row) => {
  editTarget = reactive(row)
  updateVisible.value = true
}

// 顶层 await 需要外部用 suspense 包裹
const products = await fetchProducts()

const createVisible = ref(false)
const updateVisible = ref(false)
</script>
<template>
  <el-button @click="createVisible = true">create</el-button>
  <el-table :data="products" style="width: 100%">
    <el-table-column prop="id" label="id" />
    <el-table-column prop="name" label="name" />
    <el-table-column prop="price" label="price" />
    <el-table-column prop="count" label="count" />
    <el-table-column prop="desc" label="desc" />
    <el-table-column label="Operations">
      <template #default="scope">
        <el-button
          link
          type="primary"
          size="small"
          @click="handleUpdate(scope.row)"
          >update</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="createVisible" title="create product">
    <ProductCreate @cancel="createVisible = false" />
  </el-dialog>
  <el-dialog v-model="updateVisible" title="update product">
    <ProductUpdate :form-data="editTarget" @cancel="updateVisible = false" />
  </el-dialog>
</template>
