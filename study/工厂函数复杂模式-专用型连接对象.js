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
// 实现子类继承超类方法
function extend(subClass, supClass) {
  let F = function () {}; //创建空对象
  F.prototype = supClass.prototype; //让空对象的原型指向 超类的原型，建立 原型链关系
  subClass.prototype = new F(); //
  subClass.prototype.constructor = subClass; 
  //将手动设置的原型对象的constructor 属性 重设指向 子类的构造函数（因为在把子类的prototype属性 设置为超类的 一个实例时，
  //其原来的Constructor属性被抹除了）
// 主要原因是对于自定义的类需要自维护，在继承的时候可能存在问题，主要是因为自定义的函数他的constructor 指向的Function的构造函数，指向初始化这个对象的构造函数
  // 主要是担心superClass是从别的地儿继承过来又忘记指定constructor了
  subClass.superclass = supClass.prototype;
  if(supClass.prototype.constructor == Object.prototype.constructor) {
    supClass.prototype.constructor = supClass;
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

// 派生连个 处理器类
/** QueuedHandler class 在发起新的请求之前确保所有请求都已经请求成功 */
var QueuedHandler = function () {
  this.queue = [];
  this.requestInProgress = false;
  this.retryDelay = 5;
};

//派生子类  继承 超类
extend(QueuedHandler, SimpleHander);

QueuedHandler.prototype.request = function (method, url, callback, postVars, override) {
  if (this.requestInProgress && !override) {
    this.queue.push({
      method: method,
      url: url,
      callback: callback,
      postVars: postVars
    });
  } else {
    this.requestInProgress = true;
    var xhr = this.createXhrObject();
    var that = this;
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      if (xhr.status === 200) {
        callback.success(xhr.responsText, xhr.responsXML);
        this.advanceQueue();
      } else {
        callback.failure(xhr.status);
        setTimeout(function () {
          that.request(method, url, callback, postVars, true);
        }, that.retryDelay * 1000);
      };
      xhr.open(method, url, true);
      if (method !== 'POST') postVars = null;
      xhr.send(postVars);
    };
  }
};

QueuedHandler.prototype.advanceQueue=function(){
  if(this.queue.length===0){
    this.requestInProgress=false;
    return;
  }
  var req=this.queue.shift();//删除第一个，并返回第一个
  this.request(req.method,req.url,req.callback,req.postVars,true);
}




/** OfflineHandler class 用于当用户处于离线时把请求缓存起来*/
var OfflineHandler = function () {
  this.storedRequests=[];
};
extend(OfflineHandler,SimpleHander);


OfflineHandler.prototype.request=function(method,url,callback,postVars){
  if(XhrManager.isOffline()){//判断是否在线
    this.storedRequests.push({
      method:method,
      url:url,
      callback:callback,
      postVars:postVars
    })
  }else{
    this.flushStoreRequests();
    OfflineHandler.suppercalss.request(method,url,callback,postVars);
  }
};
OfflineHandler.prototype.flushStoreRequests=function(){
  var storedRequests=this.storedRequests;
  for(var i=0,len=storedRequests.length;i<len;i++){
    var req=storedRequests[i];
    OfflineHandler.suppercalss.request(req.method,req.url,req.callback,req.postVars);
  }
}
console.log(OfflineHandler)