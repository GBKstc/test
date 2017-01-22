1.Doctype的作用是什么？
用于告知浏览器文档采用的HTML规范。


2.iframe有哪些缺点？
iframe元素会创建包含另外一个文档的内联框架。
缺点：(1)iframe会阻塞主页面的Onload事件
(2)搜索引擎的检索程序无法解读这种页面，不利于SEO
(3)会影响页面的并行加载。
补充：什么是并行加载？并行加载：同一时间针对同一域名下的请求。一般情况，iframe和所在页面在同一个域下面，
而浏览器的并加载的数量是有限制的
用JS给iframe的src加载页面内容，可以解决(1)(3)


3.HTML5有哪些新特性，移除了哪些元素？
(新特性)
1)绘画canvas
2)本地离线存储loaclStorage
3)sessionStorage
4)用于媒介回放的video和audio元素
5)语义化更好的内容元素，比nav,footer,header,section,article
6)表单控件，calendar,date,time,email,url,search
7)新的技术webworker JS异步
8)websocket通信
9)Geolocation地理定位
(移除的元素)
1)纯表现的元素
<basefont><font><center>
2)框架集
<frame>


4.页面渲染原理是什么？
渲染页面通过渲染引擎完成。渲染引擎可以显示html,xml文档及图片，它也可以借助插件（一种浏览器扩展）显示其他类型数据，例如使用PDF阅读器插件可以显示PDF插件。
不同的浏览器有不同的渲染引擎，对于渲染引擎的使用总结如下：
Trident内核：IE,MaxThon,TT,The World,360,搜狗浏览器
Gecko内核：Netscape6及以上版本,火狐,MozliiaSuite/SeaMonkey等
Presto内核：Opera7及以上
Webkit内核：Safari,Chrome

渲染主流程
渲染引擎首先通过网络获取所请求文档的内容，通常以8k分块的方式完成。下面是渲染引擎在取得内容之后的基本流程：
解析html以构建dom树->构建render树->布局render树->绘制render树
步骤详细解释
第一步：渲染引擎开始解析html，规矩标签构建DOM节点
第二步：根据css样式构建渲染树，包括元素的大小，颜色，隐藏的元素不会被构建到该树中。
第三步：根据css样式构建布局树，主要是确定元素要显示的位置
第四步：根据前面的信息，绘制渲染树。