import { formatDate } from './format-date'

it('date', () => {
  const formatted = formatDate(new Date('2023/9/26'), 'date')
  expect(formatted).toBe('2023-9-26')

  // bun 不支持 new Date('2023-9-26') 这种创建形式，getFullYear 等函数返回 NaN
  const formatted2 = formatDate(new Date('2023-9-26'), 'date')
  expect(formatted2).toBe('NaN-NaN-NaN')
})

it('datetime', () => {
  const formatted = formatDate(new Date('2023/9/26 16:5:2'), 'datetime')
  expect(formatted).toBe('2023-9-26 16:5:2')
})

it('pad 0', () => {
  const formatted = formatDate(new Date('2023/9/26 16:5:2'), 'datetime', true)
  expect(formatted).toBe('2023-09-26 16:05:02')
})

it('other format', () => {
  const formatted = formatDate(
    new Date('2023/9/26 16:5:2'),
    'yyyy年MM月dd日 HH时mm分ss秒',
    true
  )
  expect(formatted).toBe('2023年09月26日 16时05分02秒')
})

it('user function', () => {
  const formatter = (dateInfo) => {
    const { year } = dateInfo

    const thisYear = new Date().getFullYear()

    if (thisYear > year) {
      return `${thisYear - year} 年前`
    } else if (thisYear < year) {
      return `${year - thisYear} 年后`
    } else {
      return '今年'
    }
  }
  const before = formatDate(new Date('2000/1/1'), formatter)
  const after = formatDate(new Date('2100/1/1'), formatter)
  const thisYear = formatDate(new Date(), formatter)

  expect(before.includes('年前')).toBe(true)
  expect(after.includes('年后')).toBe(true)
  expect(thisYear).toBe('今年')
})
