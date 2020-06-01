function isArrayLike(o) {
  if (o && // o不是null、undefined等
    typeof o === 'object' && // o是对象
    isFinite(o.length) && // o.length是有限数值
    o.length >= 0 && // o.length为非负值
    o.length === Math.floor(o.length) && // o.length是整数
    o.length < 4294967296) // o.length < 2^32
    return true;
  else
    return false;
}


// 手写apply
Function.prototype.myApply = function(context, args) {
  // context=context||window;//设定默认值

  // 正确判断函数上下文对象
  if (context === null || context === undefined) {
    // 指定为 null 和 undefined 的 this 值会自动指向全局对象(浏览器中为window)
    context = window
  } else {
    context = Object(context) // 值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的实例对象
  }
  if (!isArrayLike(args)) {
    throw new Error('apply的第二个参数必须是数组') //3.限制参数类型为数组
  }
  args = args || [];

  // 给context新增一个独立无二的属性以防覆盖
  const key = Symbol();
  // 这里的this指向调用的方法
  context[key] = this;
  // 把参数传递个调用的函数,通过隐式绑定的方式调用函数
  const result = context[key](...args);
  // 删除属性,清理产生的垃圾,副作用
  delete context[key];
  return result;


}

// 手写call
Function.prototype.myCall = function(context, ...args) {
  context = context || window;
  args = args || [];
  const key = Symbol();
  context[key] = this;
  const result = context[key](...args);
  delete context[key];
  return result;
}