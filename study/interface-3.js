import { Interface } from "readline";

/* 
用鸭式辫型 模仿接口


*/

//Interface

let Composite=new Interface('Composite',['add',"remove",'getChild']);
let FormItem=new Interface('FormItem',['save']);

let CompositeForm=function(id,method,action){

};

function addForm(formInterface){
  ensuerImplements(formInterface,Composite,FormItem);
}