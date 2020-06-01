/*
 作用域 嵌套函数 和闭包
 

 作用域的词法性：函数是运行在定义它的作用域中，而不是运行在调用它的作用域中，

 特权方法：只有直接访问私有成员的方法 被称为 私有方法，缺点是 私有方法过多会占用内存

 能控制属性值得形式，不能派生子类

 适用场合：真正私有属性的场合
*/

function foo() {
  let a = 10;

  function bar() {
    a = a * 2;
    return a;
  }
  return bar
}

var baz = foo(); //bar函数

console.log(baz()); //20
console.log(baz()); //40

var bal = foo();
console.log(bal()); //20
console.log(bal()); //40
// 只要bar定义在函数foo中，就能访问foo中的所有变量，及时foo函数已经执行完毕
// 这就是闭包，在foo返回后，它的作用域被保存，只有在函数foo 内部的bar访问变量；


// 闭包实现私有属性访问  只能在对象内部访问打变量。允许特定方法访问变量


let Book = function (newIsbn, newTitle, newAuthor) {
  // 私有属性
  let isbn, title, author;
  // 私有方法
  function checkIsbn() {

  };

  //私有方法
  this.getIsbn = function () {
    return isbn;
  }
  this.setIsbn = function (newIsbn) {
    if (!checkIsbn(newIsbn)) {
      throw new Error('不符合规则');
    }
    isbn = newIsbn;
  }
  // constructor codes
  this.setIsbn(newIsbn);

}
//public 公共方法
Book.prototype={
  display:function(){

  }
}