/*
类式继承 
 extend 关键字 

 对派生子类方法的封装
 
 subClass 子类
 supClass 超类
*/

function extend(subClass, supClass) {
  let F = function () {};//创建空对象
  F.prototype = supClass.prototype;//让空对象的原型指向 超类的原型，建立 原型链关系
  subClass.prototype = new F();//
  subClass.prototype.constructor=subClass;//将手动设置的原型对象的constructor 属性 重设指向 子类的构造函数（因为在把子类的prototype属性 设置为超类的 一个实例时，其原来的Constructor属性被抹除了）

}