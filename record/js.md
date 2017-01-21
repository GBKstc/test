1.原生JS和window.onload与jquery的$(document).ready(function(){})有什么不同？
(1)window.onload必须等到页面内包括图片的所有元素加载完毕后才能执行
$(document).ready()是DOM结构绘制完毕后就执行，不必等到加载完毕。
(2)window.onload只能执行一个
$(document).ready()可以执行多个
(3)$(document).ready()可以简化写成$(function(){})


2.要实现一个对页面某个节点的拖拽要如何实现
mousedown mousemove mouseup


3.javaScript原型，原型链
原型就是prototype，用于实现类继承的。
用——proto__串起来的直到Object.prototype.__proto__为null的链叫做原型链。


4.Node.js的适用场景？
Node.js处理并发的能力强，但处理计算和逻辑的能力比较弱。所以适合用在高并发的场景。
比如：实时聊天，客户端逻辑强大的单页面APP。


5.jquery与jQuery UI 有什么区别？
jquery是一个JS库，jQueryUI是利用jQ的扩展性，设计的插件，用于提供一些常用的界面元素，
诸如对话框，拖动行为，改变大小行为等。


6.对Node的优点和缺点提出自己的看法
优点：1.采用事件驱动，异步编程，为网络服务而设计。其实JS的匿名函数和闭包特性非常适合事件驱动，异步编程。
而且JS也简单易学，很多前端设计人员可以很快上手做后端设计。
2.Node.js非阻塞模式的IO处理给Node.js带来在相对低系统资源耗用下的高性能与出众的负载能力，
非常适合用作依赖其它IO资源的中间层服务。
3.Node.js轻量高效，可以认为是数据密集型分布式部署环境下的实时应用系统的完美解决方案。
Node非常适合如下情况：在响应客户端之前，您预计可能有很高的流量，但所需的服务器端逻辑和处理不一定很多。
 缺点：1.可靠性低	
 2.单进程，单线程，只支持单CPU，不能充分的利用多核CPU服务器。一旦这个进程崩掉，那么整个web服务器就崩掉了。
 
 
 7.静态资源CDN如何使用
 放在<script src=CDN>
 
 
 8.用js手写快速排序。
 var quickSort = function (arr) {
        if(arr<=1){
            return arr;
        }
        var pivotIndex = Math.floor(arr.length/2);
        var pivot = arr.splice(pivotIndex,1)[0];
        var right = [];
        var left = [];
        for(var i=0;i<arr.length;i++){
            if(arr[i]>pivot){
                right.push(arr[i]);
            }else{
                left.push(arr[i])
            }
        }
        return quickSort(left).concat([pivot],quickSort(right))
    }
 
 
9.Java和Javascript的共同点。
JS是一种基于java基本语句和控制流之上的简单简化，所以java和js在许多语法上是一致的，并且js也
具有面向对象，事件驱动和安全性的特性。


10.规避js多人开发函数重名问题。
(1)命名空间 http://www.jianshu.com/p/554454d951d9
	var MYNAMESPACE = MYNAMESPACE || {};

	MYNAMESPACE.person = function(name) {
		this.name = name;
	};

	MYNAMESPACE.person.prototype.getName = function() {
		return this.name;
	};

	// 使用方法
	var p = new MYNAMESPACE.person("ifcode");
	p.getName();        // ifcode
(2)封闭空间 	ES6中可以使用let
(3)js模块化mvc http://www.cnblogs.com/qingkong/p/5092003.html
(4)seajs
(5)变量转换成对象的属性
(6)对象化
补充 ES6中symbol可以定制唯一变量。
 
 
 11.js面向对象中继承实现。
 http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_encapsulation.html
 
 
 12.编写一个方法，去掉一个数组的重复元素
         var s = [0,2,3,4,4,0,2];
        for(var i=0,o={},tmp=[],count=0,l=s.length;i<l;i++){
                if(o[s[i]]){
                        count++;
                }else{
                        o[s[i]]=1;
                        tmp.push(s[i])
                }
        }
        alert(count);
        alert(tmp)


13.js中如何检测一个变量是一个string类型？
	function str(obj){
		return typeof(obj) =='string'
	}
 
 
14.请尽可能详尽的解释AJXA的工作原理
http://www.cnblogs.com/mingmingruyuedlut/archive/2011/10/18/2216553.html


15.Null,undefined的区别?
null表示"没有对象"，即该处不应该有值。典型用法是：
（1） 作为函数的参数，表示该函数的参数不是对象。
（2） 作为对象原型链的终点。

Object.getPrototypeOf(Object.prototype)

undefined表示"缺少值"，就是此处应该有一个值，但是还没有定义。典型用法是：
（1）变量被声明了，但没有赋值时，就等于undefined。
（2) 调用函数时，应该提供的参数没有提供，该参数等于undefined。
（3）对象没有赋值的属性，该属性的值为undefined。
（4）函数没有返回值时，默认返回undefined。


16.转化进制为十进制
parseInt（"FFF",16）;16进制转10


17.描述一下cookies,sessionStorage和localStorage的区别？
相同 都储存在客户端
不同
	大小
		cookies大小不超过4KB sessionStorage和localStorage大小可以达到5M或者更大
	保存时间
		cookies过期前一直存在，sessionStorage在页面关闭后自动删除，localStorage除非主动删除，否则一直存在。
	服务器交互方式
		cookies的数据会自动发送到服务器，服务器也可以写cookies到客户端
		sessionStorage和localStorage不会自动发送 只存在本地。


18.	简述什么是面向对象
面向对象就是就将问题抽象成若干对象，又将对象的属性和操作封装到类中。具有抽象性、封装性、继承性、多态性的特点。


19.简述ajax过程
	创建XMLHttpRequest对象
	调用open方法建立连接
	调用send方法发送数据
	触发oncreadystatechange事件 判断状态
	从responseText接收到返回的数据
	
	
20.解释下事件代理
浏览器事件机制有两种，一种是冒泡，还有一种是捕获。而事件代理主要得益于事件冒泡机制。
多个子元素需要同时绑定一个事件时，可以将事件添加到它们的父节点而将事件委托给父节点来触发处理。


21.解释下js中this是如何工作的
1.函数中的this的值取决于函数调用的模式：
(1)方法调用模式：当函数被保存为对象的一个属性时，该函数为该对象的方法。函数中this的值为该对象。
(2)函数调用模式：当函数并不是对象的属性。函数中this的值为全局对象。
(3)构造器调用模式：即使用new调用的函数，则其中this将会被绑定到那个新构造的对象
(4)使用apply或者call调用模式：该模式调用时，函数中this被绑定到apply或call方法调用时接受的第一个参数。

改变this的值主要方法:用apply和call方法调用时强制修改，使this指向第一个参数。
使用Function.bind方法创造新的函数，该新函数中this指向所提供的第一个参数。
bind在IE8以下不能使用。
http://blog.jobbole.com/58032/


22.解释一下原型继承的原理。
由于所有的实例对象共享同一个prototype对象，那么从外界看起来，prototype对象就好像是实例对象的原型，而实例对象则好像"继承"了prototype一样。
http://www.ruanyifeng.com/blog/2011/06/designing_ideas_of_inheritance_mechanism_in_javascript.html


23.Call和.apply的区别是什么。
call(thisObj,Object)
call:用来代替另外一个对象调用一个方法。call方法可将一个函数的对象上下文从初始的上下文改变为由thisObj指定的新对象。

apply(thisObj,[argArray])
如果 argArray 不是一个有效的数组或者不是 arguments 对象，那么将导致一个 TypeError。如果没有提供 argArray 和 thisObj 任何一个参数，那么 Global 对象将被用作 thisObj， 并且无法被传递任何参数。


24.什么是”use strict”，使用它的好处是什么。
js6添加了第二种运行模式，严格模式。这种模式使得JS在更加严格的模式下运行。
好处：(1)消除JS语法的一些不合理，不严谨之处，减少一些怪异行为;
(2)消除代码运行的一些不安全之处，保证代码运行的安全。
(3)提高编译器效率，增加运行速度。
(4)为未来新版本的JS坐好铺垫
(IE6789不支持严格模式)
缺点：在JS压缩之后，会出现严格声明不生效的情况。


25.字符串翻转
1)str.split("").reverse().join("");
2)for(var i=str.lenth;i>=0;i--)


26.如何向数组中间插入或删除元素？
使用 splice方法 开始位置 删除个数 插入的内容


27.用JS实现千位分隔符。
1)反转添加->再反转


28.事件是什么？
事件用于监听浏览器的操作行为，浏览器触发动作时，被捕捉到而调用相应的函数


29.谈一下JQ中bind,live，delegate，on的区别？
bind:
1)兼容性比较好
2)绑定事件到所有选出来的元素上
3)不会绑定事件到动态添加的那些元素上
4)当元素很多时，会出现效率问题，特别是嵌套层次比较深的元素
live
1)所有事件都绑定到$(document)上
2)可以给动态添加的元素绑定事件
3)无法阻止冒泡
delegate
特点类似live,不过父元素采用就近原则
On如果第二个参数为NULL 类似bind 如果为$(document)类似live 如果不是 类似deleg


30.原型是什么？原型链是什么？
在JS中原型是一个prototype,用于表示类型之间的关系
JS中万物都是对象，对象和对象之间都有关系，这个关系听过prototype对象指向父类对象，直到指向Object对象为止。
这样就形成了一个原型指向的链条，专业术语称之为原型链。


31.什么是闭包，为什么要用它？
闭包就是函数中的函数，里面的函数可以访问外面函数的变量，外面函数的变量是这个内部函数的一部分。



