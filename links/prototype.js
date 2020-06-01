function GithubUser(username, password) {
  let _password = password
  this.username = username
  GithubUser.prototype.login = function () {
    console.log(this.username + '要登录Github，密码是' + _password)
  }
}

function JuejinUser(username, password) {
  this.articles = 3 // 文章数量
  const prototype = new GithubUser(username, password)
  // JuejinUser.prototype = prototype // 这一行已经没有意义了
  prototype.readArticle = function () {
    console.log('Read article')
  }
  this.__proto__ = prototype
}

const juejinUser1 = new JuejinUser('ulivz', 'xxx', 3)
console.log(juejinUser1)
// 私自篡改__proto__，导致 juejinUser1.__proto__ === JuejinUser.prototype 不成立！从而导致 juejinUser1 instanceof JuejinUser 也不成立
console.log(juejinUser1 instanceof JuejinUser) //fasle



//父类
function Person(name) { //给构造函数添加参数
  this.name = name;
  this.sum = function () {
    console.log(this.name)
  }
}
Person.prototype.age = 40; //给构造函数添加原型属性

//原型继承
function Pre() {
  this.name = 'li';
  console.log(this.__proto__)
  // Pre.prototype= new Person();//将父类的实例对象赋指向子类的的原型对象
}

Pre.prototype = new Person(); //将父类的实例对象赋指向子类的的原型对象
//实例子类
var pre1 = new Pre(); //实例子类 pre1.prototype=Pre.prototype;
console.log(pre1);
console.log(pre1.age) //40
//instanceof  判断元素是否在另一个元素的原型链上;
//instanceof运算符用来判断 一个构造函数的prototype属性 所指向的对象 是否存 在另外一个 要检测对象的原型链上
//继承中判断实例是否属于它的父类
// pre1继承了Person属性，返回true
console.log(pre1 instanceof Person) //true
console.log(pre1 instanceof Pre) //true