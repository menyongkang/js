/* 
在JavaScript 中模仿接口的实现 

*/

// 方法一：用注释描述接口


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

}
CompositeFrom.prototype.add = function (child) {};
CompositeFrom.prototype.remove = function (child) {};
CompositeFrom.prototype.getChild = function (index) {};
CompositeFrom.prototype.save=function(){};
// 缺点：异常抛出无法定位，正确检测