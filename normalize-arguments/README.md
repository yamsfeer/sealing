# 参数归一化

当函数的参数比较多样时，针对参数的判断最好归一化为一个函数。

假设有如下 formateDate 函数：

```javascript
function formatDate(date, formatter)
```

它可以将一个时间对象转换为特定形式字符串。

```javascript
formatDate(new Date(), 'date') // 2023-9-26
formatDate(new Date(), 'datetime') // 2023-9-26 17:43:49
formatDate(new Date(), 'yyyy年MM月dd日 HH时mm分ss秒') // 2023年9月26日 17时43分49秒
formatDate(new Date(), (dateInfo) => {
  return `${dateInfo.year}年${dateInfo.month}月${dateInfo.date}日` // 2023年9月26日
})
```

问题在于 formatter 参数，它可以是字符串或者函数，其中字符串形式中又可以有任一种格式，如果针对每一种情况分别做判断，那么 formatDate 函数将变得非常难以维护。

参数归一化就是将 formatter 统一为一个函数。

```javascript
function normalize(formatter) {
  if (typeof formatter === 'function') return formatter
  if (typeof formatter !== 'string') throw new Error('formatter must be a string or function')
  
  // 用复杂的 yyyy-MM-dd HH:mm:ss 涵盖 date、datetime 等情况
  if (formatter === 'date')
    formatter = 'yyyy-MM-dd'
  else if (formatter === 'datetime')
    formatter = 'yyyy-MM-dd HH:mm:ss'

  // 归一化为函数
  return (dateInfo) => {
    const { yyyy, MM, dd, HH, mm, ss, ms } = dateInfo
    return format
      .replaceAll('yyyy', yyyy)
      .replaceAll('yyyy', yyyy)
      .replaceAll('MM', MM)
      .replaceAll('dd', dd)
      .replaceAll('HH', HH)
      .replaceAll('mm', mm)
      .replaceAll('ss', ss)
      .replaceAll('ms', ms)
    }
  }
}
```

可以看到，无论是 date、datetime、还是自定义函数，我们都将其归一化为一个接受 dateInfo 的函数。

值得一提的是，在 normalize 过程中，我们用类似于 `yyyy-MM-dd HH:mm:ss` 的字符串涵盖了其他情况，这也是一种归一化：无论你多复杂，只要你有 yyyy、MM 这些子串就可以正常工作。

下面再记录几点关于 Date 的问题。

- `new Date().getMonth()` 返回的月份是从 0 开始算的，这是一个历史遗留问题

* 在 ISO8061 标准中，月份为 MM，小时为 HH。原因是 MM 是为了和 mm 区分，HH 表示 24 小时制，hh 表示 12 小时制。

关于 Date API 的[参考网站](https://www.w3schools.com/jsref/jsref_obj_date.asp)。

最终总结一下：当参数情况比较多时，我们会对这些参数做归一化处理，通常的结果是归一化为函数。

归一化的技巧就是：用复杂的情况涵盖简单情况，比如用函数涵盖 date、datetime 这两种简单情况。
