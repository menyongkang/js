/* 
创建对象的基本模式
第一种： 门户打开型，他只能提供公用成员。
第二种：使用下划线表示方法或属性的私用性；
第三种：使用闭包创建 真正的私有属性

需求：以创建Book类为例。创建一个用来存储关于一本书数据的类，并未其展示一些数据的方法，你只负责创建，别人创建实例并使用。
*/
// 第一种

let Book = function (isbn, titile, author) {
  if (!this.checkIsbn(isbn)) {
    throw new Error('isbn 参数错误');
  }
  this.isbn=isbn;
  this.titile = titile;
  this.author = author;

}

Book.prototype = {
  // 校验必传参数，但是不能对其完整性进行验证，其中无法控制
  // 解决方法 为每个属性提供取值器(accessor)和复制器方法(mutator)  
  checkIsbn:function(isbn){
    if(isbn==='undefined'||typeof isbn!=='string'){
      return false;
    }


  },
  display: function () {

  },
}
// 不管创造多少个实例，内存中只有一份