---
title: "Jsxgraphboard"
pubDate: 2020-04-29
tags: []
---

﻿---
title: jxggraphBoard
date: 2016-05-19 23:16:44
tags: [JXGGraph,Board]
---
# JXG.Board
  JXG提供的一个画板
  Defined in board.js
  * Class:JXG.Board
  * 说明：
    通常情况我们不会直接使用这个构造器
    因此提供了一个便捷的方式来构造一个画板,因此主要采用下面的方式来构造一个JXG画板
  JXG.JSXGraph.initBoard()
## JXG.JSXGraph.initBoard
  一个单例的画板构造器
  Definde in jsxgraph.js
  * Class:JXG.JSXGraph
  * Field:
    static JXG.JSXGraph.renderType 用于存储画板的渲染器
  * method：
    - JXG.JSXGraph.freeBoard(board) 
      删除一个画板内的所有内容，board为Dom元素ID
    - JXG.JSXGraph.initBoard(box,attribute)
      初始化一个画板 box为装board的一个容器的id，attribute是一个对象参数（好像不用区分大小写，需验证）
    - JXG.JSXGraph.loadBoardFromFile(box,file,format,attributes,callback)
      从一个文件（GEONExT，Intergeo，Geogebra，Cinderella）加载一个画板
    - JXG.JSXGraph.loadBoardFromString(box,string,format,attributes,callback)
      从一个base64编码的字符串加载一个画板 参数同loadBoardFromFile
    - JXG.JSXGraph.registerElement(element,creator)
      采用JXG.registerElement
  * attributes
    - box dom元素的id
    - attributes是一个可选对象 Defined in option.js 
      - boundingbox 一个4个数字的数组，用于描述画板的可用坐标的范围。default:[-5,5,5,-5] -- [x1,y1,x2,y2]，可用理解为x轴与y轴的范围
      - keepaspectratio 一个布尔值 是否保持等比，default：true，建议不用改，因为如果是想画一个圆而不是一个椭圆 
      - showCopyright   一个布尔值 用于显示jsx版权 左上角  default：true
      - showNavigation  一个布尔值 显示菜单按钮    右下角  default：true
      - maxNameLenght  一个数值    自动标签生成中的最大数字数。例如，如果设置为1个自动点标签结束在“Z”。如果设置为2，点标签结束在“ZZ”
      - name           一个字符串svg all none   svg表示在每一个重绘的svg子树dom都来这dom，all表示完整dom来自dom，none表示在原始位置，
        svg 或 all会加速渲染过程，风险就是不知道异常仅仅只有一个白色div or window在左边 default:'svg'
      - offsetX        一个数值 将被添加到鼠标坐标计算中使用的板的绝对位置的数字  default:0
      - offsetY        一个数值 将被添加到鼠标坐标计算中使用的板的绝对位置的数字  default:0
      - zoom           一个对象 支持鼠标滑轮，2个手指缩放  
          zoom: {
                    factorX: 1.25,  // horizontal zoom factor (multiplied to JXG.Board#zoomX)
                    factorY: 1.25,  // vertical zoom factor (multiplied to JXG.Board#zoomY)
                    wheel: false,     // allow zooming by mouse wheel or
                        // by pinch-to-toom gesture on touch devices
                    eedshift: false, // mouse wheel zooming needs pressing of the shift key
                    min: 0.001        // minimal values of JXG.Board#zoomX and JXG.Board#zoomY, limits zoomOut
                    max: 1000.0       // maximal values of JXG.Board#zoomX and JXG.Board#zoomY, limits zoomIn
                }
      - pan             一个对象 允许shift+鼠标或2个手指pan手势  
          pan: {
                enabled: true   // Allow panning
                needTwoFingers: true, // panning is done with two fingers on touch devices
                needshift: true, // mouse panning needs pressing of the shift key
          }               
      - axis            一个布尔值 是否显示坐标轴 
      - grid            一个布尔值 是否显示网格
      - registerEvent   一个布尔值 允许用户注册鼠标或触碰事件  default：true
      - showClearTraces 一个布尔值 是否显示清除按钮 功能：清除在画板种得所有痕迹 default：false
      - showReload      一个布尔值 是否显示强制重载按钮 default：true
      - takeFirst       一个布尔值 把设置了JXG.Boardobject hasPoint==true的元素作为拖拽元素
      - zoomFactor      一个数值内心额外的缩放因数