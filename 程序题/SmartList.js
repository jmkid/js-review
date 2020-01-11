(function(window) {
  /**
   * SmartList 智能列表生成
   * @param {String} prefix 前缀
   * @param {Array} defList 默认项数组
   */
  var SmartList = function(prefix, defList) {
    Find.prototype.prefix = prefix;
    var find = new Find(document.getElementsByClassName(prefix)[0]);
    var list = new List(find.className('option'));
    for (var i in defList) {
      list.add(defList[i]);
    }
    var add = {
      'show': find.className('add-show'),
      'area': find.className('add-area'),
      'input': find.className('add-input'),
      'add': find.className('add-add'),
      'cancel': find.className('add-cancel')
    };
    add.show.onclick = function() {
      add.area.classList.remove(prefix + '-hide');
    };
    add.add.onclick = function() {
      list.add(add.input.value);
    };
    add.cancel.onclick = function() {
      add.area.classList.add(prefix + '-hide');
    };
  };
  /**
   * List 生成列表
   * @constructor
   * @param {Object} tmp 模板对象
   */
  function List(tmp) {
    this.tmp = tmp;
    this.obj = tmp.parentNode;
    this.obj.removeChild(tmp);
  }
  List.prototype = {
    /**
     * 向列表中添加项目
     * @param {String} value 新项目的文本值
     */
    add: function(value) {
      var tmp = this.tmp.cloneNode(true);
      // ① 将value添加到list-input的value属性中
      var find = new Find(tmp);
      find.className('input').value = value;
      var obj = this.obj;
      // ② 为list-up（上移）添加单击事件
      find.className('up').onclick = function() {
        var prev = find.prev();
        if (prev) {
          obj.insertBefore(tmp, prev);
        } else {
          alert('已经是第1个');
        }
      };
      // ③ 为list-down（下移）添加单击事件
      find.className('down').onclick = function() {
        var next = find.next();
        if (next) {
          obj.insertBefore(next, tmp);
        } else {
          alert('已经是最后1个');
        }
      };
      // ④ 为list-del（删除）添加单击事件
      find.className('del').onclick = function() {
        if (confirm('您确定要删除？')) {
          obj.removeChild(tmp);
        }
      };
      // ⑤ 将创建的列表项添加到列表末尾
      this.obj.appendChild(tmp);
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
    prefix: '',  // 待查找的前缀
    /**
     * 按照class查找元素
     * @param {String} className
     */
    className: function(className) {
      return this.obj.getElementsByClassName(this.prefix + '-' + className)[0];
    },
    /**
     * 查找当前元素的前一个兄弟元素节点
     * @returns {Object} 查找结果
     */
    prev: function() {
      var node = this.obj.previousSibling;
      while(node) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          break;
        }
        node = node.previousSibling;
      }
      return node;
    },
    /**
     * 查找当前元素的后一个兄弟元素节点
     * @returns {Object} 查找结果
     */
    next: function() {
      var node = this.obj.nextSibling;
      while(node) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          break;
        }
        node = node.nextSibling;
      }
      return node;
    }
  };
  window['SmartList'] = SmartList;
})(window);