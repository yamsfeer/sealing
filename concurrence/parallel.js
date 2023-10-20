/**
 * 并发执行任务
 * @param {Array} tasks 多个返回 promise 的函数
 * @param {Number} parallel 并发数量
 * @returns {Promise}
 */
export function parallelTask(tasks, parallel = 5) {
  if (tasks.length === 0) {
    return Promise.resolve()
  }

  let index = 0
  let count = 0 // 当前执行完的任务数

  return new Promise((resolve, reject) => {
    // 执行单个任务
    function _run() {
      const task = tasks[index]
      index++

      task().then(() => {
        count++
        // 所有任务都完成
        if (count === tasks.length) {
          resolve()
        }

        // 如果还有任务，则运行下一个任务
        if (index < tasks.length) {
          _run()
        }
      })
    }

    for (let i = 0; i < parallel && i < tasks.length; i++) {
      _run()
    }
  })
}

/* 测试 */
function mockTask(num = 5) {
  function sleep(timeout) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, timeout)
    })
  }
  return new Array(num).fill(0).map((item, index) => {
    const task = async () => {
      console.log(`任务 ${index + 1} 开始`)
      await sleep(1000)
      console.log(`任务 ${index + 1} 完成`)
    }
    return task
  })
}

const tasks = mockTask(10)
parallelTask(tasks, 3)
