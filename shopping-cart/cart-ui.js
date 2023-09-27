import Cart from './shopping-cart'

export default class CartUI {
  constructor(container) {
    // container = document.createElement('div')
    this.cart = new Cart()
    this.doms = {
      goodsList: document.createElement('div'),
      footer: document.createElement('div'),
    }

    this.renderGoods()
    this.renderFooter()
    this.updateFooter()

    container.appendChild(this.doms.goodsList)
    container.appendChild(this.doms.footer)

    // 按钮点击添加减少商品的事件绑定
    this.bingClickEvents()
  }

  renderGoods() {
    const html = this.cart.goods.reduce((acc, good, index) => {
      return (
        acc +
        `<div class="goods-item">
        <div>名称${good.rawGood.name}</div>
        <div>价格：${good.rawGood.price}</div>
        <button index=${index} class="btn btn-decrease">减少</button>
        <div class="good-choose">已选择：<span>${good.choose}</span></div>
        <button index=${index} class="btn btn-increase">添加</button>
      </div>`
      )
    }, '')

    this.doms.container.innerHTML = html
  }

  renderFooter() {
    this.doms.footer.innerHTML = `
      <div class="good-total">选择数量：<span>0</span></div>
      <div class="good-delivery">配送费：<span>0</span></div>
      <div class="good-to-delivery">还差多少起送：<span>0</span></div>
      <div class="good-total-price">总价格：<span>0</span></div>
    `
  }

  increase(index) {
    this.cart.increase(index)
    this.updateGoodDom(index)
    this.updateFooter()
  }

  decrease(index) {
    this.cart.decrease(index)
    this.updateGoodDom(index)
    this.updateFooter()
  }

  updateGoodDom(index) {
    const goodItemDom = this.doms.goodsList.children[index]
    goodItemDom.querySelector('.good-choose span').innerHTML =
      this.cart.goods[index].choose
  }

  updateFooter() {
    this.doms.footer.querySelector('.good-total span').innerHTML =
      this.cart.total
    this.doms.footer.querySelector('.good-delivery span').innerHTML =
      this.cart.delivery
    this.doms.footer.querySelector('.good-to-delivery span').innerHTML =
      this.cart.toDelivery
    this.doms.footer.querySelector('.good-total-price span').innerHTML =
      this.cart.totalPrice
  }

  bingClickEvents() {
    // 事件委托给 .good-list
    this.doms.goodsList.addEventListener('click', (e) => {
      if (e.target.classList.contains('.btn-increase')) {
        // 增加商品
        const index = e.target.getAttribute('index')
        this.increase(index)
      } else if (e.target.classList.contains('.btn-decrease')) {
        const index = e.target.getAttribute('index')
        this.decrease(index)
      }
    })
  }
}
