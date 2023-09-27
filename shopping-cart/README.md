# shopping-cart

购物车封装过程中的经验：

* 没有页面也可以运行

  不要把购物车看成一个页面，它是一个应用，即使没有页面元素，仅通过控制台调用 API 也能完成计算。

* 从数据开始

  不管写购物车还是其他什么应用，都从数据结构开始。

  原始数据中，商品对象的数据结构如下：

  ```javascript
  const good = {
    id: '1',
    name: 'Banana',
    price: 100,
    quantity: 10,
  }
  ```

  为了不修改原始数据，我们用一个新的类包装 good，并增加 choose 表示该商品添加了多少个。然后添加针对 good 的各种逻辑。

  ```javascript
  class Good {
    constructor(rawGood) {
      this.rawGood = rawGood
      this.choose = 0 // 选择了多少个
    }
  
    /* totalPrice 该商品总价格 */
    /* isChoose 是否有选中， */
    /* increase 增加 */
    /* decrease 减少 */
  }
  ```

  Cart 类封装购物车应用中所有需要的数据逻辑处理，Cart 不应该包含任何 dom 元素。

  ```javascript
  class Cart {
    constructor() {
      this.goods = goods.map((rawGood) => new Good(rawGood))
      this.deliveryThreshold = 30 // 30 元起送
      this.deliveryPrice = 5 // 5 元配送费
    }
    
    /* totalChoose 选择的商品数 */
    /* totalPrice 总价格 */
    /* increase 添加*/
    /* decrease 减少 */
    /* hasGoodInCart 是否有商品在购物车 */
    /* toDeliveryPrice 还差多少起送 */
  }
  ```

  即使没有 html 页面，仅通过 Cart 类也能完成购物车的所有逻辑。

* 最后才是处理 UI 渲染，添加点击事件等。

  ```javascript
  class CartUI {
    constructor() {
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
  }
  ```

