/* 第一次只出现一次的字符

*/

function FirstNotRepeatingChar(str) {
  if (!str) {
    return -1;
  }
  let countMap = {};
  const array = str.split('');
  const length = str.length;
  for (let i = 0; i < length; i++) {
    const current = array[i];
    let count = countMap[current];
    if (count) {
      countMap[current] = count + 1;
    } else {
      countMap[current] = 1;
    }
  }
  for (let i = 0; i < length; i++) {
    if (countMap[array[i]] === 1) {
      return i;
    }
  }
  return -1;
}

function FirstNotRepeatingChar1(str) {
  // write code here
  for (var i = 0; i < str.length; i++) {
    if (str.indexOf(str[i]) == str.lastIndexOf(str[i])) {
      return i;
    }
  }
  return -1;
}