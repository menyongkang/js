function createIncrement(i) {
  let value = 0;

  function increment() {
    value += i;
    console.log(value);
  }
  return increment;
}
const inc = createIncrement(1);
inc(); // 1
inc(); // 2
// createIncrement(1) 返回一个增量函数，该函数赋值给inc变量。当调用inc()时，value 变量加1。
// 原理就在 createIncrement() 中。当在函数上返回一个函数时，有会有闭包产生。闭包捕获词法作用域中的变量 value 和 i。
// 词法作用域是定义闭包的外部作用域。
// 在本例中，increment() 的词法作用域是createIncrement()的作用域，其中包含变量 value 和 i。
// 闭包是一个可以从其词法作用域记住和修改变量的函数，不管执行作用域是什么。


// React Hooks 中的闭包
// Hooks 严重依赖于 JS 闭包,可能会遇到的一个问题是过时的闭包，这可能很难解决。

// 过时闭包

function createIncrement2(i) {
  let value = 0;

  function increment2() {
    value += i;
    console.log(value);
    const message = `Current value is ${value}`;
    return function logValue() {
      console.log(message);
    };
  }

  return increment2;
}

const inc2 = createIncrement2(1);
const log = inc2(); // 打印 1
inc2(); // 打印 2
inc2(); // 打印 3
// 无法正确工作
log(); // 打印 “Current value is 1”

// 在第一次调用inc()时，返回的闭包被分配给变量 log。
// 对 inc() 的 3 次调用的增量 value 为 3。
// 最后，调用log() 打印 message “Current value is 1”，这是出乎意料的，因为此时 value 等于 3。
// log()是过时的闭包。
// 在第一次调用 inc() 时，闭包 log() 捕获了具有 “Current value is 1” 的 message 变量。
// 而现在，当 value 已经是 3 时，message 变量已经过时了。


// 解决过时闭包的第一种方法是找到捕获最新变量的闭包。
// 咱们找到捕获了最新 message 变量的闭包。就是从最后一次调用 inc() 返回的闭包。


// 方法一：捕获最新变量的闭包
const latestLog = inc2(); // 打印 4
// 正常工作
latestLog(); // 打印 “Current value is 4”

// latestLog 捕获的 message 变量具有最新的的值 “Current value is 4”。

// Hooks 实现假设在组件重新渲染之间，作为 Hook 回调提供的最新闭包(例如 useEffect(callback)) 已经从组件的函数作用域捕获了最新的变量。

// 第二种方法是让logValue()直接使用 value。
function createIncrementFixed(i) {
  let value = 0;

  function increment() {
    value += i;
    console.log(value);
    return function logValue() {
      const message = `Current value is ${value}`;
      console.log(message);
    };
  }

  return increment;
}

const inc3 = createIncrementFixed(1);
const log2 = inc3(); // 打印 1
inc3(); // 打印 2
inc3(); // 打印 3
// 正常工作
log2(); // 打印 “Current value is 3”

// Hook 中过时的闭包

// useEffect()