function flatten(arr, d = 1) {
  // TODO
  return d > 0 ?
    arr.reduce(
      (acc, val) => acc.concat(
        Array.isArray(val) ?
        flatten(val, d - 1) :
        val

      ),
      []) :
    arr.slice();
}
let a = flatten([1, [2, [3, 4], 5], 6], Infinity);
// console.log(a);

var arr1 = [1, 2, 3, [1, 2, 3, 4, [2, 3, 4]]];

function flatDeep(arr, d = 1) {
  let newA = null;
  if (d > 0) {
    newA = arr.reduce(function(acc, val) {
      if (Array.isArray(val)) {
        return acc.concat(flatDeep(val, d - 1));
      } else {
        return acc.concat(val)
      }
    }, [])
  } else {
    newA = arr.slice();
  }
  return newA
};

console.log(flatDeep(arr1,Infinity))

function flatten2(input) {
  const stack = [...input];
  const res = [];
  while (stack.length) {
    // 使用 pop 从 stack 中取出并移除值
    const next = stack.pop();
    if (Array.isArray(next)) {
      // 使用 push 送回内层数组中的元素，不会改动原始输入
      stack.push(...next);
    } else {
      res.push(next);
    }
  }
  // 反转恢复原数组的顺序
  return res.reverse();
}


function * flatten(array) {
  for (const item of array) {
    if (Array.isArray(item)) {
      yield * flatten(item);
    } else {
      yield item;
    }
  }
}

var arr = [1, 2, [3, 4, [5, 6]]];
const flattened = [...flatten(arr)];
