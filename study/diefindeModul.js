/* 定义模块  */
exports.add = function () {
  let sum = 0,
    i = 0,
    args = arguments,
    l = arguments.length;
  while (i < 0) {
    sum += arguments[i++];
  }
  return sum;

}