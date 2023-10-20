export function debounceAndThrottle(fn, timeout) {
  let timer = null
  let last = 0

  return function (...args) {
    let now = Date.now()

    if (now - last >= timeout) {
      // 等待太久，执行一次防止一直不响应
      fn.apply(this, args)
      last = now
    } else {
      if (timer) {
        clearTimeout(timer)
        timer = setTimeout(() => {
          fn.apply(this, args)
          last = now
        }, timeout)
      }
    }
  }
}
