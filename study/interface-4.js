/* 
interfafe 类

使用场景:实现复杂系统，可以降低对象之间的耦合度
*/


let Composite = new Interface('Composite', ['add', "remove", 'getChild']);
let FormItem = new Interface('FormItem', ['save']);

let CompositeForm = function (id, method, action) {

};

function addForm(formInterface) {

  Interface.ensuerImplements(formInterface, Composite, FormItem);
  //作用：Interface.ensuerImplements的作用是严格把关的作用。如果出现问题，就会出现一个错误就抛出一个错误，并知道其来源位置
  // this function will throw  an error if required menthod is not implement;
}

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
// static class menthod
Interface.ensuerImplements = function (obj) {
  if (arguments.length < 2) {
    throw new Error('参数最少2个');
  }
  for(let i=1,len=arguments.length;i<len;i++){
    let interface=arguments[i];
    // 每个实例的constructor 指向构造函数
    if(interface.constructor!==Interface){
      throw new Error('参数的实例对象的 instance 不指向构造函数 Interface');
    }
    for(let j=0,menthodLen=interface.menthod.length;j<menthodLen;j++){
      let menthod=interface.menthod[j];
      if(!object[menthod]||typeof object[menthod]!=='function'){
        throw new Error('interface 方法错误');
      }
    }
  }
};