/* 
sort方法接收一个比较函数，compareFunction：如果 compareFunction(a, b) 小于 0 ，那么 a 会被排列到 b 之前；

// 当存在0的时候有问题哈

*/

function PrintMinNumber(numbers) {
  if (!numbers || numbers.length === 0) {
    return "";
  }
  return numbers.sort(compare).join('');
}

function compare(a, b) {
  const front = "" + a + b;
  const behind = "" + b + a;
  return front - behind;
}

var order = PrintMinNumber([0, 0, 3, 7, 4, 1]);
//[1, 6, 3, 7, 4, 0]
console.log(order);