var r,
  arr = ['apple', 'strawberry', 'banana', 'pear', 'apple', 'orange', 'orange', 'strawberry'];

r = arr.filter(function(element, index, self) {
  return self.indexOf(element) === index;
  //拿到元素，判断他在数组里第一次出现的位置，是不是和当前位置一样，一样的话返回true，不一样说明重复了，返回false。
});

console.log(r);

// 方法二
function uniqueArray(arr) {
  var temp = [];
  for (var i = 0; i < arr.length; i++) {
    if (temp.indexOf(arr[i]) == -1) {
      temp.push(arr[i]);
    }
  }
  return temp;
}
console.log(uniqueArray(arr))


