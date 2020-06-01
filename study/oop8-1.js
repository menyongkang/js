/* 
类式继承 


第一步：创建构造函数。
*/


//Class
function Person(name) {
  this.name = name;
}

Person.prototype.getName = function () {
  return this.name;
}

// 创建实例
let render = new Person('kangkang');
console.log(render.getName());

/* 原型继承 
第一步：创建构造函数，在构造函数作用域最前端调用超类的构造函数；
第二步：设置原型链。原因每个对象都有prototype属性，原型链  只需经子类的prototype 属性指向 超类的 一个实例
第三步：将手动设置的原型对象的constructor 属性 重设指向 子类的构造函数（因为在把子类的prototype属性设置为 超类的 一个实例时，其原来的Constructor属性被抹除了）

*/

// Class Authod

function Authod(name, books) {
  Person.call(this, name); //改变执行上下文，name 就是参数，调用超类的构造函数，并将name 传参给超类
  // 为什么放到这块？在使用new 运算符时，先创建空对象，然后调用构造函数，此时空对象处于作用域最前端，
  //而这行代码的作用就是 手动完成同样的任务
  this.books = books;
}
Authod.prototype = new Person(); //set up the prototype chain.
Authod.prototype.constructor = Authod;//原型对象的constructor 属性指向 构造函数
Authod.prototype.getBooks=function(){
  return this.books;
}
