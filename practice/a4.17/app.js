/**
 * Created by Administrator on 2017/4/17.
 */
function myError(num){
	this.num = num;
	this.value = "error";
};
function getMouth(num){
	const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
		"Aug", "Sep", "Oct", "Nov", "Dec"];
	num = parseInt(num)-1;
	if(months[num]!==undefined){
		return months[num];
	}
	else{
		throw new myError(num);
	}
}

try {
	let myMonth = 18;
	let mouthValue = getMouth(myMonth);
	console.log(mouthValue);
} catch (e) {
	console.log(e.num);
}
// try {
// 	// statements to try
// 	var myMonth = 17; // 15 超出边界并引发异常
// 	var monthName = getMonthName(myMonth);
// } catch (e) {
// 	var monthName = "unknown";
// 	console.log(e.message, e.name); // 传递异常对象到错误处理
// }

// function UserException(message) {
// 	this.message = message;
// 	this.name = "UserException";
// }
// function getMonthName(mo) {
// 	mo = mo-1; // 调整月份数字到数组索引 (1=Jan, 12=Dec)
// 	var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
// 		"Aug", "Sep", "Oct", "Nov", "Dec"];
// 	if (months[mo] !== undefined) {
// 		return months[mo];
// 	} else {
// 		throw new UserException("InvalidMonthNo");
// 	}
// }
//
// try {
// 	// statements to try
// 	var myMonth = 17; // 15 超出边界并引发异常
// 	var monthName = getMonthName(myMonth);
// } catch (e) {
// 	var monthName = "unknown";
// 	console.log(e.message, e.name); // 传递异常对象到错误处理
// }