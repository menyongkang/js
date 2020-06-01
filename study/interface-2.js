/* 
属性检查模仿接口实现

*/


/* 
interface Composite{
  function add(child);
  function remove(child);
  function getChild(index);
}
interface FormItem{
  function save();
} 
*/

let CompositeFrom = function (id, method, action) {
  // 显示声明支持什么接口
  this.implementsInterface = ['Composite', 'FormItem'];
}

function addForm(formInterface) {
  if (!implements(formInterface, 'Composite', 'FormItem')) {
    throw new Error('Object does not implement a required interface .');
  }
}
// 对特定的属性进行检测，不存在抛出异常
function implements(object) {
  for (let i = 1; i < arguments.length; i++) {
    let interfaceName = arguments[i];
    let interfaceFound = false;
    for (let j = 0; j < object.implementsInterface.length; J++) {
      if (object.implementsInterface[j] === interfaceName) {
        interfaceFound = true;
        break;
      }
    }
    if(!interfaceFound){
      return false;
    }
  }
  return true;
}


CompositeFrom.prototype.add = function (child) {};
CompositeFrom.prototype.remove = function (child) {};
CompositeFrom.prototype.getChild = function (index) {};
CompositeFrom.prototype.save = function () {};