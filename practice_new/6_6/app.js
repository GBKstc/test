/**
 * Created by Administrator on 2017/6/6.
 */
// let a = 1;
// let b = [1];
//
// let c = function (value) {
// 	value = value+1;
// };
//
// let d = function (value) {
// 	value[0] = value[0]+1;
// };
//
// c(a);
// d(b);
//
// console.log(a);
// console.log(b);

let a = function (u,c) {

	console.log(arguments.callee);
};

a("aaa");