/* 
第四种：在Function 构造函数上拓展

代码篇幅：
编码效率：
执行性能：

*/

Function.prototype.menthod=function(name,fn){
  this.prototype[name]=fn;
}

let Anima=function(){};
Anima.menthod('start',function(){});
Anima.menthod('stop',function(){});