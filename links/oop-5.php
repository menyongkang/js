/* 

描述“我一个同事”一天的生活，简单来看看他一天干些啥。

1.0 饿了吃饭
1.1 到点吃饭

2.0 渴了喝水
2.1 到点喝水

3.0 困了睡觉
3.1 到点睡觉
3.2 有可能一个人睡觉，也有可能... 是吧？复杂

*/

// 问题是某一天增加社交能力怎么办？

// 一个业务拆分成多个类的方法
// 引入逻辑层

class DemoPeople {
  doSomething() {}
}

class DemoEat {
  eat() {}
}
class DemoDrink {
  drink() {}
}

class DemoGoBed {
  goBed() {}
}