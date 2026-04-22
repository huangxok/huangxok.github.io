---
title: "Epub Content Document"
pubDate: 2016-05-19

tags:
  - Epub
  - OPF
---
# EPUB Content Document

## 规范
http://www.idpf.org/epub3/latest/contentdocs

### 概述

* 与h5（HTML 5）的关系
ecd 采用 XHTML 5语法，并有少量扩展。
XHTML5 与 HTML5 的差异和兼容请参考：HTML5 vs XHTML5.txt
h5中的部分特性是可选的，包括脚本、表单等。

* SVG
SVG 1.1 也是ecd的一种，不过有一些限制。

* CSS
ecd 采用CSS 2.1和部分 CSS 3特性，还定义了一些扩展。

* 命名空间
|prefix|namespace URI|
|----|----|
|epub|http://www.idpf.org/2007/ops|
|m|http://www.w3.org/1998/Math/MathML|
|pls|http://www.w3.org/2005/01/pronunciation-lexicon|
|ssml|http://www.w3.org/2001/10/synthesis|
|svg|http://www.w3.org/2000/svg|

### 各种 Content Document

**XHTML 文档**
ecd中的 HTML 文档必须用 XHTML 5 语法，并且以 .xhtml 作为扩展名。

* 扩展

- epub:type 属性

语法是空格分割的值，可用于 h5 元素上扩展其语义。例如：

```javascript
<a epub:type="noteref" href="#n1">1</a>
<aside epub:type="footnote" id="n1">
```

可用的值选自“EPUB 3 Structural Semantics Vocabulary”：
 http://www.idpf.org/epub/vocab/structure/#
 
不过并不要求 reader 对这个属性作出反应。

- SSML Attributes
W3C Speech Synthesis Markup Language

- Content Switching
reader 必须支持此特性。
epub:switch Element

- epub:trigger Element
The trigger element enables the creation of markup-defined user interfaces for controlling multimedia objects, such as audio and video playback, in both scripted and non-scripted contexts.
也就是一种不用JS脚本的UI编程技术。
支持视频音频的 reader 必须支持 epub:trigger。

例子：
```
<html xmlns="http://www.w3.org/1999/xhtml"
  xmlns:epub="http://www.idpf.org/2007/ops"
  xmlns:ev="http://www.w3.org/2001/xml-events">
  <head>
    <epub:trigger ev:observer="pause" ev:event="click" action="pause" ref="test"/>
    <epub:trigger ev:observer="resume" ev:event="click" action="resume" ref="test"/>
    <epub:trigger ev:observer="mute" ev:event="click" action="mute" ref="test"/>
    <epub:trigger ev:observer="mute" ev:event="click" action="show" ref="muted"/>
    <epub:trigger ev:observer="unmute" ev:event="click" action="unmute" ref="test"/>
    <epub:trigger ev:observer="unmute" ev:event="click" action="hide" ref="muted"/>
  </head>
  <body>
    <video id="test" src="birds.mp4" width="320" height="240"/>
    <p>
      <span class="button" id="resume">Play/Resume</span>
      <span class="button" id="pause">Pause</span>
      <span class="button" id="mute">Mute</span>
      <span class="button" id="unmute">Unmute</span>
      <span id="muted">MUTED</span>
    </p>
  </body>
</html>
```

- Alternate Style Tags
  
根据环境选择不同样式表的机制。例如

```javascript
<link rel="stylesheet" href="horizontal.css" class="horizontal"/>
```

规范：http://www.idpf.org/epub/altss-tags/
reader应当支持此扩展。

* MathML
reader必须支持MathML，但主要限于 Presentation MathML，Content MathML 支持是可选的。

**CSS**
* 规范
对CSS2.1的要求：
position 属性不能有fixed值；direction 和 unicode-bidi 属性不能用。

对CSS3的要求：

以下模块要采用 -epub-前缀：
CSS 3.0 Speech
 -epub-cue
 -epub-pause
 -epub-rest
 ...
CSS Text Level 3
 -epub-hyphens*
 -epub-line-break
 -epub-text-align-last
 ...
未来随着CSS3定稿，可以去掉前缀。
 
webfont 必须支持 OpenType 和 WOFF 两种格式。

支持 @media and @import

支持 @namespace

支持多列布局

* 分页
epub 并不要求reader支持分页显示流式文档，但很多reader是实现了此功能的。
在这类reader上，CSS 属性 page-break-inside, page-break-before 和 page-break-after 等可以用于控制分页行为，就像在打印设备上一样。
参考：
http://electricbookworks.com/kb/creating-epub-from-indesign/after-indesign-export-to-epub/page-breaks/

**EPUB Navigation Documents**
是XHTML 文档的一种，详见 EPub Navigation Documents.txt

**SVG Content Documents**
应当符合 SVG 1.1 (Second Edition) specification。
其它要求：
不能有动画（ Animation Elements and Animation event attributes）。
svg:foreignObject 只能包含 xhtml 内容。

SVG 可以独立作为文档，也可以被XHTML文档引用，也可以嵌入XHTML。

**Scripted Content Documents**

脚本可以出现在顶层内容文档中，也可以出现在顶层内容文档的iframe中。
前者称为 spine-level scripting，后者称为 container-constrained scripting。
reader必须支持后者，前者则是可选的。
reader必须阻止后者的脚本访问父文档以及其它文档，类似h5 sandboxed iframe。

reader必须提供 navigator.epubReadingSystem 对象，有以下属性和方法：

|name|explain|
|----|----|
|name| Returns a String value representing the name of the Reading System (e.g., iBooks, Kindle).|
|version|Returns a String value representing the version of the Reading System (e.g., 1.0, 2.1.1).|
|layoutStyle|typically return one of the values paginated or scrolling, but may define values for any additional layout formats it supports.|

hasFeature(feature[, version]) 特性查询。以下特性名字必须被识别：

|特性|解释|
|----|----|
|dom-manipulation| 	Scripts may make structural changes to the document’s DOM (applies to spine-level scripting only).|
|layout-changes| 	Scripts may modify attributes and CSS styles that affect content layout (applies to spine-level scripting only).|
|touch-events| 	The device supports touch events and the Reading System passes touch events to the content.|
|mouse-events| 	The device supports mouse events and the Reading System passes mouse events to the content.|
|keyboard-events| 	The device supports keyboard events and the Reading System passes keyboard events to the content.|
|spine-scripting| 	Spine-level scripting is supported.|

***安全问题***
以下均为建议。
每本epub书应被视为来自一个独立的域。如果提供本地存储，不同的书之间应该是被隔离的。

***事件模型***
采用h5事件。

***PLS Documents***
The W3C Pronunciation Lexicon Specification [PLS] defines syntax and semantics for XML-based pronunciation lexicons to be used by Automatic Speech Recognition and Text-to-Speech (TTS) engines.

reader如果支持TTS则必须支持PLS。

例子：
```
<html … >    
    <head>
        …
        <link rel="pronunciation" type="application/pls+xml" hreflang="zh" href="../speech/zh.pls"/>
        <link rel="pronunciation" type="application/pls+xml" hreflang="mn" href="../speech/mn.pls"/>
    </head>        
    …
</html>
```