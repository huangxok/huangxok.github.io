---
title: "Epub_analysis"
pubDate: 2017-06-16

tags:
  - epub
  - 电子书
---
# 使用Epub 制作数字图书 基于XML的开放式eBook格式

#### 简介
是否需要分发文档、创建电子图书或者把喜欢的博客文章存档？EPUB 是一种开放式的数字图书规范，以常用的技术如 XML、CSS 和 XHTML 为基础，EPUB 文件可在便携式的 e-ink 设备、移动电话和桌面计算机上阅读。本教程详细阐述了 EPUB 格式，首先用 Java™ 技术示范了 EPUB 验证，然后详细说明如何使用 DocBook 和 Python 自动创建 EPUB。

## 常用的缩写词

* API：应用程序编程接口（application programming interface）
* CSS：级联样式表（Cascading stylesheet)
* DOM: 文档对象模型（Document Object Model)
* DTD: 文档类型定义（Document type definition）
* GUI: 图形用户界面（Graphical user interface）
* HTML： 超文本标记语言（Hypertext Markup Language）
* SAX: XML简易API(simple API For XML)
* W3C: 万维网联盟（World Wide Web Consortium）
* XHTML: 可拓展的HTML（Extendsible HTML）
* XMl: 可拓展标记语言

关于 EPUB 格式

了解 EPUB 的背景，EPUB 最适合做什么，以及 EPUB 和便携式文档格式（PDF）的区别。

什么是 EPUB？

EPUB 是可逆的数字图书和出版物 XML 格式，数字出版业商业和标准协会 International Digital Publishing Forum (IDPF) 制定的标准。IDPF 于 2007 年 10 月正式采用 EPUB，随后被主流出版商迅速采用。可以使用各种开放源代码或者商业软件在所有主流操作系统、Sony PRS 之类的 e-ink 设备或者 Apple iPhone 之类的小型设备上阅读 EPUB 格式。

谁在使用 EPUB？只能用于图书吗？

虽然最早采用 EPUB 的是传统的印刷品出版商，但是这并不妨碍它在电子图书中的应用。利用免费的软件工具，可以将网页捆绑成 EPUB，转化成文本文件或者将原有的 DocBook XML 文档转化成结构良好的、有效的 EPUB

EPUB 与 PDF 有什么不同？

PDF 仍然是世界上应用最广泛的电子文档格式。从图书出版商的角度来看，PDF 的优点包括：

PDF 文件允许对页面布局进行像素级的控制，包括复杂的打印格式，如多栏格式和奇偶页相间的格式。
有多种不同的 GUI 文档工具可生成 PDF，如 Microsoft® Office Word 和 Adobe® InDesign®。
PDF 阅读器非常普及，现在大多数计算机上都有安装。
PDF 可以嵌入特殊的字体，精确控制最终的输出结果

## 三合一标准

EPUB 包括三个单独的 IDPF 规范，虽然实际上将其统称为 EPUB 更保险：

* Open eBook Publication Structure Container Format (OCF)：定义了 EPUB 档案的目录树结构和文件结构（ZIP）。
* Open Publication Structure (OPS)：定义了电子图书的公共词汇表，特别是可作为图书内容的格式（比如 XHTML 和 CSS）。
* Open Packaging Format (OPF)：描述了 EPUB 必须的和可选的元数据、阅读顺序和目录。

此外，对于档案中的特定类型的内容，EPUB 还重用了其他一些标准，如 XHTML 1.0 和 Digital Accessible Information SYstem (DAISY)。

从软件开发人员的角度来看，PDF 还远远不够理想：

这不是一种简单易学的标准，因此编写自己的 PDF 生成代码非常困难。
虽然 PDF 现在是一种 International Organization for Standardization（ISO）标准（ISO 32000-1:2008），但过去一直受一家公司的控制：Adobe Systems。
尽管多数编程语言都提供了 PDF 库，但很多是商业产品或者嵌入到 GUI 应用程序中，外部进程不容易控制。并非所有的免费库都得到积极的维护。
PDF 原生文本可以通过程序提取出来并进行搜索，但很少可以对 PDF 进行标记以便简单可靠地转化成 Web 友好的格式。
PDF 文档不容易流动，就是说很难适应小屏幕或者对布局进行明显的改变。
为何说 EPUB 对开发人员是友好的

EPUB 解决了 PDF 和开发人员友好性有关的所有瑕疵。一个 EPUB 就是一个简单 ZIP 格式文件（使用 .epub 扩展名），其中包括按照预先定义的方式排列的文件。如何制作 ZIP 文档有一些技巧，稍后将在 将 EPUB 文件捆绑为 ZIP 文档 一节介绍。除此以外，EPUB 非常简单：

EPUB 中的所有内容基本上都是 XML。EPUB 文件可使用标准 XML 工具创建，不需要任何专门或者私有的软件。
EPUB 内容（eBook 的具体内容）基本上都是 XHTML 1.1（另一种格式是 DTBook，为视力受限者编码书籍的一种标准。关于 DTBook 的更多信息请参阅 参考资料，本教程中不涉及这部分）。
大多数 EPUB XML 模式都来自现成的、可免费获得的、已发布的规范。
最关键的在于 EPUB 元数据是 XML，EPUB 内容是 XHTML。如果您的文档构建系统产生的结果用于 Web 和/或基于 XML，那么也可用于生成 EPUB。

## 开始创建

分析EPUB包
小型 EPUB 文件的基本结构遵循 清单 1 所示的样式。准备好分发之前，整个目录结构被压缩到一个 ZIP 格式文件中，几点特殊要求将在 用 ZIP 打包 EPUB 文件 一节讨论

#### 清单1. EPUB的目录和文件结构
如下
```
  mimetype
    META-INf/
      container.xml
    OEBPS/
      content.opf
      title.html
      content.html
      stylesheet.css
      toc.ncx
      image/
        cover.png  

```

提示：可下载符合该结构的一个电子图书，但建议还是按照以上所述自己创建一个。

mimetype 文件
这个文件必须命名为 mimetype ，文件内容如下：
```
  application/epub+zip
```
要注意，mimetype 文件不能包含新行或者回车。
此外，mimetype 文件必须作为 ZIP 档案中的第一个文件，而且自身不能压缩。用 ZIP 打包 EPUB 文件 一节将介绍如何使用一般的 ZIP 参数将其包含进来。现在创建该文件并保存，并确保它在 EPUB 项目的根目录中。

META-INF/container.xml

EPUB 根目录下必须包含 META-INF 目录，而且其中要有一个文件 container.xml。EPUB 阅读系统首先查看该文件，它指向数字图书元数据的位置。

创建目录 META-INF。在其中创建一个新文件 container.xml。container 文件非常小，但是对结构要求很严格。将 清单 2 中的代码粘贴到 META-INF/container.xml 中。

#### 清单2. container.xml文件
```
  <?xml version="1.0"?>
  <container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf"
     media-type="application/oebps-package+xml" />
  </rootfiles>
  </container>
```
full-path的值(OEBPS/content.opf)仅仅是该文件的一部分，不同的文件可能相差甚大。目录路径必须相对于 EPUB 文件根目录本身，而不是 META-INF 目录

### 关于 META-INF
META-INF 目录还可以包含其他几个文件。这些文件使 EPUB 支持数字签名、加密和数字版权管理（DRM）。本教程不讨论这些主题。更多信息请参阅 OCF 规范

mimetype 和 container 是 EPUB 档案中仅有的两个需要严格限制位置的文件。建议（尽管不是必须的）将其他文件保存到 EPUB 的子目录下（按照惯例，通常被称为 OEBPS，即 Open eBook Publication Structure，但不是必须的）。

接下来在 EPUB 项目中创建目录 OEBPS。本教程下一节将介绍 OEBPS 中的文件 — 数字图书的核心：元数据和页面。
创建 OEBPS/content.opf 并粘贴 清单 3 所示的内容。

#### 清单 3. 包含示例元数据的 OPF content 文件
```	
<?xml version='1.0' encoding='utf-8'?>
<package xmlns="http://www.idpf.org/2007/opf" 
            xmlns:dc="http://purl.org/dc/elements/1.1/" 
            unique-identifier="bookid" version="2.0">
  <metadata>
    <dc:title>Hello World: My First EPUB</dc:title>
    <dc:creator>My Name</dc:creator>
    <dc:identifier id="bookid">urn:uuid:12345</dc:identifier>
    <meta name="cover" content="cover-image" />
  </metadata>
  <manifest>
    <item id="ncx" href="toc.ncx" media-type="text/xml"/>
    <item id="cover" href="title.html" media-type="application/xhtml+xml"/>
    <item id="content" href="content.html" media-type="application/xhtml+xml"/>
    <item id="cover-image" href="images/cover.png" media-type="image/png"/>
    <item id="css" href="stylesheet.css" media-type="text/css"/>
  </manifest>
  <spine toc="ncx">
    <itemref idref="cover" linear="no"/>
    <itemref idref="content"/>
  </spine>
  <guide>
    <reference href="cover.html" type="cover" title="Cover"/>
  </guide>
</package>
```

**OPF 模式与名称空间**

OPF 文档本身必须使用名称空间 http://www.idpf.org/2007/opf，元数据则使用 Dublin Core Metadata Initiative (DCMI) 名称空间 http://purl.org/dc/elements/1.1/。

最好现在将 OPF 和 DCMI 模式添加到 XML 编辑器中。EPUB 用到的所有模式都可以 下载。

**元数据**

Dublin Core 定义了一组常用的元数据，可用于描述各种不同的数字资料，它不是 EPUB 规范的一部分。所有这些术语都可以出现在 OPF 元数据部分。编写要分发的 EPUB 时，这里可以放很多内容，目前来说 清单 4 的内容就足够了。

#### 清单 4. OPF 元数据摘要
```
  ...
  <metadata>
    <dc:title>Hello World: My First EPUB</dc:title>
    <dc:creator>My Name</dc:creator>
    <dc:identifier id="bookid">urn:uuid:12345</dc:identifier>
    <meta name="cover" content="cover-image" />
  </metadata>
..
```

有两个术语是必须的，即 title 和 identifier。按照 EPUB 规范，标识符必须 是惟一的，但是这个惟一的值要靠数字图书的创建者来定义。对于图书出版商来说，这个字段一般包含 ISBN 或者 Library of Congress 编号。对于其他 EPUB 创建者，可以考虑使用 URL 或者很大的随机生成的惟一用户 ID（UUID）。要注意，属性 unique-identifier 的值必须和 dc:identifier 元素的 ID 属性匹配。

其他和内容相关的可以考虑添加的元数据包括：

* 语言（如 dc:language）。
* 出版日期（如 dc:date）。
* 出版商（如 dc:publisher）。（可以是公司或个人的名称）。
* 版权信息（如 dc:rights）。（如果采用 Creative Commons 许可证，可以将许可证的 URL 放在这里）。
* 关于 DCMI 的更多信息请参阅 参考资料。

EPUB 规范没有要求包含 name 属性值为 cover 的 meta 元素，但为了增加封面和图像的可移植性，建议这样做。一些 EPUB 呈现程序喜欢使用图像文件作为封面，另一些则愿意使用包含内联封面图像的 XHTML 文件。该例子显示了这两种情况。meta 元素的 content 属性的值应该是图书封面图像在 manifest 中的 ID 号，manifest 是 OPF 文件的一部分。

**Manifest**

OPF manifest 列出了 EPUB 内容（不包括元数据）中的所有资源。就是说，通常是组成电子图书文本的一组 XHTML 文件再加上一些相关的媒体如图像。EPUB 鼓励使用 CSS 设定图书内容的样式，因此 manifest 中也包含 CSS。进入数字图书的所有文件都必须在 manifest 中列出。

清单 5 显示了 manifest 的一部分。

#### 清单 5. OPF manifest 的一部分
```
  ...
  <manifest>
    <item id="ncx" href="toc.ncx" media-type="text/xml"/>
    <item id="cover" href="title.html" media-type="application/xhtml+xml"/>
    <item id="content" href="content.html" media-type="application/xhtml+xml"/>
    <item id="cover-image" href="images/cover.png" media-type="image/png"/>
    <item id="css" href="stylesheet.css" media-type="text/css"/>
  </manifest>
  ...
```

### 高级 OPF manifest

更高级的 manifest 文件可能包含多个 XHTML 文件以及图像和 CSS。可 下载 一个完整的包含各种常见类型的 EPUB 例子。

第一项 toc.ncx（参见 下一节）是必须的。所有的项都有相应的 media-type 值，XHTML 内容的媒体类型为 application/xhtml+xml。媒体类型必须正确，不能 是 text/html 或者其他类型。

EPUB 支持四种核心 图像文件类型：Joint Photographic Experts Group (JPEG)、Portable Network Graphics (PNG)、Graphics Interchange Format (GIF) 和 Scalable Vector Graphics (SVG)。如果能够提供对核心类型的后退转换（fall-back），也可包含不支持的文件类型。关于后退转换内容的更多信息请参阅 OPF 规范。

href 属性的值应该是一个相对于该 OPF 文件 的统一资源标识符（URI）。（很容易和 container.xml 中对 OPF 文件的引用混淆，其中的引用是相对于 EPUB 的整体引用）。这里的 OPF 文件位于和内容相同的 OEBPS 目录中，因此不需要路径信息。

**Spine**

manifest 告诉 EPUB 阅读器哪些文件属于档案，spine 则指定这些文件出现的顺序或 — 按照 EPUB 的说法 — 数字图书的线性阅读顺序。可以将 OPF spine 看作是书中 “页面” 的顺序。按照文档顺序从上到下依次读取 spine。清单 6 显示了 OPF 文件的一个片段。

#### 清单 6. OPF spine 的一部分
```
  ...
  <spine toc="ncx">
    <itemref idref="cover" linear="no"/>
    <itemref idref="content"/>
  </spine>
  ...

```

每个 itemref 元素都需要有一个 idref 属性，并且和 manifest 中的某个 ID 匹配。toc 属性也是必需的。它引用 manifest 中表示内容 NCX 表文件名的 ID。

spine 中的 linear 属性表明该项是作为线性阅读顺序中的一项，还是和先后次序无关。建议将封面定义为 linear=no。符合 EPUB 规范的阅读系统将首先打开 spine 中没有 设置为 linear=no 中的第一项。

**Guide**

OPF 内容文件的最后一部分是 guide。这一节是可选的，但最好保留。清单 7 显示了 guide 文件的部分内容。
```
  ...
  <guide>
    <reference href="cover.html" type="cover" title="Cover"/>
  </guide>
  ...

```

guide 可以为 EPUB 阅读系统提供语义信息。manifest 定义了 EPUB 中的物理资源，spine 提供了这些资源的顺序信息，guide 负责解释这些部分的含义。下面是可以出现在 OPF guide 中的部分值：

* cover：图书封面
* title-page：包含作者和出版商信息的页面
* toc：目录
完整的列表请参阅 OPF 2.0 规范（参见 参考资料）。

### NCX 和 OPF元数据的交叉

由于 NCX 源自其他标准，使用 NCX 编码的信息和 OPF 内容之间存在重复。如果通过程序生成 EPUB，这算不上什么问题，因为同样的代码可输出到两个文件中。两个位置的信息要一致，不同的 EPUB 读者可能使用不同位置的值。

尽管 OCF 文件是作为 EPUB 本身的一部分定义的，但最后一个主要的元数据文件参照了不同的数字图书标准。DAISY 是一个专门为不能使用传统书籍的读者设计数据格式的组织，通常是因为视力受损或者不便于使用印刷的书籍。EPUB 借用了 DAISY 的 NCX DTD。NCX 定义了数字图书的目录表。复杂的图书中，目录表通常采用层次结构，包括嵌套的内容、章和节。

使用 XML 编辑器创建 OEBPS/toc.ncx 并粘贴 清单 8 所示的代码。
```
  <?xml version='1.0' encoding='utf-8'?>
  <!DOCTYPE ncx PUBLIC "-//NISO//DTD ncx 2005-1//EN" 
                  "http://www.daisy.org/z3986/2005/ncx-2005-1.dtd">
  <ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
    <head>
      <meta name="dtb:uid" content="urn:uuid:12345"/>
      <meta name="dtb:depth" content="1"/>
      <meta name="dtb:totalPageCount" content="0"/>
      <meta name="dtb:maxPageNumber" content="0"/>
    </head>
    <docTitle>
      <text>Hello World: My First EPUB</text>
    </docTitle>
    <navMap>
      <navPoint id="navpoint-1" playOrder="1">
        <navLabel>
          <text>Book cover</text>
        </navLabel>
        <content src="title.html"/>
      </navPoint>
      <navPoint id="navpoint-2" playOrder="2">
        <navLabel>
          <text>Contents</text>
        </navLabel>
        <content src="content.html"/>
      </navPoint>
    </navMap>
  </ncx>
```

**NCX 元数据**

DTD 要求 NCX <head> 标记中包含四个 meta 元素：

uid： 数字图书的惟一 ID。该元素应该和 OPF 文件中的 dc:identifier对应。
depth：反映目录表中层次的深度。该例只有一层，因此是 1。
totalPageCount 和 maxPageNumber：仅用于纸质图书，保留 0 即可。
docTitle/text 的内容是图书的标题，和 OPF 中的 dc:title 匹配。

**NCX navMap**

### NCX 和 OPF spine 有什么不同？

两者很容易混淆，因为两个文件都描述了文档的顺序和内容。要说明两者的区别，最简单的办法就是拿印刷书来打比方：OPF spine 描述了书中的各个章节是如何实际连接起来的，比方说翻过第一章的最后一页就看到第二章的第一页。NCX 在图书的一开始描述了目录。目录肯定会包含书中主要的章节，但是还可能包含没有单独分页的小节。

一条法则是 NCX 包含的 navPoint 元素通常比 OPF spine 中的 itemref 元素多。实际上，spine 中的所有项都会出现在 NCX 中，但 NCX 可能更详细。

navMap 是 NCX 文件中最重要的部分，定义了图书的目录。navMap 包含一个或多个 navPoint 元素。每个 navPoint 都要包含下列元素：

* playOrder 属性，说明文档的阅读顺序。和 OPF spine 中 itemref元素的顺序相同。
* navLabel/text元素，给出该章节的标题。通常是章的标题或者数字，如 “第一章”，或者 — 像这个例子一样 — “封面”。
* content 元素，它的 src 属性指向包含这些内容的物理资源。就是 OPF manifest 中声明的文件（也可使用片段标识符引用 XHTML 内容中的锚元素 — 比如 content.html#footnote1）。
* 还可以有一个或多个 navPoint 元素。NCX 使用嵌套的导航点表示层次结构的文档。
该文档的结构非常简单：只有两页，不存在嵌套关系。就是说有两个 navPoint 元素，它们的 playOrder 值按升序排列，从 1 开始。在 NCX 中可以命名这些章节，以便读者跳到电子图书不同的部分。

 

添加最后的内容

现在知道了 EPUB 需要的所有元数据，可以加入真正的图书内容了。可以使用 下载 的内容，也可以自己写，只要文件名和元数据匹配即可。

然后创建下列文件和文件夹：

* title.html：图书的标题页。创建该文件并在其中包含引用封面图片的 img 元素，src 的属性值为images/cover.png。
* images：在 OEBPS 下创建该文件夹，然后复制给定的示例图片（或者创建自己的图片）并命名为 cover.png。
* content.html：图书的实际文字内容。
* stylesheet.css：将该文件放在和 XHTML 文件相同的 OEBPS 目录中。该文件可以包含任意 CSS 声明，比如设置字体或者文字颜色。清单 10 给出了一个 CSS 文件的例子。
EPUB 图书中的 XHTML 和 CSS

清单 9 包含了一个有效的 EPUB 内容页。将其作为标题页（title.html），用一个类似的页面作为主要内容页（content.html）。

#### 清单 9. 示例 title 页面（title.html）
```
  <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <title>Hello World: My First EPUB</title>
      <link type="text/css" rel="stylesheet" href="stylesheet.css" />
    </head>
    <body>
      <h1>Hello World: My First EPUB</h1>
      <div><img src="images/cover.png" alt="Title page"/></div>
    </body>
  </html>
```
EPUB 的 XHTML 需要符合几条要求，和一般的 Web 开发不同：

* 内容必须是有效的 XHTML 1.1：XHTML 1.0 Strict 和 XHTML 1.1 的主要区别是去掉了 name属性（使用 ID 引用锚元素）。
* img 元素只能引用电子图书的本地图片：该元素不能引用 Web 上的图片。
* 避免使用 script：EPUB 阅读器不一定支持 JavaScript 代码。
EPUB 支持 CSS 的方式有一些细微的差别，但是不会影响样式表的一般用法（详情参阅 OPS 规范）。清单 10 中的简单 CSS 文件可以设置基本的字体，并把标题设为红色。

清单 10. 电子图书的示例样式表（stylesheet.css）
```
  body {
    font-family: sans-serif;     
  }
  h1,h2,h3,h4 {
    font-family: serif;     
    color: red;
  }
```
有趣的是，EPUB 非常支持 CSS 2 @font-face 规则，允许内嵌字体。如果创建技术文档，这点可能无关紧要，但是如果用多种语言或针对特定领域编写 EPUB，能够指定具体的字体数据就很有必要了。

现在已经准备好了创建 EPUB 图书所需的所有内容。下一节将按照 OCF 规范将图书装订起来，并看看如何进行验证。

### 打包和检查 EPUB

现在，应当可以对 EPUB 包进行打包。这个包可以是您自己创建的一本新书，也可使用从本文 下载 部分获得的原始文件。

用 ZIP 打包 EPUB 文件

EPUB 规范的 OEBPS Container Format 讨论了 EPUB 和 ZIP，最重要的几点是：

* 档案中的第一个文件必须是 mimetype 文件（参见本教程 Mimetype一节）。mimetype 文件不能被压缩。这样非 ZIP 工具就能从 EPUB 包的第 30 个字节开始读取原始字节，从而发现 mimetype。
* ZIP 档案不能加密。EPUB 支持加密，但不是在 ZIP 文件这一层上。
在类 UNIX® 操作系统上，使用 ZIP 2.3 可通过两个命令来创建 EPUB ZIP 文件，如 清单 11 所示（这些命令假设当前工作目录为 EPUB 项目。）

#### 清单 11. 将 EPUB 打包成有效的 epub+zip 文件

```					
$ zip -0Xq  my-book.epub mimetype
$ zip -Xr9Dq my-book.epub *
```
第一个命令创建了一个新的 ZIP 档案，并添加了没有进行压缩的 mimetype 文件。第二个命令添加其他内容。选项 -X 和 -D 最大限度地减少 .zip 文件中无关紧要的信息；-r 递归地包含 META-INF 和 OEBPS 目录的内容。

 

EPUB 验证

虽然 EPUB 标准并不很难，但其 XML 文件必须符合特定的模式。如果使用模式感知的 XML 编辑器生成元数据和 XHTML，就能事半功倍。对 EpubCheck 包进行最后检查（参见 参考资料）。

Adobe 负责维护 EpubCheck 包，它是采用 Berkeley Software Distribution (BSD) 许可证的开源项目。它是一个可以作为独立工具、Web 应用程序运行的 Java 程序，或者可以将它集成到在 Java Runtime Environment (JRE) 1.5 或更高版本下运行的应用程序中。

在命令行中运行非常简单。清单 12 给出了一个例子。

#### 清单 12. 运行 EpubCheck 工具程序

```					
$ java -jar /path/to/epubcheck.jar my-book.epub
```
如果没有创建辅助文件或者元数据文件出错，可能会看到 清单 13 所示的错误消息。

清单 13. EpubCheck 错误

```			
my-book.epub: image file OEBPS/images/cover.png is missing
my-book.epub: resource OEBPS/stylesheet.css is missing
my-book.epub/OEBPS/title.html(7): 'OEBPS/images/cover.png': 
     referenced resource missing in the package

Check finished with warnings or errors!
```
这时候可能需要设置 CLASSPATH 使它指向 EpubCheck 的安装位置，因为确实需要导入几个外部库。如果得到这样的消息则需要设置 CLASSPATH：
```
org.xml.sax.SAXParseException: no implementation available for schema language 
   with namespace URI "http://www.ascc.net/xml/schematron"
```
如果验证成功，就会看到 “No errors or warnings detected（没有检测到错误或警告）”。祝贺您完成了第一个 EPUB！

查看 EPUB

测试不仅仅是验证，还要保证书的外观看起来不错。样式表能正确工作吗？章节的逻辑顺序是否正确？书中是否包含了所有需要的内容？

有多重 EPUB 阅读器可供选择。图 1 显示了 Adobe Digital Editions (ADE) 的屏幕截图，这是最常用的 EPUB 阅读器。

参考
[http://www.cnblogs.com/linlf03/archive/2011/12/15/2285953.html](http://www.cnblogs.com/linlf03/archive/2011/12/15/2285953.html)
[https://www.ibm.com/developerworks/cn/xml/tutorials/x-epubtut/index.html](https://www.ibm.com/developerworks/cn/xml/tutorials/x-epubtut/index.html)
[https://www.ibm.com/developerworks/xml/tutorials/x-epubtut/index.html](https://www.ibm.com/developerworks/xml/tutorials/x-epubtut/index.html)