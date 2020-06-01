/* 
静态方法和属性

静态方法或属性关联的则只是 类 本身，静态方法是在类的层次上操作，而不是实例层次上的操作

判断：看它是否需要访问任何实例数据，(只存一份)
*/

let Book=(function(){
  //private static props
  let numOfBook=0;
  // private static menthod 
  function checkIsbn(){}
  // return Constructor
  return function(newIsbn,newTitle,newAuthor){
    // private attributes
    let isbn,title,author;
    // private menthod
    this.getIsbn=function(){
      return isbn;
    }
    this.setIsbn=function(newIsbn){
      if(!checkIsbn(newIsbn)) throw new Error('check params');
      isbn=newIsbn;
    }
    // 静态 私有属性使用
    numOfBook++;
    if(numOfBook>50) throw new Error('limited 50')
    this.setIsbn(newIsbn);
  }
})();

// public static menthod  
Book.coverToTitleCase=function(inputString){};

// public menthod
Book.prototype={
  display:function(){

  }
}
// 私用成员和特权成员 被声明在构造函数的作用中，区别在于构造函数成了 内嵌的函数，
//被作为包含他的函数的返回值，赋值给变量 Book, 这就创建了一个闭包
// 可以把静态的 私有属性 定义在包含的 作用域中
// 外层的 立即执行函数执行后，返回一个函数（返回内部构造函数），它被赋值给Book变量，因此Book成了构造函数
// 在实例化时，调用的是这个内层函数，外层函数 只是用来创建一个存放 静态私有成员的闭包
//  这写私有属性成员，可以从构造器函数中访问
// 定义公共静态方法  只需直接将其作为构造函数的 属性，其实就是把构造函数作为命名空间使用


//缺点： 每创建一个实例是内部的代码都会被 重新创建一份效率低能

