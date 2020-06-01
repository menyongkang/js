/* 
改进： 链式写发

代码篇幅：
编码效率：
执行性能：

*/

Function.prototype.menthod=function(name,fn){
  this.prototype[name]=fn;
  return this;
}

let Anima=function(){};
Anima
.menthod('start',function(){})
.menthod('stop',function(){});