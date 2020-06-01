var locationList = [{
    id: 0,
    name: "中国"
  },
  {
    id: 1,
    pid: 0,
    name: "广东省"
  },
  {
    id: 2,
    pid: 1,
    name: "深圳市"
  },
  {
    id: 3,
    pid: 1,
    name: "广州市"
  },
];

var json = {
  country: {
    name: '中国',
    code: 0,
    children: [{
      name: '广东省',
      code: 1,
      children: [{
        name: "深圳市",
        code: 2,
        children: [

        ]
      }]
    }]

  }
}


// 格式化树形数据格式，目前使用的接口返回的是一维数组
function toTreeData(data) {
  var pos = {};
  var tree = [];
  var i = 0;
  while (data.length != 0) {
      if (data[i].pid == null) {
          tree.push($.extend(data[i], {children: [], selected: false}));
          pos[data[i]._id] = [tree.length - 1];
          data.splice(i, 1);
          i--;
      } else {
          var posArr = pos[data[i].pid];
          if (posArr != undefined) {

              var obj = tree[posArr[0]];
              for (var j = 1; j < posArr.length; j++) {
                  obj = obj.children[posArr[j]];
              }

              obj.children.push($.extend(data[i], {children: [], selected: false}));
              pos[data[i]._id] = posArr.concat([obj.children.length - 1]);
              data.splice(i, 1);
              i--;
          }
      }
      i++;
      if (i > data.length - 1) {
          i = 0;
      }
  }
  return tree;
}