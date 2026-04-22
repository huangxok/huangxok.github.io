---
title: "web-bugs"
pubDate: 2017-03-07

tags: []
---
### Chrome52-53: 无前缀的 CSS clip-path: url() 无效，但开发工具中显示已经生效

-webkit-clip-path 是有效的

### Chrome52：CSS clip-path: url() 作用于 html 元素时，如果引用的 SVG clipPath 元素的 clipPathUnits = "userSpaceOnUse" （这是默认值），裁剪区的坐标原点是页面原点，

正确的应该是被裁剪的元素的原点。

53修复这个问题。注意 clipPathUnits = "objectBoundingBox" 时并没有问题。

### Chrome52-53: CSS clip-path: url() 作用于 svg 元素时，不支持到外部文件的 url，裁剪完全被忽略

### Chrome52-53: CSS clip-path: url() 作用于 html 元素时，不支持到外部文件的 url，而且如果使用外部文件的 url，片段部分（#xxx）被解释为本文件内的 id

### Windows 长路径

经过测试，moz 平台对长路径（>260）的支持是不完全的：

* OS.File 支持，但需要自行添加 "\\?\" 前缀
* File() 构造器不支持
* fetch 对 file-url 不支持
* file-url，img 标签不支持，video/script/link 等未测试

Chrome 也不支持 img 的长 file-url。

Firefox 的 bug:
https://bugzilla.mozilla.org/buglist.cgi?quicksearch=long%20path&list_id=13154723
https://bugzilla.mozilla.org/show_bug.cgi?id=744413
https://bugzilla.mozilla.org/show_bug.cgi?id=422777

### Firefox: Changing width/height of images continuously causes very high memory and CPU usage

https://bugzilla.mozilla.org/show_bug.cgi?id=1292446
简单地缩放图像就会导致很高的内存和处理器占用。这也是导致备课大师图像不显示、黑屏的诱因之一。
测试 image-scale.html
Chrome 和 Edge 不存在这个问题。用 CSS transform 代替 style.width|height 也可以避免这个问题。

### Firefox 在页面刷新时自动恢复表单字段的状态，包括 disabled 状态

if disabled state is changed with javascript, the normal state doesn't return after refreshing the page
https://bugzilla.mozilla.org/show_bug.cgi?id=654072

参考 form-restore-ff-test.htm

表单的恢复是在 DOMContentdLoaded 执行前，且不会产生 "change" 事件。

### firefox 黑屏
备课大师1.0.90（使用xulrunner 45）出现在某些 dell 台式机上。
可能与显卡和硬件加速渲染有关。
关闭硬件加速渲染的选项：
layers.acceleration.disabled;false

可能相关的bug：
https://bugzilla.mozilla.org/show_bug.cgi?id=593858

更新：更可能的原因是 xulrunner-stub 没有用 /largememoryaware 编译，因此能使用的内存比 firefox 预期的要小一半，
导致一些模块出问题。改用 /largememoryaware 后似乎问题消失了。

### xulrunner 45 远程调试崩溃
可能相关的bug：
devtools.debugger.source-maps-enabled;false
devtools.styleeditor.source-maps-enabled;true
在 46 或者用 FF 46 调试 xulrunner 45 似乎没问题了。

### chrome-url 中不能有连续的 '..'
chrome-url with contiguous dots (.) is not a valid url?
https://bugzilla.mozilla.org/show_bug.cgi?id=1255687

### chrome-url 中的 %2540 解释不正确
例如，在地址栏输入 chrome://myhtml/content/%2540
错误页面显示：Firefox 无法在 /D:/project/MyHTML/@ 找到该文件。
但实际上，%2540 应该解释为 %40。有类似错误的还有 "%2530" -> 0 ，"%2520a" -> " a"
注意，只有该url映射到磁盘文件时才出现这个问题，映射到zip文件内的则不会；非windows系统未测试。

### 反复缩放较大的图片，会造成内存占用急剧升高，然后图片不显示
有时网页甚至变成黑屏，程序崩溃。

### EventSource (Server Sent Event) doesn't retry after OS suspend/resume
FF: https://bugzilla.mozilla.org/show_bug.cgi?id=1251117
Chrome: 存在，尚未报告。实际上更严重，resume 之后不发送 error 事件就中断了连接。

### EventSource (Server Sent Event) doesn't retry if the server is down during the first attempt to connect
FF: https://bugzilla.mozilla.org/show_bug.cgi?id=1251121
Chrome: 不存在。

### Window.open() doesn't resolve relative url correctly when iframe involved
FF: https://bugzilla.mozilla.org/show_bug.cgi?id=1044950
Chrome: 存在，尚未报告

### object type=text/html 对错误的url仍然显示空白文档，而不是后备内容
Chrome: 存在，尚未报告
FF: 无此问题

### file: 协议的 content-type
FF: https://bugzilla.mozilla.org/show_bug.cgi?id=1037762
XHR 设置 content-type 头为 application/xml，解释内容为 xml

Chrome: 尚未报告。XHR 没有设置 content-type 头，但正确解释了内容。

whatwg maillist: [whatwg] How to determine content-type of file: protocol

### 分离的 video 元素仍会导致视频加载和解码（除非设置preload=none），造成很大的内存占用
规范如此？

### MutationObserver 在初始解析阶段不能及时发送事件

### getComputedStyle 用于外部文档中的节点以及分离的节点
[cssom] getComputedStyle and elements outside the tree
  http://lists.w3.org/Archives/Public/www-style/2010Apr/0433.html

http://lists.w3.org/Archives/Public/www-style/2010Apr/0435.html
  Gecko's behavior for win.getComputedStyle(elt) is to take the element 
elt and compute its style based on the styles of the current document of 
window |win|.  This means that selector matching will be performed based 
on the DOM (fragment) the element is in, but using the list of rules 
from window |win|.  This applies to not only document rules but UA rules 
too (so if the document in |win| is in quirks mode, quirks rules will be 
applied to the element).

This was a conscious design decision in an area where the spec was ... 
somewhat underspecific.  We did consider throwing in this situation, but 
decided against it because it was simpler to just write the code without 
assuming anything about window identity, etc.

> My question is whether this is a bug in Firefox or a feature I should
> somehow (how?) keep.

There may be things that depend on the "element not in dom tree" 
behavior.  At least I seem to recall seeing bugs on that.  The other is 
mostly a source of developer confusion when they use the wrong window, I 
think...  But all use of getComputedStyle I've encountered is 
conditioned on various browser sniffing, so changing this stuff is very 
likely to cause compat issues no matter what we do.  :(

-Boris

http://lists.w3.org/Archives/Public/www-style/2010Jul/0252.html
> A number of Google teams have come to us with bugs of their pages  
> working in Gecko, but not WebKit due to this issue. In practice, it's  
> not too hard to work around, so changing WebKit hasn't been a high  
> priority, but it's pretty clear (anecdotally anyways) that developers  
> expect the Gecko behavior.

Thanks for this Ojan!

It should be possible for us (Opera) to change this as well so I have  
attempted to align the specification with Gecko. I would very much  
appreciate feedback.

### 多重组合键
多重组合键似乎不被支持，如 ctrl+shift+Z，在FF上的contenteditable中只能检测到ctrl+Z。

## object 中的浏览器原生支持的内容
如果在 object 中引用 html、svg、xhtml、xml 等浏览器原生支持的内容，浏览器的行为并不一致：
        html    svg xhtml
FF31    y       y   y
Cr36    y       n   y
E       y       n   n

embed 待查。

## Mozilla/Firefox 的

### iframe 的父元素上有滚动条，则用空格/page up/down 时导致滚动位置与滚动条位置不同步。
mbeditor，待确认

### chrome-url 的 iframe 中的 html/xhtml 的事件监听器的 this 不正确
参考 D:\project\MyFirefoxAddon\xhtml-iframe-this
触发条件：
1. 内外两个文档都是(x)html
2. 内外两个文档都是通过 chrome-url 加载
3. 在外层文档的脚本中注册事件监听器
4. 通过 addEventListener 而不是 onclick 注册

注意 firefox 自带的 (x)html 文档作为外层文档时，不存在这个问题，不知道为什么。例如，外层文档是
chrome://devtools/content/framework/connect/connect.xhtml
内层文档是
chrome://devtools/content/layoutview/view.xhtml
或者 chrome://xhtml-iframe-this/content/inner.html

用这个方法加入 iframe:

(function () {
  var frame = document.createElement('iframe');
  frame.style.cssText = 'position:absolute;top:0;width:700px;height:400px;background-color:white';
  //frame.src = 'chrome://devtools/content/framework/connect/connect.xhtml';
  //frame.src = 'chrome://devtools/content/layoutview/view.xhtml';
  //frame.src = 'chrome://devtools/content/animationinspector/animation-inspector.xhtml';
  
  frame.src = 'chrome://xhtml-iframe-this/content/inner.html';
  document.body.appendChild(frame);
  frame.onload = function() {
    frame.contentDocument.addEventListener("click", function(ev) { alert(this.nodeName)});
  };
})();

则不存在问题。
但如果把 firefox 自带的 (x)html 文档抽离出来，则没有这种效果，参考
chrome://myhtml/content/view.xhtml
chrome://myhtml/content/animation-inspector.xhtml

解决办法：不使用 this 而是使用 ev.currentTarget。

### FF 上 outline 会包围溢出的子元素。
参考 http://stackoverflow.com/questions/10662902/css-outline-different-behavior-behavior-on-webkit-gecko
   https://bugzilla.mozilla.org/show_bug.cgi?id=687311
   https://bugzilla.mozilla.org/show_bug.cgi?id=480888

可以用伪元素实现多重 box-shadow 来代替 outline，或者在伪元素上用 outline。
这个行为似乎CSS规范没有明确定义。

### 视频元素导致大量的内存占用
Reduce resource consumption <video> elements in Desktop Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1038527
https://bugzilla.mozilla.org/show_bug.cgi?id=1054170

FF 和 Chrome 都有此问题。即使是分离的 video 节点，也会开始加载视频，并消耗等量的内存。

### windows 上视频文件没有及时关闭
On Windows, media file is locked for a long time after the web page referencing it has been unloaded
  https://bugzilla.mozilla.org/show_bug.cgi?id=1068596
destroying VIDEO element does not reduce memory usage
  https://bugzilla.mozilla.org/show_bug.cgi?id=962986
  
注意，即使是 detached, 不可达的 video元素，在页面unload后也是不会立即关闭相应文件的（尽管会停止播放）。
关闭文件的唯一方法似乎是给 src 设置不可用的 url，然后调用 load() 方法。

1068596 已经修复。不过这个修复并不彻底，有时候文件仍然被锁定。重现的方法：
在备课大师中尝试删除打开中的、含有视频的文档。

### svg 元素的 ClientBox 与 transform
transform 属性与 CSS transform 属性对 getBoundingClientRect() 的影响不同。

getBoundingClientRect() doesn't take CSS transform into account for SVG elements
  https://bugzilla.mozilla.org/show_bug.cgi?id=1066435

getBoundingClientRect differs from all other browsers for transformed SVG elements
  https://bugzilla.mozilla.org/show_bug.cgi?id=755947

[CSSOM] Revisiting transforms and getBoundingClientRect()
  http://lists.w3.org/Archives/Public/www-style/2011May/0385.html
  没有明确结论。

[CSSOM] Interaction of getBoundingClientRect/getClientRects with transforms
  http://lists.w3.org/Archives/Public/www-style/2010Aug/0615.html

### 从XHR读取的xhtml document，无法设置 object/embed 元素的 data/src 属性
Modifying data attribute of <object> causes NS_ERROR_UNEXPECTED exception 
  https://bugzilla.mozilla.org/show_bug.cgi?id=1065920

### CSS 变换的 iframe 中的元素无法正确全屏
Fullscreen is broken for element in CSS-transformed iframe
https://bugzilla.mozilla.org/show_bug.cgi?id=1139412  

测试：iframe-fullscreen.html

### Letter spacing is applied to zero width characters (zwsp, zwj, zwnj)
https://bugzilla.mozilla.org/show_bug.cgi?id=253143

### CSS letter-spacing style extends after last letter of element with letter-spacing
https://bugzilla.mozilla.org/show_bug.cgi?id=125390

### 如果video的src属性是url-encoded 中文，则无法播放？
经查证，31以上无此问题。

### MutationObserver 在初始解析阶段漏掉一些节点

### CSS opacity animation 生成了多余的 stacking context
z-index-opacity-anim.htm
FF 35 已经修复。

### HTML select 元素在展开状态下如果被设置了 visibility: hidden，则会变成黑色
https://bugzilla.mozilla.org/show_bug.cgi?id=376607
https://bugzilla.mozilla.org/show_bug.cgi?id=206000
ff-select-black.htm

Firefox 直到 35 都有这个问题。chrome 37则是让展开部分也立即消失。

display:none; FF会让展开部分也立即消失；chrome也一样
opacity:0; FF只显示展开部分，其它部分消失，并且点击原来的位置仍可以展开；chrome也一样

### 剪贴板未实现最新的规范
dataTransfer.items undefined in Firefox
https://bugzilla.mozilla.org/show_bug.cgi?id=906420

### copy,paste 的局限性
copy 要求有非空的选区存在；paste 要求有可编辑区域的存在，并有焦点。
http://caniuse.com/#search=Clipboard

Empty clipboardData when pasting image content（意味着无法粘贴print screen的图像）
https://bugzilla.mozilla.org/show_bug.cgi?id=891247

### Selection.selectAllChildren() 可以选中脱离主文档的节点
Selection.selectAllChildren() can select detached nodes
  https://bugzilla.mozilla.org/show_bug.cgi?id=1178681

### Selection.selectAllChildren() 可能抛出异常
Selection.selectAllChildren() throws NS_ERROR_FAILURE exception if called in mousedown handler and current selection is in a contenteditable
https://bugzilla.mozilla.org/show_bug.cgi?id=1178676

触发条件：在任意 mousedown 处理器中调用 selectAllChildren()；调用时选区和焦点都位于一个 contenteditable 中。

### selectstart/selectionchange 事件
FF 43 开始实现，需要设置 dom.select_events.enabled = true
https://developer.mozilla.org/en-US/docs/Web/Events/selectionchange

polyfill：https://github.com/2is10/selectionchange-polyfill/

### firefox android 版没有视频全屏按钮
Provide fullscreen button for video
  https://bugzilla.mozilla.org/show_bug.cgi?id=1018468
  已经修复，不过似乎没有随32发布，可能会随33发布。
在没有全屏按钮的情况下，长按视频可以弹出上下文菜单，其中有全屏选项。

### mime 错误
windows 曾经遇到 <input type=file> 对 .swf 文件报告了错误的类型 application/ms-download，并发现 firefox 的文件关联中有多余的项。
恢复出厂状态可以解决，也有资料说删除 profile 中的 mimeTypes.rdf 可以解决。
可能相关的bug:
ajaxSketch breaks handling of local SVG files
  https://bugzilla.mozilla.org/show_bug.cgi?id=332690
Firefox mimeTypes.rdf corruption
  http://cephas.net/blog/2007/01/05/firefox-mimetypesrdf-corruption/
Mimetype corruption in Firefox
  http://techblog.procurios.nl/k/n618/news/view/15872/14863/mimetype-corruption-in-firefox.html

### flash android 拖拽操作
Slider control of adobe flash doesn't work with touch screen, seems mouse/touch_move events are not sent https://bugzilla.mozilla.org/show_bug.cgi?id=1065232
https://bugzilla.mozilla.org/show_bug.cgi?id=1052196
结论是 firefox android 确实没有实现将click、mouseup/ mousedown以外的鼠标/触摸事件转发到 flash。但这个 bug “不会修改”，因为 flash mobile 已经停止支持。
但是欢迎外人提供补丁：
  If anyone comes along and feels like working on it, though, the place to add this would be in nsPluginInstanceOwner::ProcessEvent() here: http://dxr.mozilla.org/mozilla-central/source/dom/plugins/base/nsPluginInstanceOwner.cpp?from=nsPluginInstanceOwner.cpp&case=true#1843

触摸操作不起作用。
测试文件：zgdsy.swf （中图社提供）; D:\project\MyHTML\kcx.swf。
flash中应该只处理了鼠标拖拽事件。
在独立的flash播放器，如smart flash player，swf player, 以及 android 原生浏览器中，该flash是可以触摸操作的。

另外一些例子，adobe提供的：
http://www.adobe.com/devnet/actionscript/samples.html
  http://www.adobe.com/devnet/actionscript/samples/interactivity_3.html
    http://www.adobe.com/content/dotcom/en/devnet/actionscript/samples/interactivity_3/_jcr_content/articlecontentAdobe/generic/file.res/3_joystick%5b1%5d.swf
  http://www.adobe.com/devnet/actionscript/samples/interactivity_2.html
    http://www.adobe.com/content/dotcom/en/devnet/actionscript/samples/interactivity_2/_jcr_content/articlecontentAdobe/generic/file.res/2_sliders%5B1%5D.swf
    
### 抛出的异常没有显示在控制台中

### 3D CSS 变换的 contenteditable 元素获得焦点时，插入光标有时会出现在编辑区之外，有时会不可输入。
翻卡片控件较严重。
29-33 有此问题，35无问题，37-41似乎又有问题。

### OS.File 写入 0 长度数据抛出异常
OS.File.writeAtomic() 以及 file.write() 在数据长度为 0 时抛出异常。
29-33 有此问题，35无问题。

### 修改html文件中 iframe的src/srcdoc 属性后刷新，iframe 仍加载上次的 src/srcdoc。
Change inlined content of iframes in a local html file and reload, the content of the iframes is not updated
https://bugzilla.mozilla.org/show_bug.cgi?id=1139737
https://bugzilla.mozilla.org/show_bug.cgi?id=356558
https://bugzilla.mozilla.org/show_bug.cgi?id=363840
https://bugzilla.mozilla.org/show_bug.cgi?id=279048

39仍有此问题。

测试 iframe-reload.html

### Windows 桌面版 FF 上不支持触摸事件（metro模式支持）
这是因为 FF 的实现有bug，导致一些网页无法滚动，所以默认没有打开触摸事件。用 dom.w3c_touch_events.enabled = 1 or 2 可以强行打开。

在 JS 代码中：
var prefs = Components.classes["@mozilla.org/preferences-service;1"]
                    .getService(Components.interfaces.nsIPrefService).getBranch("dom.w3c_touch_events.");
prefs.setIntPref("enabled", 2);

Some sites won't touch-scroll using a touch-screen
  https://bugzilla.mozilla.org/show_bug.cgi?id=736048

  
## Chrome 的
### word-spacing 不能作用于开头的空白
https://code.google.com/p/chromium/issues/detail?id=404444

### 负 word-spacing 导致意外换行

### inline-block 导致意外换行
https://bugs.webkit.org/show_bug.cgi?id=35443
https://code.google.com/p/chromium/issues/detail?id=428647

### Blob constructor produces corrupted result by recursively joining a blob and an ArrayBuffer
https://code.google.com/p/chromium/issues/detail?id=429960

### XHTML 中 script defer 属性不起作用

### 当 textarea 外有选区，而 textarea 有焦点时，textarea 只能得到 KeyboardEvent，不能得到 InputEvent。