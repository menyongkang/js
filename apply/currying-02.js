// add(1)(2)(3)====add(1,2,3)

function add() {
  let sum = Array.from(arguments).reduce((acc, curr) => acc + curr, 0);
  console.log(sum)
  function innerAdd() {
    let _sum = Array.from(arguments).reduce(function(acc, curr) { 
      return acc + curr
    }, 0);
    sum += _sum;
    console.log(sum)
    return innerAdd
  }

  innerAdd.toString = function(){
    return sum
  };

  return innerAdd

}


function sum(){
  var cur = [].slice.call(arguments).reduce(function(a,b){return a+b;},0);
  function innerSum(){
    var next = [].slice.call(arguments).reduce(function(a,b){return a+b;},0);
    cur += next;
    return innerSum;
  }
  innerSum.valueOf = function(){
    return cur;
  }
  return innerSum;
}
console.log(sum(1,2,3).valueOf());       //6
console.log(sum(2,3)(2).valueOf());      //7
console.log(sum(1)(2)(3)(4).valueOf());  //10
console.log(sum(2)(4,1)(2).valueOf());   //9


function sum2(x){
  var result=Array.from(arguments).reduce((a,c)=>a+c,0);
  var innerSum=function(y){
    var _result=Array.from(arguments).reduce((a,c)=>a+c,0);
    result+=_result;
    return innerSum
  }
  innerSum.toString=function(){
    return result;
  }
  return innerSum
}
console.log(sum2(1)(2).toString())