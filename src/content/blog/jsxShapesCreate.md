---
title: "Jsxshapescreate"
pubDate: 2020-04-29
tags: []
---

﻿---
title: jsxShapeCreate
date: 2016-09-28 12:21:20
tags: [jxggraph,shape]
---
<!-- more -->
# 形状create constructor JSXGraph元素篇 
## Angle 角度  JXG.GeometryElement -> JXG.Curve -> Sector -> angle
  Defined in  sector.js
  Extends Sector
  JXG.Board#create  type:angle

  * param array
  p1----JXG.Point
  p2----JXG.Point
  p3----JXG.Point
  以p2为角点 p1到p3的角度 逆时针

  * example
  ```javascript
    // Create an angle out of three free points 创建一个三个自由点的角度
    var p1 = board.create('point', [5.0, 3.0]),
    p2 = board.create('point', [1.0, 0.5]),
    p3 = board.create('point', [1.5, 5.0]),
    a = board.create('angle', [p1, p2, p3]);
  ```
  这是创建一个角度的代码
  A/B/C三点 A/C为控制角大小的点 B为实际的角度点

  ```javascript
    // Create an angle out of three free points 从两条线和两个方向创建一个角度
    var p1 = board.create('point', [-1, 4]),
    p2 = board.create('point', [4, 1]),
    q1 = board.create('point', [-2, -3]),
    q2 = board.create('point', [4,3]),
    li1 = board.create('line', [p1,p2], {strokeColor:'black', lastArrow:true}),
    li2 = board.create('line', [q1,q2], {lastArrow:true}),
    a1 = board.create('angle', [li1, li2, [5.5, 0], [4, 3]], { radius:1 }),
    a2 = board.create('angle', [li1, li2, 1, -1], { radius:2 });
  ```
  这是两条直线与点的夹角

  ```javascript
    var p1, p2, p3, c, a, s;

    p1 = board.create('point',[0,0]);
    p2 = board.create('point',[5,0]);
    p3 = board.create('point',[0,5]);

    c1 = board.create('circle',[p1, p2]);

    a = board.create('angle',[p2, p1, p3], {radius:3});

    a.setAngle(function() {
        return Math.PI / 3;
    });
    board.update();
  ```

  ```javascript
    var p1, p2, p3, c, a, s;

    p1 = board.create('point',[0,0]);
    p2 = board.create('point',[5,0]);
    p3 = board.create('point',[0,5]);

    c1 = board.create('circle',[p1, p2]);

    a = board.create('angle',[p2, p1, p3], {radius:3});
    s = board.create('slider',[[-2,1], [2,1], [0, Math.PI*0.5, 2*Math.PI]]);

    a.setAngle(function() {
        return s.Value();
    });
    board.update();
  ```

  * Attributes：
    - orthoSensitivity  
    default:1.0
    - orthoType         
    option value:sector/sectordot/square/none   default:square
    - radius
    扇形半径 default:0.5
    - type
    default:'sector'
    - 其他
    借用其他元素的属性：Sector、JXG.Curve、JXG.GeometryElement

  * Fields
    - dot
    预测一个直角
    - point
    - pointsquare

  * Methods
    - free()  
    释放一个由setAngle设置的角，转换为一个自由点
    return （a object which） pointer to the angle element 返回一个指向这个角的对象
    - setAngle(val)
    设定一个角度以弧度为规定值。如果角的第三点，这是唯一可能的，即anglepoint是一个自由的点。
  * Events
  借用其他元素的事件：JXG.GeometryElement

## Arc 弧 JXG.GeometryElement -> JXG.Curve -> Curve -> Arc
  Defined in arc.js
  Extends Curve
  
  * param array
  p1----JXG.Point
  p2----JXG.Point
  p3----JXG.Point
  以p1位弧心 从p2到p3的弧度 逆时针

  * example
  ```javascript
    // Create an arc out of three free points
    var p1 = board.create('point', [2.0, 2.0]);
    var p2 = board.create('point', [1.0, 0.5]);
    var p3 = board.create('point', [3.5, 1.0]);

    var a = board.create('arc', [p1, p2, p3]);
  ```
  p1为弧度的中心点 p2到p3逆时针旋转  
  * Attributes
  借用其他元素的属性：Curve
  * Fields
    - anglepoint  
    这个点定义弧的度
    - center
    弧的中心点
    - radiuspoint
    这个点定义弧的半径
    - 其他
    借用其他元素的属性：JXG.Curve、JXG.GeometryElement

  * Methods
    - getRadius()
    获取半径
    - hasPointSector(x,y)
    检查x，y这个点是否在定义的弧扇形内 x，y为屏幕坐标系
    - Radius()
    确定弧的当前半径
    - value
    返回 弧长 
    - 其他
    借用其他元素的方法：JXG.Curve、JXG.GeometryElement
  * 事件
  借用其他元素的事件：JXG.GeometryElement

## Arraw 箭头 JXG.JXG.GeometryElement -> JXG.Line -> Arraw
  Defined in line.js
  Extends JXG.line
 
  * param array
  point1---JXG.Point|array
  point2---JXG.Point|array
  或者
  a--------number 
  b--------number
  c--------number
  a*x + b*y + c*z = 0 

  * example
  ```javascript
    // Create an arrow providing two points.
    var p1 = board.create('point', [4.5, 2.0]);
    var p2 = board.create('point', [1.0, 1.0]);
    var l1 = board.create('arrow', [p1, p2]);
  ```
  两点确定一条有方向的线  JXG.GeometryElement -> JXG.line -> Line -> parallel -> Arrowparallel
  * Attributes：
  借用其他元素的属性：JXG.GeometryElement
  * Fields
  借用其他元素的字段：JXG.Line
  * Methods
  借用其他元素的方法：JXG.Line、JXG.GeometryElement 
  * Events
  借用其他元素的事件：JXG.GeometryElement 

## Arrowparallel 平行箭头 JXG.GeometryElement -> JXG.Line -> Line -> Parallel -> Arrowparallel
  Defined in composition.js
  Extends Parallel
  这个元素没有构造器，需要通过 JXG.Board#create -> type:'Arrowparallel'创建
  
  * param array
  l----JXG.Line
  p----JXG.Point

  所构建的箭包含P和具有相同的斜率为l

  * example
  ```javascript
    // Create a parallel
    var p1 = board.create('point', [0.0, 2.0]);
    var p2 = board.create('point', [2.0, 1.0]);
    var l1 = board.create('line', [p1, p2]);

    var p3 = board.create('point', [3.0, 3.0]);
    var pl1 = board.create('arrowparallel', [l1, p3]);
  ```
  * Attributes：
  借用其他元素的属性：Parallel、Line、JXG.GeometryElement
  * Fields
  借用其他元素的字段：JXG.Line、JXG.GeometryElement
  * Methods
  借用其他元素的方法：JXG.Line、JXG.GeometryElement
  * Events
  借用其他元素的事件：JXG.GeometryElement 

## Axis 轴 JXG.GeometryElement -> JXG.Line -> Axis
  Defined in line.js
  Extends JXG.Line
  通过JXG.Board#Create type：'axis' 
  
  * param array
  point1----JXG.Line|array
  point2----JXG.Line|array
  或者
  a----number
  b----number 
  c----number
  a*x+b*y+c*c=0

  * example
  ```javascript
    // Create an axis providing two coord pairs.
    var l1 = board.create('axis', [[0.0, 1.0], [1.0, 1.3]]);
  ```

  * Attributes
    - label
    轴的标签
    - point1
    轴的第一个点
    - point2
    轴的第二个点
    - ticks
    轴的记号
    - 其他
    借用其他元素的属性：JXG.GeometryElement
  * Fields
    - defaultTicks
    附在轴上的记号
    - 其他
    借用其他元素的字段：JXG.Line
  * Methods
  借用其他元素的方法：JXG.Line
  * Events
  借用其他元素的事件：JXG.GeometryElement

## Bisector 二等分物（数 二等分线） JXG.GeometryElement -> JXG.Line -> Bisector
  Defined in composition.js
  Extends JXG.Line
  这个元素没有构造函数 通过JXG.Board#create type：'bisector'创建

  * example
  ```javascript
    var p1 = board.create('point', [6.0, 4.0]);
    var p2 = board.create('point', [3.0, 2.0]);
    var p3 = board.create('point', [1.0, 7.0]);

    var bi1 = board.create('bisector', [p1, p2, p3]);
  ```

  * Attributes
    - point 
    平分线的辅助点
    - 其他
    借用其他元素的属性：JXG.GeometryElement
  * Fields
  借用其他元素的属性：JXG.Line
  * Methods
  借用其他元素的属性：JXG.Line、JXG.GeometryElement
  * Events
  借用其他元素的事件：JXG.GeometryElement

## Bisectorlines 等分线 JXG.Composition -> Bisector
  Defined in composition.js
  Extends JXG.Composition

  * param array
  l1----JXG.line
  l2----JXG.line
  throws: 如果不能由踢狗对象（两条线）构造会抛出一个异常

  * example
  ```javascript
    var p1 = board.create('point', [6.0, 4.0]);
    var p2 = board.create('point', [3.0, 2.0]);
    var p3 = board.create('point', [1.0, 7.0]);
    var p4 = board.create('point', [3.0, 0.0]);
    var l1 = board.create('line', [p1, p2]);
    var l2 = board.create('line', [p3, p4]);

    var bi1 = board.create('bisectorlines', [l1, l2]);
  ```

  * Attributes
    - line1
    第一条线
    - line2
    第二条线
    - 其他
    借用其他元素的属性：JXG.Composition 
  * Fields
  * Methods
  * Events
    借用其他元素：JXG.Composition

## button 按钮 JXG.GeometryElement,JXG.CoordsElement -> JXG.Text -> Text -> Button
  Defined button.js
  Extends Text    
  无直接构造器 需要通过JXG.Board#create type:'button'创建

  * param array
     x--------number | function
     y--------number | function
     label----label
     handle---function
     ps:
     X和Y是文本框的左下角的坐标。文本的位置是固定的，
     X和Y是数字。如果X或Y是函数，则该位置是可变的。
     label 按钮里的内容 string
     handler optional 按钮按下的时候回调

  * example
  ```javascript
    var p = board.create('point', [0.5, 0.5], {id: 'p1'});

    // Create a button element at position [1,2].
    var button1 = board.create('button', [1, 2, 'Change Y with JavaScript', function() {
        p.moveTo([p.X(), p.Y() + 0.5], 100);
    }], {});

    // Create a button element at position [1,4].
    var button2 = board.create('button', [1, 4, 'Change Y with JessieCode',
        "$('p1').Y = $('p1').Y() - 0.5;"
    ], {});
  ```
  * Attributes
    - disabled 
    HTML Button 'disabled'  default:false
    - 其他
    借用其他元素的属性：JXG.Text、JXG.GeometryElement、JXG.CoordsElement
  * Fields
  借用其他元素的字段：JXG.GeometryElement
  * Methods
  借用其他元素的方法：JXG.Text、JXG.Text、JXG.CoordsElement
  * Events
  借用其他元素的事件：JXG.GeometryElement

## Checkbox 多选框 JXG.GeometryElement,JXG.CoordsElement -> JXG.Text -> Text -> Checkbox
  Defined in checkbox.js
  Extends Text
  通过JXG.Board#create type:'checkbox'创建

  * param
  x---------文本的左下角 x y 若为函数则位置可变  
  y---------文本的左下角
  label-----文本显示
  
  * example
  ```javascript
  // Create a checkbox element at position [0,3].
  var checkbox = board.create('checkbox', [0, 3, 'Change Y'], {});
  var p = board.create('point', [
      function(){ return 0.5;}, // X-coordinate
      function() {
          y = 0.5;
          if (checkbox.Value()) {
              y += 0.5;
          }
          return y;
      }]);
  ```

  ```javascript
  var checkbox = board.create('checkbox', [0, 4, 'Click me']),
             p = board.create('point', [1, 1]);

  JXG.addEvent(checkbox.rendNodeCheckbox, 'change', function() {
      if (this.Value()) {
          p.moveTo([4, 1]);
      } else {
          p.moveTo([1, 1]);
      }
  }, checkbox);
  ```

  * Attributes
    - disabled 
    HTML Button 'disabled'  default:false
    - 其他
    借用其他元素的属性：JXG.Text、JXG.GeometryElement、JXG.CoordsElement
  * Fields
  借用其他元素的字段：JXG.GeometryElement、JXG.CoordsElement
  * Methods
  借用其他元素的方法：JXG.Text、JXG.Text、JXG.CoordsElement
  * Events
  借用其他元素的事件：JXG.GeometryElement

## Circle 圆   JXG.GeometryElement -> JXG.circle -> Circle 
    Defined in circle.js
    Extends JXG.circle
    JXG.Board#create type:'circle'

    * param
    center----JXG.Point 圆心
    radius----number|JXG.Point|JXG.Line|JXG.Circle 半径：可为点或线或圆

    * example
    ```javascript
    // Create a circle providing two points
    var p1 = board.create('point', [2.0, 2.0]),
        p2 = board.create('point', [2.0, 0.0]),
        c1 = board.create('circle', [p1, p2]);

    // Create another circle using the above circle
    var p3 = board.create('point', [3.0, 2.0]),
        c2 = board.create('circle', [p3, c1]);
    ```

    ```javascript
    // Create a circle providing two points
    var p1 = board.create('point', [2.0, 2.0]),
        c1 = board.create('circle', [p1, 3]);

    // Create another circle using the above circle
    var c2 = board.create('circle', [function() { return [p1.X(), p1.Y() + 1];}, function() { return c1.Radius(); }]);
    ```

    * Attributes
      - center
      中心点
      - hasInnerPoints
      如果为true 鼠标移动到点内会触发hasPoint
      - label
      圆心的标签
      - point
      中心点 与center 有什么不同？
      - 其他
      借用其他元素的属性：JXG.GeometryElement
    * Fields
    借用其他元素的字段：JXG.Circle
    * Methods
    借用其他元素的方法：JXG.Circle、JXG.GeometryElement
    * Events
    借用其他元素的事件：JXG.GeometryElement

## Circumcenter 外心（数学三角形中垂线交点） JXG.GeometryElement,JXG.CoordsElement -> JXG.Point -> Circumcenter
  Defined in composition.js
  Extends JXG.point
  JXG.Board#create type:'circumcenter'
  * param
  p1----JXG.Point 
  p2----JXG.Point    
  p3----JXG.Point
  * example
  ```javascript
  var p1 = board.create('point', [0.0, 2.0]);
  var p2 = board.create('point', [2.0, 1.0]);
  var p3 = board.create('point', [3.0, 3.0]);

  var cc1 = board.create('circumcenter', [p1, p2, p3]);
  ```
  
  * Attributes
  借用其他元素的属性：JXG.GeometryElement
  * Fields
  借用其他元素的字段：JXG.GeometryElement
  * Methods
  借用其他元素的方法：JXG.point、JXG.GeometryElement、JXG.CoordsElement
  * Events
  借用其他元素的事件：JXG.GeometryElement

## Circumcircle 外接圆 JXG.GeometryElement -> JXG.Circle -> circumcircle
  Defined in composition.js
  Extends JXG.Circle
  * param
  p1----JXG.Point  圆上的三点
  p2----JXG.Point    
  p3----JXG.Point
  * example
  ```javascript
  var p1 = board.create('point', [0.0, 2.0]);
  var p2 = board.create('point', [2.0, 1.0]);
  var p3 = board.create('point', [3.0, 3.0]);

  var cc1 = board.create('circumcircle', [p1, p2, p3]);
  ```
  
  * Attributes
    - center 
    圆心
    -其他
    借用其他元素的属性：JXG.GeometryElement
  * Fields
  借用其他元素的字段：JXG.Circle、JXG.GeometryElement
  * Methods
  借用其他元素的方法：JXG.Circle、JXG.GeometryElement
  * Events
  借用其他元素的事件：JXG.GeometryElement

## CircumcircleArc 外接圆弧 JXG.GeometryElement -> JXG.Curve -> Curve -> Arc -> circumcircleArc
  Defined in arc.js
  Extends Arc
  JXG.Board#create type:'circumcirclearc' 

  * param
  p1----JXG.Point  圆上的三点
  p2----JXG.Point    
  p3----JXG.Point

  * example
  ```javascript
  var p1 = board.create('point', [0.0, 2.0]);
  var p2 = board.create('point', [2.0, 1.0]);
  var p3 = board.create('point', [3.0, 3.0]);

  var cc1 = board.create('circumcircle', [p1, p2, p3]);
  ```
  弧从p1->p2->p3

  * Attributes
    - center 
    圆心
    - 其他
    借用其他元素的属性：JXG.GeometryElement
  * Fields
  借用其他元素的字段：JXG.Circle、JXG.GeometryElement
  * Methods
  借用其他元素的方法：JXG.Arc、JXG.Curve、JXG.GeometryElement
  * Events
  借用其他元素的事件：JXG.GeometryElement  

## Conic 圆锥曲线  JXG.GeometryElement -> JXG.Curve -> Conic
  Defined in conic.js
  Extends JXG.Curve
  JXG.Borad#create type:'conic'

  * param
  a----JXG.Point|array
  b----JXG.Point|array
  c----JXG.Point|array
  d----JXG.Point|array 
  e----JXG.Point|array 
  或者
  a00----number
  a11----number
  a22----number
  a01----number
  a12----number
  a22----number

  * example
  ```javascript
  // Create a conic section through the points A, B, C, D, and E.
  var A = board.create('point', [1,5]);
  var B = board.create('point', [1,2]);
  var C = board.create('point', [2,0]);
  var D = board.create('point', [0,0]);
  var E = board.create('point', [-1,5]);
  var conic = board.create('conic',[A,B,C,D,E]);
  ```
  * Attributes
    - foci
    ??? 焦点
    - 其他
    借用其他元素的属性：JXG.GeometryElement
  * Fields
  借用其他元素的字段：JXG.Curve、JXG.GeometryElement
  * Methods
  借用其他元素的方法：JXG.Curve、JXG.GeometryElement
  * Events
  借用其他元素的事件：JXG.GeometryElement  

## Curve 曲线 JXG.GeometryElement -> JXG.Curve -> Curve
  Defined in Curve.js
  Extends JXG.Curve
  JXG.Board#create type:'curve'
  * param
  Parametric Curve 参数曲线
  x----function|number
  y----function|number
  a----function|number optional 
  b----function|number optional 
  或
  Data plots 数据图
  x----array
  y----array|function|number
  或
  Polar Curve  极坐标曲线 
  r--------function
  offset---function|array|number
  a--------function|number default:-10
  b--------function|number default:10 


  * example
  ```javascript
  // Parametric curve
  // Create a curve of the form (t-sin(t), 1-cos(t), i.e.
  // the cycloid curve.
  var graph = board.create('curve',
                       [function(t){ return t-Math.sin(t);},
                        function(t){ return 1-Math.cos(t);},
                        0, 2*Math.PI]
                    );
  ```

  ```javascript
  // Data plots
  // Connect a set of points given by coordinates with dashed line segments.
  // The x- and y-coordinates of the points are given in two separate
  // arrays.
  var x = [0,1,2,3,4,5,6,7,8,9];
  var y = [9.2,1.3,7.2,-1.2,4.0,5.3,0.2,6.5,1.1,0.0];
  var graph = board.create('curve', [x,y], {dash:2});
  ```

  ```javascript
  // Polar plot
  // Create a curve with the equation r(phi)= a*(1+phi), i.e.
  // a cardioid.
  var a = board.create('slider',[[0,2],[2,2],[0,1,2]]);
  var graph = board.create('curve',
                       [function(phi){ return a.Value()*(1-Math.cos(phi));},
                        [1,0],
                        0, 2*Math.PI]
                    );
  ```
  
  ```javascript
  // Draggable Bezier curve
  var col, p, c;
  col = 'blue';
  p = [];
  p.push(board.create('point',[-2, -1 ], {size: 5, strokeColor:col, fillColor:col}));
  p.push(board.create('point',[1, 2.5 ], {size: 5, strokeColor:col, fillColor:col}));
  p.push(board.create('point',[-1, -2.5 ], {size: 5, strokeColor:col, fillColor:col}));
  p.push(board.create('point',[2, -2], {size: 5, strokeColor:col, fillColor:col}));

  c = board.create('curve', JXG.Math.Numerics.bezier(p),
              {strokeColor:'red', name:"curve", strokeWidth:5, fixed: false}); // Draggable curve
  c.addParents(p);
  ```
  * Attributes
    - curveType
    在JXG.Curve#generateTerm中设置，在JXG.Curve#updateCurve中使用值：string
      - none
      - plot:Data plot
      - parameter:无法区分是功能函数还是参数曲线
      - functiongraph：图形函数
      - polar：极线
      - implicit：(not yet)
    只有parameter和plot 可以直接设置，Polar只能通过JXG.GeometryElement#setAttribute
    - doAdvancedPlot
    如果为true，使用二分递归法 default:true
    - doAdvancedPlotOld
    如果为true，使用Gillam and Hohenwarter算法 default：false
    - handDrawing
    曲线的数据点相连不是用直线而是Bezier曲线 default:false
    - numberPointsHigh
    用于通过up events绘制曲线触发以防Curve#doAdvancedPlot为false default：1600
    - numberPointsLow
    用于通过move events绘制曲线触发以防Curve#doAdvancedPlot为false default：400
    - RDPsmoothing
    采用Ramer Douglas Peuker平滑 default:false
    - 其他
    借用其他元素的属性：JXG.GeometryElement
  * Fields
  借用其他元素的字段：JXG.Curve、JXG.GeometryElement
  * Methods
  JXG.Curve、JXG.GeometryElement
  * Events
  借用其他元素的事件：JXG.GeometryElement

## Ellipse 椭圆  JXG.GeometryElement -> JXG.Curve -> Conic -> Ellipse
  Defined in conic.js
  Extends Conic
  JXG.Board#create type:'ellipse'
  * param
  point1----JXG.Point|array
  point2----JXG.Point|array
  point3----JXG.Point|array
  或者
  point1----JXG.Point|array
  point2----JXG.Point|array
  number----function |number 主轴的长度  可以参数第四和第五定义曲线长度默认值是-PI到PI
  
  * example
  ```javascript
    // Create an Ellipse by three points
    var A = board.create('point', [-1,4]);
    var B = board.create('point', [-1,-4]);
    var C = board.create('point', [1,1]);
    var el = board.create('ellipse',[A,B,C]);  
  ```
  A B为椭圆焦点 C为椭圆上一点
  
  * Attributes
  借用其他元素的属性：JXG.GeometryElement
  * Fields
  借用其他元素的字段：JXG.Curve
  * Methods
  借用其他元素的方法：JXG.Curve、JXG.GeometryElement
  * Events
  借用其他元素的事件：JXG.GeometryElement

## Functiongraph 图形函数
## Glider （滑翔机）点 JXG.GeometryElement,JXG.CoordsElement -> JXG.Point -> Glider
  Defined in point.js
  Extends JXG.Point
  JXG.Board#Create type:'glider'
  
  * param
  z--------------number optional
  x--------------number optional
  y--------------number optional
  GliderObject---JXG.GeometryElement
  
  * example
  ```JavaScript
  // Create a glider with user defined coordinates. If the coordinates are not on
  // the circle (like in this case) the point will be projected onto the circle.
  var p1 = board.create('point', [2.0, 2.0]);
  var c1 = board.create('circle', [p1, 2.0]);
  var p2 = board.create('glider', [2.0, 1.5, c1]);
  ```

  ```JavaScript
  // Create a glider with default coordinates (1,0,0). Same premises as above.
  var p1 = board.create('point', [2.0, 2.0]);
  var c1 = board.create('circle', [p1, 2.0]);
  var p2 = board.create('glider', [c1]);
  ```

  * Attributes 
  借用其他元素的属性：JXG.GeometryElement
  * Fields
    - sliderObject
    通过 JXG.Point#makeGlider 设置
    - 其他
    借用其他元素的字段：JXG.GeometryElement、JXG.CoordsElement
  * Methods
    - startAnimation(direction,stepCount)
    animate the point
    direction is animated +1 or -1----number
    stepCount steps               ----number
    - stopAnimation()
    Stop animation
    - 其他
    借用其他元素的方法：JXG.Point、JXG.GeometryElement、JXG.CoordsElement
  * Events
  借用其他元素的方法：JXG.GeometryElement
## Grid 网格 JXG.GeometryElement -> JXG.Curve -> Grid
  Defined in composition.js
  Extends JXG.Curve
  JXG.Board#Create type:'grid'
  
  ```javascript
  grid = board.create('gird',[])
  ```

## Group svg g元素 JXG.Group -> Group
  Defined in composition.js
  Extends JXG.Curve
  JXG.Board#create type:'group'
  
  * param
  board--------JXG.Board 在board上的点
  parents------array     点的组合
  Attributes---object    视觉特性（未使用的）
  
  * example
  ```javascript
  // Create some free points. e.g. A, B, C, D
  // Create a group

  var p, col, g;
  col = 'blue';
  p = [];
  p.push(board.create('point',[-2, -1 ], {size: 5, strokeColor:col, fillColor:col}));
  p.push(board.create('point',[2, -1 ], {size: 5, strokeColor:col, fillColor:col}));
  p.push(board.create('point',[2, 1 ], {size: 5, strokeColor:col, fillColor:col}));
  p.push(board.create('point',[-2, 1], {size: 5, strokeColor:col, fillColor:col}));
  g = board.create('group', p);
  ``` 

  ```javascript
  // Create some free points. e.g. A, B, C, D
  // Create a group
  // If the points define a polygon and the polygon has the attribute hasInnerPoints:true,
  // the polygon can be dragged around.
  // hasInnerPoints 鼠标移上去 haspoint==true 表示可以拖动这个元素
  var p, col, pol, g;
  col = 'blue';
  p = [];
  p.push(board.create('point',[-2, -1 ], {size: 5, strokeColor:col, fillColor:col}));
  p.push(board.create('point',[2, -1 ], {size: 5, strokeColor:col, fillColor:col}));
  p.push(board.create('point',[2, 1 ], {size: 5, strokeColor:col, fillColor:col}));
  p.push(board.create('point',[-2, 1], {size: 5, strokeColor:col, fillColor:col}));

  pol = board.create('polygon', p, {hasInnerPoints: true});
  g = board.create('group', p);
  ``` 

  ```javascript
  // Allow rotations:
  // Define a center of rotation and declare points of the group as "rotation points".

  var p, col, pol, g;
  col = 'blue';
  p = [];
  p.push(board.create('point',[-2, -1 ], {size: 5, strokeColor:col, fillColor:col}));
  p.push(board.create('point',[2, -1 ], {size: 5, strokeColor:'red', fillColor:'red'}));
  p.push(board.create('point',[2, 1 ], {size: 5, strokeColor:'red', fillColor:'red'}));
  p.push(board.create('point',[-2, 1], {size: 5, strokeColor:col, fillColor:col}));

  pol = board.create('polygon', p, {hasInnerPoints: true});
  g = board.create('group', p);
  g.setRotationCenter(p[0]);
  g.setRotationPoints([p[1], p[2]]);
  ```

  ```javascript
  // Allow rotations:
  // As rotation center, arbitrary points, coordinate arrays,
  // or functions returning coordinate arrays can be given.
  // Another possibility is to use the predefined string 'centroid'.

  // The methods to define the rotation points can be chained.

  var p, col, pol, g;
  col = 'blue';
  p = [];
  p.push(board.create('point',[-2, -1 ], {size: 5, strokeColor:col, fillColor:col}));
  p.push(board.create('point',[2, -1 ], {size: 5, strokeColor:'red', fillColor:'red'}));
  p.push(board.create('point',[2, 1 ], {size: 5, strokeColor:'red', fillColor:'red'}));
  p.push(board.create('point',[-2, 1], {size: 5, strokeColor:col, fillColor:col}));

  pol = board.create('polygon', p, {hasInnerPoints: true});
  g = board.create('group', p).setRotationCenter('centroid').setRotationPoints([p[1], p[2]]);
  ```
  
  ```javascript
  // Allow scaling:
  // As for rotation one can declare points of the group to trigger a scaling operation.
  // For this, one has to define a scaleCenter, in analogy to rotations.

  // Here, the yellow  point enables scaling, the red point a rotation.

  var p, col, pol, g;
  col = 'blue';
  p = [];
  p.push(board.create('point',[-2, -1 ], {size: 5, strokeColor:col, fillColor:col}));
  p.push(board.create('point',[2, -1 ], {size: 5, strokeColor:'yellow', fillColor:'yellow'}));
  p.push(board.create('point',[2, 1 ], {size: 5, strokeColor:'red', fillColor:'red'}));
  p.push(board.create('point',[-2, 1], {size: 5, strokeColor:col, fillColor:col}));

  pol = board.create('polygon', p, {hasInnerPoints: true});
  g = board.create('group', p).setRotationCenter('centroid').setRotationPoints([p[2]]);
  g.setScaleCenter(p[0]).setScalePoints(p[1]);
  ```
  
  ```javascript
  // Allow Translations:
  // By default, every point of a group triggers a translation.
  // There may be situations, when this is not wanted.

  // In this example, E triggers nothing, but itself is rotation center
  // and is translated, if other points are moved around.

  var p, q, col, pol, g;
  col = 'blue';
  p = [];
  p.push(board.create('point',[-2, -1 ], {size: 5, strokeColor:col, fillColor:col}));
  p.push(board.create('point',[2, -1 ], {size: 5, strokeColor:'yellow', fillColor:'yellow'}));
  p.push(board.create('point',[2, 1 ], {size: 5, strokeColor:'red', fillColor:'red'}));
  p.push(board.create('point',[-2, 1], {size: 5, strokeColor:col, fillColor:col}));
  q = board.create('point',[0, 0], {size: 5, strokeColor:col, fillColor:col});

  pol = board.create('polygon', p, {hasInnerPoints: true});
  g = board.create('group', p.concat(q)).setRotationCenter('centroid').setRotationPoints([p[2]]);
  g.setScaleCenter(p[0]).setScalePoints(p[1]);
  g.removeTranslationPoint(q);
  ```
  
  * Attributes
  * Fields
  * Methods
  借用其他元素：JXG.Group

## Hatch 
## Hyperbola 双曲线 JXG.GeometryElement -> JXG.Curve -> Conic -> Hyperbola
  Define in conic.js
  Extends Conic
  JXG.Board#create type:'hypebola'
  * param
  point1----JXG.Point|array
  point2----JXG.Point|array
  point3----JXG.Point|array
  或
  point1----JXG.Point|array
  point1----JXG.Point|array
  number----function |number

  * example
  ```javascript
  // Create an Hyperbola by three points
  var A = board.create('point', [-1,4]);
  var B = board.create('point', [-1,-4]);
  var C = board.create('point', [1,1]);
  var el = board.create('hyperbola',[A,B,C]);
  ```

## Image 图片 JXG.GeometryElement -> JXG.Image -> Image
  Define in JXG.Image
  Extends JXG.Image
  JXG.Board#create type:'image'
  * param
  url----string|function
  coords-array
  size---array
  * example
  ```javascript
  var im = board.create('image', ['http://jsxgraph.uni-bayreuth.de/jsxgraph/distrib/images/uccellino.jpg', [-3,-2], [3,3]]);
  ```
  * Attributes 
    - attractor
    List of attractor elements. If the distance of the image is less than attractorDistance the image is made to glider of this element.
    default:empty
    - rotate 
    旋转角度 default:0
    - snapSizeX 
    Defines together with Image#snapSizeY the grid the image snaps on to. The image will only snap on integer multiples to snapSizeX in x and snapSizeY in y direction. If this value is equal to or less than 0, it will use the grid displayed by the major ticks of the default ticks of the default x axes of the board.  
    - snapSizeY
    - 其他
    借用其他元素的属性：JXG.GeometryElement
  * Fields
    借用其他元素的字段：JXG.GeometryElement
  * Methods
    借用其他元素的方法：JXG.Image、JXG.GeometryElement、JXG.CoordsElement
  * Events
    借用其他元素的事件：JXG.CoordsElement  

## Incenter 内心，内切圆心 JXG.GeometryElement,JXG.CoordsElement -> JXG.Point -> Incenter
  Defined in composition.js
  Extends JXG.Point
  JXG.Board#create type:'incenter'
  * param
  p1----JXG.Point
  p2----JXG.Point
  p3----JXG.Point
  
  * example
  ```javascript
  var p1 = board.create('point', [0.0, 2.0]);
  var p2 = board.create('point', [2.0, 1.0]);
  var p3 = board.create('point', [3.0, 3.0]);

  var ic1 = board.create('incenter', [p1, p2, p3]);
  ```
  * Attributes
  借用其他元素的属性：JXG.GeometryElement
  * Fields
  JXG.GeometryElement、JXG.CoordsElement
  * Methods
  JXG.Point、JXG.GeometryElement
  * Events
  JXG.GeometryElement

## Incircle 内切圆 JXG.GeometryElement -> JXG.Circle -> Incircle
  Defined in composition.js
  Extends JXG.Circle
  JXG.Board#create type:'Incircle'
   * param
  p1----JXG.Point
  p2----JXG.Point
  p3----JXG.Point
  
  * example
  ```javascript
  var p1 = board.create('point', [0.0, 2.0]);
  var p2 = board.create('point', [2.0, 1.0]);
  var p3 = board.create('point', [3.0, 3.0]);

  var ic1 = board.create('incircle', [p1, p2, p3]);
  ```

  * Attributes
  借用其他元素的属性：JXG.GeometryElement
  * Fields
  JXG.GeometryElement、JXG.Circle
  * Methods
  JXG.Circle、JXG.GeometryElement
  * Events
  JXG.GeometryElement

## Inqueually 线性不等式表示区域 JXG.GeometryElement -> JXG.Curve -> Inequality
  Defined in composition.js
  Extends JXG.Curve
  JXG.Board#create type:'inequality'
  * param
  l----JXG.Line
  * example 
  ```javascript
  var p = board.create('point', [1, 3]),
      q = board.create('point', [-2, -4]),
      l = board.create('line', [p, q]),
      ineq = board.create('inequality', [l]);
      ineq = board.create('inequality', [l]);
  ```

  ```javascript
    // Plot the inequality 
    //     y >= 2/3 x + 1 
    // or 
    //     0 >= -3y + 2x +1
    var l = board.create('line', [1, 2, -3]),
    ineq = board.create('inequality', [l], {inverse:true});
  ```
  * Attributes
    - inverse
    显示区域 默认为false 显示线的下方区

## Input input标签(提供输入) JXG.GeometryElement,JXG.CoordsElement -> JXG.Text ->Text ->Input
  Defined in input.js
  Extends Text
  JXG.Board#create type:'input'
  * param
  x----number|function
  y----number|function
  value----string
  label----string
  * example
  ```javascript
    // Create an input element at position [1,4].
    var input = board.create('input', [0, 1, 'sin(x)*x', 'f(x)='], {});
    var f = board.jc.snippet(input.Value(), true, 'x', false);
    var graph = board.create('functiongraph',[f,
         function() {
           var c = new JXG.Coords(JXG.COORDS_BY_SCREEN,[0,0],board);
           return c.usrCoords[1];
         },
         function() {
           var c = new JXG.Coords(JXG.COORDS_BY_SCREEN,[board.canvasWidth,0],board);
           return c.usrCoords[1];
         }
       ]);

    board.create('text', [1, 3, updateGraph()]);

    var updateGraph = function() {
      graph.Y = board.jc.snippet(input.Value(), true, 'x', false);
      graph.updateCurve();
      board.update();
    }  
  ```

## Integral 给定时间间隔的曲线积分 JXG.GeometryElement -> JXG.Curve -> Integral
## Intersection 交叉 JXG.GeometryElement,JXG.CoordsElement -> JXG.Point -> Intersection 
  Defined in point.js
  Extends JXG.Point
  JXG.Board#create type:'Intersection'
  * param
  el1----JXG.Line
  el2----JXG.Line
  i------number  i==0 用正的平方根 i==1 用负的平方根
  
  * example
  ```javascript
  // Create an intersection point of circle and line
  var p1 = board.create('point', [2.0, 2.0]);
  var c1 = board.create('circle', [p1, 2.0]);

  var p2 = board.create('point', [2.0, 2.0]);
  var p3 = board.create('point', [3.0, 2.0]);
  var l1 = board.create('line', [p2, p3]);

  var i = board.create('intersection', [c1, l1, 0]);
  ```

## Line 线 JXG.GeometryElement -> JXG.Line -> Line
  Defined in line.js
  Extends JXG.Line
  JXG.Borad#create type:'line'

  * param
  point1-----JXG.Point|array|function 
  point2-----JXG.Point|array|function
  or
  c----number|function
  a----number|function
  b----number|function  ax+by+c=0
  or
  f----function
  
  * example
  ```javascript
    // Create a line using point and coordinates/
    // The second point will be fixed and invisible.
    var p1 = board.create('point', [4.5, 2.0]);
    var l1 = board.create('line', [p1, [1.0, 1.0]]);
  ```

  ```javascript
    // Create a line using three coordinates
    var l1 = board.create('line', [1.0, -2.0, 3.0]);
  ```

  * Attributes
    - firstArrow
    起点箭头
    - label
    线的标签
    - lastArrow
    结束点箭头
    - point1
    线的第一个点
    - point2
    线的第二个点
    - snapSizeX
    Defines together with JXG.Point#snapSizeY the grid the point snaps on to
    线段的x JXG.Point#snapSizeX
    - snapSizeY
    Defines together with JXG.Point#snapSizeY the grid the point snaps on to
    线段的y JXG.Point#snapSizeY
    - snapToGrid
    If set to true, the point will snap to a grid defined by JXG.Point#snapSizeX and JXG.Point#snapSizeY.
    如果设置为true,通过1和2 点将捕获一个网格
    - straightFirst
    If true, line stretches infinitely in direction of its first point.
    如果设置为true 通过第一个点无限延长 射线
    - straightLast 
    与第一个点相反
    - ticks
    线的记号
    - touchFirstPoint
    If set to true and Line#firstArrow is set to true,
    the arrow head will just touch the circle line of the start point of the line.
    - touchLastPoint
    If set to true and Line#lastArrow is set to true,
    the arrow head will just touch the circle line of the start point of the line.
    - 其他
      JXG.Line
  * Fields
  JXG.Line
  JXG.GeometryElement
  * Methods
  JXG.Line、JXG.GeometryElement
  * Events
  JXG.GeometryElement

## Locus 轨迹 JXG.GeometryElement -> JXG.Curve -> Locus
## MajorArc 大弧 JXG.GeometryElement -> JXG.Curve -> Curve-> MajorArc
  Defined in arc.js
  Extends Curve
  JXG.Borad#create type:'majorarc'
  * param
  p1----JXG.Point
  p2----JXG.Point
  p3----JXG.Point
  * example
  ```javascript
    // Create an arc out of three free points
    var p1 = board.create('point', [2.0, 2.0]);
    var p2 = board.create('point', [1.0, 0.5]);
    var p3 = board.create('point', [3.5, 1.0]);

    var a = board.create('majorarc', [p1, p2, p3]);  
  ```

## MajorSector 大扇区 JXG.GeometryElement -> JXG.Curve -> Curve -> MajorSector
  Defined in sector.js
  Extends Curve
  JXG.Borad#create type:'majorsector'
  
  * param
  p1----JXG.Point
  p2----JXG.Point
  p3----JXG.Point

  * example
  ```javascript
  // Create an arc out of three free points
  var p1 = board.create('point', [2.0, 2.0]);
  var p2 = board.create('point', [1.0, 0.5]);
  var p3 = board.create('point', [3.5, 1.0]);

  var a = board.create('majorsector', [p1, p2, p3]);
  ```

## Midpoint 中点 JXG.GeometryElement -> JXG.Point -> Midpoint
  Defined in composition.js
  Extends JXG.Point
  JXG.Board#create type:'midpoint'
  * param
  p1----JXG.Point
  p2----JXG.Point
  or
  l-----JXG.Line
  * example
  ```javascript
  // Create base elements: 2 points and 1 line
  var p1 = board.create('point', [0.0, 2.0]);
  var p2 = board.create('point', [2.0, 1.0]);
  var l1 = board.create('segment', [[0.0, 3.0], [3.0, 3.0]]);

  var mp1 = board.create('midpoint', [p1, p2]);
  var mp2 = board.create('midpoint', [l1]);
  ```

## MinorArc 小狐 JXG.GeometryElement -> JXG.Curve -> Curve-> MinorArc
## MinorSector 小扇区 JXG.GeometryElement -> JXG.Curve -> Curve -> MinorSector
## Mirrorpoint 镜像点 JXG.GeometryElement,JXG.CoordsElement -> JXG.Point -> Mirrorpoint
  * example
  ```javascript
  var p1 = board.create('point', [3.0, 3.0]);
  var p2 = board.create('point', [6.0, 1.0]);
  var mp1 = board.create('mirrorpoint', [p1, p2]);
  ```
## NonReflexAngle 无反射性角 JXG.GeometryElement -> JXG.Curve -> Sector -> Angle -> NonReflexAngle
  * example
  ```javascript
  // Create a non-reflex angle out of three free points
  var p1 = board.create('point', [5.0, 3.0]),
      p2 = board.create('point', [1.0, 0.5]),
      p3 = board.create('point', [1.5, 5.0]),

      a = board.create('nonreflexangle', [p1, p2, p3], {radius: 2});
  ```
## Normal (数)法线 JXG.GeometryElement -> JXG.Line -> Normal
  * param
  o----JXG.Line|JXG.Circle|JXG.Curve|JXG.Turtle
  p----JXG.Point
  * example
  ```javascript
  // Create a normal to a circle.
  var p1 = board.create('point', [2.0, 2.0]);
  var p2 = board.create('point', [3.0, 2.0]);
  var c1 = board.create('circle', [p1, p2]);

  var norm1 = board.create('normal', [c1, p2]);
  ```
## Orthogonalprojection 正交投影 JXG.CoordsElement,JXG.GeometryElement -> JXG.Point -> Orthogonalprojection
  Defined in composition.js
  Extends JXG.Point
  JXG.Board#create type:'orthogonalprojection'
  点到线的垂点

  * param
  p----JXG.Point
  l----JXG.line
  * example
  ```javascript
  var p1 = board.create('point', [0.0, 4.0]);
  var p2 = board.create('point', [6.0, 1.0]);
  var l1 = board.create('line', [p1, p2]);
  var p3 = board.create('point', [3.0, 3.0]);

  var pp1 = board.create('orthogonalprojection', [p3, l1]);
  ```

## OtherIntersection 其他的交叉 JXG.CoordsElement,JXG.CoordsElement -> JXG.Point -> OtherIntersection
  * example
  ```javascript
  // Create an intersection point of circle and line 
  // 和原图有区别？？？？
  var p1 = board.create('point', [2.0, 2.0]);
  var c1 = board.create('circle', [p1, 2.0]);

  var p2 = board.create('point', [2.0, 2.0]);
  var p3 = board.create('point', [2.0, 2.0]);
  var l1 = board.create('line', [p2, p3]);

  var i = board.create('intersection', [c1, l1, 0]);
  var j = board.create('otherintersection', [c1, l1, i]);
  ```

## Parabola 抛物线 JXG.GeometryElement -> JXG.Curve -> Conic -> Parabola
  * param
  point----JXG.Point|array
  Line-----JXG.line
  * example
  ```javascript
  // Create a parabola by a point C and a line l.
  var A = board.create('point', [-1,4]);
  var B = board.create('point', [-1,-4]);
  var l = board.create('line', [A,B]);
  var C = board.create('point', [1,1]);
  var el = board.create('parabola',[C,l]);
  ```
## Parallel 平行线 JXG.GeometryElement -> JXG.Line -> Line -> Parallel
  * param
  l----JXG.Line
  p----JXG.Point

  * example
  ```javascript
  // Create a parallel
  var p1 = board.create('point', [0.0, 2.0]);
  var p2 = board.create('point', [2.0, 1.0]);
  var l1 = board.create('line', [p1, p2]);

  var p3 = board.create('point', [3.0, 3.0]);
  var pl1 = board.create('parallel', [l1, p3]);
  ```

## Parallelpoint 平行点 JXG.GeometryElement,JXG.CoordsElement -> JXG.Point -> Parallelpoint
  * param
  p1----JXG.Point
  p2----JXG.Point
  p3----JXG.Point
  * example
  l----JXG.Line
  p----JXG.Point

  * example
  ```javascript
  var p1 = board.create('point', [0.0, 2.0]);
  var p2 = board.create('point', [2.0, 1.0]);
  var p3 = board.create('point', [3.0, 3.0]);

  var pp1 = board.create('parallelpoint', [p1, p2, p3]);
  ```

## Perpendicular 垂直线 JXG.GeometryElement -> JXG.Line -> Segment -> Perpendicular
  Defined in composition.js
  Extends Segment
  JXG.Borad#create type:'perpendicular'
  * param
  l----JXG.Line
  p----JXG.Point
  * example
  ```javascript
  // Create a perpendicular
  var p1 = board.create('point', [0.0, 2.0]);
  var p2 = board.create('point', [2.0, 1.0]);
  var l1 = board.create('line', [p1, p2]);

  var p3 = board.create('point', [3.0, 3.0]);
  var perp1 = board.create('perpendicular', [l1, p3]);
  ```

## PerpendicularPoint 垂直点 JXG.CoordsElement,JXG.GeometryElement -> JXG.Point -> PerpendicularPoint
  * param 
  p----JXG.Line
  l----JXG.Point

  * example
  ```javascript
    var p1 = board.create('point', [0.0, 4.0]);
    var p2 = board.create('point', [6.0, 1.0]);
    var l1 = board.create('line', [p1, p2]);
    var p3 = board.create('point', [3.0, 3.0]);

    var pp1 = board.create('perpendicularpoint', [p3, l1]);
  ```

## PerpendicularSegment 垂线段 JXG.GeometryElement -> JXG.Line -> Segment -> PerpendicularSegment
  * param
  l----JXG.Line
  p----JXG.Point

  * example
  ```javascript
  // Create a perpendicular
  var p1 = board.create('point', [0.0, 2.0]);
  var p2 = board.create('point', [2.0, 1.0]);
  var l1 = board.create('line', [p1, p2]);

  var p3 = board.create('point', [3.0, 3.0]);
  var perp1 = board.create('perpendicularsegment', [l1, p3]);
  ```

## Point 点 JXG.CoordsElement,JXG.GeometryElement -> JXG.Point -> Point
  Defined in point.js
  Extends JXG.Point
  JXG.Board#create type:'point'
  * param
  z----number|string|function optional
  x----number|string|function
  y----number|string|function
  
  * example
  ```javascript
  // Create a free point using affine euclidean coordinates
  var p1 = board.create('point', [3.5, 2.0]);
  ```
  ```javascript
  // Create a constrained point using anonymous function
  var p2 = board.create('point', [3.5, function () { return p1.X(); }]);
  ```
  ```javascript
  // Create a point using transformations
  var trans = board.create('transform', [2, 0.5], {type:'scale'});
  var p3 = board.create('point', [p2, trans]);
  ```
  * Attributes
    - attractorDistance
    If the distance of the point to one of its attractors is less than this number the point will be a glider on this attracting element.
    If set to zero nothing happens
    default:0
    - attractors
    List of attractor elements.
    If the distance of the point is less than attractorDistance the point is made to glider of this element
    default:empty
    - attractorUnit
    Unit for attractorDistance and snatchDistance, used for magnetized points and for snapToPoints
    Value 'screen' and 'user'
    default:'user'
    - face
    点的样式 There are different point styles which differ in appearance
    Value：cross、circle、square、plus、diamond、triangleUp、triangleDown、triangleLeft、triangleRight
    - ignoreSnapToPoints
    List of elements which are ignored by snapToPoints
    default:empty  array
    - infoboxDigits
      - 'auto' 
      done automatically by JXG#autoDigits
      - 'none'
      no truncation
      - 'number'
      user String.toFixed();
    default:auto 
    - showInfobox
      infobox在鼠标移上去的时候会显示
      default:true
    - size
    点的大小
    default:3
    - snapSizeX
    Defines together with Point#snapSizeY the grid the point snaps on to.
    The point will only snap on integer multiples to snapSizeX in x and snapSizeY in y direction.
    If this value is equal to or less than 0, it will use the grid displayed by the major ticks of the default ticks of the default x axes of the board
    default:1
    - snapSizeY
    default:1
    - snapToGrid
    If set to true, the point will snap to a grid defined by Point#snapSizeX and Point#snapSizeY.
    default:false     
    - snapToPoints
    If set to true, the point will snap to the nearest point in distance of Point#attractorDistance.
    default:false
    - snatchDistance
    If the distance of the point to one of its attractors is at least this number the point will be released from being a glider on the attracting element. 
    If set to zero nothing happens. 
    default:0.0 
    - style
    确定点布局，defaul:5
    - zoom
    如果为true，点得大小可以通过zoom events改变 default:false

## PolarLine 极线 JXG.GeometryElement -> JXG.Line -> PolarLine
## PolePoint 极点 JXG.GeometryElement,JXG.CoordsElement -> JXG.Point -> PolePoint
## Polygon 多边形 JXG.GeometryElement -> JXG.Polygon -> Polygon
  Defined in polygon.js
  Extends JXG.Polygon
  JXG.Board#create type:'polygon'
  * param
  list points
  a list of points or
  a list of coordinate arrays or
  a function returning a list of coordinate arrays.

  * example
  ```javascript
  var p1 = board.create('point', [0.0, 2.0]);
  var p2 = board.create('point', [2.0, 1.0]);
  var p3 = board.create('point', [4.0, 6.0]);
  var p4 = board.create('point', [1.0, 4.0]);
  var pol = board.create('polygon', [p1, p2, p3, p4]);
  ```

  ```javascript
  var p = [[0.0, 2.0], [2.0, 1.0], [4.0, 6.0], [4.0, 6.0], [4.0, 6.0], [1.0, 3.0]];
  var pol = board.create('polygon', p, {hasInnerPoints: true});
  ```

  ```javascript
  var f1 = function() { return [0.0, 2.0]; }, 
      f2 = function() { return [2.0, 1.0]; }, 
      f3 = function() { return [4.0, 6.0]; }, 
      f4 = function() { return [1.0, 4.0]; }, 
      cc1 = board.create('polygon', [f1, f2, f3, f4]);
  ```

## RadicalAxis 根轴 JXG.GeometryElement -> JXG.Line -> RadicalAxis
  defined in line.js
  Extends JXG.Line
  JXG.Board#create type:'line'

  * example
  ```javascript
  // Create the radical axis line with respect to two circles
  var board = JXG.JSXGraph.initBoard('7b7233a0-f363-47dd-9df5-5018d0d17a98', {boundingbox: [-1, 9, 9, -1], axis: true, showcopyright: false, shownavigation: false});
  var p1 = board.create('point', [2, 3]);
  var p2 = board.create('point', [1, 4]);
  var c1 = board.create('circle', [p1, p2]);
  var p3 = board.create('point', [6, 5]);
  var p4 = board.create('point', [8, 6]);
  var c2 = board.create('circle', [p3, p4]);
  var r1 = board.create('radicalaxis', [c1, c2]);
  ```
## Reflection 反射 JXG.GeometryElement -> JXG.Point -> Reflection
## ReflexAngle 反射角 JXG.GeometryElement -> JXG.Curve -> Sector -> ReflexAngle
## RegularPolygon 正多边形 JXG.GeometryElement -> JXG.polygon -> Polygon -> RegularPolygon
  Defined In Polygon.js
  Extends Polygon
  JXG.Board#create type:'regularpolygon'
  
  * param
  p1----JXG.Point
  p2----JXG.Point
  n-----number
  * example
  ```javascript
    var p1 = board.create('point', [0.0, 2.0]);
    var p2 = board.create('point', [2.0, 1.0]);
    var pol = board.create('regularpolygon', [p1, p2, 5]);
  ```
  
  ```javascript
    var p1 = board.create('point', [0.0, 2.0]);
    var p2 = board.create('point', [4.0,4.0]);
    var p3 = board.create('point', [2.0,0.0]);
    var pol = board.create('regularpolygon', [p1, p2, p3]);
  ```

  * Attributes
    - borders
    多边形的边
    - hasInnerPoints
    鼠标经过点内时触发hasPoint事件
    default:false
    - vertices
    多边形的顶点
    - withLines
    多边形的边由通过线连接？？？
    - 其他
    借用其他元素的属性：Polygon
  * Fields
  JXG.GeometryElement
  * Methods
  JXG.Polygon、JXG.GeometryElement
  * Events
  JXG.GeometryElement


## Riemannsum 黎曼和(高等数学积分) JXG.GeometryElement -> JXG.curve -> Riemannsum
## Sector 扇形 JXG.GeometryElement -> JXG.Curve -> Sector
  Defined in sector.js
  Extends JXG.Curve
  JXG.Borad#create type:'sector'
  
  * param
  p1----JXG.Point 弧心
  p2----JXG.Point 弧的起点（p1到p2的距离--半径）
  p3----JXG.Point 弧的终点
  
  * example
  ```javascript
    // Create a sector out of three free points
    var p1 = board.create('point', [1.5, 5.0]),
        p2 = board.create('point', [1.0, 0.5]),
        p3 = board.create('point', [5.0, 3.0]),
        a = board.create('sector', [p1, p2, p3]);
  ```

  ```javascript
  // Create a sector out of two lines, two directions and a radius
    var p1 = board.create('point', [-1, 4]),
    p2 = board.create('point', [4, 1]),
    q1 = board.create('point', [-2, -3]),
    q2 = board.create('point', [4,3]),

    li1 = board.create('line', [p1,p2], {strokeColor:'black', lastArrow:true}),
    li2 = board.create('line', [q1,q2], {lastArrow:true}),

    sec1 = board.create('sector', [li1, li2, [5.5, 0], [4, 3], 3]),
    sec2 = board.create('sector', [li1, li2, 1, -1, 4]);
  ```
  
  * Attributes
    - anglepoint
    helper point anglepoint   辅助点anglepoint
    - arc
    sub-element arc
    - center
    helper point center
    - label
    the sector label
    - radiuspoint
    helper point radiuspoint

  * Fields  
    - point1  Midpoint of the sector
    - point2  This point together with Sector#point1 defines the radius
    - point3  Defines the sector's angle
    - point4  Defines the sectors orientation in case of circumCircleSectors
  * Methods
    - hasPointSector(x,y)
      Checks whether (x,y) is within the area defined by the sector.
      - x Coordinate in x direction, screen coordinates.
      - y Coordinate in y direction, screen coordinates.
    - Radius()
    the distance between Sector#point1 and Sector#point2
    p1到p2的距离


## Segment 段 JXG.GeometryElement -> JXG.Line -> Segment
  Defined in line.js
  Extends JXG.Line
  JXG.Board#create type:'segment'
  * param
  point1----JXG.Point|array
  point2 

  * example
  ```javascript
  // Create a segment providing two points.
  var p1 = board.create('point', [4.5, 2.0]);
  var p2 = board.create('point', [1.0, 1.0]);
  var l1 = board.create('segment', [p1, p2]);
  ```

  ```javascript
  // Create a segment providing two points.
  var p1 = board.create('point', [4.0, 1.0]);
  var p2 = board.create('point', [1.0, 1.0]);
  var l1 = board.create('segment', [p1, p2]);
  var p3 = board.create('point', [4.0, 2.0]);
  var p4 = board.create('point', [1.0, 2.0]);
  var l2 = board.create('segment', [p3, p4, 3]);
  var p5 = board.create('point', [4.0, 3.0]);
  var p6 = board.create('point', [1.0, 4.0]);
  var l3 = board.create('segment', [p5, p6, function(){ return l1.L();} ]);
  ```

## Semicircle 半圆形 JXG.GeometryElement -> JXG.Curve -> Curve -> Arc -> Semicircle
  * example
  ```javascript
    // Create an arc out of three free points
    var p1 = board.create('point', [4.5, 2.0]);
    var p2 = board.create('point', [1.0, 0.5]);
    var a = board.create('semicircle', [p1, p2]);
  ```
  * Attributes
    - midpoint
    center point of the semicircle
    - 其他
    借用其他元素的属性：JXG.Curve
  * Fields
    借用其他元素的属性：JXG.Curve、Arc  

## Slider 滑动块 JXG.CoordsElement,JXG.GeometryElement -> JXG.Point -> Glider -> Slider
  Defined in slider.js
  Extends Glider
  JXG.Board#create type:'slider'

  * param
    - start----array
    - end------array
    - data-----array
    The first two arrays give the start and the end where the slider is drawn on the board.
    The third array gives the start and the end of the range the slider operates as the first resp.
    the third component of the array.
    The second component of the third array gives its start value
  
  * example
  ```javascript
    // Create a slider with values between 1 and 10, initial position is 5.
    var s = board.create('slider', [[1, 2], [3, 2], [1, 5, 10]]);
  ```  

  ```javascript
    // Create a slider taking integer values between 1 and 50. Initial value is 50.
    var s = board.create('slider', [[1, 3], [3, 1], [1, 10, 50]], {snapWidth: 1});
  ```
  
  * Attributes
    - baseline
    Attributes for the base line of the slider
    - highline
    Attributes for the highlighting line of the slider
    - label
    Attributes for the slider label.
    - point1
    Attributes for first (left) helper point defining the slider position.
    - point2
    Attributes for second (right) helper point defining the slider position.
    - precision
    The precision of the slider value displayed in the optional text.
    - size
    Size of slider point.
    - snapWidth
    The slider only returns integer multiples of this value, e.g.
    - ticks
    Attributes for the ticks of the base line of the slider.
    - withLabel
    Show slider label.
    - withTicks
    Show slider ticks.

  * Fields
    - _smax
    End value of the slider range
    - _smin
    Start value of the slider range.
    - Value
    Returns the current slider value.
    - 其他
    Glider、JXG.GeometryElement、JXG.CoordsElement
  * Methods 
    Glider JXG.Point JXG.GeometryElement JXG.CoordsElement
  * Events
    JXG.GeometryElement    

## Slopetriangle 斜三角形 JXG.GeometryElement -> JXG.Line -> Slopetriangle
## Spline 样条 JXG.GeometryElement -> JXG.Curve -> Spline
## Stepfunction 阶跃函数 JXG.GeometryElement -> JXG.Curve -> Stepfunction
  * example 
  ```javascript
    // Create step function.
    var curve = board.create('stepfunction', [[0,1,2,3,4,5], [1,3,0,2,2,1]]);
  ```

## Tangent (数)正切 JXG.GeometryElement -> JXG.Line -> Tangent
  * example
  ```javascript
  // Create a tangent providing a glider on a function graph
  var c1 = board.create('curve', [function(t){return t},function(t){return t*t*t;}]);
  var g1 = board.create('glider', [0.6, 1.2, c1]);
  var t1 = board.create('tangent', [g1]);
  ```

## Tapemeasure 卷尺 JXG.GeometryElement -> JXG.Line -> Segment -> Tapemeasure
## Text 文本 JXG.CoordsElement,JXG.GeometryElement -> JXG.Text -> Text
  Defined in text.js
  Extends JXG.Text
  JXG.Board#create type:'text'

  * param
  z------number|function  optional 
  x------number|function
  y------number|function
  str----string|function

  * example
  ```javascript
    // Create a fixed text at position [0,1].
    var t1 = board.create('text',[0,1,"Hello World"]);
  ```

  ```javascript
    // Create a variable text at a variable position.
    var s = board.create('slider',[[0,4],[3,4],[-2,0,2]]);
    var graph = board.create(
                      'text',
                      [
                        function(x){ return s.Value();},
                        1,
                        function(){return "The value of s is"+s.Value().toFixed(2);}
                      ]
                    );
  ```

  * Attributes
    - anchor
    default:null
    Anchor element Point, Text or Image of the text.
    If it exists, the coordinates of the text are relative to this anchor elemen
    - anchorX
    default:'left'(left/middle/right)
    The horizontal alignment of the text
    - anchorY
    default:'middle'(top/middle/right)
    The vertical alignment of the text.
    - attractors
    default:empty
    List of attractor elements. 
    If the distance of the text is less than attractorDistance the text is made to glider of this element
    - cssClass
    The precision of the slider value displayed in the optional text
    - digits
    default:2
    Used to round texts given by a number
    - display 
    default:'html'
    Determines the rendering method of the text. 
    Possible values include 'html' and 'internal'
    - dragArea
    default:'all'
    Sensitive area for dragging the text. 
    Possible values are 'all', or something else. 
    This may be extended to left, right, ... in the future
    - fontSize
    default:12
    字号
    - highlightCssClass
    The precision of the slider value displayed in the optional text

## Ticks 记号 JXG.GeometryElement -> JXG.Ticks -> Ticks
  * example
  ```javascript
  // Create an axis providing two coord pairs.
  var p1 = board.create('point', [0, 3]);
  var p2 = board.create('point', [1, 3]);
  var l1 = board.create('line', [p1, p2]);
  var t = board.create('ticks', [l1], {ticksDistance: 2});
  ```

  ```javascript
    // Create an axis providing two coord pairs.
    var p1 = board.create('point', [0, 0]);
    var p2 = board.create('point', [50, 25]);
    var l1 = board.create('line', [p1, p2]);
    var t = board.create('ticks', [l1, 1], {
      insertTicks: true,
      majorHeight: -1,
      label: {
          offset: [4, -9]
      },
      drawLabels: true
    });
  ```

  * Attributes
    - anchor default:'left'
    - drawLabels default:false
    - drawZero default:false
    - generateLabelText 
    - generateLabelValue 
    - includeBoundaries default:false
    - insertTicks  default:false
    - labels default:[]
    - majorHeight default:10
    - maxLabelLenght default:5
    - minorHeight default:4
    - minorTicks default:4
    - precision default:3
    - scale default:1
    - scaleSymbol default:''
    - tickEndings default:[1,1]
    - ticksDistance default:1

## Tracecurve 轨迹曲线 JXG.GeometryElement -> JXG.Curve -> Tracecurve
## Transformation 转型 JXG.Transformation -> Transformation
## Turtle 乌龟 JXG.Turtle -> Turtle