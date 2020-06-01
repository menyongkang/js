// 类式继承 

// 实现子类继承超类方法
function extend(subClass, supClass) {
  let F = function () {}; //创建空对象
  F.prototype = supClass.prototype; //让空对象的原型指向 超类的原型，建立 原型链关系
  subClass.prototype = new F(); //
  subClass.prototype.constructor = subClass; //将手动设置的原型对象的constructor 属性 重设指向 子类的构造函数（因为在把子类的prototype属性 设置为超类的 一个实例时，其原来的Constructor属性被抹除了）

  subClass.supClass = supClass.prototype;
  if (supClass.prototype.constructor == Object.prototype.constructor) {
    supClass.prototype.constructot = supClass;
  }

}

// 创建超类构造函数
function Person(name) {
  this.name = name;
}
Person.prototype.getName = function () {
  return this.name;
}

// 创建子类构造函数
function Authod(name, books) {
  // 调用超级类，传公用属性
  Authod.supClass.constructor.call(this, name);
  // 创建 子类私有属性
  this.books = books;
}
// 子类继续超类
extend(Authod, Person);
// 定义子类方法,只能写在继承之后，因为 覆盖问题
Authod.prototype.getBooks = function () {
  return this.books;
}

//重新定义 超类中的方法
Authod.prototype.getName = function () {
  console.log(this)
  let name = Authod.supClass.getName.call(this);
  return `${name} Authod is ${this.getBooks()}`
}

// 创建实例
let auth = new Authod('kang', '射雕英雄传');
console.log(auth);
console.log(auth.getName());
console.log(auth.getBooks());


// 以上的缺点是超类 被固化在 Authod 声明函数中