/* 
1. 按顺序存储的数据结构，但元素可以随机存取，数组中的元素通过索引识别，插入和删除会存在移动后续元素

问题：
 把奇数和偶数互换位置，然后将所有的奇数排在前面，偶数排在后面，

思路：
1. 声明两个变量指针start和end ,start=0,从前查找，end=arr.length-1从末尾开始
2. 奇数 val%2===1;偶数val%2===0;条件循环，增量或增减两个指针变量的值
3. 互换对应符合条件的指针位置的选项元素；
4. 条件循环条件，start<end ,即当查找到中间位置时，则停止条件循环

*/

function reOrderArray(array) {
  if (Array.isArray(array)) {
    let start = 0; //指针
    let end = array.length - 1; //指针
    while (start < end) {
      console.log('start',start)
      console.log('end',end)
      // 排除奇数，
      while (array[start] % 2 === 1) {//start:1 ;array[1]=6
        console.log('####')
        // console.log('start', start)
        start++;
      }
      // 排除偶数,
      while (array[end] % 2 === 0) {//end:3 ;array[3]=7
        console.log('----')
        // console.log('end', end)
        end--;
      }
      if (start < end) {
        [array[start], array[end]] = [array[end], array[start]]
        console.log([array[start], array[end]])
      }
    }
  }
  return array;
}

var order = reOrderArray([0, 6, 3, 7, 4, 1]);
//[1, 6, 3, 7, 4, 0]
console.log(order);