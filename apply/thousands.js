function addComm(num) {
  //TODO
  var c = (num.toString().indexOf ('.') !== -1) ?
   num.toLocaleString() :
    num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
  return c;
}
console.log(addComm(1234))

// 你还会添加哪些测试用例


function thousands(num,end){
	var splits=[],res=[];
  var splits = num.toFixed(end).toString().split(".");
	splits[0].split("").reverse().map(function(item,i){
    if(i%3 == 0 && i!=0){ res.push(","); }
		res.push(item);
	});
	return res.reverse().join("")+(splits.length>1 ? "."+splits[1] : "");
}
 console.log(thousands(1234.666666666,2))