function bubbleSort(arr) {
  console.log('i---',i);
  for (var i = 1, len = arr.length; i <= len - 1; ++i) {
    console.log('i---',i);
    console.log('len---',len);
   
    for (var j = 0; j <=len - i; ++j) {
      console.log('j----',j);
      console.log('arr[j]----',arr[j]);
      console.log('arr[j+1]----',arr[j+1]);
      console.log(arr[j] > arr[j + 1])
      
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
      console.log('arr----',arr);

    }
    console.log('arr----',arr);
  }
  return arr
}

let c=bubbleSort([9,4,1,0]);
console.log(c)

// 外部循环结束条件 小于等于length-1次，外部的递增 值++i,有限判断结束条件
// 内部循环结束条件 小于等于length-i，递增值为++j,这样确保最后一位元素的大小q


