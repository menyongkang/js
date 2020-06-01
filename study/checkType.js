/* 函数柯力化 ：通过指定部分参数，产生一个订制的新函数的方式 */
let toString=Object.prototype.toString;

function isType(type){
  return function(obj){
    console.log('主线程:'+1)
    new Promise((resolve,reject)=>{console.log("promise:"+10)})
    setTimeout(()=>{console.log("settimeout"+100)},1000)
    setTimeout(()=>{console.log("settimeout"+101)})
    console.log('主线程:'+2)
    return toString.call(obj)==="[object"+type+"]";
  }
}
let isString=isType('String')('string');
console.log(isString);

