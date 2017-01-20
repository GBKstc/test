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


 
 