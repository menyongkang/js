import {
  EventEmitter
} from "events";

let Promise = function () {
  EventEmitter.call(this); //继承
}
util.inherits(Promise, EventEmitter); //实现继承问题
//以上实现和事件发布/订阅的继承，便于使用once on emit 等方法

Promise.prototype.then = function (resolve, reject, progress) {
  if (typeof resolve === 'function') {
    // 利用once()方法，保证成功回调只有一次
    this.once('success', resolve);
  }
  if (typeof reject === 'function') {
    this.once('error', reject);
  }
  if (typeof progress === 'function') {
    this.on('progress', progress);
  }
  return this;

}
Promise.prototype.all = function (promises) {
  let count=pormises.length;
  let that=this;
  let results=[];
  promises.forEach(function(promise,i){
    promise.then(function(data){
        count--;
        results[i]=data;
        if(count===0){
          that.resolve(results);
        }

    },function(err){
        that.reject(err);
    })
  })
  return this.promise;
}


/* Deferred 延迟对象 调用Promise 的then()方法中的回调 ，其内部实现是由 事件发布/订阅模式 原理实现的*/
let Deferred = function () {
  this.state = "unfulfilled";
  this.promise = new Promise();
}
Deferred.prototype.resolve = function (obj) {
  this.state = "fulfilled";
  this.promise.emit('success', obj);
}

Deferred.prototype.reject = function (err) {
  this.state = "failed";
  this.promise.emit('errorr', err);
}

Deferred.prototype.progress = function (data) {
  this.promise.emit('progress', data);
}