import { describe, expect } from 'bun:test'
import CartUI from './cart-ui'

describe('cart UI', () => {
  const container = document.createElement('div')
  const cartUI = new CartUI(container)

  it('basic render goods', () => {
    expect(cartUI.doms.goodsList.children.length).toBe(4)
    expect(cartUI.doms.goodsList.children[0].innerHTML).not.toBe('')
    expect(cartUI.doms.footer.innerHTML).not.toBe('')
  })
  it('increase good', () => {
    const container = document.createElement('div')
    const cartUI = new CartUI(container)
    cartUI.increase(0)
    expect(
      cartUI.doms.goodsList.children[0].querySelector('.good-choose span')
        .innerHTML
    ).toBe('1')
    cartUI.increase(0)
    expect(
      cartUI.doms.goodsList.children[0].querySelector('.good-choose span')
        .innerHTML
    ).toBe('0')
  })

  it('decrease good', () => {
    const container = document.createElement('div')
    const cartUI = new CartUI(container)
    const goodItem = cartUI.doms.goodsList.children[0]
    cartUI.increase(0)
    cartUI.decrease(0)
    expect(goodItem.querySelector('.good-choose span').innerHTML).toBe('0')
    cartUI.decrease(0)
    expect(goodItem.querySelector('.good-choose span').innerHTML).toBe('0')
    cartUI.increase(0)
    expect(goodItem.querySelector('.good-choose span').innerHTML).toBe('1')
  })

  it('footer', () => {
    const container = document.createElement('div')
    const cartUI = new CartUI(container)
    const footer = cartUI.doms.footer
    expect(footer.querySelector('.good-to-delivery span').innerHTML).toBe('30') // 30 元起送

    cartUI.increase(0)
    expect(footer.querySelector('.good-total span').innerHTML).toBe('1')
    cartUI.increase(1)
    expect(footer.querySelector('.good-total span').innerHTML).toBe('2')
  })
})
