import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import ProductList from './product-crud/product-list.vue'

const app = createApp(ProductList)
app.use(ElementPlus)
app.mount('#app')
