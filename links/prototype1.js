function GithubUser(username, password) {
  let _password = password
  this.username = username
  GithubUser.prototype.login = function () {
    console.log(this.username + '要登录Github，密码是' + _password)
  }
}

function JuejinUser(username, password) {
  this.articles = 3 // 文章数量
}
JuejinUser.prototype=new GithubUser();
JuejinUser.prototype.readArticle = function () {
  console.log('Read article')
}
const juejinUser1 = new JuejinUser('ulivz', 'xxx', 3)

const juejinUser2 = new JuejinUser('egoist', 'xxx', 0)

//  这就是把属性定义在原型链上的致命缺点，你可以直接访问，但修改就是一件难事了！
console.log(juejinUser1.username) // 'Unknown'
juejinUser1.__proto__.username = 'U' 
console.log(juejinUser1.username) // 'U'

// 卧槽，无情地影响了另一个实例!!!
console.log(juejinUser2.username) // 'U'





