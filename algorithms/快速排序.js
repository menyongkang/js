function qSort(arr) {
  var left = [],
    right = [],
    len = arr.length;
  if (len <= 1) return arr;
  var base = arr[0];
  // 根据索引比较值的大小，所以循环结束条件是i<len
  for (var i = 1; i < len; i++) {
    if (arr[i] <= base) {
      left.push(arr[i]);
    } else {
      right.push(arr[i])
    }
  }
  return [...qSort(left), ...[base], ...qSort(right)];

}

// console.log(qSort([3, 0, 4, 5, 2, -1]))

// 原地分区版快速排序
/* 
1.从数列中挑出一个元素，称为"基准"（pivot），数组第一个元素的位置作为索引。
2.遍历数组，当数组数字小于或者等于基准值，则将索引位置上的数与该数字进行交换，同时索引+1
3.将基准值与当前索引位置进行交换
*/
function quickSort(array) {
  function swap(array, i, j) {
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;

      console.log('array[i]', array[i])
      console.log('array[j]',array[j])
  }
  // 排好序的最后一个元素
  function partition(array, left, right) {
      var index = left;
      var pivot = array[right]; // 取最后一个数字当做基准值，这样方便遍历
      console.log('partition-array',array)
      console.log('partition-left',left)
      console.log('partition-right',right)
      console.log('partition-pivot',pivot)
      // 右边排好序的最后一个元素的索引
      for (var i = left; i < right; i++) {
        console.log('partition-array[i]',array[i])
        console.log('partition-i',i)
          if (array[i] < pivot) {
           
              swap(array, index, i);
              console.log('partition-2array',array)
              console.log('partition-2index',index)
              index++;
              console.log('partition-2index',index)
          }
      }
      console.log('partition-right',right)
      console.log('partition-index',index)
      swap(array, right, index);
      console.log('partition-array',array)
      return index;
  }

  function sort(array, left, right) {
      if (left > right) {
          return;
      }
      console.log('sort-array',array)
      console.log('sort-left',left)
      console.log('sort-right',right)
      var storeIndex = partition(array, left, right);
      console.log("sort-",storeIndex)
      
      sort(array, left, storeIndex - 1);
      console.log('sort-left',left)
      console.log('sort-right',right)
      sort(array, storeIndex + 1, right);
  }

  sort(array, 0, array.length - 1);

  return array;
}

console.log(quickSort([3, 0, 4, 5, 2, -1]))