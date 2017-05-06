// /**
//  * Created by Administrator on 2017/4/25.
//  */
//
// const gData = [
// 	{
// 		"id":"1",
// 		"module_name":"不育和治疗史",
// 		"children":[
// 			{
// 				"id": "21",
// 				"module_name": "输卵管因素",
// 				"createdDate": "2016-11-23 19:55:24",
// 				"createdBy": "林医生",
// 				"one_id": "7",
// 				"two_id": "21"
// 			},
// 			{
// 				"id": "22",
// 				"module_name": "多囊卵巢综合征",
// 				"createdDate": "2016-11-23 19:55:24",
// 				"createdBy": "林医生",
// 				"one_id": "7",
// 				"two_id": "21"
// 			},
// 			{
// 				"id": "23",
// 				"module_name": "子宫内膜异位症",
// 				"createdDate": "2016-11-23 19:55:24",
// 				"createdBy": "林医生",
// 				"one_id": "7",
// 				"two_id": "21"
// 			},
// 			{
// 				"id": "24",
// 				"module_name": "子宫肌瘤",
// 				"createdDate": "2016-11-23 19:55:24",
// 				"createdBy": "林医生",
// 				"one_id": "7",
// 				"two_id": "21"
// 			},
// 			{
// 				"id": "25",
// 				"module_name": "宫腔因素",
// 				"createdDate": "2016-11-23 19:55:24",
// 				"createdBy": "林医生",
// 				"one_id": "7",
// 				"two_id": "21"
// 			},
// 			{
// 				"id": "26",
// 				"module_name": "排卵因素",
// 				"createdDate": "2016-11-23 19:55:24",
// 				"createdBy": "林医生",
// 				"one_id": "7",
// 				"two_id": "21"
// 			},
// 			{
// 				"id": "27",
// 				"module_name": "ART治疗史",
// 				"createdDate": "2016-11-23 19:55:24",
// 				"createdBy": "林医生",
// 				"one_id": "7",
// 				"two_id": "21"
// 			},
// 			{
// 				"id": "28",
// 				"module_name": "复发性流产",
// 				"createdDate": "2016-11-23 19:55:24",
// 				"createdBy": "林医生",
// 				"one_id": "7",
// 				"two_id": "21"
// 			},
// 			{
// 				"id": "29",
// 				"module_name": "卵巢功能下降",
// 				"createdDate": "2016-11-23 19:55:24",
// 				"createdBy": "林医生",
// 				"one_id": "7",
// 				"two_id": "21"
// 			},
// 			{
// 				"id": "30",
// 				"module_name": "其他原因",
// 				"createdDate": "2016-11-23 20:23:26",
// 				"createdBy": "林医生",
// 				"one_id": "7",
// 				"two_id": "21"
// 			}
// 		],
// 	},
// 	{
// 		"id":"2",
// 		"module_name":"吸烟史",
// 		"children": [
// 			{
// 				"id": "36",
// 				"module_name": "未戒烟",
// 				"createdDate": "2016-11-23 20:52:38",
// 				"createdBy": "林医生",
// 				"one_id": "7",
// 				"two_id": "22"
// 			},
// 			{
// 				"id": "37",
// 				"module_name": "已戒烟",
// 				"createdDate": "2016-11-23 20:52:38",
// 				"createdBy": "林医生",
// 				"one_id": "7",
// 				"two_id": "22"
// 			},
// 			{
// 				"id": "38",
// 				"module_name": "被动吸烟",
// 				"createdDate": "2016-11-23 20:53:15",
// 				"createdBy": "林医生",
// 				"one_id": "7",
// 				"two_id": "22"
// 			}
// 		],
// 	}
// ];
//
// const loop = (data, key, callback) => {
// 	data[0]= "aaaa";
// 	//data.splice(0,1);
// 	// for(let i=0;i<data.length;i++){
// 	// 	if (data[i].id === key){
// 	// 		data.splice(i,1);
// 	// 	}
// 	// }
// 	// data.forEach((item, index, arr) => {
// 	// 	if (item.id === key) {
// 	// 	return callback(item, index, arr);
// 	// }
// 	// if (item.children) {
// 	// 	return loop(item.children, key, callback);
// 	// }
// //});
// };
// loop(gData, "1");
//
// console.log(gData);

let rex = /a/;
console.log(rex.test("aaaa"));