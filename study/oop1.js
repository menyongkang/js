
/* 

1. 缺点：所有的实例对象都可 继承 构造韩式中的方法和属性，同一个实例对象之间无法 共享属性 

解决方法：
  1.所有的实例都可以通过 原型链  访问到 prototype 原型对象；
  2.prototype 相当与所有实例的 交集 及公共部分
  3.每一个对象都有一个prototype属性
  4.每一个原型对象都有一个construction属性，
      a:分辨原型对象到底是哪个构造函数
      b:从实例新建另一个实例　
      c:由于constructor属性是一种原型对象和构造函数的关系，所以在修改原型对象的时候，一定 要注意construtor的指向问题，避免instanceof失真，
  5.普通对象没有propotype（prototype即是属性对象也是普通对象），但是有__proto__属性。
    a:js创建对象的时候都有一个__propo__内置属性，用于指向 创建它 的 函数对象的 原型对象prototype。    
      per.__proto__ === Person.protype
      Persion.propotype.__proto__ === Object.propotype)
      通过__proto__串起来直到Object.propotype.__proto__为null的链叫做原型链
*/


/* 第一种: 过程式 

缺点：无法创建可以保存状态，并且具有一些其仅对 内部状态进行操作的方法 的动画对象

代码篇幅：
编码效率：
执行性能：

*/

function startAnimation(){
  //...
}

function stopAnimation(){
  // ...
}


