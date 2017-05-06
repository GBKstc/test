/**
 * Created by Administrator on 2017/4/20.
 */
// let $ = require(".3.2.1@jquery");

$.ajax({
	"url":"http://localhost:3000/",
	"method":"GET",
	"data":{},
	"success":function (data) {
		console.log(data);
	}
});