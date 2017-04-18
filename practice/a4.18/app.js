let a = function(){
	this.GBK="AAA";
	this.LQ="CCC";
}
let b = function(){
	this.GBK="BBB";
	this.LQ="DDD";
}
let c = function(){
	this.GBK="BBB";
	this.LQ="DDD";
}
b.prototype = new a();
//c.prototype = Object.assign({},a);

let bb = new b();
console.log(bb.GBK);
delete bb.GBK;
console.log(bb.GBK);