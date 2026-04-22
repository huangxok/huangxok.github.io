---
title: "hammerJs"
pubDate: 2017-03-27

tags:
  - hammerJS
  - touch
  - pen
---
hammerJS是一个优秀的、轻量级的触屏设备手势库，现在已经更新到2.04版本，跟1.0版本有点天壤地别了，毕竟改写了事件名并新增了许多方法，允许同时监听多个手势、自定义识别器，也可以识别滑动方向。

不过对于新版本的hammerJS却及其匮乏中文指引文档，就着这一点我还是上 [官网](http://hammerjs.github.io) 翻译下英文文档，写一篇跟大家分享吧 _（其实hammer的API写的很不怎样，内容和排版都很马虎了事，建议先仔细研究 [examples](http://hammerjs.github.io/examples) 后再查阅。你也可以通过Aaron猪肉荣的Hammer系列文章来学习）_ 。

注：本文将所有API中提到的 “input” 翻译为 “交互”，它实际包括mousedown, mousemove, touchmove, pointercancel事件。


#### GENERAL

#### 开始

HammerJS是一个开源的库，可以识别由 touch, mouse 和 pointerEvents 触发的系列手势。它非常小巧，压缩后仅有3.96kb，并没有多余的脚本依赖。

你可以从 [Github](https://github.com/hammerjs/hammer.js/tree/master/) 上获取最新版的HammerJS，或者直接下载 [压缩版](http://hammerjs.github.io/dist/hammer.min.js) 或 未压缩的 [开发版](http://hammerjs.github.io/dist/hammer.js) 的HammerJS源码。

[点此](http://hammerjs.github.io/changelog) 获取版本变动日志。

也可以 [点这里](https://github.com/hammerjs/hammer.js/tree/1.1.x) 获取更旧的1.1版本。

2.0版本的变动：彻底重写了源码，包括可复用的识别器 _（recognizer）_ 、提升了对最新移动端浏览器可用的触摸行为css属性的支持，另支持了多个hammer实例同时使用，让多用户同时使用一台设备也不在话下。


#### 使用

HammerJS的使用方式非常简单，只要将库引入到文件中，并创建一个新的实例即可：

<pre class="prettyprint hljs javascript"><span style="color: #0000ff;"><span class="hljs-keyword">var</span> hammertime = <span style="color: #0000ff;"><span class="hljs-keyword">new</span> <span style="color: #000000;">Hammer(myElement, myOptions);
hammertime.on(<span class="hljs-string">'pan'</span>, <span style="color: #0000ff;"><span class="hljs-function"><span class="hljs-keyword">function</span></span><span style="color: #000000;"><span class="hljs-function">(<span class="hljs-params">ev</span>)</span> {
    <span class="hljs-built_in">console</span>.log(ev);
});</span></span></span></span></span></pre>

它会默认为这个对象添加一系列识别器，包括 tap<点>, doubletap<双点击>, press<按住>, 水平方位的pan<平移> 和 swipe<快速滑动>, 以及多触点的 pinch<捏放> 和 rotate<旋转>识别器。不过呢，其中的 pinch 和 rotate 默认是不可用的，因为它们可能会导致元素被卡住，如果你想启用它们，可以加上这两句：

<pre class="prettyprint hljs dart">hammertime.<span class="hljs-keyword">get</span>(<span class="hljs-string">'pinch'</span>).<span class="hljs-keyword">set</span>({ enable: <span style="color: #0000ff;"><span class="hljs-keyword">true</span> <span style="color: #000000;">});
hammertime.<span class="hljs-keyword">get</span>(<span class="hljs-string">'rotate'</span>).<span class="hljs-keyword">set</span>({ enable: <span style="color: #0000ff;"><span class="hljs-keyword">true</span> });</span></span></span></pre>

若要允许识别器识别垂直方位或全部方位的 pan 和 swipe，可以这么写：

<pre class="prettyprint hljs less"><span class="hljs-selector-tag">hammertime</span><span class="hljs-selector-class">.get</span>(<span class="hljs-string">'pan'</span><span style="color: #000000;">)<span class="hljs-selector-class">.set</span>({ <span class="hljs-attribute">direction</span>: Hammer.DIRECTION_ALL });
<span class="hljs-selector-tag">hammertime</span><span class="hljs-selector-class">.get</span>(<span class="hljs-string">'swipe'</span>)<span class="hljs-selector-class">.set</span>({ <span class="hljs-attribute">direction</span>: Hammer.DIRECTION_VERTICAL });</span></pre>

另建议加上如下meta标签，防止doubletap 或 pinch 缩放了viewport：

<pre class="prettyprint hljs xml"><span style="color: #0000ff;"><span class="hljs-tag"><</span><span style="color: #800000;"><span class="hljs-tag"><span class="hljs-name">meta</span></span> <span style="color: #ff0000;"><span class="hljs-tag"><span class="hljs-attr">name</span></span><span style="color: #0000ff;"><span class="hljs-tag">=<span class="hljs-string">"viewport"</span></span><span style="color: #ff0000;"> <span class="hljs-tag"><span class="hljs-attr">content</span></span><span style="color: #0000ff;"><span class="hljs-tag">=<span class="hljs-string">"user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1"</span></span><span style="color: #0000ff;"><span class="hljs-tag">></span></span></span></span></span></span></span></span></pre>


#### 更多控制

你可以为你的实例设置属于你自己的识别器，虽然要多写一点代码，但能让你控制更多能被识别的手势：

<pre class="prettyprint hljs cs"><span style="color: #0000ff;"><span class="hljs-keyword">var</span></span> mc = <span style="color: #0000ff;"><span class="hljs-keyword">new</span></span> <span style="color: #000000;">Hammer.Manager(myElement, myOptions);

mc.<span class="hljs-keyword">add</span>(</span> <span style="color: #0000ff;"><span class="hljs-keyword">new</span></span> Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: <span class="hljs-number">0</span> <span style="color: #000000;">}) );
mc.<span class="hljs-keyword">add</span>(</span> <span style="color: #0000ff;"><span class="hljs-keyword">new</span></span> Hammer.Tap({ <span class="hljs-keyword">event</span>: <span class="hljs-string">'quadrupletap'</span>, taps: <span class="hljs-number">4</span> <span style="color: #000000;">}) );

mc.<span class="hljs-keyword">on</span>(</span><span class="hljs-string">"pan"</span><span style="color: #000000;">, handlePan);
mc.<span class="hljs-keyword">on</span>(</span><span class="hljs-string">"quadrupletap"</span>, handleTaps);</pre>

上述的代码创建了一个实例（mc），它包含了一个 pan 和一个 quadrupletap 手势，识别器实例会在它们被添加（add）之后就不断地执行，且（一个识别器实例）只能识别一个（手势）。


#### 贴士和窍门

#### 1\. 试着避免垂直方向上的 pan/swipe

垂直方向上的平移操作一般是用来滚动你的页面的，而且有些（过时的）浏览器不会传递事件，导致Hammer无法识别这些手势。你可以尝试换另一种可替换的途径来实现相同的动作。

#### 2\. 在设备上做测试

有时候Hammer需要做一些调整，像swipe的速率或其它阈值，如果你在一台反应较慢的设备上做测试，那么你要保证你的回调越简单越好。有些站点例如 [JankFree.org](http://jankfree.org/) 上有专门的文章来介绍如何提升展示效果。

#### 3\. 去掉Windows Phone点击时的高亮效果

你在Windows Phone上的IE10和IE11里tap某元素时，会有一个小小的tap高亮效果，加上这个meta标签可以取消这种效果：

<pre class="prettyprint hljs xml"><span class="hljs-tag"><<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"msapplication-tap-highlight"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"no"</span> /></span></pre>

#### 4. "我怎么选择不了文本了！"

Hammer设置了一个属性用来提升桌面平移操作的用户体验（UX）。常规来说，当你在桌面级浏览器上拖动页面时，你应该是可以正常选中文本的，但user-select这个CSS属性禁用了这功能。如果你在意文本选择功能，同时觉得桌面级的体验没必要太尽善尽美，你可以很轻松地取消这个默认选项——确保在创建实例之前执行：

<pre class="prettyprint hljs css"><span style="color: #0000ff;"><span class="hljs-selector-tag">delete</span></span> <span class="hljs-selector-tag">Hammer</span><span class="hljs-selector-class">.defaults</span><span class="hljs-selector-class">.cssProps</span><span class="hljs-selector-class">.userSelect</span>;</pre>

<div>

5\. “在tap之后，导致触发了一个click事件，我不想这样！”

这种click事件我们称之为一个“幽灵点击”事件，我创建了一个小函数来避免触摸后导致click，对此， [Ryan Fioravanti的文章](https://developers.google.com/mobile/articles/fast_buttons#ghost) 给了我很大的灵感。

</div>

#### 浏览器/终端的支持

无须担心你的浏览器或系统不在下方的列表上，Harmmer可以运行在除了IE8-的任何地方。浏览器若对触摸行为（touch-action）提供原生支持，那么对比那些不支持的浏览器，会有更好的体验。查看 [touch-action](http://hammerjs.github.io/touch-action/) 页面了解更多。

![](http://img0.tuicool.com/VnAVFn.jpg!web)


#### 实例

[1\. 基础实例](http://codepen.io/jtangelder/pen/lgELw)

[2\. 垂直方向的pan识别器](http://codepen.io/jtangelder/pen/ABFnd)

[3\. 同时识别（用RecognizeWith实现）Pinch和Rotate](http://codepen.io/jtangelder/pen/zKHDk)

[4\. 用RecognizeWith操作Quadrupletap（自定义的，表示4个tap）识别器](http://codepen.io/jtangelder/pen/qeCAs)

[5. SingleTap<单点>和DoubleTap<双点击>(配合recognizeWith/requireFailure)](http://codepen.io/jtangelder/pen/pBuIw)

更多实例可以查看 [github上的库文件](https://github.com/hammerjs/hammer.js/tree/master/tests) 。


#### HAMMER

#### 常规API

Hammer

Hammer.defaults

Hammer.Manager

Hammer.Recognizer

Hammer.input event

Event object

Constants

Utils

#### ==============================

#### Hammer

创建并返回一个带有系列默认识别器集合的Manager实例，该集合内包含了诸如 tap, doubletap, pan, swipe, press, pinch 和 rotate 识别器。你应该在初始化时执行它，其语法为：

Contructor(HTMLElement, [options])

参数里一个是你的页面元素，另一个是可选的识别器选项options，options会融入Hammer.defaults中去，当然，在Hammer.defaults.preset中定义的识别器集合也会被添加进来。

如果识别器选项options为空，那么初始化的时候不会有额外的识别器被添加进来：

<pre class="prettyprint hljs dart"><span style="color: #0000ff;"><span class="hljs-keyword">var</span></span> myElement = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'hitarea'</span><span style="color: #000000;">);</span> <span style="color: #0000ff;"><span class="hljs-keyword">var</span></span> mc = <span style="color: #0000ff;"><span class="hljs-keyword">new</span></span> Hammer(myElement);</pre>

==============================

#### Hammer.defaults

创建实例时初始化的默认值，包括你定义的options选择器项。其属性包括：

#### touchAction: 'compute'

其值可为 _compute, auto, pan-y, pan-x_ 或 _none_ 。默认选项会基于识别器为你选择一个正确值。

<div>

domEvents: false

让Hammer也能禁用DOM事件。若不禁用会有些慢，故默认是禁用的。如果你想实现事件委托，那么建议你将其设为true。

</div>

<div>

enable: true

接受一个boolean值, 或返回一个boolean值的函数。（官网就这样一句话，也没说具体啥作用，汗~）

</div>

<div>

<span>cssProps: {....}</span>

可以改善交互事件操作的系列css属性。更多详情可以查阅 [JSDoc](http://hammerjs.github.io/jsdoc/Hammer.defaults.cssProps.html) 。

</div>

<div>

<span>preset: [....]</span>

调用Hammer()的时候就安装了默认的识别器。如果建立一个新的Manager，这些将被跳过。

</div>

==============================

#### Hammer.Manager

Manager是所有识别器实例的容器，它为你的元素安装了交互事件监听器，并设置了触摸事件特性。

constructor(HTMLElement, [options])

参数为你的元素（HTMLElement）和选项（options），选项将合并到Hammer.defaults中去：

<pre class="prettyprint hljs verilog"><span style="color: #0000ff;"><span class="hljs-keyword">var</span></span> mc = <span style="color: #0000ff;"><span class="hljs-keyword">new</span></span> Hammer<span class="hljs-variable">.Manager</span>(myElement);</pre>

你可以在选项中使用 recognizers 来设置一个初始化识别器，它是一个数组，写法如下：

<pre class="prettyprint hljs groovy"><span style="color: #0000ff;">var</span> mc = <span style="color: #0000ff;"><span class="hljs-keyword">new</span></span> <span style="color: #000000;">Hammer.Manager(myElement, {
 <span class="hljs-symbol">recognizers:</span> [</span> <span style="color: #008000;"><span class="hljs-comment">//</span></span><span style="color: #008000;"> <span class="hljs-comment">RecognizerClass, [options], [recognizeWith, ...], [requireFailure, ...]</span></span>
 <span style="color: #000000;">[Hammer.Rotate],
        [Hammer.Pinch, { <span class="hljs-string">enable:</span></span> <span style="color: #0000ff;"><span class="hljs-literal">false</span></span> }, [<span class="hljs-string">'rotate'</span><span style="color: #000000;">]],
        [Hammer.Swipe,{ <span class="hljs-string">direction:</span> Hammer.DIRECTION_HORIZONTAL }],
    ]
});</span></pre>

#### set(options)

修改一个Manager实例的选项，该方法是推荐使用的，它可以在需要的时候更新touchAction的值：

<pre class="hljs css"><span class="hljs-selector-tag">mc</span><span class="hljs-selector-class">.set</span>({ <span class="hljs-attribute">enable</span>: <span style="color: #0000ff;">true</span> });</pre>

### <span>get(string), add(Recognizer)</span> 和 <span>remove(Recognizer)</span>

<div>

添加一个新的Recognizer实例到Manager中，添加的顺序跟识别器执行的顺序一致。get方法会返回被添加的Recognizer实例。

get和remove方法都把一个（识别器中的）事件名或识别器实例来作为一个参数。

Add 和 remove 方法也接受一个识别器数组来作为参数：

</div>

<pre class="prettyprint hljs less"><span style="color: #008000;"><span class="hljs-comment">//</span></span><span style="color: #008000;"> <span class="hljs-comment">both return instance of myPinchRecognizer</span></span>
<span class="hljs-selector-tag">mc</span><span class="hljs-selector-class">.get</span>(<span class="hljs-string">'pinch'</span><span style="color: #000000;">);
<span class="hljs-selector-tag">mc</span><span class="hljs-selector-class">.get</span>(myPinchRecognizer);</span></pre>

<pre class="prettyprint hljs less"><span class="hljs-selector-tag">mc</span><span class="hljs-selector-class">.add</span>(myPinchRecognizer); <span style="color: #008000;"><span class="hljs-comment">//</span></span><span style="color: #008000;"> <span class="hljs-comment">returns the recognizer</span></span>
<span class="hljs-selector-tag">mc</span><span class="hljs-selector-class">.add</span>([mySecondRecogizner, myThirdRecognizer]);</pre>

<pre class="prettyprint hljs less"><span style="color: #000000;"><span class="hljs-selector-tag">mc</span><span class="hljs-selector-class">.remove</span>(myPinchRecognizer);
<span class="hljs-selector-tag">mc</span><span class="hljs-selector-class">.remove</span>(</span><span class="hljs-string">'rotate'</span><span style="color: #000000;">);
<span class="hljs-selector-tag">mc</span><span class="hljs-selector-class">.remove</span>([myPinchRecognizer,</span> <span class="hljs-string">'rotate'</span>]);</pre>

### <span>on(events, handler)</span> 和 <span>.off(events, [handler])</span>

监听由被添加的识别器触发的事件，或者移除那些绑定了的事件。参数中将事件通过空格隔开可处理多个事件：

<pre class="prettyprint hljs javascript">mc.on(<span class="hljs-string">"pinch"</span>, <span style="color: #0000ff;"><span class="hljs-function"><span class="hljs-keyword">function</span></span></span><span style="color: #000000;"><span class="hljs-function">(<span class="hljs-params">ev</span>)</span> {
    <span class="hljs-built_in">console</span>.log(ev.scale);
});</span></pre>

### <span>stop([force])</span>

停止当前交互会话的识别器（Stop recognizing for the current input session）。当使用force参数时，将强制立刻停止识别器执行周期。

### <span>destroy()</span>

解绑所有交互事件并让manager失去作用，但它没有解绑任何dom事件监听器。

==============================

#### Hammer.Recognizer

每一个识别器都是从这个类中扩展出来的，所有识别器都会有一个enable选项，其值为boolean或者一个回调函数，用来启用/禁用非底层的识别器。

constructor([options])

只有选项作为参数：

<pre class="prettyprint hljs cs"><span style="color: #0000ff;"><span class="hljs-keyword">var</span></span> pinch = <span style="color: #0000ff;"><span class="hljs-keyword">new</span></span> Hammer.Pinch(); <span style="color: #008000;"><span class="hljs-comment">//</span></span><span style="color: #008000;"><span class="hljs-comment">创建一个识别器</span></span>
mc.<span class="hljs-keyword">add</span>(pinch); <span style="color: #008000;"><span class="hljs-comment">//</span></span><span style="color: #008000;"> <span class="hljs-comment">添加到Manager实例中</span></span></pre>

#### set(options)

在识别器实例中修改一个选项。该方法是推荐使用的，它可以在需要的时候更新touchAction的值。

<span>recognizeWith(otherRecognizer) </span> 和 <span>dropRecognizeWith(otherRecognizer)</span>

<div>

在当前识别器运行的时候同步运行所给的其它识别器（otherRecognizer），当你需要在最后结合pan和swipe手势时，或者需要同时pinch和ratate一个对象时，它会很有帮助。

移除这种联系时，只会移除当前识别器上的连接，而不是其它识别器（otherRecognizer）上的连接。

这两个方法都支持一个识别器组成的数组来作为参数。

如果识别器被添加到了Manager上，那么该方法也支持将其它识别器(otherRecognizer)的事件名 _（字符串形式）_ 来作为参数。

</div>

[了解更多recognizeWith](http://hammerjs.github.io/recognize-with)

<span>requireFailure(otherRecognizer) </span> 和 <span>dropRequireFailure(otherRecognizer)</span>

<div>

只有当其它识别器（otherRecognizer）无效时才执行该识别器。

移除这种联系时，只会移除当前识别器上的连接，而不是其它识别器（otherRecognizer）上的连接。

这两个方法都支持一个识别器组成的数组来作为参数。

如果识别器被添加到了Manager上，那么该方法也支持将其它识别器(otherRecognizer)的事件名 _（字符串形式）_ 来作为参数。

</div>

[了解更多requireFailure](http://hammerjs.github.io/require-failure)

==============================

#### Hammer.input 事件

hammer.input可以触发一个“秘密的”事件，它发生在每一个接收中的交互中，也让你能对原生的交互来做相关处理。它是一个小而强大的特性。

<pre class="prettyprint hljs javascript">hammertime.on(<span class="hljs-string">"hammer.input"</span>, <span style="color: #0000ff;"><span class="hljs-function"><span class="hljs-keyword">function</span></span></span><span style="color: #000000;"><span class="hljs-function">(<span class="hljs-params">ev</span>)</span> {
   <span class="hljs-built_in">console</span>.log(ev.pointers);
});</span></pre>

==============================

#### 事件对象

每一个Hammer触发的事件都会收到一个包含了如下属性的事件对象：

![](http://img0.tuicool.com/BR7zMn2.png!web)

==============================

常量/Constants _（这个建议查阅源码338行起，主要是用于标志事件轮廓，可通过上文“事件对象”的direction、offsetDirection等属性来获取）_

所有常量都定义于Hammer对象中，因为它们都是二进制标识，你可以使用位运算来操作它们。MDN上有一些关于位运算的优秀 [文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators) 。

#### 方位/Directions

用于定义一个识别器的方位，并用来读取一个事件的对应值。

![](http://img0.tuicool.com/NrmeUrq.png!web)

交互事件/Input Events

Hammer匹配所有交互 (mousedown, mousemove, touchmove, pointercancel)事件类型为如下值：

![](http://img2.tuicool.com/nEVz22E.png!web)

#### 识别器状态/Recognizer States

由识别器在内部定义自己的状态：

![](http://img2.tuicool.com/uq2q2e3.png!web)

==============================

#### 工具/Utils

#### Hammer.on(element, types, handler)

addEventListener的封装，可以接受多个事件类型为参数：

<pre class="prettyprint hljs javascript">Hammer.on(<span class="hljs-built_in">window</span>, <span class="hljs-string">"load resize scroll"</span>, <span style="color: #0000ff;"><span class="hljs-function"><span class="hljs-keyword">function</span></span></span><span style="color: #000000;"><span class="hljs-function">(<span class="hljs-params">ev</span>)</span> {
    <span class="hljs-built_in">console</span>.log(ev.type);
});</span></pre>

#### Hammer.off(element, types, handler)

如同Hammer.on，是removeEventListener的封装，也允许多个事件类型为参数。

#### Hammer.each(obj, handler)

遍历一个数组或对象：

<pre class="prettyprint hljs css"><span class="hljs-selector-tag">Hammer</span><span class="hljs-selector-class">.each</span>(<span class="hljs-selector-attr">[10,20,30,40]</span>, <span style="color: #0000ff;"><span class="hljs-selector-tag">function</span></span><span style="color: #000000;">(<span class="hljs-selector-tag">item</span>, <span class="hljs-selector-tag">index</span>, <span class="hljs-selector-tag">src</span>) { });
<span class="hljs-selector-tag">Hammer</span><span class="hljs-selector-class">.each</span>({<span class="hljs-attribute">a</span>:</span><span class="hljs-number">10</span>, b:<span class="hljs-number">20</span>, c:<span class="hljs-number">30</span>}, <span style="color: #0000ff;"><span class="hljs-selector-tag">function</span></span>(<span class="hljs-selector-tag">item</span>, <span class="hljs-selector-tag">key</span>, <span class="hljs-selector-tag">src</span>) { });</pre>

#### Hammer.merge(obj1, obj2)

把obj2的属性混到obj1中去，不过obj1的已有属性不会被重写：

<pre class="prettyprint hljs swift"><span style="color: #0000ff;"><span class="hljs-keyword">var</span></span> options = <span style="color: #000000;">{
	b:</span> <span style="color: #0000ff;"><span class="hljs-literal">false</span></span> <span style="color: #000000;">};</span> <span style="color: #0000ff;"><span class="hljs-keyword">var</span></span> defaults = <span style="color: #000000;">{
	a:</span> <span style="color: #0000ff;"><span class="hljs-literal">true</span></span><span style="color: #000000;">,
	b:</span> <span style="color: #0000ff;"><span class="hljs-literal">true</span></span><span style="color: #000000;">,
	<span class="hljs-built_in">c</span>: [</span><span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span><span style="color: #000000;">]
};
<span class="hljs-type">Hammer</span>.merge(options, defaults);</span> <span style="color: #008000;"><span class="hljs-comment">//</span></span><span style="color: #008000;"> <span class="hljs-comment">options.a == true</span></span> <span style="color: #008000;"><span class="hljs-comment">//</span></span><span style="color: #008000;"> <span class="hljs-comment">options.b == false</span></span> <span style="color: #008000;"><span class="hljs-comment">//</span></span><span style="color: #008000;"> <span class="hljs-comment">options.c == [1,2,3]</span></span>
</pre>

#### Hammer.extend(obj1, obj2)

把obj2的属性扩展到obj1中去，不过obj1的已有属性会被重写：

<pre class="prettyprint hljs swift"><span style="color: #0000ff;"><span class="hljs-keyword">var</span></span> obj1 = <span style="color: #000000;">{
	a:</span> <span style="color: #0000ff;"><span class="hljs-literal">true</span></span><span style="color: #000000;">,
	b:</span> <span style="color: #0000ff;"><span class="hljs-literal">false</span></span><span style="color: #000000;">,
	<span class="hljs-built_in">c</span>: [</span><span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span><span style="color: #000000;">]
};</span> <span style="color: #0000ff;"><span class="hljs-keyword">var</span></span> obj2 = <span style="color: #000000;">{
	b:</span> <span style="color: #0000ff;"><span class="hljs-literal">true</span></span><span style="color: #000000;">,
	<span class="hljs-built_in">c</span>: [</span><span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span><span style="color: #000000;">]
};
<span class="hljs-type">Hammer</span>.extend(obj1, obj2);</span> <span style="color: #008000;"><span class="hljs-comment">//</span></span><span style="color: #008000;"> <span class="hljs-comment">obj1.a == true</span></span> <span style="color: #008000;"><span class="hljs-comment">//</span></span><span style="color: #008000;"> <span class="hljs-comment">obj1.b == true</span></span> <span style="color: #008000;"><span class="hljs-comment">//</span></span><span style="color: #008000;"> <span class="hljs-comment">obj1.c == [4,5,6]</span></span>
</pre>

#### Hammer.inherit(child, base, [properties])

简单的类继承：

<pre class="prettyprint hljs javascript"><span style="color: #0000ff;"><span class="hljs-function"><span class="hljs-keyword">function</span></span></span><span style="color: #000000;"><span class="hljs-function"><span class="hljs-title">Animal</span>(<span class="hljs-params">name</span>)</span> {</span> <span style="color: #0000ff;"><span class="hljs-keyword">this</span></span>.name = <span style="color: #000000;">name;
}</span> <span style="color: #0000ff;"><span class="hljs-function"><span class="hljs-keyword">function</span></span></span><span style="color: #000000;"> <span class="hljs-function"><span class="hljs-title">Dog</span>(<span class="hljs-params"></span>)</span> {
	Animal.apply(</span><span style="color: #0000ff;"><span class="hljs-keyword">this</span></span><span style="color: #000000;">, <span class="hljs-built_in">arguments</span>);
}
Hammer.inherit(Dog, Animal, {
	<span class="hljs-attr">bark</span>:</span> <span style="color: #0000ff;"><span class="hljs-function"><span class="hljs-keyword">function</span></span></span><span style="color: #000000;"><span class="hljs-function">(<span class="hljs-params"></span>)</span> {
		alert(</span><span style="color: #0000ff;"><span class="hljs-keyword">this</span></span><span style="color: #000000;">.name);
	}
});</span> <span style="color: #0000ff;"><span class="hljs-keyword">var</span></span> dog = <span style="color: #0000ff;"><span class="hljs-keyword">new</span></span> Dog(<span class="hljs-string">'Spaikie'</span><span style="color: #000000;">);
dog.bark();</span>
</pre>

#### Hammer.bindFn(fn, scope)

Function.bind的简化形式：

<pre class="prettyprint hljs javascript"><span style="color: #0000ff;"><span class="hljs-function"><span class="hljs-keyword">function</span></span></span><span style="color: #000000;"> <span class="hljs-function"><span class="hljs-title">myFunction</span>(<span class="hljs-params">ev</span>)</span> {
	<span class="hljs-built_in">console</span>.log(</span><span style="color: #0000ff;"><span class="hljs-keyword">this</span></span> === myContext); <span style="color: #008000;"><span class="hljs-comment">//</span></span><span style="color: #008000;"> <span class="hljs-comment">is true</span></span>
<span style="color: #000000;">}</span> <span style="color: #0000ff;"><span class="hljs-keyword">var</span></span> myContext = <span style="color: #000000;">{
	<span class="hljs-attr">a</span>:</span> <span style="color: #0000ff;"><span class="hljs-literal">true</span></span><span style="color: #000000;">,
	<span class="hljs-attr">b</span>:</span> <span style="color: #0000ff;"><span class="hljs-literal">false</span></span> <span style="color: #000000;">};
<span class="hljs-built_in">window</span>.addEventListener(</span><span class="hljs-string">'load'</span>, Hammer.bindFn(myFunction, myContext), <span style="color: #0000ff;"><span class="hljs-literal">false</span></span>);
</pre>

#### Hammer.prefixed(obj, name)

获取浏览器的（前缀）属性值：

<pre class="prettyprint hljs coffeescript">Hammer.prefixed(<span class="hljs-built_in">document</span>.body.style, <span class="hljs-string">'userSelect'</span><span style="color: #000000;">);</span> <span style="color: #008000;"><span class="hljs-regexp">//</span></span> <span style="color: #008000;">returns <span class="hljs-string">"webkitUserSelect"</span> <span class="hljs-literal">on</span> Chrome <span class="hljs-number">35</span></span></pre>

![](http://img2.tuicool.com/aqENNf.jpg!web)

关于hammer的API就翻译到这里，剩余的几个页面内容篇幅较少也较好读懂，请自行查阅和理解。

这篇文章是10月8日提笔的，后续因为换工作、换城市的事宜被搁置、尘封在草稿箱，直到今天突然想起才决定把它写完，供打算入门hammer的朋友做个参考吧（再次吐槽hammer的api写的很草率）。

共勉~

[原文地址](http://www.tuicool.com/articles/VNRjym7)