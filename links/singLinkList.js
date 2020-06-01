// 头节点 ---> d1:next()--->d2:next()---> null
// 当删除 某有节点，保证上一节点和下一节点关联
// 当添加 某节点，保证插入的上一节点和下一节点与插入的节点关联；
// Node 类用来表示节点。
// LinkedList 类提供插入节点、删除节点等一些操作。

function LinkList() {
  // 节点
  function Node(element) {
    this.node = element; //当前节点元素；
    this.next = null; //下一节点指针；
  }
  let length = 0; //表示当前节点长度；
  let head = null; //链表的头节点；

  // 向链表的尾部添加一新的节点
  this.append = function (element) {
    let node = new Node(element);
    let currentNode = head;
    //判断是否为空的链表
    if (head === null) {
      head = node; //将新建的设为头节点
    } else {
      // 从头节点开始，找到最后一个节点,如果下一值节点存在指针
      while (currentNode.next) {
        //后面还有节点,下一节点，将当前的节点指针赋值为currentNode ,循环判断
        currentNode = currentNode.next;
      }
      //达到最后一个节点，把当前节点指针next 指向 新建的节点
      currentNode = node;
    }
    // 链表的长度加1
    length++;
  }

  // 向链表的特定位置 插入一个节点+
  this.insert = function (position, element) {
    // 越界
    if (position < 0 || position > length) {
      return false;
    }
    let node = new Node(element);
    let index = 0; //标记新建节点的位置
    let currentNode = head;
    let previousNode; //保存前一个节点；
    // 在最前面插入
    if (position === 0) {
      node.next = currentNode; //将插入的节点指针 指向 之前的头节点作为下一个节点
      head = node; //将其设置为头节点；
    } else {
      // 循环找到位置 3  0 1 2
      while (index < position) {
        //在之前
        index++; //将标记往前移动1 2 3
        previousNode = currentNode; //前一个指针 head  d1  d2
        currentNode = currentNode.next; //将指针 指向下一个节点 d1 d2 d3
      }
      //找到位置，把前一个的指针指向 新建的接单
      previousNode.next = node; // d2 
      // 把新建的 指针指向 当前
      node.next = currentNode; // d3
    }
    length++;
    return true; //???

  }

  // 从链表的 指定位置移除一项

  this.removeAt = function (position) {
    // 越界
    if ((position < 0 || position >= length) || length === 0) {
      return false
    };

    let currentNode = head;
    let index = 0;
    let previousNode;

    if (position === 0) {
      head = currentNode.next;
    } else {
      // 循环找到位置
      while (index < position) {
        index++;
        previousNode = currentNode;
        currentNode = currentNode.next;
      }
      // 把当前节点的 next 指针 指向 当前节点的 next 指针，即是 删除了当前节点
      previousNode.next = currentNode.next;
    }

    length--;

    return true;

  }

  // 从链表中移除指定项
  this.remove = function (element) {
    let index = this.indexOf(element);
    return this.removeAt(index);
  };

  // 返回元素在链表的索引，如果链表中没有该元素则返回 -1
  this.indexOf = function (element) {
    let currentNode = head;
    let index = 0;

    while (currentNode) {
      if (currentNode.element === element) {
        return index;
      }

      index++;
      currentNode = currentNode.next;
    }

    return -1;
  };

  // 如果链表中不包含任何元素，返回 true，如果链表长度大于 0，返回 false
  this.isEmpty = function () {
    return length === 0;
  };

  // 返回链表包含的元素个数，与数组的 length 属性类似
  this.size = function () {
    return length;
  };

  // 获取链表头部元素
  this.getHead = function () {
    return head.element;
  };

  // 由于链表使用了 Node 类，就需要重写继承自 JavaScript 对象默认的 toString() 方法，让其只输出元素的值
  this.toString = function () {
    let currentNode = head;
    let string = '';

    while (currentNode) {
      string += ',' + currentNode.element;
      currentNode = currentNode.next;
    }

    return string.slice(1);
  };

  // 打印链表数据
  this.print = function () {
    console.log(this.toString());
  };

  // 获取整个链表
  this.list = function () {
    console.log('head: ', head);
    return head;
  };


}

// 创建单向链表实例
var singlyLinked = new LinkList();
console.log(singlyLinked.removeAt(0)); // false
console.log(singlyLinked.isEmpty()); // true
singlyLinked.append('Tom');
singlyLinked.append('Peter');
singlyLinked.append('Paul');
singlyLinked.print(); // "Tom,Peter,Paul"
singlyLinked.insert(0, 'Susan');
singlyLinked.print(); // "Susan,Tom,Peter,Paul"
singlyLinked.insert(1, 'Jack');
singlyLinked.print(); // "Susan,Jack,Tom,Peter,Paul"
console.log(singlyLinked.getHead()); // "Susan"
console.log(singlyLinked.isEmpty()); // false
console.log(singlyLinked.indexOf('Peter')); // 3
console.log(singlyLinked.indexOf('Cris')); // -1
singlyLinked.remove('Tom');
singlyLinked.removeAt(2);
singlyLinked.print(); // "Susan,Jack,Paul"
singlyLinked.list(); // 具体控制台