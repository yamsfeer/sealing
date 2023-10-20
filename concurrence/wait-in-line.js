export class Concurrence {
  constructor(windows = 2) {
    this.windows = windows // 窗口数
    this.runningTask = 0 // 正在执行的任务数
    this.queue = [] // 一条队列
  }

  add(task) {
    // 任务是一个返回 promise 的函数
    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject }) // 为了能在另一个函数中处理当前 promise 的 resolve 情况
      this._run() // 尝试执行任务
    })
  }
  _run() {
    // 队列中有剩余任务，且当前不超出并发量
    while (this.queue.length > 0 && this.runningTask < this.windows) {
      const { task, resolve, reject } = this.queue.shift()
      this.runningTask++
      task()
        .then(resolve, reject)
        .finally(() => {
          this.runningTask--
          this._run() // 处理完一个任务时，重新尝试执行任务
        })
    }
  }
}

/* 测试 */

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const concurrence = new Concurrence()

concurrence.add(async () => {
  await sleep(1000)
  console.log('task 1')
})
concurrence.add(async () => {
  await sleep(500)
  console.log('task 2')
})
concurrence.add(async () => {
  await sleep(500)
  console.log('task 3')
})
concurrence.add(async () => {
  await sleep(1000)
  console.log('task 4')
})
