// 二分法查找

function binarySearch(data, arr, startIndex, endIndex) {
  if (startIndex > endIndex) {
      return -1;
  }
  var midIndex = Math.floor((endIndex + startIndex) / 2);
  console.log(midIndex);
  if (data == arr[midIndex]) {
      return midIndex;
  } else if (data < arr[midIndex]) {
      return binarySearch(data, arr, startIndex, midIndex - 1);
  } else {
      return binarySearch(data, arr, midIndex + 1, endIndex);
  }
}
var arr = [0, 1, 1, 1, 1, 1, 4, 6, 7,8]
console.log(binarySearch(0, arr, 0, arr.length-1));