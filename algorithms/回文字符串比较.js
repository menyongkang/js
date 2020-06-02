function palindrome(str) {
  let reg = /[\W\_]/g;
  let str0 = str.toLowerCase().replace(reg, '');
  let str1 = str0.split('').reverse().join('');
  return str0 === str1
}
console.log(palindrome("abccba"))