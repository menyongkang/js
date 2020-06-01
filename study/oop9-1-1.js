/* 
原型式继承

*/

// 用来 创建 新的类 ，返回一个空对象，而该对象的原型对象 会被设置为Person
//这意味着 存在了原型链， 在当前的对象中查不到方法或属性时，将根据原型查找
function clone(obj) {
  function F() {};
  F.prototype = obj;
  return new F();
}

// 原型对象
let Person = {
  name: "default name",
  getName: function () {
    return this.name;

  }
}

// 新建 子类 Authod 原型对象
let Authod = clone(Person);//一个克隆并非其原型对象的一份完全独立的副本，它只是以Person为原型的空对象而已

//重定义 子类中的方法和属性
//或者添加属性和方法 
Authod.books = [];
Authod.getBooks = function () {
  return this.books;
}

console.log(Authod);

let authod = [];
authod[0] = clone(Authod);//一个克隆并非其原型对象的一份完全独立的副本，它只是以Person为原型的空对象而已
console.log(authod[0].name);
// 克隆刚被创建时，authod[0].name 其实最初的的Person.name的连接
authod[0].name = "金庸";
console.log(authod[0].name);
authod[0].books.push('new books');//连接的是 Authod.books，已经添加了元素
console.log(authod[0].books);
authod[0].books=['笑傲江湖'];//再定义相当与 添加属性
console.log(authod[0].books);



authod[1]=clone(Authod);//一个克隆并非其原型对象的一份完全独立的副本，它只是以Person为原型的空对象而已
console.log(authod[1].name);
// 克隆刚被创建时，authod[0].name 其实最初的的Person.name的连接
authod[1].name="李白";//在定义，相当与添加 新属性   这就造成了读写不对等性
authod[1].books=['将进酒'];
authod[1].getName();
authod[1].getBooks();


console.log(authod);

// 必须为 引用 传值 的数据类型的属性 创建副本
// 严格点： 通过hasOwnProperty方法区别 实际成员 和  继承成员