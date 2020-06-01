/**
 * Fisher–Yates shuffle
 */
Array.prototype.shuffle = function() {
  var input = this;

  for (var i = input.length-1; i >=0; i--) {

      var randomIndex = Math.floor(Math.random()*(i+1));
      console.log(randomIndex)
      var itemAtIndex = input[randomIndex];

      input[randomIndex] = input[i];
      input[i] = itemAtIndex;
  }
  return input;
}
var cc=[1,2,3,4,5,6,7,8].shuffle();
console.log(cc)
//[4, 6, 3, 2, 5, 1, 7, 8] // 每次结果都是随机的