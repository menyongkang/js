// 观察者
class Observer {
  constructor(fn) {
    this.update = fn;//接收到通知要执行的方法
  }
};

// 被观察者
class Subject {
  constructor() {
    this.observers = []; //观察这队列
  }
  // 添加观察者
  addObserver(observer) {
    this.observers.push(observer); //往观察者对象中添加观察对象
  }
  // 通知
  notify() { //通知所有观察者,实际上是把观察者的update()都执行了一遍
    this.observers.forEach(observer => {
      observer.update(); //依次取出观察者,并执行观察者的update方法
    })

  }
}

var subject = new Subject(); //被观察者
const update = () => {
  console.log('被观察者发出通知')
}; //收到广播时要执行的方法
var ob1 = new Observer(update) //观察者1
var ob2 = new Observer(update) //观察者2

subject.addObserver(ob1)          //观察者1订阅subject的通知
subject.addObserver(ob2)          //观察者2订阅subject的通知
subject.notify()                  //发出广播,执行所有观察者的update方法

