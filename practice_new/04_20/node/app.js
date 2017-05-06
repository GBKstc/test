let express = require("express");
let app = express();

app.get('/',function (req,res) {
	res.send("success");
});

app.listen(3000,function (req,res) {
	console.log("success");
	console.log(require.extensions);
});