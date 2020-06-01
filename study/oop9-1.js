/* 
原型式继承

*/

//工厂写发 当原型对象含有 子对象 会用工厂方法
//解决了：对继承而来的成员 读写不对等（一个克隆并非独立的副本，他只是一个以原型对象而的空对象而已
//必须为通过为引用传递的数据类型的属性创建副本）
// Person 现在是 一个对象字面量  它是 所有Person的原型对象
let Person = {}
Person.name='default name';
Person.getName=function(){
  return this.name;
}
Person.creatChild=function(){
  return{
    bool:true,
    num:3
  }
};
Person.childObject=Person.creatChild();

// 用来创建新的类
function clone(obj){
  // 创建一个空函数F
  function F(){};
  // 将函数F的原型prototype对象设置为 传入的的原型对象obj,
  //这就是原型链机制 prototype属性就是指向 原型对象的，它提供了 所有继承而来的属性的连接
  F.prototype=obj;
  // 通过 new 运算符 作用于F 创建新的对象，然后把 新建的对象 作为返回值返回
  //给定对象的原型对象的空对象
  return new F();
  
}
// 
console.log(clone())
// 新建子类
let Authod=clone(Person);

// 重定义 子类中的方法和属性 
Authod.childObject=Authod.creatChild();
Authod.childObject.num=10;
Authod.books=[];
Authod.pushData=function(obj){
  this.books.push(obj);
}
Authod.deleteData=function(index){
  this.books.splice(index,1);
}
Authod.getBooks=function(){
  return this.books;
}

console.log(Authod);
console.log(Authod.getName());
