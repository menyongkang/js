/* 
比较两个元素的大小，若果当前元素大于等于相邻的上一个元素，则在当前位置添加，当前元素值，

*/
function insertionSort(arr) {
  var len = arr.length;
  // 为啥是i<len 是因为按照索引取值，这样保证无序取值
  for (var i = 1; i < len; i++) {
    console.log('i---',i,arr[i])
    console.log(arr)
    // 获取 有序的最后一位，当小于最后一位时循环比较有序值的大小
    for (var j = i - 1; j >= 0; j--) {
      console.log('j---',j,arr[j])
      if (arr[i] >= arr[j]) {
        console.log(arr)
        arr.splice(j + 1, 0, arr.splice(i, 1)[0]);
        console.log(arr);
        break;
      } else if (j === 0) {
        arr.splice(j, 0, arr.splice(i, 1)[0])
        console.log(arr);
      }
    }
  }
  return arr;
}

console.log(insertionSort([3,1,0,2]))


