/* 
单体惰性化实例

适用场合：

最好留给定义命名空间 和实现分支方法（兼容比如XHR）的用途 


【有点】
1.把相关的代码组织在一起方便使用与维护；
2.描述性的命名空间可以增强的阅读性；
3.与第三方代码库隔离，提高代码的稳定性
4.可以用来优化，减少内存消耗；
【缺点】
1.模块之间的强耦合，不利于单元测试；
2.
*/



// 上面方法的改进
GiantCorp.DataParser = (function () {
  var uniqueInstance;
  function constructor() {
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
  }
  return {
    instance: function () {
      if (!uniqueInstance) {
        uniqueinstance = constructor();
      }
      return uniqueInstance;
    }
  }

})()

