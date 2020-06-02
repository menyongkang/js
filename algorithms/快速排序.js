function qSort(arr){
  var left=[],right=[],len=arr.length;
  if(len<=1) return arr;
  var base=arr[0];
  for(var i=1;i<len;i++){
    if(arr[i]<=base){
      left.push(arr[i]);
    }else{
      right.push(arr[i])
    }
  }
  return [...qSort(left),...[base],...qSort(right)];

}

console.log(qSort([3,0,4,5,2,-1]))