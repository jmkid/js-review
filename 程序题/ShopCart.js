(function(window) {
  /**
   * ShopCart 购物车
   * @param {String} prefix 前缀
   * @param {Array} defCart 初始数据 [{name: '', price: 1, num: 1}]
   */
  var ShopCart = function(prefix, defCart) {
    Find.prototype.prefix = prefix;
    var cart = new Cart(document.getElementsByClassName(prefix)[0]);
    for (var i in defCart) {
      cart.add(defCart[i]);
    }
    cart.updateTotal();
  };
  /**
   * Cart 购物车商品管理
   * @constructor
   * @param {Object} obj 购物车容器对象
   */
  function Cart(obj) {
    this.items = [];
    var find = new Find(obj);
    this.all = find.className('all');
    this.bottom = find.className('bottom');
    this.num = find.className('total-num');
    this.price = find.className('total-price');
    this.tmp = find.className('item');
    this.tmp.parentNode.removeChild(this.tmp);
    var cart = this;
    this.all.onclick = function() {
      cart.checkAll();
    };
  }
  Cart.prototype = {
    /**
     * 向购物车中添加商品
     * @param {Object} data 商品信息
     */
    add: function(data) {
      var tmp = this.tmp.cloneNode(true);
      var item = new Item(tmp, data);
      var cart = this;
      // 勾选
      item.check.onclick = function () {
        cart.updateTotal();
      };
      // 增加数量
      item.add.onclick = function() {
        item.num.textContent = ++item.data.num;
        item.updateSubtotal()
        cart.updateTotal();
      };
      // 减少数量
      item.reduce.onclick = function() {
        if (item.data.num > 1) {
          item.num.textContent = --item.data.num;
          item.updateSubtotal();
          cart.updateTotal();
        } else {
          alert('至少选择1件，如果不需要，请直接删除');
        }
      };
      // 删除商品
      item.del.onclick = function() {
        if (confirm('您确定要删除此商品吗？')) {
          tmp.parentNode.removeChild(tmp);
          cart.del(item);
          cart.updateTotal();
        }
      };
      // 更新小计
      item.updateSubtotal();
      // 保存新增的商品对象
      this.items.push(item);
      // 放入购物车容器中
      this.bottom.before(tmp);
    },
    /**
     * 删除保存的商品对象
     * @param {Object} item 待删除的商品对象
     */
    del: function(item) {
      for (var i in this.items) {
        if (this.items[i] === item) {
          delete this.items[i];
        }
      }
    },
    /**
     * 更新总计
     */
    updateTotal: function() {
      var num = 0, price = 0;
      for (var i in this.items) {
        var item = this.items[i];
        if (item.check.checked) {
          num += item.data.num;
          price += item.data.num * item.data.price;
        }
      }
      this.num.textContent = num;
      this.price.textContent = price.toFixed(2);
    },
    /**
     * 全选
     */
    checkAll: function() {
      for (var i in this.items) {
        this.items[i].check.checked = true;
      }
      this.updateTotal();
    }
  };
  /**
   * Item 购物车中的单件商品
   * @constructor
   * @param {String} tmp 模板
   * @param {Array} data 数据
   */
  function Item(tmp, data) {
    var find = new Find(tmp);
    this.check = find.className('check');
    this.name = find.className('name');
    this.price = find.className('price');
    this.num = find.className('num');
    this.add = find.className('add');
    this.reduce = find.className('reduce');
    this.subtotal = find.className('subtotal');
    this.del = find.className('del');
    this.data = data;
    this.name.textContent = data.name;
    this.price.textContent = data.price.toFixed(2);
    this.num.textContent = data.num;
  }
  Item.prototype = {
    /**
     * 更新小计
     */
    updateSubtotal: function() {
      this.subtotal.textContent = (this.data.num * this.data.price).toFixed(2);
    }
  };
  /**
   * Find 查找器
   * @constructor
   * @param {Object} obj 待查找对象所在容器
   */
  function Find(obj) {
    this.obj = obj;
  }
  Find.prototype = {
    prefix: '',
    /**
     * 按照class查找元素
     * @param {string} className
     */
    className: function(className) {
      return this.obj.getElementsByClassName(this.prefix + '-' + className)[0];
    }
  };
  window['ShopCart'] = ShopCart;
})(window);