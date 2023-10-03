// import { createApp } from 'vue'
// 相当于
// import { createApp } from 'vue/dist/vue.runtime.esm-bundler' // 不支持 template
import { createApp } from 'vue/dist/vue.esm-bundler' // 带有 compiler 的完整 vue
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import ProductList from './product-crud/product-list.vue'

const app = createApp({
  template: `<Suspense><ProductList /></Suspense>`,
  components: {
    ProductList,
  },
})
app.use(ElementPlus)
app.mount('#app')
