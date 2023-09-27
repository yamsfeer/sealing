import goods from './goods'

class Good {
  constructor(rawGood) {
    this.rawGood = rawGood
    this.choose = 0 // 选择了多少个
  }

  get totalPrice() {
    return this.rawGood.price * this.choose
  }

  isChoose() {
    return this.choose > 0
  }

  increase() {
    this.choose++
  }

  decrease() {
    if (this.choose === 0) {
      return
    }
    this.choose--
  }
}

export default class Cart {
  constructor() {
    this.goods = goods.map((rawGood) => new Good(rawGood))
    this.deliveryThreshold = 30 // 30 元起送
    this.deliveryPrice = 5 // 5 元配送费
  }

  // 选择的商品数
  get totalChoose() {
    return this.goods.reduce((acc, good) => acc + good.choose, 0)
  }

  get totalPrice() {
    return this.goods.reduce((acc, good) => acc + good.totalPrice, 0)
  }

  increase(index) {
    this.goods[index].increase()
  }

  decrease(index) {
    this.goods[index].decrease()
  }

  hasGoodInCart() {
    return this.totalChoose > 0
  }

  // 还差多少起送
  get toDeliveryPrice() {
    if (this.totalPrice >= this.deliveryThreshold) {
      return 0
    } else {
      return this.deliveryThreshold - this.totalPrice
    }
  }
}
