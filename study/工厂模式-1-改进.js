/* 
工厂模式

一个类中或者对象中会包含别的对象，这两个类之间会产生依赖性，工厂模式有助于消除两个类之间的依赖

使用抽象类  使用子类进行实例化

*/
// constructor
let Interface = function (name, menthod) {
  if (arguments.length != 2) {
    throw new Error('constructor 参数长度不够');
  }
  this.name = name;
  this.menthod = [];
  for (let i = 0, len = menthod.length; i < len; i++) {
    if (typeof menthod[i] !== 'string') {
      throw new Error('方法名必须为字符串')
    }
    this.menthod.push(menthod[i]);
  }
}

// 简单工厂模式

// BicycleShop Class（abstract） 
var BicycleShop = function () {};

BicycleShop.prototype = {
  // 实例化各种实例对象
  sellBicycle: function (model) {

    var bicycle=BicycleFactory.creatBicycle(model);
    
    bicycle.assemble();
    bicycle.wash();

    return bicycle;

  }
  // sellBicyle方法根据所需要的情况用switch 创建一个实例，可以交换使用，实现了Bicycle接口；
}

/* 接口在工厂函数中起着校验参数类型的作用，是工厂方法必备的方法 */


var Bicycle = new Interface('Bicycle', ['assemble', 'wash', 'ride', 'repair']);

// Speedster class

var Speedster = function () {};
Speedster.prototype = {
  assemble: function () {},
  wash: function () {},
  ride: function () {},
  repair: function () {},
}


// 调用
var californiaCruiser = new BicycleShop();
var younewBicycle = californiaCruiser.sellBicycle('The Speeder');

// 当你想加入新的车款时，就得BicycleShop的代码。解决方案就是吧创建实例这部分交给一个简单的工厂对象

// 集中管理各种类型的实例
var BicycleFactory = {
  creatBicycle: function (modle) {
    var bicycle;
    switch (modle) {
      case 'The Speeder':
        bicycle = new Speedster();
        break;
      case 'The Lowrider':
        bicycle = new Lowrider();
        break;
      case 'The Comfor Cruiser':
      default:
        bicycl = new ComforCruiser();
    };
    Interface.ensureImplements(bicycle, Bicycle);
    return bicycle;
  },
};

// BicycleFactory 是一个单体 用来把creatBicycle封装成一个命名空间


/* 简单工厂函数把成员对象交个一个外部对象集中管理，若是更多的话，就的创建在一个类中实现，然后子类派生子类 */












