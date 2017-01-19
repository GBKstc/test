1.DOM结构——两个节点之间可能存在哪些关系以及如何在节点之间任意移动。

DOM是文档对象模型的简称，借助DOM模型可以将一个结构化文档转换成DOM树，程序可以访问、修改梳理
的节点，也可以新增、删除树里的节点。DOM只是访问结构化文档（主要是HTML和XML）的一种思想，并不
是一种技术。基于这种思想，各种语音都有自己的DOM解析器。解析器的作用是完成结构化文档和DOM树之
间的转换关系。通过使用DOM模型，JS可以动态地更新HTML页面内容。

DOM模型中两个节点可能存在的关系有两种：父子关系，兄弟关系。


2.DOM操作——怎样添加、移除、移动、复制、创建和查找节点。
添加：Node.appendChild(newNode) Node.insertBefore(newNode,Node.childNode)
移除：Node.removeChild(oldChild)
复制：Node.cloneNode(boolean deep);当deep为true,复制节点的全部后代节点
替换：document.getElementById("myList").replaceChild(newnode,oldnode);
创建：document.createElement(tag);
查找节点：document.getElementById document.getElementByTagName document.getElementByClassName() 


3.事件——怎样使用事件以及IE和DOM事件模型之间存在哪些主要差别。
浏览器解析事件的方式有两种触发方式，冒泡和捕获。冒泡是DOM元素上的事件被触发后 会向上级传递。捕获是DOM元素
上的事件被触发后，会向下级传递。

IE和DOM模式之间的区别：
obj.onclick=function('click'){} : IE和别的浏览器都支持 只支持冒泡不支持捕获 不支持多事件绑定。function中的event参数
只对非IE有效，IE有特制的window.event
obj.addEventListener和obj.removeEventListener : 三个参数 事件名字 处理函数 boolean是否支持捕获
IE不支持 支持多事件绑定 
obj.attachEvent('onclick')和obj.detachEvent('onclick') ：只有IE支持且只能冒泡 其他类似上一个绑定方法

补充：禁止默认事件非IE浏览器:e.preventDefault(),IE:window.event.returnValue=false
阻止冒泡：非IE浏览器:e.stopPropagation(),IE:window.event.cancelBubble=true


4.XMLHttpRequest——这是什么、怎样完整地执行一次GET请求、怎样检测错误。
XMLHttpRequest是AJAX的基础。XMLHttpRequest用于在后台与服务器交换数据。这意味着可以在不重新加载整个网页的情况下，
对网页的某部分进行更新。
{
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		if(xmlhttp.readyState==4&&xmlhttp.status==200){
			console.log(xmlhttp.responseText);
		}
	}
	xmlhttp.open('GET',url,true);
	xmlhttp.send();
}
{
	xmlhttp = new XHMHttpRequest();
	xmlhttp.open('GET','test1.txt',true);
	xmlhttp.send();
	xmlhttp.onreadystatechange = function(){
		if(xmlhttp.readyState==4&&xmlhttp,.status==200){
			console.log(xmlhttp.responseText)
		}
	}
}
补充GET和POST的区别
（1）get是把参数数据列表加到提交表单的ACTION属性所指的URL中，值和表单内各个字段一一对应，在URL中可以看到。
post是通过HTTPpost机制，将表单内各个字段与其内容放置在HTML HEADER内一起发送到ACTION属性所指的URL地址。用户看不到这个过程
（2）get传送的数据量较小，不能大于2KB。post不受大小限制。
（3）get安全性非常低，post安全性较高。
5.严格模式与混杂模式——如何触发这两种模式，区分它们有何意义。
触发的方法使用DOCTYPE来定义的。DOCTYPE是一组机器可读的规则，它指示HTML文档中允许有什么，不允许有什么。
所以DOCTYPE正是用来告诉浏览器使用哪种DTD，一般放在开头用来告诉别人这个文档的类型风格。
严格模式：严格模式是浏览器根据WEB标准去解析页面，是一种要求严格的DTD，不允许使用任何表现层的语法，比如<br/>
混杂模式：混杂模式则是一种向后兼容的解析方法，可以实现IE5.5以下版本浏览器的渲染格式。
区分它们的意义：严格模式是为了统一网站的解析方式，而混杂模式存在是为了向后兼容。（HTML5开始没有DTD 也就没有了两个模式）


6.盒模型——外边距、内边距和边框之间的关系，IE 8以下版本的浏览器中的盒模型有什么不同。
一个元素盒模型的层次从内到外分别为：内边距，边框和外边距
IE8以下版本的浏览器的元素的高和宽不包括内边距和边框


7.块级元素与行内元素——怎么用CSS控制它们、它们怎样影响周围的元素以及你觉得应该如何定义它们的样式。
块元素-->行元素 display:inline 行元素-->块元素 display:block 块元素占一行。行元素可以同一行显示


8.浮动元素——怎么使用它们、它们有什么问题以及怎么解决这些问题。
浮动元素可以使用CSS中float属性来定义元素的浮动位置
问题：(1)父元素的高度无法被撑开。
(2)与浮动元素同级的非浮动元素会跟随其后
(3)若非第一个元素浮动，则该元素之前的元素也需要浮动，否则会影响页面显示的结构
使用CSS中的clear:both;属性来清除元素的浮动可以解决2，3问题，对于问题1，可以去浮动


9.HTML与XHTML——二者有什么区别，你觉得应该使用哪一个并说出理由。
HTML是指超文本标记语音，是一套标记标签，用来描述网页。
XHTML是更严谨更纯洁的HTML版本。
主要区别：
XHTML元素必须被正确地嵌套
XHTML元素必须被关闭，空标签也必须被关闭，如<br>必须写成<br/>
XHTML标签名必须用小写字母
XHTML文档必须拥有根元素
XHTML文档要求给所有属性赋一个值
XHTML要求所有的属性必须用引号""括起来
XHTML文档需要把所有<、>、&等特殊符号用编码表示
XHTML文档不要在注释内容中使用"--"
XHTML图片必须有说明文字
XHTML文档中用id属性代替name属性


10.JSON——它是什么、为什么应该使用它、到底该怎么使用它，说出实现细节来。
JSON是一种轻量级的数据交换格式。独立于语言。易于人员识别和机器处理。JSON是JS原生格式，处理JSON不需要任何特殊API。
对于AJAX应用程序来说，JSON比XML更快更易使用。
使用方法：（1）数据在名称/值对中
（2）数据由逗号分隔
（3）花括号保存对象
（4）方括号保存数组

