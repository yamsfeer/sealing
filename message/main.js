import showMessage from './Message.jsx'

showMessage('message 消息', (close) => {
  console.log('关闭 message')
  close()
})
