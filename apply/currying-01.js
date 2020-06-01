function add () {
  var args = [].slice.call(arguments);
  console.log(args);

  var fn = function () {
      var arg_fn = [].slice.call(arguments);
      return add.apply(null, args.concat(arg_fn));
  }
  
  fn.valueOf = function() {
      return args.reduce((a, b) => a + b);
  }
  return fn;
}

var rusut=add(1)(2)(3).valueOf();
console.log(rusut)
