import { createApp, createElementVNode } from 'vue'

// 组件
  const messageBox = {
    props: {
      msg: {
        type: String,
        default: 'hello world'
      }
    },
    render({ $props }) {
      // return createElementVNode('h1', null, $props.msg)
      return (
        <h1>{ $props.msg }</h1>
      )
    }
  }

function showMessage(msg, onConfirm) {
  // 渲染挂载组件
  const container = document.createElement('div')
  document.body.appendChild(container)

  createApp(messageBox, { msg }).mount(container)
}


export default showMessage
