---
title: "Epub NCX"
pubDate: 2016-05-19

tags:
  - Epub
  - OPF
---
Epub NCX

** 规范
NCX是DTBook规范的一部分。
http://www.niso.org/workrooms/daisy/Z39-86-2005.html#NCX
  Specifications for the Digital Talking Book 
  8. Navigation Control File (NCX)
  
Epub2 规范中的相关章节是：2.4.1: Declarative Global Navigation — the NCX
http://www.idpf.org/epub/20/spec/OPF_2.0.1_draft.htm#Section2.4.1

Epub3 中，NCX被"EPUB Navigation Document"取代了；ncx仍可使用，但仅用于向前兼容，epub3阅读器必须忽略它。
http://www.idpf.org/epub/30/spec/epub30-contentdocs.html#sec-xhtml-nav
  
** 例子
8.6 Example

(This example is informative.)

Example 8.1:


<?xml version="1.0"  encoding="UTF-8"?>
<!DOCTYPE ncx PUBLIC "-//NISO//DTD ncx 2005-1//EN" 
  "http://www.daisy.org/z3986/2005/ncx-2005-1.dtd">
<ncx version="2005-1" xml:lang="en" xmlns="http://www.daisy.org/z3986/2005/ncx/">
  <head>
    <smilCustomTest id="pagenum" defaultState="false" 
    override="visible" bookStruct="PAGE_NUMBER"/>
    <smilCustomTest id="note" defaultState="true" 
    override="visible" bookStruct="NOTE"/>
    <meta name="dtb:uid" content="us-nls-00001"/>
    <meta name="dtb:depth" content="6"/>
    <meta name="dtb:generator" content="NLSv001"/>
    <meta name="dtb:totalPageCount" content="53"/>
    <meta name="dtb:maxPageNumber" content="49"/>
  </head>
  <docTitle>
     <text>Revised Standards and Guidelines of Service 
     for the Library of Congress Network of Libraries for the 
     Blind and Physically Handicapped 1995</text>
     <audio src="rs_title.mp3" clipBegin="00:00.00" clipEnd="00:09.04"/>
     <img src="rs_title.png" />
  </docTitle>
  <docAuthor>
       <text>Association of Specialized and Cooperative 
       Library Agencies</text>
       <audio src="rs_title.mp3" clipBegin="00:09.50" clipEnd="00:14.70"/>
  </docAuthor>
  <navMap>
      <navPoint class="chapter" id="lvl1_3" playOrder="2">
        <navLabel>
          <text>Foreword</text>
          <audio src="rs_fwdx.mp3" clipBegin="00:01.50" 
          clipEnd="00:02.00" />
        </navLabel>
        <content src="sample.smil#h1_3" />
        <navPoint class="section" id="lvl2_1" playOrder="3">
          <navLabel>
            <text>History</text>
            <audio src="rs_fwdx.mp3" clipBegin="00:03.40" 
            clipEnd="00:03.90" />
          </navLabel>
          <content src="sample.smil#h2_1" />
        </navPoint>
        <navPoint class="section" id="lvl2_2" playOrder="5">
          <navLabel>
            <text>Development of Standards</text>
            <audio src="rs_fwdx.mp3" clipBegin="00:56.30" 
            clipEnd="00:57.70" />
          </navLabel>
          <content src="sample.smil#h2_2" />
        </navPoint>
      </navPoint>
      <navPoint class="chapter" id="lvl1_7" playOrder="10">
        <navLabel>
          <text>Standards</text>
          <audio src="rs_stdx.mp3" clipBegin="00:01.30" 
          clipEnd="00:02.10" />
        </navLabel>
        <content src="sample.smil#h1_7" />
        <navPoint class="section" id="lvl2_11" playOrder="11">
          <navLabel>
            <text>1 Core Services</text>
            <audio src="rs_stdx.mp3" clipBegin="00:02.90" 
            clipEnd="00:04.90" />
          </navLabel>
          <content src="sample.smil#h2_10" />
          <navPoint class="subsection" id="lvl3_1" playOrder="12">
            <navLabel>
              <text>1.1</text>
              <audio src="rs_stdx.mp3" clipBegin="00:05.70" 
              clipEnd="00:06.70" />
            </navLabel>
            <content src="sample.smil#h3_1" />
            <navPoint class="sub-subsection" id="lvl4_1" playOrder="13">
              <navLabel>
                <text>a.</text>
                <audio src="rs_stdx.mp3" clipBegin="00:18.70" 
                clipEnd="00:19.10" />
              </navLabel>
              <content src="sample.smil#h4_1" />
            </navPoint>
          </navPoint>
          <navPoint class="subsection" id="lvl3_2" playOrder="14">
            <navLabel>
              <text>1.2</text>
              <audio src="rs_stdx.mp3" clipBegin="00:50.50" 
              clipEnd="00:51.40" />
            </navLabel>
            <content src="sample.smil#h3_2" />
          </navPoint>
        </navPoint>
      </navPoint>
      . . . 
  </navMap>
  <pageList id="pages">
    <navLabel>
        <text>Pages</text>
        <audio src="navlabels.mp3" clipBegin="00:00.00" 
        clipEnd="00:01.10" />
    </navLabel>
    <pageTarget class="pagenum" type="normal" id="p1" value="1" playOrder="1">
      <navLabel>
        <text>1</text>
        <audio src="rs_fwdx.mp3" clipBegin="00:00.00" 
        clipEnd="00:00.90" />
      </navLabel>
      <content src="sample.smil#p1" />
    </pageTarget>
    <pageTarget class="pagenum" type="normal" id="p2" value="2" playOrder="4">
      <navLabel>
        <text>2</text>
        <audio src="rs_fwdx.mp3" clipBegin="00:53.90" 
        clipEnd="00:54.60" />
      </navLabel>
      <content src="sample.smil#p2" />
    </pageTarget>
    <pageTarget class="pagenum" type="normal" id="p3" value="3" playOrder="9">
      <navLabel>
        <text>3</text>
        <audio src="rs_stdx.mp3" clipBegin="00:00.00" 
        clipEnd="00:00.70" />
      </navLabel>
      <content src="sample.smil#p3" />
    </pageTarget>
    . . .
  </pageList>
  <navList id="notes" class="note">
    <navInfo>
        <text>This list contains the three notes found in this book.
              Each entry in the list, numbered 1 through 3, points to a note reference.
        </text>
        <audio src="rs_info.mp3" clipBegin="00:00.00"
        clipEnd="00:05.592" />
    </navInfo>
    <navLabel>
        <text>Notes</text>
        <audio src="navlabels.mp3" clipBegin="00:01.50" 
        clipEnd="00:02.60" />
    </navLabel>
    <navTarget class="note" id="nref_1" playOrder="6">
      <navLabel>
        <text>1</text>
        <audio src="rs_fwdx.mp3" clipBegin="01:22.60" 
        clipEnd="01:23.50" />
      </navLabel>
      <content src="sample.smil#nref_1" />
    </navTarget>
    <navTarget class="note" id="nref_2" playOrder="7">
      <navLabel>
        <text>2</text>
        <audio src="rs_fwdx.mp3" clipBegin="02:00.60" 
        clipEnd="02:01.40" />
      </navLabel>
      <content src="sample.smil#nref_2" />
    </navTarget>
    <navTarget class="note" id="nref_3" playOrder="8">
      <navLabel>
        <text>3</text>
        <audio src="rs_fwdx.mp3" clipBegin="03:13.30" 
        clipEnd="03:14.10" />
      </navLabel>
      <content src="sample.smil#nref_3" />
    </navTarget>
  </navList>
</ncx>

** 说明
NCX 主要靠 navMap 来表示书籍的逻辑层次结构。navMap下的navPoint元素表示目录树中的一个节点。navPoint是可以嵌套的。 
与navMap平级的还有 pageList 和 navList，分别用于表示页序列和索引（脚注、图表等）。

navMap必须出现一次，pageList可以出现一次，navList可以出现零到多次。

navMap、pageList、navList 下子元素的 playOrder 属性提供了一种同步机制，可以根据章节找到页码或者根据页码找到章节。
不过，在不同的结构中的 playOrder 不必严格对应，阅读器会找到最接近的。

注意：playOrder 属性在Epub中不是必需的，但在DTBook中是。如果想省略playOrder，则ncx文件不能引用dtd。

* navPoint
主要属性：
class 节点类别，可取的值是chapter, section, subsection, sub-subsection等。可选，值也不是规范的一部分。
id 标识符，必需。
playOrder 播放顺序，应为正整数。必需。

主要子元素：
navLabel：节点上显示的文字或播放的声音。文本放在text子元素中，声音放在audio中。必需。
content：navPoint指向的内容，其src是内容所在的URL。必需。
navPoint：子节点。

* pageTarget
pageList 的内容是 pageTarget 的序列。pageTarget不能嵌套。

主要属性：
id 必需。
class 值为 pagenum，可选
type 页码的类型，值为 front | normal | special，必需。
value 页码的值，正整数，可选。与type的组合必需唯一。
playOrder 为阅读顺序，必需。
子元素：
navLabel 其text表示页码，必需。
content 必需。

* navTarget
navList 的内容是 navTarget 的序列。navTarget不能嵌套。
主要属性：
id 必需。
class 值为 note 等
playOrder 为阅读顺序，必需。
子元素：
navLabel
content

** 在OPF中注册
<package version="2.0" xmlns="http://www.idpf.org/2007/opf" unique-identifier="BookId">
 
  <manifest>
    <item id="chapter1" href="chapter1.xhtml" media-type="application/xhtml+xml"/>
    ...
    <item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>
  </manifest>
 
  <spine toc="ncx">
    <itemref idref="chapter1" />
    ...
  </spine>
 
</package>

spine元素的toc属性，可以引用manifest中的ncx文件的id。
spine元素的itemref仍可继续引用其它项目。