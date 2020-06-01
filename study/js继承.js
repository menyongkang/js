/************  NOTICE START ：基础知识 ************ 
1 对于函数 
每个函数都一个prototype 属性，它引用预定义的原型对象———— prototype在使用new操作符把函数作为构造函数时起作用！ 
—— 具体什么作用呢？后面会讲到 
 
2 对于对象 
js中，每个对象都有一个constructor属性，他引用初始化这个对象时候的构造函数 
eg. var d = new Date(); d.constructor == Date;// true 
 
———— 注意，这个引用在内建对象时候是自动的，js内部已经维护好了 
 
================================================================= 
但是对于自定义类，则需要自己维护!!!  而在继承的时候可能还会出问题，所以就需要自己修改 
================================================================= 
因为自定义类的对象的constructor默认指向Function的构造函数：funciton Function(){ [native code] } 
 
而这可能不是想要的。 
所有js的类继承于Object，—— 这其实是js内部做了一些工作实现的 
 
 
 
js用原型prototype和构造函数constructor实现继承！ 
 
************  NOTICE END ************/  
  
  
/** 
*   开始测试 
*/  
  
//var d = new Date();   
//alert(d.constructor==Date);// true   
  
  
  
//自定义函数 ------ 其实又可当做对象的构造函数  
var Person = function(name,age){  
  this.name = name;  
  this.age = age;  
  this.mc = "MMCC";  
  this.toString = function (){  
      return "Person：name="+this.name+"/age="+this.age;  
  };  
};  
//alert(Person.constructor);//  funciton Function(){ [native code] }  
//alert(Person);// 即上面函数代码  

Object.prototype.toString = function(){  
  return " Object.prototype ";  
};  

//alert(Person.prototype); //显示 [object Object]—— 这是默认的prototype  
//alert(Object.prototype); //显示 [object Object]  
//alert(Object);  
//alert({});  

/** 
*  
* Man Class Defination. Try to extends the Person Class 
* @param name 
* @param age 
* @param work 
* @param hobby 
* @return 
*/  
var Man = function(name,age,work,hobby) {  
  this.work = work;  
  this.hobby = hobby;  
  Person.call(this,name,age);// 这样做的目的只有一个：就是借用Person函数初始化name/age。除此之外绝无他意  
  // 我们可以把这种调用方式叫做构造函数链： 构造函数中调用另一个构造函数  
    
  this.toString = function() {  
      return "Man：name="+this.name+"/age="+this.age;  
  };  
};  


// 注意new Person()这里不需要参数  
Man.prototype = new Person();//  这个的意义 ？？？    
//这样之后Man.prototype可以使用Person的方法了！！！———— 对，就是这样的方式，实现了继承！！！———— 当然如果要使用Person的name等属性就会得到undefined  
//因为 new Person();出来的对象name尽管存在，但未赋值。。。  

delete Man.prototype.name;// 可以删去，也可以不删去。影响不是很大。。  
//alert(Man.prototype.name);  
delete Man.prototype.age;  


// alert(Man.constructor);  
Person.prototype.wealth = function() {  
  return this.name +" * Person wealth * "+this.age;  
};  
Man.prototype.wealth = function() {  
  return this.name +" * Man wealth * "+this.age;  
};  
Person.prototype.health = function() {  
  return this.name +" * Man health * "+this.age;  
};  

var p = new Person("Chen",25);  

//alert(p.constructor);// 实际上会去通过原型链的方式查找constructor,最终找到的是  类的原型的 constructor属性  
//alert(p.prototype);// undefined  
//alert(Person.constructor); // 这个和上面p.constructor结果不同， 它结果为 Function(){ [native code] } __ why  

var man = new Man("luo",27,"IT","shopping");  
//alert(man.constructor);// 实际上会去通过原型链的方式查找constructor,最终找到的是类的原型的constructor属性  
//alert(man.prototype);// undefined  
//alert(Man.constructor); // 这个和上面man.constructor结果不同， 它结果为 Function(){ [native code] }  



//alert(Man.prototype);  
//alert(man);  

// alert(man.health());  
//alert(p.wealth());  

//Man.prototype.constructor = Man;//这样之后，使一个class的constructor属性指向 它的构造函数 --- 这样又有什么好处呢？有什么必要呢？  
// ———— 使Man类的原型的constructor正确的指向 它的构造函数Man，  


//这样做的必要性在于,之后我们可能需要“正确”的调用Man函数的constructor属性  
//alert(Person.prototype.constructor);// function(name,age){。。。 }  
//alert(Man.prototype.constructor);// function(name,age,work,hobby) {。。。 }  


// 下三者都为 true，这是符合继承常理，同时说明子类编写成功  
//alert(man instanceof Object);这个想当然是会一直成立的  
//alert(man instanceof Person);//这个只有在设置Man.prototype = new Person();才会成立  
//alert(man instanceof Man);//这个其实是会一直成立的，不用担心这个  


/**==============  单层继承的时候，可以通过为子类原型对象添加一个名为superclass的属性，来简化继承 
*/  
var Man2 = function(name,age,work,hobby) {  
  this.superclass(name,age);  
  this.work = work;  
  this.hobby = hobby;  
};  
//然后在new Man2之前  
Man2.prototype.superclass = Person;  
//然后就可以使用了：  
var m2 = new Man2("luok",22,"IT","Think");  
alert(m2.name);  



// 一个规则是 一个类的原型的constructor 需要指向 它的构造函数 。 否则呢  

// 每个函数都会有一个 prototype 的属性 --- 默认为一个Object的对象，即Object类的实例。 为内建的代码  

// 函数的原型对象  


// constructor   
/**可以 直接Man.constructor 、 Man.prototype.constructor 区别：* 
* Man.constructor 为Man函数的构造函数—— Function(){ [native code]} 
* Man.prototype.constructor 当然就是Man的原型对象的构造函数 
*/  