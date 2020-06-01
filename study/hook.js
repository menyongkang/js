var options = {
  host: 'www.google.com',
  port: 80,
  path: '/upload',
  method: 'POST'
};
var req = http.request(options, function (res) {
  console.log("STATUS:" + res.statusCode);
  console.log("HEADERS:" + JSON.stringify(res.headers));
  res.setEncoding('utf8');


  res.on('data', function (chunk) {
    console.log('BODY:' + chunk);
  });
  res.on('end', function () {
    console.log('请求完成');
  })
  res.on('error', function (e) {
    console.log('problem with request:' + e.message);
  })

  // 对上面的 事件进行链式调用封装
  let promisify=function(res){
    let deferred=new Deferred();
    let result='';
    res.on('data',function(chunk){
      result+=chunk;
      deferred.progress(chunk);
    });
    res.on('end',function(){
      deferred.resolve(result);
    });
    res.on('error',function(err){
      deferred.reject(err);
    });
    return deferred.promise;
  }

  req.write('data\n');
  req.write('data\n');
  req.end();
})

/* 侦听超过10个emitter.setMaxListeners(0) EventEmitter对象 */