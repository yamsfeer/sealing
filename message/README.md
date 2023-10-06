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

我们定义一个 showMessage 函数，用于挂载 Message 组件。

```javascript
function showMessage(msg, handler) {
  // 渲染挂载组件
  const container = document.createElement('div')
  document.body.appendChild(container)

  const app = createApp(Message, {
    msg,
    onClick() {
      const close = () => { // 关闭组件
        app.unmount(container)
        container.remove()
      }
      handler && handler(close)
    },
  }).mount(container)
}
```

我们用 createApp 挂载 Message 组件配置对象，并在 click 事件的 handler 中传入 close 函数，把关闭组件的控制权交给用户。

然后，为了让所有相关代码都集中在一个 Message.js 中，我们不把 Message 组件写在 vue 文件中，而是使用 jsx。

```jsx
const Message = {
  props: {
    msg: {
      type: String,
      default: 'hello world',
    },
  },
  render(ctx) {
    const { $props, $emit } = ctx
    // return createElementVNode('h1', null, $props.msg)
    return (
      <div class="message">
        <h1>{$props.msg}</h1>
        <button click={$emit('onClick')}>确定</button>
      </div>
    )
  },
}
```

这里需要注意的是 jsx 的语法和 vue 模板的差异。

此外，从这里例子还可以看出，无论是 vue 单文件组件还是 jsx，这些都是为方便开发者而提供的语法糖，它们都是给编译器看的。

所谓组件其实就是对象，所谓 template，jsx 都是用来创建 vnode 的 render 函数。
