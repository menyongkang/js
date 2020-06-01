/* 
掺元类

想把一个函数 用到多个类中 ，可以通过扩充的方式 让这些类共享该函数。

具体做法：

先创建一个包含各种通用方法 的类；
然后用它扩充其他类。
这种包含通用方法的类 称为 掺元类
作用：只是想其他方法提供自己的方法

*/
// Mixin Class 

let Mixin = function () {};
Mixin.prototype = {
  serialize: function () {
    let output = [];
    for (key in this) {
      output.push(key + ":" + this[key]);
    }
    return output.join(',');
  }
}

// 多亲继承
// receivingClass（受类） givingClass(予类)
// augment function 
// 实现思路：for...in遍历givingClass类的prototype中的每一个属性成员，并添加到receivingClass类的prototype中,
// 如果recievingClass类 中存在 同名的成员，跳出这个属性，转而处理下一个，receivingClass 中的成员不会改变
function augment(receivingClass, givingClass) {
  if (arguments[2]) {
    for (let i = 2, len = agruments.length; i < len; i++) {
      // if(!receivingClass.prototype[arguments[i]]){
      receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
      // }
    }
  } else {
    for (methodName in givingClass.prototype) {
      if (!receivingClass.prototype[methodName]) {
        receivingClass.prototype[methodName] = givingClass.prototype[methodName];
      }
    }
  }
}