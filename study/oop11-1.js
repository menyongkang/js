/* 

单体模式 在单体模式中使用 私有属性

方法一：使用下划线表示
方法二：使用闭包

*/

// 使用下滑线

GiantCorp.DataParser = {

  // Private menthod
  _stripWhitespace: function (str) {
    return str.replace(/\s+/, '');
  },
  _stringSplit: function (str, delimiter) {
    return str.split(delimiter);
  },

  // Public menthod
  // str 字符串 ，delimier分隔符 stipWS 是否要删除空白符
  stringToArray: function (str, delimiter, stipWS) {
    if (stipWS) {
      // 为什么么使用this  this 不一定指向  GiantCorp.DataParser
      GiantCorp.DataParser._stripWhitespace(str);
    }
    var outArray = GiantCorp.DataParser._stringSplit(str, delimiter);
    return outArray;
  }
}
// 上面方法的改进
GiantCorp.DataParser2 = (function () {
  // private attr
  var whitespacaRegx = /\s+/;

  // private menthod
  function stripWhitespace(str) {
    return str.replace(whitespacaRegx, '');
  }

  function stringSplit(str, delimiter) {
    return str.split(delimiter)
  }

  // public menthod
  return {
    stringTOArray: function (str, delimiter, stipWS) {
      if (stipWS) {
        stripWhitespace(str);
      }
      var outArray = stringSplit(str, delimiter);
      return outArray
    }
  }

})()


// 使用闭包  因为单体只实例一次，因此不会造成 属性和方法 再被创建一份

// 使用立即执行函数创建单体
MyNameSpace.Singleto = (function () {
  // 这里可以声明 私用属性，内部的 都可访问
  // private 
  var privateAttr = false;

  function privateMenthod() {}

  return {
    // public members
    CONSTANT_1: false,
    CONSTANT_2: 10,

    publicMenthod: function () {}
  }
})()
// 这种模式有可以称之为 模块模式

// 两种方法比较优缺点
// 优点：确保不会被外面使用，数据进行了保护和封装
// 缺点：单体是在脚本加载是创建的，优化是推迟到用的时候，惰性化加载（lazy loading）