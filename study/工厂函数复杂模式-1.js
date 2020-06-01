// 类式继承 
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
/* 接口在工厂函数中起着校验参数类型的作用，是工厂方法必备的方法 */
var Bicycle = new Interface('Bicycle', ['assemble', 'wash', 'ride', 'repair']);

/* 跟简单的工厂函数不同的是，复杂工厂函数使用子类实现添加新类的实现  */

//需求： 个自行车店自行添加新款式；


// BicycleShop Class（abstract） 一个抽象类
var BicycleShop = function () {};

BicycleShop.prototype = {
  // 实例化各种实例对象
  sellBicycle: function (model) {
    var bicycle = this.creatBicycle(model);
    bicycle.assemble();
    bicycle.wash();
    return bicycle;
  },
  // sellBicyle方法根据所需要的情况用switch 创建一个实例，可以交换使用，实现了Bicycle接口；
  creatBicycle: function (model) {
    throw new Error('Unsupported operation on an abstract class .');
  }
}

//派生子类

var AcmeBicycleShop = function () {};
extend(AcmeBicycleShop, BicycleShop);
AcmeBIcycleShop.prototype.creatBicycle = function (model) {
  var bicycle;
  switch (modle) {
    case 'The Speeder':
      bicycle = new AcmeSpeedster();
      break;
    case 'The Lowrider':
      bicycle = new AcmeLowrider();
      break;
    case 'The Comfor Cruiser':
    default:
      bicycl = new AcmeComforCruiser();
  };
  Interface.ensureImplements(bicycle, Bicycle);
  return bicycle;
};


var GeneralProductBicycleShop = function () {};
extend(GeneralProductBicycleShop, BicycleShop);
GeneralProductBicycleShop.prototype.creatBicycle = function (model) {
  var bicycle;
  switch (modle) {
    case 'The Speeder':
      bicycle = new GeneralProductSpeedster();
      break;
    case 'The Lowrider':
      bicycle = new GeneralProductLowrider();
      break;
    case 'The Comfor Cruiser':
    default:
      bicycl = new GeneralProductComforCruiser();
  };
  Interface.ensureImplements(bicycle, Bicycle);
  return bicycle;
};


// 调用
var alecsCruisers=new AcmeBicycleShop();
var yourNewBike=alecsCruisers.creatBicycle('The Comfor Cruiser');

var bobsCruisers=new GeneralProductBicycleShop();
var yourSecondNewBike=bobsCruisers.creatBicycle('The Lowrider');
