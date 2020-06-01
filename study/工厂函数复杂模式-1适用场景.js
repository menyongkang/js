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

// 实例 XHR 工厂  用不同方式实现同一接口对象

/** AjaxHandler Interface */

var AjaxHandler = new Interface('AjaxHandler', ['request', 'createXhrObject']);

/**SimpleHander  Class */

var SimpleHander = function () {};

SimpleHander.prototype = {
  request: function (method, url, callback, postVars) {
    var xhr = this.createXhrObject();
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      (xhr.status === 200) ? callback.success(xhr.responsText, xhr.responsXML): callback.failure(xhr.status);
    };
    xhr.open(method, url, true);
    if (method !== 'POST') postVars = null;
    xhr.send(postVars);
  },
  // 工厂方法，根据当前环境返回具体的XHR对象
  createXhrObject: function () {
    var methods = [
      () => new XMLHttpRequest(),
      () => new ActiveXObject('Msxml2.XMLHTTP'),
      () => new ActiveXObject('Microsoft.XMLHTTP')

    ];
    // 尝试那种可以适合，他就返回所创建的对象，并将自身改为用以创建的那个对象函数，摇身一变成了工厂方法 
    //这种技术称之为‘memoizing ’ ,创建存储这复杂的计算方法和函数，
    //这样代码仅在相应的环境执行一次，提高了代码运行的效率
    for (var i = 0, len = methods.length; i < len; i++) {
      try {
        methods[i]();
      } catch (e) {
        continue;
      }
      this.createXhrObject = methods[i];
      return methods[i];
    }
    throw new Error('Could not creat an XHR object .');
  }
};

// 调用

var myHandle=new SimpleHander();
var callback={
  success:function(responsText){console.log(responsText)},
  failure:function(status){console.log(status)}
};
myHandle.request('GET','scricpe.php',callback);