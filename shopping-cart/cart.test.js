import { describe, it, expect } from 'bun:test'
import Cart from './shopping-cart'

describe('Cart', () => {
  it('increase item', () => {
    const cart = new Cart()
    cart.increase(0)
    expect(cart.goods[0].choose).toBe(1)
    expect(cart.totalChoose).toBe(1)
  })

  it('decrease item', () => {
    const cart = new Cart()
    expect(cart.totalChoose).toBe(0)
    cart.increase(0)
    expect(cart.totalChoose).toBe(1)
    cart.decrease(0)
    expect(cart.totalChoose).toBe(0)
  })

  it('decrease item when total choose is 0', () => {
    const cart = new Cart()
    expect(cart.goods[0].choose).toBe(0)
    cart.decrease(0)
    expect(cart.goods[0].choose).toBe(0)
    expect(cart.goods[0].choose).toBe(0)
    cart.increase(0)
    expect(cart.goods[0].choose).toBe(1)
  })

  it('totalChoose', () => {
    const cart = new Cart()
    expect(cart.totalChoose).toBe(0)
    cart.increase(0)
    expect(cart.totalChoose).toBe(1)
  })

  it('total price', () => {
    const cart = new Cart()
    expect(cart.totalPrice).toBe(0)
    cart.increase(0)
    cart.increase(1)
    expect(cart.totalPrice).toBe(300)
  })

  it('to delivery price', () => {
    const cart = new Cart()
    expect(cart.toDeliveryPrice).toBe(30)
    cart.increase(0) // 100
    expect(cart.toDeliveryPrice).toBe(0)
  })
})
