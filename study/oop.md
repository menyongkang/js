JavaScript 是弱类型语言，不同类型之间可进行类型转换，动态化脚本；

原始类型（布尔，数值，字符串） 按值传值；其实数据类型按引用传送；

函数是一等对象。

(function(){
  let foo=10;
  let bar=20;
  console.log(foo*bar);
})()
内部参数


(function(foo,bar){
  console.log(foo*bar);
})(10,20)

从外部传参数

let baz=(function(foo,bar){
  return foo*bar;
})(10,20)

匿名函数最有趣的是可以 用来创建 闭包；

成因： JavaScript有函数级的作用域，这意味着定义在哪函数内部的变量，外部是不能访问；
      JavaScript 作用域又是词法性质的，这意味着 函数运行在它的定义域中，而不是在调用它的作用域中；

      把变量包裹在匿名函数中，对其加以保护，这样可以创建私有属性；如下

let baz;
(function(){
  let foo=10;
  let bar=20;
  baz=function(){
    return foo*bar;
  }
})()

baz();

变量 foo和bar 定义在匿名函数中，原因函数baz定义在闭包中；

1.对象的易变性（可修改）
2.内省（intorspection）
3.对象的反射 reflection（动态化实例和使用其方法）


继承  JavaScript使用的基于对象的原型链继承；


1.6. JavaScript设计模式 (对象之间相互作用的方式)
  产生的原因：
  1): 可维护。
  2): 沟通。
  3）:性能。
    3.1）:复杂性。
    3。2）:性能。



第二章 接口

1.什么是接口
  定义：提供了一种用于说明一个对象应该具有哪些方法和手段。
  作用：重用 强化类型
  缺点：

  其他面向对象语言实现的方式

    JAVA实现接口的方式：

    public interface DataOutput {

      void writeBoolean(boolean value) throws IOException;

      void writeByte(int value) throws IOException;

      void writeChar(int value) throws IOException;

      void writeShort(int value) throws IOException;

      void writeInt(int value) throws IOException;

   }
  他列出了一个类应该实现的一批方法；包括参数和可能抛出的异常，每一行都是一个方法的声明，是一分号结尾；

  创建一个接口的类实现的方法，需要关键字implements

  public class DataOutputStream extends FilterOutputStream implements DataOutput{
    public final void writeBoolean (boolean value) throws IOException{
      write(value?1:0);
    }
  }
  该类声明并具体实现了接口中列出的每一个方法，漏掉一个方法都会抛出编辑错误；


  PHP实现接口的方法

interface MyInterface{
  public function interfaceMethod($argumentOne,$argumentTwo)
}

class MyClass implement MyInterface{
  public function interfaceMethod($argumentOne,$argumentTwo){
    return $argumentOne.$argumentTwo;
  }
} 
//错误的时候运行
class BadClass implement MyInterface{

}

C#中实现接口的方式

interface MyInterface{
  string interfaceMethod( string argumentOne,string argumentTwo)
}

class MyClass:MyInterface{
  public string interfaceMethod(string argumentOne,string argumentTwo){
    return argumentOne+argumentTwo;
  }
} 
//错误的时候运行
class BadClass:MyInterface{

}

以上实现了接口的方式，包含了实现的方法以及这些方法需要具体的参数



第四章：继承 （创建子类）

继承的好处：减少重复代码，弱化代码之间的耦合

类式继承 ---- 应用场景
  如果所有的场景都是面向对象
原型式继承 -- 应用场景
  比较注重  内存效率
掺元式继承 -- 应用场景
  对以上的类进行扩充











面向对象原则：
1.类可以被扩展，但不得被修改；解决方案--闭包；




【设计模式】
第一种：单体模式
  定义：用来划分名空间并将相关的方法组织在一起的对象。仅能实例化一次；
  解释：单体对象由两部分组成：包含这方法和属性的对象本身，以及用于访问它的变量，这个变量是全局的；
  用途：
    a.划分命名空间
    b.用作特定网页代码包装的容器

    let Namespace.pageName={
      //




    }




















