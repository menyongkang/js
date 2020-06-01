let print = function (name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(name);
      resolve();
    }, 1000)
  })
}

function to(promise, errorExt) {
  return promise
    .then(function (data) {
      return [null, data];
    })
    .catch(function (err) {
      if (errorExt) {
        Object.assign(err, errorExt);
      }
      return [err, undefined];
    });
}
async function test() {
  await print("a");
  let [err, result] = await to(print('ddd'))
  console.log("err:" + JSON.parse(JSON.stringify(err)))
  // console.log("result:" + JSON.parse(JSON.stringify(result)))
  await print("b");
  await print("c");
}

test();

/* async 异步编程存在问题主要是 错误捕获问题  */