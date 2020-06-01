/* 


【设计模式】
第一种：单体模式
  定义：用来划分名空间并将相关的方法组织在一起的对象。仅能实例化一次；
  解释：单体对象由两部分组成：包含这方法和属性的对象本身，以及用于访问它的变量，这个变量是全局的；
  用途：
    a.划分命名空间
    b.用作特定网页代码包装的容器

*/


Namespace.pageName = {
  //page constants
  CONSTANT_1:10,
  CONSTANT_2:5,

  // page monthod
  menthod1:function(){},
  menthod2:function(){},

  // Initialize
}