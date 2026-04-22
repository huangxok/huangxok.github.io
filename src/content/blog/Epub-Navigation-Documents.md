---
title: "Epub Navigation Documents"
pubDate: 2016-05-19

tags:
  - Epub
  - OPF
---
EPUB Navigation Documents

** 规范
http://www.idpf.org/epub/30/spec/epub30-contentdocs.html#sec-xhtml-nav

** 说明
EPUB Navigation Document（以下简称END或导航文档）是epub3的导航文档，用于取代epub2的ncx文档。
ncx仍可使用，但仅用于向前兼容，epub3阅读器必须忽略它。

每个epub中有且仅有一个导航文档，不过还可以有一个ncx文档。

导航文档首先必须是符合 epub3 内容文档要求的 xhtml 文件。

导航文档使用一个或多个nav元素来表示一个导航结构，如目录、图表索引等。

nav下使用嵌套的ol/li元素来表示导航的层次结构。
li中用a元素来指向实际内容。a以外还可以用span来加入说明性内容。

nav的开头可以有标题（heading），用h1-h6以及hgroup表示。

nav的epub:type表示导航的类型，取值可以是
toc 目录 table of contents
page-list 页码列表。这种nav的ol只能有一层。
lot 表格索引 List of tables
loi 图形索引 List of Illustrations
landmarks 地标

toc必须出现一次，page-list、landmarks最多出现一次。

注意 epub 命名空间是： xmlns:epub="http://www.idpf.org/2007/ops"

* 隐藏某些导航或其一部分
page-list等类型的nav通常不希望直接作为HTML显示出来，或者导航的某些部分不希望直接显示，这时可以用HTML5的hidden属性。注意，不应该使用CSS display:none，因为不是所有的reader都支持CSS。

* 在OPF中注册
参考：
  http://www.idpf.org/epub/30/spec/epub30-publications.html#sec-item-property-values
  
  导航文档应在 OPF 文件中注册，具体方法是在 Manifest 的 item 元素的 properties 属性中加入 nav 值。
  properties 是个空白分割的字符串。
  

** 例子
* toc
The following example shows a partial toc nav element where the hidden attribute is used to limit content flow rendering to the two topmost hierarchical levels.

<nav epub:type="toc" id="toc">
  <h1>Table of contents</h1>
  <ol>
    <li>
      <a href="chap1.xhtml">Chapter 1</a>
      <ol>
        <li>
          <a href="chap1.xhtml#sec-1.1">Chapter 1.1</a>
          <ol hidden="">
            <li>
              <a href="chap1.xhtml#sec-1.1.1">Section 1.1.1</a>
            </li>
            <li>
              <a href="chap1.xhtml#sec-1.1.2">Section 1.1.2</a>
            </li>
          </ol>
         </li>
         <li>
           <a href="chap1.xhtml#sec-1.2">Chapter 1.2</a>
         </li>
       </ol>
     </li>
    <li>
      <a href="chap2.xhtml">Chapter 2</a>
    </li>
  </ol>
</nav>

* page-list
The following example shows a partial page-list nav element. The presence of the hidden attribute on the root indicates that the entire list is excluded from rendering in the content flow.

<nav epub:type="page-list" hidden="">
    <h2>Pagebreaks of the print version, third edition</h2>
    <ol>
        <li><a href="frontmatter.xhtml#pi">I</a></li>
        <li><a href="frontmatter.xhtml#pii">II</a></li>
        <li><a href="chap1.xhtml#p1">1</a></li>
        <li><a href="chap1.xhtml#p2">2</a></li>
    </ol>
</nav>

* landmarks 的例子
The following example shows a landmarks nav element with structural semantics drawn from the EPUB Structural Semantics Vocabulary.

<nav epub:type="landmarks">
    <h2>Guide</h2>
    <ol>
        <li><a epub:type="toc" href="#toc">Table of Contents</a></li>
        <li><a epub:type="loi" href="content.html#loi">List of Illustrations</a></li>
        <li><a epub:type="bodymatter" href="content.html#bodymatter">Start of Content</a></li>
    </ol>
</nav>