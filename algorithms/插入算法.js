function insertionSort(arr) {
  var len = arr.length;
  for (var i = 1; i < len; i++) {
    for (var j = i - 1; j >= 0; j--) {
      if (arr[i] >= arr[j]) {
        arr.splice(j + 1, 0, arr.splice(i, 1)[0]);
        console.log(arr);
        break;
      } else if (j === 0) {
        arr.splice(j, 0, arr.splice(i, 1)[0])
        // console.log(arr);
      }
    }
  }
  return arr;
}

console.log(insertionSort([3, 2, 4, 1]))