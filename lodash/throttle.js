/* 在一段时间内，不管调用多少次，都只执行一次 */
export function throttle(fn, timeout) {
  let last = 0

  return function (...args) {
    let now = Date.now()

    if (now - last >= timeout) {
      fn.apply(this, args)
      last = now
    }
  }
}
