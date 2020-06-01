/* 由于浏览器是单线程的，web Workers可以为浏览器提供多线程的方式，将耗时的任务拆解出去，降低主线程压力，避免主线程无压力 */


const first = document.querySelector('#number1');
const second = document.querySelector('#number2');

const result = document.querySelector('.result');

if (window.Worker) {
  // 使用构造函数（例如,Worker()）创建一个 worker 对象, 构造函数接受一个 JavaScript文件URL — 这个文件包含了将在 worker 线程中运行的代码。
  // worker 将运行在与当前 window不同的另一个全局上下文中，这个上下文由一个对象表示，标准情况下为DedicatedWorkerGlobalScope 

  const myWorker = new Worker("worker.js");


  first.onchange = function () {
    // 主线程和 worker 线程相互之间使用 postMessage() 方法来发送信息, 
    //并且通过 onmessage 这个 event handler来接收信息（传递的信息包含在 Message 这个事件的data属性内) 。
    //数据的交互方式为传递副本，而不是直接共享数据。
    myWorker.postMessage([first.value, second.value]);
    console.log('Message posted to worker');
  }

  second.onchange = function () {
    myWorker.postMessage([first.value, second.value]);
    console.log('Message posted to worker');
  }

  myWorker.onmessage = function (e) {
    result.textContent = e.data;
    console.log('Message received from worker');
  }
} else {
  console.log('Your browser doesn\'t support web workers.')
}