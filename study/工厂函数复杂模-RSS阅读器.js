/**
 * 工厂模式使用的场景 
 * 1.动态实现
 * 2.节省设置开销
 * 3.用小型的对象组成一个大的对象
 * 
 */
// constructor
let Interface = function (name, menthod) {
  if (arguments.length != 2) {
    throw new Error('constructor 参数长度不够');
  }
  this.name = name;
  this.menthod = [];
  for (let i = 0, len = menthod.length; i < len; i++) {
    if (typeof menthod[i] !== 'string') {
      throw new Error('方法名必须为字符串')
    }
    this.menthod.push(menthod[i]);
  }
}
// static class menthod
Interface.ensuerImplements = function (obj) {
  if (arguments.length < 2) {
    throw new Error('参数最少2个');
  }
  for (let i = 1, len = arguments.length; i < len; i++) {
    let interface = arguments[i];
    // 每个实例的constructor 指向构造函数
    if (interface.constructor !== Interface) {
      throw new Error('参数的实例对象的 instance 不指向构造函数 Interface');
    }
    for (let j = 0, menthodLen = interface.menthod.length; j < menthodLen; j++) {
      let menthod = interface.menthod[j];
      if (!object[menthod] || typeof object[menthod] !== 'function') {
        throw new Error('interface 方法错误');
      }
    }
  }
};
// 实现子类继承超类方法
function extend(subClass, supClass) {
  let F = function () {}; //创建空对象
  F.prototype = supClass.prototype; //让空对象的原型指向 超类的原型，建立 原型链关系
  subClass.prototype = new F(); //
  subClass.prototype.constructor = subClass; //将手动设置的原型对象的constructor 属性 重设指向 子类的构造函数（因为在把子类的prototype属性 设置为超类的 一个实例时，其原来的Constructor属性被抹除了）

  // 主要原因是对于自定义的类需要自维护，在继承的时候可能存在问题，主要是因为自定义的函数他的constructor 指向的Function的构造函数，指向初始化这个对象的构造函数
  subClass.superclass = supClass.prototype;
  if (supClass.prototype.constructor == Object.prototype.constructor) {
    supClass.prototype.constructor = supClass;
  }
};

/** DisplayModule Interface */
var DisplayModule = new Interface('DisplayModule', ['append', 'remove', 'clear']);
/**ListDisplay  Class  显示类 */
var ListDisplay = function (id, parent) {
  this.list = document.createElement('ul');
  this.id = id;
  parent.appendChild(this.list);
};
ListDisplay.prototype = {
  append: function (text) {
    var newEl = document.createElement('li');
    this.list.appendChild(newEl);
    newEl.innerHTML = text;
    return newEl;
  },
  remove: function (el) {
    this.list.removeChild(el);
  },
  clear: function (el) {
    this.list.innerHTML="";
  }
};

/**Configuration object */
var conf={
  id:'cnn',
  feeaUrl:'',
  updataInterval:60,
  parent:$('fee-reads') 
}