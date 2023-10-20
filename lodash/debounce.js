/* 对于频繁触发的耗时操作，如果只关心最后一次的执行，即可使用 debounce 防抖函数
   相当于等待用户一顿输入后，一小段时间内不再输入，即可认为输入完成
   从实现上来说，设置一个定时器，没次用户输入都清除定时器并生成新的定时器，定时器的时间正是那一小段时间 */

export function debounce(fn, timeout = 300, immediate = false) {
  let timer = null
  return function (...args) {
    // 每次执行当前函数，都清除上一次的计时器
    timer && clearTimeout(timer)

    if (immediate && timer === null) {
      fn.apply(this, args)
    }

    // 设置新的计时器
    timer = setTimeout(() => {
      // 执行函数
      fn.apply(this, args)
    }, timeout)
  }
}

/* 应用场景：鼠标移动，窗口缩放，键盘输入搜索 */
