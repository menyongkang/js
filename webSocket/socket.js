// 创建安全的WebSocket连接(wss)
// 通过上述WebSocket构造器方法的第二个参数，客户端可以在初次连接握手时，可以告知服务器自己支持哪种协议
let ws = new WebSocket('wss://example.com/socket',['appProtocol', 'appProtocol-v2']);
// new WebSocket(
//   in DOMString url, // 表示要连接的URL。这个URL应该为响应WebSocket的地址。
//   in optional DOMString protocols // 可以是一个单个的协议名字字符串或者包含多个协议名字字符串的数组。默认设为一个空字符串。
//   );
ws.binaryType = "arraybuffer";

// 错误时处理
ws.onerror = function(error) {
  console.log('error');

};

// 关闭时调用
ws.onclose = function() {
  console.log('close');
};

// 建立连接时调用
ws.onopen = function() {
  console.log('connect');
  // 向服务端发送消息
  ws.send('Conntection entabelished . Hellow Server!');
  ws.send(JSON.stringify({
    'msg': 'payload'
  }));
  let buffer = new ArrayBuffer(128);
  ws.send(buffer);

  let intview = new Uint32Array(buffer);
  ws.send(intview);

  let blob = new Blob([buffer]);
  ws.send(blob);

  subscribeToApplicationsUpdates(function(evt) { 
    if (ws.bufferedAmount == 0) 
    ws.send(evt.data); 
  });

  if (ws.protocol == 'appProtocol-v2') { 
    console.log('ccc')
  } else {
    console.log('other')
  }

};

/*

// 接受服务端发送的消息
ws.onmessage=function(msg){
  if(msg.data instanceof Blob){//处理二进制信息
    // 如果是二进制数据或Blob 对象，可直接将其转交给应用或将其转化为ArrayBuffer，由应用对其进行进一步处理。
    processBlod(msg.data);
  }else{
    // 浏览器如果接收到文本数据，会将其转换为DOMString 对象
    processText(mes.data);//处理文办信息
  }
};

**/


// 接受服务端发送的消息
ws.onmessage = function(msg) {
  if (msg.data instanceof ArrayBuffer) { //处理二进制信息
    // 如果是二进制数据或Blob 对象，可直接将其转交给应用或将其转化为ArrayBuffer，由应用对其进行进一步处理。
    processArrayBuffer(msg.data);
  } else {
    // 浏览器如果接收到文本数据，会将其转换为DOMString 对象
    processText(mes.data); //处理文办信息
  }
};