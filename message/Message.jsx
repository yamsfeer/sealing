import { createApp, createElementVNode } from 'vue'

// 组件
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

function showMessage(msg, handler) {
  // 渲染挂载组件
  const container = document.createElement('div')
  document.body.appendChild(container)

  const app = createApp(Message, {
    msg,
    onClick() {
      const close = () => {
        // 关闭组件
        console.log(app.unmount)
        app.unmount(container)
        container.remove()
      }
      handler && handler(close)
    },
  }).mount(container)
}

export default showMessage
