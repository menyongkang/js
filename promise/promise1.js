// 拆解 Promise 的值
// 它的作用是用来将onFufilled的返回值进行判断取值处理，把最后获得的值放入最外面那层的Promise的resolve函数中。
function resolvePromise(promise2,x,resolve,reject){
  //判断x和promise2之间的关系
  //因为promise2是上一个promise.then后的返回结果，所以如果相同，会导致下面的.then会是同一个promise2，一直都是，没有尽头
  if(x === promise2){//相当于promise.then之后return了自己，因为then会等待return后的promise（setTimeout），导致自己等待自己，一直处于等待
    return reject(new TypeError('循环引用'))
  }
  //如果x不是null，是对象或者方法
  if(x !== null && (typeof x === 'object' || typeof x === 'function')){
    //为了判断resolve过的就不用再reject了，（比如有reject和resolve的时候）
    let called
    try{//防止then出现异常，Object.defineProperty
      let then = x.then//取x的then方法可能会取到{then:{}},并没有执行
      if(typeof then === 'function'){
        //我们就认为他是promise,call他,因为then方法中的this来自自己的promise对象
        then.call(x,
          y=>{//第一个参数是将x这个promise方法作为this指向，后两个参数分别为成功失败回调
            if(called) return;
            called = true
            //因为可能promise中还有promise，所以需要递归
            resolvePromise(promise2,y,resolve,reject)
          },
          err=>{
            if(called) return;
            called = true
            //一次错误就直接返回
            reject(err)
          })
      }else{
        //如果是个普通对象就直接返回resolve作为结果
        resolve(x)
      }
    }catch(e){
      if(called) return;
      called = true
      reject(e)
    }
  }else{
    //这里返回的是非函数，非对象的值,就直接放在promise2的resolve中作为结果
    resolve(x)
  }
}

class Promise {
  constructor(executor) {
    // 定义状态
    this.status = "pendding";
    this.value = undefined; //定义返回值
    this.reason = undefined; //定义错误原因
    //存放成功回调的函数
    this.onResolvedCallbacks = [];
    //存放失败回调的函数
    this.onRejectedCallbacks = [];
    // 定义resolve函数
    let resolve = (data) => {
      //这里pendding，主要是为了防止executor中调用了两次resovle或reject方法，而我们只调用一次
      if (this.status === "pendding") {
        this.status = "resolve";
        this.value = data;
        //监听回调函数
        this.onResolvedCallbacks.forEach(fn => fn());
      }
    };
    // 定义reject函数
    let reject = (data) => {
      if (this.status === "pendding") {
        this.status = "reject";
        this.reason = data;
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };

    // executor方法可能会抛出错误,需要捕获
    try {
      //将resolve和reject函数给使用者  
      executor(resolve, reject);
    } catch (e) {
      //如果在函数中抛出异常则将它注入reject中
      reject(e);
    };

  }
  // 
  then(onFufilled, onRejected) {
    //解决onFufilled,onRejected没有传值的问题
    onFufilled = typeof onFufilled === 'function' ? onFufilled : y => y
    //因为错误的值要让后面访问到，所以这里也要跑出个错误，不然会在之后then的resolve中捕获
    onRejected = typeof onRejected === 'function' ? onRejected : err => {
      throw err;
    }
    //声明一个promise对象
    let promise2
    if (this.status === 'resolve') {
      //因为在.then之后又是一个promise对象，所以这里肯定要返回一个promise对象
      promise2 = new Promise((resolve, reject) => {
        setTimeout(() => {
          //因为穿透值的缘故，在默认的跑出一个error后，不能再用下一个的reject来接受，只能通过try，catch        
          try {
            //因为有的时候需要判断then中的方法是否返回一个promise对象，所以需要判断
            //如果返回值为promise对象，则需要取出结果当作promise2的resolve结果
            //如果不是，直接作为promise2的resolve结果
            let x = onFufilled(this.value)
            //抽离出一个公共方法来判断他们是否为promise对象
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      })
    }
    if (this.status === 'reject') {
      promise2 = new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      })
    }
    if (this.status === 'pendding') {
      promise2 = new Promise((resolve, reject) => {
        this.onResolvedCallbacks.push(() => {
          // 加入他，就是根据js引擎的事件机制加入任务队列，目的是确保前面的异步任务完成。
          setTimeout(() => {
            try {
              // 上一个Promise成功后的返回值
              let x = onFufilled(this.value);
              // 开启下一个Promise 并将上一个成功的返回值传递给
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })
      })
    }
    return promise2
  }






}