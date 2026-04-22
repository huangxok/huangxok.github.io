---
title: "HTML5 vs XHTML5"
pubDate: 2016-05-19

tags:
  - HTML
  - XHTML
---
XHTML5 与 HTML5 的差异和兼容

这里考虑的是让文档同时符合 HTML 5 和 XHTML 5（以下简称h5和x5）。

*** 参考
HTML vs. XHTML
  http://wiki.whatwg.org/wiki/HTML_vs._XHTML

HTML和XHTML的不同 
  http://dancewithnet.com/2007/10/28/differences-between-html-and-xhtml/
  
** mime
text/html 和 application/xml or application/xhtml+xml
根据HTML5，如果给定 mime是text/html，那么解析模式就不是 xhtml。

对于本地x5文件，可以给予扩展名 xhtml，这样浏览器会以 xhtml 模式加载。

** doctype
 DOCTYPE 对x5是可选的，h5则用来触发正常解析模式。
 给出 <!DOCTYPE html> 可以兼容h5和x5。
 
** 字符编码
 h5 忽略（或者不允许使用） xml 声明（<?xml encoding="..."?>），而x5会忽略 <meta charset="..." />（而且只允许值为UTF-8），因此没有两者通用的字符编码指定方法。
 相对可行的方法是：文档采用UTF-8编码，给出 meta charset，但是不给出 xml 声明。这样，xml解析器仍可自动识别编码。
 
** 命名空间
 h5 可以被认为不支持命名空间。
 h5 中的内置元素的命名空间是隐式的，即 html、svg、mathml元素及其子元素分别在 xhtml、svg、mathml 命名空间中，外部元素不能声明自己的命名空间。
 h5 允许内置元素使用xmlns属性，但是不能使用前缀，xmlns属性也不起任何作用。
 x5 中，html、svg、mathml元素都必须给予恰当的命名空间：
   http://www.w3.org/1999/xhtml
   http://www.w3.org/2000/svg
   http://www.w3.org/1998/Math/MathML
   
 为了兼容 h5和x5，应对html、svg、mathml元素声明命名空间，但不要使用前缀。
 
** XML attributes 
  x5中，有xml:前缀的属性，如 xml:id, xml:base, xml:lang 和 xml:space 
  不需要声明命名空间，强制的命名空间是 http://www.w3.org/XML/1998/namespace，前缀也只能是 xml。
  h5中，html元素也可以使用 xml:lang，不过没什么效果。其它元素则可以自由使用所有 xml 属性。
  
  为了兼容，html元素上应同时使用lang和xml:lang属性，如果需要的话；但不要在html元素上使用其它xml 属性。
  
** 属性
  x5中属性名都是小写的，h5则不区分大小写，为了兼容应全部小写。
  不属于html词汇表的属性仍会包含在DOM中，不过为了避免冲突，建议使用data-属性。
  x5属性值中的空白会被正规化，h5则不会，因此不要依赖这个特性。

** 必空（Void）与非必空（Non-void）元素
  h5 中，必空元素是指不能有内容的元素，它们不能写成开始标记紧跟结束标记的形式，只能写成仅有开始标记或自封闭标记的形式。
  例如<br>或<br/>不能写成<br></br>，否则h5解析器认为</br>是另一个<br>。
  x5 没有这个概念，<br/> 等效于 <br></br>，但是，仅有开始标记是不允许的。
  必空元素包括：base, link, meta, area, br, col, embed, hr, img, input, param。
  
  h5 中，非必空元素是指可能有内容的元素，它们不能写成自封闭的形式。例如 <script></script>不能写成<script/>，否则该元素整个被忽略。
  x5 同样没有这个概念，没有内容的元素总是可以写成自封闭形式。
  
  为了兼容，必空元素应写成自封闭形式，非必空元素一定不要写成自封闭形式。
  
** 可省略结束标记的元素和可省略的元素
  在h5中，某些元素允许省略结束标签或两个标签。

    html (两个)
    head (两个)
    body (两个)
    li (结束标签)
    dt (结束标签)
    dd (结束标签)
    p (结束标签)
    colgroup (两个)
    thead (结束标签)
    tbody (两个)
    tfoot (结束标签)
    tr (结束标签)
    td (结束标签)
    th (结束标签)
    
  在 x5中，以上都不可省略。
  
** 处理指令 Processing Instructions
  h5 没有处理指令的概念，但早期 html 允许 “bogus comments”（伪造的注释），使用类似的语法 <?foo ...> 或者 <?foo ...?>，但已经被h5废弃。
  为了兼容，x5中的处理指令内部不要有'>'，否则在h5解析器中会过早结束。最好完全不用处理指令。

** CDATA sections
  h5 将 CDATA sections 视为“bogus comments”。h5的普通文本中允许出现CDATA结束标记 "]]>" ，但 x5不允许。
  为了兼容，要避免普通文本中出现CDATA结束标记 "]]>"。
  
** 字符引用
  h5中 x 可以大写（如&#XA;），x5 中只能小写。为兼容要小写。
  
** script 和 style
  h5中，这两个元素的内部总是被视为 CDATA（尽管与xml的CDATA不完全相同），因此可以直接出现'<'、'&'。
  x5中，这两个元素的内部只是普通内容，因此里面会按xml语法去解析，所以特殊字符如'<'、'&'必须转义。
  为了兼容，可以总是转义特殊字符，或者用CDATA sections。

** DOM API
* 类型
  h5 文档对象类型是 HTMLDocument，x5则是 Document 或者 XMLDocument。
  元素类型则没有区别，都是 HTMLElement。
  x5模式下，元素和属性名区分大小写。
  h5中，Element.tagName and Node.nodeName 对html节点返回大写名字，但x5中返回小写。
  
  详见 javascript_note_document_creation_parsing_serialization.txt。
  
* Document的body、head、images等快捷属性
  如果文档是主文档（即window.document），则这些属性对 x5 文档也是可用的，这保证了在xhtml中使用js的兼容性。
  如果不是主文档，则不一定可用（chrome可，FF不可），所以不要依赖它。
  HTMLDocument 中默认就有 head 和 body 元素，即使在源文件中省略或在创建时省略；而 xhtml Document 中，如果省略元素就真的没有了。
  
* innerHTML/outerHTML
  对于x5，读这个属性得到的字符串会带有xhtml的命名空间（如果含有元素子节点）；
  写入这个元素不要求有命名空间，但至少要符合xhtml语法，否则抛出异常。
  对于h5，则不会得到命名空间，也不一定符合xhtml语法。
  因此在h5文档和x5文档之间交换数据的时候很容易出现问题，解决办法见“格式转换”。
  
* Document.createElement(name) 和 createElementNS(ns, name) 
  如果实际类型是HTMLDocument，创建的元素的隐含命名空间是xhtml。
  如果文档是主文档（即window.document），则 createElement 创建元素的命名空间与根节点相同，这保证了在xhtml中使用js的兼容性。
  但如果不是主文档，而文档是有命名空间的 xml 文档（包括xhtml），则一定要用 Document.createElementNS(ns, name) 来创建子元素，并正确给出命名空间，否则子元素会变成默认命名空间的。
  参见 javascript_note_document_creation_parsing_serialization.txt。
  
* DOMImplementation、DOMParser 和 XMLSerializer
  这些都可用于h5或x5，主要差别是设置合理的MIME和命名空间，详见：javascript_note_document_creation_parsing_serialization.txt
  
* 格式转换
  在浏览器中将 h5 和 x5 文档或片段相互转换的方法是使用 Document.importNode/adoptNode 方法，详见：javascript_note_document_creation_parsing_serialization.txt