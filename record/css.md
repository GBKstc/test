1.CSS3新特性
选择器
rgba和透明度
多栏布局
多背景图
Word Wrap//允许长单词换行
文字阴影
@font-face//允许引入文字样式
圆角
边框图片
盒阴影
盒子大小
媒体查询
语音


2.PostCSS是啥？
PostCSS使CSS变成JS的数据，使它变成可操作。PostCSS是基于JS插件，然后执行代码操作。
PostCSS自身并不会改变CSS，它只是一种插件，为执行任何的转变铺平道路。PostCSS就像一个平台。
 其中
 
 
3.css中的class和id有什么区别？
class可以在页面里面重复使用，
id由于在页面里面只能出现一次，所以不能重复使用


4.解释一下浮动和它的工作原理。
浮动元素会脱离文档流，不占据空间。浮动元素碰到包含它的边框或者浮动元素的边框停留


5.列举不同的清除浮动的方法，并指出他们各自适用的场景。
(1)额外标签法。会增加额外的标签，使HTML不够整洁
(2)使用after伪类
(3)设置overflow为hidden或者auto 给包含浮动元素的父标签添加css属性 overflow:auto;zoom:1用于兼容IE6


6.盒子模型的理解
IE和W3C对于盒子模型的定义有些不同
相同：盒子模型从外到内包括margin border padding content
不同：IE认为盒子的高宽包括border padding content而W3C认为高宽只包涵content
不过后来W3C添加了box-sizing包涵两个属性content-box和border-box两个属性。


7.定位position属性
absolute绝对定位 以父元素为基准
fixed固定定位 以浏览器窗口为基准
relative相对定位 相对自己定位
static默认值
补充:如果top left right bottom都为默认值则为默认定位
absolute定位会脱离文档，浮起来，重叠情况下 用Z-index排序，且定位时候 忽略父元素padding。


8.样式的导入方法。
link:<link href='index.css' rel='stylesheet'>
import:<style type='text/css'>@import'index.css'</style>

link不存在兼容性问题
link不仅可以导入样式表，还能导入图片,@import只能导入样式表
link引用CSS时，在页面载入时同时加载。@import需要页面完全载入以后加载。
link支持使用js控制DOM去改变样式。@import不支持
@import可以在样式表中导入别的样式表。
所以我们一般在HTML文件中使用link在样式表中导入使用@import。


9.::before和:before有什么差别
相同点：都可以用来表示伪类对象，用来设置对象前的内容
不同点:前者是css3的写法，后者是css2的写法，所以后者兼容性比较好。在H5开发中推荐使用前者。

补充：伪类对象要配合content属性一起使用。伪类对象不会出现在DOM中所以不能通过JS来操作。


10.css样式的优先级是什么样子的？
！important>style>权重值，权重值相同情况下，后定义的生效。
标签权重1 class权重10 id权重100


11.如何居中一个元素(正常，绝对定位，浮动元素)？
水平居中：
	1)行级元素：父元素设置text-align:center
	2)块级元素：设置margin:0 auto
	3)浮动元素：
	<div class="a">
		<div class="b"></div>
	</div>
	<style>
	.a{
	float:left;
	position:relative;
	left:50%
	}
	.b{
	float:left;
	position:relative;
	right:50%
	}
	</style>
	4)绝对元素
	.center{
	position:absolute;
	left:0;
	right:0;
	marin:0 auto;
	}
垂直居中
	1)行级元素：设置line-height
	2)块级元素：
	(1)父级元素高度固定的情况下：父元素设置line-height 子元素：display:inline-block;vertical-align:middle;
	(2)父元素不固定的情况下padding-top和padding-bottom一样

	
12.display默认的有block块级，inline内联元素，list-item项目列表，none不显示
常见的属性除了上面四个 还有inline-block table table-row flex	


13.为什么要初始化样式
因为在不同浏览器，标签的默认值是不一样的，没有初始化，往往会出现浏览器之间的页面差异。


14.纯css创建三角形原理
使用边框颜色。
补充：写一个三角镜头 一样大小的白色三角形覆盖在黑色三角形上面就可以。


15.清除浮动的方法。
使用clear:both
使用overflow属性
使用display属性
父元素浮动