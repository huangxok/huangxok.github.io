---
title: "Epub Fixed Layout"
pubDate: 2016-05-19

tags:
  - Epub
  - OPF
---
*** 描述
** 引言
EPUB 3 允许其内容是固定版式文档（Fixed-Layout Document），也就是页面内容位置大小固定，不可重排。
以下将固定版式文档简称为“版式文档”，而可重排文档（Reflowable Document)简称为“流式文档”。

** 文档结构
epub 版式文档的内容文档可以是XHTML、SVG、位图，后两者不必包含在XHTML中。
内容文档一般是每页一个独立文件，每页的文档应该在spine中列举。

规范似乎没有强制要求每页一个独立文件，似乎可以将多个页放在一个html中，然后用html片段url来指向它们。
规范似乎并没有明确说manifest中的URI不能仅仅是片段部分不同。不过，不清楚这种做法能否被reader支持。

** OPF 中的描述
* 例子
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" xml:lang="en" unique-identifier="pub-id" prefix="rendition: http://www.idpf.org/vocab/rendition/#">

<metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
  ...
	<meta property="rendition:layout">pre-paginated</meta>
	<meta property="rendition:orientation">landscape</meta>
	<meta property="rendition:spread">none</meta>
</metadata>

...

<spine page-progression-direction="ltr">
    <itemref idref="cover" linear="yes" properties="rendition:page-spread-center"/>
    ...
</spine>

根元素 package 的 prefix 属性定义了命名空间前缀rendition，不过这个不是xml命名空间，而是用于meta property、item properties、itemref properties等属性的值的。

rendition的意思是翻译，但这里的意思更接近“版本”。

metadata中3个rendition:属性表明，这是个固定版式的（预先分页的，pre-paginated）书，
并且是横版（landscape）。

* layout
rendition:layout 的值可以是 reflowable 或 pre-paginated，表明一本书是流式还是版式，默认值是 reflowable。
metadata中的这个属性可以被 spine/itemref 的 rendition:layout 属性覆盖，表示个别内容文档采取流式还是版式排版。

* orientation
作者希望采取的屏幕方向。可以是 landscape | portrait | auto。这也可以被 spine/itemref 的 rendition:orientation 覆盖。
默认值是auto，意思是未指定方向。

* spread
rendition:spread 的意思是“展开”，表示怎样在一个屏幕上并列显示两个相邻的页面，以下简称“并列显示”。其值可以是：
none：不要并列显示。
landscape：仅当屏幕横置时并列显示。
portrait：仅当竖屏时并列显示。 
both：总是并列显示。
auto：让阅读器选择是否并列显示。这是默认值。

metadata中的设置的spread是全局的，在spine的itemref元素中，可以用 rendition:spread 属性加以覆盖，值仍然是上面那些。

spine page-progression-direction 表示翻页的方向，对应纸书的装订方向。如果同时使用了spread，这个会影响并列时哪一页在左边。其值可以是ltr或rtl。

翻页方向也可以用spine的itemref元素的 properties 属性的 rendition:page-spread-* 加以覆盖。其中*部分可以是：
center：本页不并列，居中显示。
left：本页位于左边。
right：本页位于右边。

page-spread-*不限于用于版式文档，也可用于流式文档。

* 在spine/itemref中rendition:*属性的写法
就是把属性名和值之间用-连接，放到properties的值中。例如
rendition:layout="reflowable" 的写法是：
<itemref … properties="rendition:layout-reflowable"/> 

** 内容文档的视口尺寸
* XHTML
使用meta viewport，单位是CSS像素。
<head>
    <meta name="viewport" content="width=1200, height=600"/>
</head>

* SVG
使用viewBox属性，单位还是CSS像素。
<svg xmlns="http://www.w3.org/2000/svg"
    version="1.1" width="100%" height="100%"
    viewBox="0 0 844 1200">
    …
</svg>

* 位图
把图像的物理像素当成CSS像素，作为视口尺寸。


*** 参考
** 规范
EPUB 3 Fixed-Layout Documents
http://www.idpf.org/epub/fxl

** 分析
* Fixed Layout Test books
  http://apex.infogridpacific.com/dcp/flo-test-books.html
  A range of aspect ratio and viewport size books exploring the various options in the IDPF Fixed Layout Specification and a discussion on design decisions.
  
* ePub3 Fixed Layout Packaging
  http://apex.infogridpacific.com/df/epub3packaging-flo.html

** 样书及其制作
* Fixed Layout (FLO) Demonstration ePub3 Documents
  http://azardi.infogridpacific.com/resources.html
  
* Famous Paintings
  http://apex.infogridpacific.com/dcp/flo-famous-paintings.html
  This book was designed to demonstrate two AZARDI Fixed Layout ePub3 things:
    The advanced navigation features available in AZARDI
    The use of ePub3 to present image rich content in a new, different and better way.

  
*** 软件
** Reader

** Editor
* IGP:Digital Publisher
  http://www.infogridpacific.com/DigitalPublisher.html