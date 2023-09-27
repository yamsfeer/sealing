interface DateInfo {
  year: number
  month: number
  date: number
  hour: number
  minute: number
  second: number
  milliSecond: number

  yyyy?: string
  MM?: string
  dd?: string
  HH?: string
  mm?: string
  ss?: string
  ms?: string
}

type Formatter = 'date' | 'datetime' | Function

// 将 'date', 'datetime', 函数等 format 格式归一化为函数
function normalize(format): Function {
  if (typeof format === 'function') {
    return format
  }
  if (typeof format !== 'string') {
    throw new Error('format must be a string')
  }

  // 统一为 yyyy MM 这类字符串
  if (format === 'date') {
    format = 'yyyy-MM-dd'
  } else if (format === 'datetime') {
    format = 'yyyy-MM-dd HH:mm:ss'
  }

  // 统一成函数
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

export function formatDate(date: Date, format: Formatter, isPad?: boolean) {
  let formatter = normalize(format) // 归一化为函数

  const dateInfo: DateInfo = {
    year: date.getFullYear(),
    month: date.getMonth() + 1, // 历史遗留：月份从 0 开始算
    date: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
    milliSecond: date.getMilliseconds(),
  }

  // 将各项值增加字符串类型
  dateInfo.yyyy = dateInfo.year.toString()
  dateInfo.MM = dateInfo.month.toString()
  dateInfo.dd = dateInfo.date.toString()
  dateInfo.HH = dateInfo.hour.toString()
  dateInfo.mm = dateInfo.minute.toString()
  dateInfo.ss = dateInfo.second.toString()
  dateInfo.ms = dateInfo.milliSecond.toString()

  // 对 dateInfo 的每一项补 0
  function _pad(prop, len) {
    dateInfo[prop] = dateInfo[prop].padStart(len, '0')
  }
  if (isPad) {
    _pad('yyyy', 4)
    _pad('MM', 2)
    _pad('dd', 2)
    _pad('HH', 2)
    _pad('mm', 2)
    _pad('ss', 2)
    _pad('ms', 3)
  }

  return formatter(dateInfo)
}
