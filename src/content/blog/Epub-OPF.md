---
title: "Epub OPF"
pubDate: 2016-05-19

tags:
  - Epub
  - OPF
---
EPub OPF

*** 规范
http://www.idpf.org/epub3/latest/packages

*** 说明
** OPF文件包括的部分
  元数据 metadata
  文件清单 manifest
  书脊 spine：一个顶层的内容内容文件的序列，定义了阅读顺序
  以上子元素必须按如上顺序排列。
  
  Fallback chains — an optional means for Publications to define an ordered list of top-level resources that can be considered content equivalents that a Reading System can choose between for rendering.
  
** metadata
最小示例：

<package … unique-identifier="pub-id">
    …
    <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
        <dc:identifier id="pub-id">urn:uuid:A1B0D67E-2E81-4DF5-9E67-A64CBE366809</dc:identifier>
        <dc:title>Norwegian Wood</dc:title>
        <dc:language>en</dc:language>
        <meta property="dcterms:modified">2011-01-01T12:00:00Z</meta>
    </metadata>
    …
</package>

** manifest
  manifest包含多个item子元素。
  manifest必须是本epub所使用的资源的完整清单。【不过，如果epub使用一些web服务，或者内嵌远程页面，则这要求难以满足】
  
* item
  Attributes

    id [required]

        The ID [XML] of this element, which must be unique within the document scope.
        必须是 XML Name，也就是说必须以字母或下划线开头，只能包含字母、下划线、数字和'-'。这与(x)html的id不同，后者可以是包含除空白外的任意字符。
        
    href [required]

        An IRI [RFC3987] specifying the location of the Publication Resource described by this item. 
    media-type [required]

        A media type [RFC2046] that specifies the type and format of the Publication Resource described by this item. 
    fallback [conditionally required]

        An IDREF [XML] that identifies the fallback for a non-Core Media Type.

        Refer to Manifest Fallbacks for more information.
    properties [optional]

        A space-separated list of property values.

        Refer to Manifest item Properties for a set of properties defined by this specification.
    media-overlay [optional]

        An IDREF [XML] that identifies the Media Overlay Document for the resource described by this item.

        Refer to Packaging [MediaOverlays30] for more information.
  
  href 可以是相对或绝对的，如果是相对的，则是相对于本OPF的。href也可以引用远程资源。item引用的资源不能重复，也就是说，任意两个href解析为绝对IRI后不能相同。
  epub 2(http://www.idpf.org/epub/20/spec/OPF_2.0.1_draft.htm) 规定此IRI不能含有片段（fragment identifiers），但是epub 3 没有明确要求。
  
  media-type 属性的可选值在：http://tools.ietf.org/html/rfc2046
  主要有：application/xhtml+xml，image/svg+xml，text/css，text/html，image/jpeg，application/mathml+xml，application/xml等
  
  properties 可用于指定该资源的性质、用途。这是个空白分割的列表。可选值在：http://www.idpf.org/epub/30/spec/epub30-publications.html#sec-item-property-values
  主要包括：
    cover-image：该文件是封面图，0-1个。可以是向量图或点阵图。
    mathml：该文件包含一些mathml标签。
    nav：该文件是导航文档，有且只有1个。
    remote-resources: 该文件引用了远程资源。远程的意思是“在本epub之外”。
    scripted：该文件使用了脚本或者HTML表单。
    svg：该文件包含一些svg标签。
    switch：该文件包含一些epub:switch标签。
    
    注意：当上述条件满足时，则必须设置相应的属性；如果不满足，则不得设置相应属性。不过，这个规则并不递归到该文件引用的文件，例如通过iframe引用的文件。
    
** spine

  Usage

    Required third child of package, following manifest.
Attributes

    id [optional]

        The ID [XML] of this element, which must be unique within the document scope.
    toc [optional]

        An IDREF [XML] that identifies the manifest item that represents the superseded NCX.

        Refer to NCX Superseded for more information.
    page-progression-direction [optional]

        The global direction in which the Publication content flows.

        Allowed values are ltr (left-to-right), rtl (right-to-left) and default.

        When the default value is specified, the Author is expressing no preference and the Reading System may chose the rendering direction. This value must be assumed when the attribute is not specified.

Content Model

    Multiple itemref elements [required]
    
Element Name

    itemref
Usage

    As a child of spine. Repeatable.
Attributes

    idref [required]

        An IDREF [XML] that identifies a manifest item. 
    linear [optional]

        Specifies whether the referenced content is primary.

        The value of the attribute must be yes or no. The default value is yes.
    id [optional]

        The ID [XML] of this element, which must be unique within the document scope.
    properties [optional]

        A space-separated list of property values.

        Refer to Spine itemref Properties for a set of properties defined by this specification.

Content Model

    Empty

Each itemref element must reference an item in the manifest via its idref attribute.

Each referenced manifest item must be either a) an EPUB Content Document or b) a