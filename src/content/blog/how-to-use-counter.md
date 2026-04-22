---
title: "how-to-use-counter"
pubDate: 2016-11-14

tags:
  - css
  - counter
  - 计数器
---
# css计数器的三角关系
计数器 <-> 伪元素 <-> content属性
计数器的2个属性和1个方法
  1. counter-reset
  2. counter-increment
  3. counter()/counters()

  * counter-reset是计数器重置，计数器命名，设置默认值
    如:
    - .xxx{ counter-reset:counter-test; }
    计数器名称是'counter-test',默认值为0
    - .xxx{ counter-reset:counter-test 2;}
    计数器名称是'counter-test',设置默认值为2
  * counter-increment
    计数器增加默认值为1，可以设置为任意整数(负数亦可)
    如：
    - .counter1 { counter:apple; counter-increment:apple; }
      .counter1:before { content:counter(apple) }
    apple默认值为0,应用了样式counter1的元素第一个显示为1，如果还有第二个应用了
    那么apple会增加1
    - .counter2 { counter:apple; counter-increment:apple 2; }
    这里设置增量为2，即一次增加2
  * counter()/counters()这个是方法
    * counter()
      - counter(name) name就是counter-reset的名称
      - counter(name,style) style支持的关键字是**list-style-type**的值
      list-style-type
        - disc
        - circle
        - square
        - decimal
        - lower-roman
        - upper-roman
        - lower-alpha 
        - upper-alpha 
        - none 
        - armenian 
        - cjk-ideographic 
        - georgian 
        - lower-greek 
        - hebrew 
        - hiragana 
        - hiragana-iroha 
        - katakana 
        - katakana-iroha 
        - lower-latin 
        - upper-latin
    * counters() 主要用于counter的嵌套
      css:
      ```javascript
        .reset { padding-left: 20px; counter-reset: wangxiaoer; line-height: 1.6; color: #666; }
        .counter:before { content: counters(wangxiaoer, '-') '. '; counter-increment: wangxiaoer; font-family: arial black; }
      ```

      html:
      ```javascript
        <div class="reset">
          <div class="counter">我是王小二
            <div class="reset">
                <div class="counter">我是王小二的大儿子</div>
                <div class="counter">我是王小二的二儿子
                    <div class="reset">
                        <div class="counter">我是王小二的二儿子的大孙子</div>
                        <div class="counter">我是王小二的二儿子的二孙子</div>
                        <div class="counter">我是王小二的二儿子的小孙子</div>
                    </div>
                </div>
                <div class="counter">我是王小二的三儿子</div>
            </div>
          </div>
          <div class="counter">我是王小三</div>
          <div class="counter">我是王小四
            <div class="reset">
                <div class="counter">我是王小四的大儿子</div>
            </div>
          </div>
        </div>
      ```
# CSS计数器与display:none
一个元素，如果设置了counter-increment, 但是其display的属性值是none或者含有hidden属性（针对支持浏览器），则此计数值是不会增加的。
而visibility:hidden以及其他声明不会有此现象。

# CSS计数器实际应用
 ol ul等列表计数 
 html5幻灯片页面数量计数等


[参照整理](http://www.zhangxinxu.com/wordpress/2014/08/css-counters-automatic-number-content/)
[Using Css counters](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Lists_and_Counters/Using_CSS_counters)
[counter-set](https://developer.mozilla.org/en-US/docs/Web/CSS/counter-reset)
[counter-increment](https://developer.mozilla.org/en-US/docs/Web/CSS/counter-increment)