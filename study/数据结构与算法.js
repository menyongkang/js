

function bubleSort(arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {

      if (arr[j] > arr[j + 1]) { //相邻元素比较
        let temp = arr[j + 1];
        arr[j + 1] = arr[j]; //升序，小的放前ßß
        arr[j] = temp;

      }
    }
  }
  return arr
}

// console.log(bubleSort(arr))


// 选择排序

function selcterStor(arr) {
  let len = arr.length;
  let minIndex, temp;

  for (let i = 0; i < len - 1; i++) {
    minIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) { //第二位小第一位
        minIndex = j;
      }
    }
    temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }
  return arr;

}

// console.log(selcterStor(arr))

let arr = [1,6,2,77,88,33,2,1];
// 插入排序

function insertionStrot(arr) {
  let len = arr.length;
  for (let i = 1; i < len; i++) {
    let key = arr[i];//2
    let j = i - 1;//1
    console.log(arr[j] > key)//6>2
    while (arr[j] > key) {
      console.log('88888888')
      arr[j + 1] = arr[j];//2--6
      j--;
      console.log(j)
    }
    arr[j + 1] = key;//1--6
  }
  return arr;
}

console.log(insertionStrot(arr))