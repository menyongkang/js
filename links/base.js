function base (d, b, a) {
 
  var p = null;
  // 获取子类构造函数的原型属性
  var o = d.constructor.prototype;
  var h = {};


  for (p in o) {
      h[p] = 1;
  }
 
  for (p in b.prototype) {
    // 如果子类中有这个方法，就跳过，没有就赋值
      if (!h[p]) {
        //将父级的原型属性赋值到子类的原型中
          o[p] = b.prototype[p];
      }
  }
  //继承父级构造函数中的属性
  b.apply(d, a);
}

function People () {
  this.name = "Yorhom";
}

People.prototype.getName = function () {
  return this.name;
};

function Student () {
  base(this, People, []);
}

var yorhom = new Student();
console.log(yorhom)
// "Yorhom"
//alert(yorhom.getName());