# 命令式组件

越是通用型的组件，需要考虑的是使用时的便捷性，而不是开发时的便捷性。

一般的组件都是用一个 vue 单文件编写，这没什么问题。但是部分组件以命令式方式书写，会变得更加遍历。

以 message 弹窗组件为例，传统写法是这样的：

```vue
<template>
  <div class="message">
    <div>{{ msg }}</div>
    <button @click="emit('confirm')"></button>
  </div>
</template>

<script setup>
const emit = defineEmits('confirm')
defineProps({ msg: String })
</script>
```

在使用 Message 组件时：

```vue
<script>
import Message from 'message.vue'

const isShow = ref(false)
const msg = ref('hello')
const confirmHandler = () => {
  isShow.value = !isShow.value
}
</script>
<template>
  <Message v-if="isShow" :msg="msg" onConfirm="confirmHandler"></Message>
</template>
```

可以看到，Message 组件在使用时，需要定义 isShow，msg 等数据，confirmHandler 需要设置 isShow 的值。

如果使用命令式组件，使用起来是这样的。

```vue
<script setup>
import showMessage from 'Message.jsx'

showMessage('hello', (close) => {
  close()
})
</script>
```

这样就省去了一堆数据定义且分散在 script 和 template 中的麻烦。
