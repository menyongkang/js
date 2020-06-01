/* 

第二种： 原型prototype属性

代码篇幅：
编码效率：
执行性能：

*/

let Anim=function(){};
Anim.prototype.startAanimation=function(){};
Anim.prototype.stopAnimation=function(){};

/* Usage */
let myAnim=new Anim();
myAnim.startAanimation();
myAnim.stopAnimation();



