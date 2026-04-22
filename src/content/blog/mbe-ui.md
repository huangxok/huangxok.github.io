---
title: "mbe_ui"
pubDate: 2016-05-11

tags: []
---
# mbe_ui 库简介

## mbe_ui 的特点以及想要解决的问题

mbe_ui 是一个用于开发 HTML 用户界面（GUI）的库，诞生于 MBEditor 项目。它试图解决现有的 JS 模板库、DOM 操作库等存在的一些问题。其特点如下：

* 采用声明式的 JS 语法描述 HTML DOM 树

  mbe_ui 允许用普通的 JS 对象字面量（称作”虚拟元素”）来描述 DOM 树的结构，因此既是声明式的，又可以利用已有的 JS 技能，无需另外学习模板语言；
  而且，在 DOM 树的描述中可以直接绑定事件监听器。例如 HTML button 的虚拟元素可以是：

```javascript
  {
    Name: 'button',
    Kids: ['button1'],
    className: 'btn',
    onclick: function() { alert(`clicked`); } 
  }
```

* 采用“单向数据流动”的界面更新模式

  这个模式的意思是大部分界面组件无状态，总是从上级发送“设置”数据到各级界面组件，决定其显示的样子（详见“mbe_ui 组件的设计思想”一节）。
  采用这个模式可以简化界面更新的逻辑。

* 自动局部更新，并尽可能地减小重建 DOM 的范围

  当 HTML 界面在运行时需要更新时，一个比较棘手的问题是如何尽可能地局部更新，而不是大范围地重建 DOM 树。
  大范围地重建 DOM 树有很多问题，如造成滚动条的位置被重置，选区、焦点被取消，界面卡顿等。然而，求出最小的需要更新的 DOM 的范围并不总是容易的，
  特别是对复杂的界面来说。
  mbe_ui 则自动保证尽可能少地重建 DOM。当虚拟元素对象改变时，mbe_ui 将它与上一个版本的虚拟元素对比，然后只把修改了的部分应用到真实的元素中。
  只有当有效地减小了重建 DOM 的范围，“单向数据流动”的设计模式才具有实用价值。

* 提供简单的界面模块化机制

  mbe_ui 提供了一种简单的机制，允许将界面上的各个部分（如按钮、菜单、标签页）实现为“组件”，从而提高代码的模块化程度。
  不过，mbe_ui 本身并不提供任何现成的组件。

* 库本身非常小巧，如果愿意，使用者可以将其视为白盒而不是黑盒。

  mbe_ui 的源码目前不到 400 行（含注释），使用者可以很快上手，而且遇到问题完全可以自行调试 mbe_ui 的源码，不必将其视为黑盒。


## 与现有技术的对比

### 与传统方法的对比

传统上，在 JS 中生成 GUI 的 DOM 树的方法有以下 4 种，但都有一些问题，具体分析如下。

* 用基本的 DOM 操作方法生成 DOM 树。

  如 `Document.createElement()`, `Element.insertBefore()`, `Element.style`, `Element.textContent` 等。这是底层的、细粒度的方法，有很好的控制力，但缺点是：（1）书写相当繁琐，（2）代码可读性不佳，从代码中想想构建出来的 DOM 树的结构是比较费脑子的。
  jQuery 库提供了一组包装方法，比这些原生的 DOM 创建方法的语法要简洁，但是可读性仍然不太好。最根本的问题在于：使用这些方法的代码是命令式的，而不是声明式的；
  在创建较复杂的 DOM 结构时，我们希望能使用声明式的语法（HTML 就是一种声明式的语言）。

* 将 HTML 字符串，通过 `Element::innerHTML` 或者 `jQuery::html()` 等方法解析为 DOM 树。

  这种做法有着明显的缺点：如果 DOM 树比较复杂，在 JS 代码中书写/拼接长长的 HTML 字符串是很丑陋的；此外，绑定事件监听器需要额外的步骤。

* 基于字符串的模板引擎。

  利用诸如 [Handlebars.js](http://handlebarsjs.com/) 这样的模板库，开发者将 HTML 的”骨架“写到一个专门的模板文件中；在运行时，模板引擎解析模板，并其中的占位符替换为 JS 数据对象中的值，再将替换后的 HTML 字符串用 innerHTML 解析为 DOM 树。
  这类模板库允许用声明式的语法（基本上就是 HTML 语法），但是缺点是：其中的分支、循环等语法多是模板引擎自定义的，不是 JS 语法，需要另外学习。

* 基于 cloneNode() 的模板。

  Element.cloneNode() 方法可以克隆从本元素开始的整个 DOM 树，因此可以将模板放在 HTML 页面中的隐藏元素中，在运行时在 JS 中这样使用： 用 cloneNode() 复制模板 -> 填充数据 -> 插入主 DOM 树显示。最新的 HTML5 标准已经将这个做法标准化，也就是 [template 元素](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template)。这个方法允许直接用 HTML 来写模板，但是，”填充数据“这个环节仍然没有很好的解决方案，通常仍然使用命令式的 DOM 方法来完成。

而且，以上 4 种方法都没有试图去减小了重建 DOM 的范围，而是把这个问题留给了使用者。
因此在传统的 GUI 程序中，根据数据层的更新来决定哪些视图要被更新是相当复杂的。很多时候为了省事和可靠，采用了整体重建；另一些时候则因为不可靠的局部刷新，
造成了界面状态的紊乱。

### 与 Facebook React 的对比

[Facebook React](http://facebook.github.io/react/) 是最近（2014-）比较热门的 JS 界面框架，mbe_ui 与它想要解决的问题大致重合，采用的技术路线也类似（用虚拟 DOM 来减少重建 DOM 的范围）。事实上，mbe_ui 是借鉴 React 的思想而创建的。

那么为什么不直接采用 React？

* React 比较复杂和庞大（react.js 有19000行，含注释）。除了虚拟 DOM，还提供了在 JS 中嵌入 HTML 的特定领域语言 —— JSX，以及事件封装。
  我认为虚拟 DOM 和自动局部更新是其精华，但其他部分则不那么必要，至少应是可选的。

* React 的设计不够清晰简洁。我曾试图去理解它的组件机制是如何工作的，但是发现实在是很绕，不容易弄明白。当然，对于一些用户来说，
  知其然不知其所以然也没关系。但我认为，一个机制不容易理解的框架，使用起来是不能放心的。

* React 封装和重新实现了浏览器的事件系统。
  封装虽然改善了跨浏览器的兼容性，但也给调试带来的麻烦（浏览器的调试器只认得通过原生方法添加的事件监听器）。
  此外，由于自定义事件不会得到封装，而我们又广泛依赖自定义事件（如 pointer 事件），所以使用 React 的事件系统会比较别扭。

* React JSX 与 Typescript 语言的结合尚有困难。JSX 的语法与 TS 是有冲突的，因此无法在 TS 中直接使用。在 TS 中使用 JSX 还在[试验中](https://github.com/Microsoft/TypeScript/pull/2673)。

## mbe_ui 的应用

mbe_ui 已经被用于开发“备课大师”的主用户界面，详见以下文件：
```
src/master-editor.xhtml
src/mbe/shell/
            MasterEditorApp.ts
            MasterEditorShell.ts
            MasterNav.ts
            MasterTooBar.ts
            MasterResourcePanel.ts
            Buttons.ts
            Tab.ts
            ...
```
“备课大师”之前的主用户界面没有用 mbe_ui，是采用较为原始的方法开发的，详见：
```
src/editor-shell.xhtml
src/mbe/shell/
            EditorShell.ts
            PageNavigator.ts
            PropertyPanel.ts
```
可以对比一下。

另外，mbe_ui 有单元测试，即 `test/domer.html` 文件，从这个文件里可以看到一些 mbe_ui.Domer 的用法。

## 使用 mbe_ui 的虚拟 DOM

### 虚拟 DOM

先举个虚拟元素的例子：
```
// 例1
{
  Name: 'section', // HTML 元素名
  Kids: // 子节点
  [
    { Name: 'h1', Kids: ['大标题...'] },
    {
      Name: 'button',
      '.btn': true, // HTML class 属性
      Kids:
      [
        { Name: 'img', src: 'image/icon1.png' },
        '按钮1' // 文本节点
      ],
      onclick: function(ev) { alert('clicked'); }, // 事件监听器
      '@data-action': 'insert', // 普通属性 data-action
      '-font-family': 'heiti, sans-serif' // CSS 属性 font-family
    }
  ]
}；
```

等效于
```
<section>
  <h1>大标题...</h1>
  <button class="btn" onclick="alert('clicked')" data-action="insert"
    style="font-family: heiti, sans-serif">
    <img src="image/icon1.png" />'按钮1'
  </button>
</section>
```

mbe_ui 虚拟元素就是一个普通的 JS 对象，你可以用 JS 对象字面量的写法来创建。它的各种属性的意义如下：

* `Name`：元素名。HTML 元素名应一律用小写。如果忽略，则被认为是 div 元素；如果是"?" 并且“与已有的实际元素相同”，则使用实际元素的名字（这个在后面介绍），否则也认为是 "div"。
  由于在界面实现中 div 用得很多，所以这是比较方便的。

* `Kids`：子节点列表，是一个数组，其成员要么是其它虚拟元素，要么是字符串；字符串则对应实际 DOM 中的文本节点。

* 以 `@` 开头的属性映射到 html/xml 属性，相当于通过 `elem.setAttribute(name, value)` 的方式赋值（去掉去掉首字符）。

* 以 `-` 开头的属性开头的属性视为 inline css 属性，通过 `elem.style.setProperty(name, value)` 的方式赋值（去掉首字符）。

* 以 `.` 开头的属性视为 html class 属性的片段（去掉首字符），如果相当于 true 则添加到 `elem.classList` 中，否则删除。

* 其它的属性，如 `src`, `onclick`，一般直接映射到同名的 WebIDL 属性，或者作为普通的 JS 属性，相当于通过 `elem[name] = value` 的方式赋值。
  而前述的 `Name`、`Kids` 属性首字母大写，因此不会与 WebIDL 属性（首字母小写）发生冲突。
  虚拟元素的一个特色是可以在声明时直接添加函数作为 `onclick` 等事件的监听器，很方便。

从上面的例子可以看出，虚拟元素的写法很直观，不过代码比起对应的 HTML 的确不那么紧凑，这需要开发者适应一下。
不过比起手工拼接 HTML 字符串，或者使用模板引擎来说，还是方便了不少。

### 从虚拟元素生成实际元素

这需要用到 `mbe_ui.Domer` 类的 `render()` 方法：

```
// 例2
var domer = new mbe_ui.Domer();
var a = domer.render({ Name: 'a', href: 'http://www.w3.org', Kids: ['W3C']});
```
这样就创建了一个相当于 `<a href='http://www.w3.org'>W3C</a>` 的元素对象（`HTMLAnchorElement` 的实例）。不过这个元素是独立的，并未添加到当前文档树中。

如果要用虚拟元素更新已有的实际元素，就要用 2 参数版的`render()` 方法，第二个参数是实际元素。例如，我们要更新一个 `<a>` 元素，就可以：

```
// 例3
var domer = new mbe_ui.Domer();
var a = document.createElement('a');
//此时 a 是 `<a></a>`;
domer.render({ Name: 'a', href: 'http://www.w3.org', Kids: ['W3C']}, a);
//此时 a 是 `<a href='http://www.w3.org'>W3C</a>`
```
注意，尽管这个 `<a>` 元素是新建的，并没有位于文档树中，但 `domer.render()` 也是可以作用于文档树中已有的元素的。

如果用 `render()` 多次作用于同一个实际元素，那么在虚拟元素中以前出现过、后来没有出现的属性、子节点会被删除，例如：

```
// 例3
var domer = new mbe_ui.Domer();

var a = document.createElement('a');
a.href = 'about:blank';
a.textContent = 'blank'
//此时 a 是 `<a href='about:blank'>blank</a>`;

domer.render({ Name: 'a', '@data-role': 'link', href: 'http://www.w3.org',
  Kids: ['W3C', {Name: 'img', src: 'w3c.png'} ] },
  a);

//现在 a 是 <a href="http://www.w3.org" data-role="link">W3C<img href="w3c.png" /></a>

domer.render({ Name: 'a', href: 'http://www.w3.org', Kids: ['W3C'] }, a);

//现在 a 是 <a href="http://www.w3.org">W3C</a>
```

也就是说，第二次调用 render() 时，没有再出现的 `data-role` 属性和 `<img>` 子元素都被删除了。
这是 mbe_ui.Domer 的一个重要特性，只有这样，才能保证虚拟元素和实际元素的一致性。

mbe_ui.Domer 尽量保持局部更新。在这个例子中，`a` 元素本身没有被替换，文本节点 'W3C' 和属性 `href` 也没有被修改。

### 重用子节点的规则

在使用 `render(virtualElem: VElement, realElem?: Element): Element` 方法时，如果提供了真实元素（`realElem`），则渲染时会尽可能的重用它及其子节点。目前的重用/新建规则是：如果节点类型、名字和位置都相同，
则重用，否则就新建一个，并替换真实元素。如果虚拟元素的 Name 是 "?"，则认为总是与对应的真实元素的名字相同；如果没有对应的真实元素，则创建一个 div 元素。

这个重用规则尽可能的减小了更新 DOM 的范围，提高了性能，并减小了失去滚动条位置、焦点、选区的可能性。

当然，这并没有做到 React 的程度， React 在一定条件下还能够识别子节点的移动并加以重用。

## 使用 mbe_ui 的组件框架

### 总体概念

mbe_ui 的组件框架由两个类组成：

* `mbe_ui.Component`：界面组件的基类。用户实现的界面组件要继承这个类。
* `mbe_ui.UIDomer`：用于渲染界面组件的 Domer。它是 mbe_ui.Domer 的子类。

先举一个例子：

```
// 假定已经导入了 mbe_ui.Component 和 mbe_ui.UIDomer。

class NumInput extends Component { // 组件都继承 Component 类
  value = 0; // 组件实例的一个可变的状态
  getView(): VElement { // getView() 应当返回表现当前状态的界面的“展开”后的虚拟元素。此方法由 UIDomer 适时调用。
    var view = <VElement>{
      // 因为 NumInput 省略了 Name 属性，因此采用默认的元素名 div。
      Kids: [
        {Name: 'span', Kids: ['' + this.value]}, // 让当前 value 值展现在 span 中
        // 绑定 click 事件到 NumInput::onclick() 方法
        {Name: 'button', onclick: this.onclick.bind(this), Kids: ['increase']}
      ]
    };
    return view;
  }
  onclick(ev: MouseEvent) {
    this.value++; // 更新本组件实例的状态
    // this.settings 属性是本组件实例的“展开”前的虚拟元素，即 { Class: NumInput, onValueChange: function() {...}} 那个对象。
    if (this.settings['onValueChange'])
      this.settings['onValueChange'].call(this); // 调用 onValueChange 回调。
    this.updateLater(); // 请求 UIDomer 稍后更新界面（即将 geView() 得到的虚拟元素 render() 到对应的真实元素）。
  }
}

var uidomer = new UIDomer();
var vElement = {
  Class: NumInput, // Class 是 mbe_ui 组件框架定义的特殊属性，表示这个元素不是普通元素，而是对应一个 NumInput 组件。
  onValueChange: function() { alert('current value: ' + this.value)} // 从 NumInput 组件接收 onValueChange 的通知。
};
var rElement = uidomer.render(vElement);
document.body.appendChild(rElement);
```

这里 `NumInput` 实现了一个文本（`span`）和按钮（`button`）的组合组件，点击按钮时，文本上的数字会增加1，并通过 `onValueChange` 回调报告值的改变。

### 执行流程

mbe_ui 组件框架的基本工作方式是“展开”。`uidomer.render(vElement)` 的流程大致如下：

1. 如果 `vElement.Class` 存在：

    1.1. 创建组件实例 `component = new Class()`

    1.2. 设定 `settings`：`component.settings = vElement`

    1.3. 调用 `getView()` 获得展开后的虚拟元素，并替代 `vElement`：`vElement = component.getView()`。

2. 根据 `vElement` 创建实际元素 `rElement`。
  如果第上一步创建了组件实例，则与 rElement 建立互相连接：`rElement.Component = component; component.element = rElement`，

3. 递归处理 `vElement` 的子节点，执行 1-4，并将子节点对应的实际元素作为子元素插入 rElement。

4. 返回 `rElement`。


在前面的例子中，1.2 步的 `component.settings` 和 `vElement` 是
```
{
  Class: NumInput,
  onValueChange: function() {...}
}
```
1.3 步的 `vElement` （展开后）则是
```
{
  Kids: [
    {Name: 'span', Kids: [...]},
    {Name: 'button', Kids: ['increase'], onclick: NumInput::onclick }
  ]
}
```

其它一些要点：

* 组件是可以嵌套的。在一个组件的 `getView()` 方法返回的虚拟元素中，可以在其子节点中使用其他的组件，`UIDomer` 会自动地层层展开，
从而得到最终的虚拟 DOM 树和真实 DOM 树。

* `getView()` 通常要利用 `settings` 属性中的值来确定展开后的形态。

* 如果重新渲染已有的元素，如 `uidomer.render(vElement, rElement)`，或者 `rElement.Component.update()/updateLater()` ，
  则会尽可能重 `rElement` 和 `rElement.Component`（只要 `Name` 和 `Class` 属性没有变）。`rElement` 和 `rElement.Component` 的生存期一般是相同的。

### 虚拟元素接口

虚拟元素的正式定义如下：
```
interface VElement {
  /**
   * 元素（本地）名，对 html 元素一定是小写，如'div'。省略时，采用相应实际元素的元素名；如果没有对应实际元素，
   * 则认为是 'div'。
   */
  Name?: string;
  /**
   * 子节点。string 表示文本节点。
   */
  Kids?: Array<VElement | string>;
  /**
   * 本元素对应的组件的类。对自定义组件，用户应指定这个属性。
   */
  Class?: new() => mbe_ui.Component;
  /**
   * 本元素对应的组件的实例。用户无需指定此属性，它由 UIDomer 生成。
   */
  Component?: mbe_ui.Component;
}
```

### Component 类

界面组件要继承 Component 类，并且至少要覆盖 getView() 方法来返回自己的界面表示。其他的一些重要的属性和方法如下：

```
class Component {
  /**
   * 对应的 html 元素。Component 不应直接修改它，只有 UIDomer 可以修改它。
   */
  element: Element;
  /**
   * 从上层传入的设定（展开前的虚拟元素）。Component 不应修改它，只有 UIDomer 可以修改它。
   */
  settings: VElement;
  /**
   * 子类应当覆盖。返回表现当前组件的视图。在每次要将本组件渲染到真实 DOM 前调用。
   */
  getView(): VElement;
  /**
   * 重新渲染本 Component。通常在更新了本组件的状态后调用此方法重新渲染界面。
   * 这个方法是同步的，会立即修改 DOM。为了减少开销，一般应尽可能用 updateLater() 代替此方法。
   */
  update(): void;
  /**
   * 请求稍后异步地（通过 requestAnimationFrame）重新渲染本 Component。
   * 通常在更新了本组件的状态后调用此方法重新渲染界面。
   * 如果在一组操作中可能重复调用 update()，则用这个方法代替可以减少不必要的重复渲染，提高性能。
   */
  updateLater(): void;
  /**
   * 回调，子类可覆盖。当本组件创建并关联到 html 元素后调用，此时 element 属性可用。
   */
  onAttached(): void;
  /**
   * 回调，子类可覆盖。当本组件渲染到 html 元素（不论是否新建）后调用。如果是新建的 html 元素，则在 onAttached() 之后调用。
   */
  onRendered(): void;
  /**
   * 回调，子类可覆盖。当本组件即将与关联的 html 元素分离，或本组件关联的 html 元素即将被删除时调用。
   */
  onBeforeRemove(): void;
}
```

一些要点：
* `update()` 和 `updateLater()` 会调用 `uidomer.render(this.settings, this.element)` 来更新 `this.element`。
  `render()` 则会调用 `this.getView()` 获得当前的视图形态。这两个方法对于刷新个别组件的视图是很有用的。

* mbe_ui 并没有类似 React 组件的 refs 属性的机制来访问子组件。我们建议的做法是：给需要从父组件访问的子组件的元素以特定的 `id` 或 `class`，
  然后用`this.element.querySelector(...).Component` 来得到子组件。

### 对真实元素 Element 接口的扩展
```
interface Element {
  Class?: new() => mbe_ui.Component;
  Component?: mbe_ui.Component;
}
```

UIDomer 在渲染出组件对应的真实元素后，会把相应的组件类和组件实例分别赋值给`Class`和`Component`属性。
后者尤其有用，因为可以通过真实元素访问到组件的实例，并调用其方法和属性（最常用的可能是`updateLater()`）。

此处 `Class` 和 `Component` 首字母大写的原因与也是为了避免与 WebIDL 属性发生冲突。

### mbe_ui 组件的设计思想

mbe_ui 强烈鼓励组件采用“单向数据流动”的设计模式，这也是 React 采用的模式。其特点是：

* 视图（View）层最好是无状态的（可以有非公开的状态，如菜单是否处于展开状态），
其当前显示的样子由从上级传递的参数（即 `Component::settings` 属性）完全决定。

* 总是描述界面 “现在的样子”，而不是 “怎样修改过去的样子从而得到现在的样子”。后者是传统的 GUI 程序惯用的更新界面的方法，
但也是导致程序过于复杂的一个重要原因。在`Component::getView()` 方法中，用户只需描述“现在的样子”，而怎样修改则交给 `UIDomer` 去做。

采用“单向数据流动”的设计模式，可以显著简化界面更新的逻辑。

## 高级特性

### 高级事件监听器

前面提到的 onclick 等事件监听器属性固然很方便，但是也有局限性：（1）只能添加一个监听器函数
（2）只能监听冒泡阶段（bubble phase）的事件，不能监听捕获阶段（catch phase）的事件
（3）不能监听自定义事件（因为自定义事件没有对应的 `Element::onxxx` 属性）。因此，mbe_ui 还提供了另2种高级的事件监听器属性的写法：

* `*事件名`属性：冒泡阶段的事件监听器，可以是函数或者函数的数组，通过 `elem.addEventListender()` 添加。
* `!事件名`属性：捕获阶段的事件监听器，可以是函数或者函数的数组，通过 `elem.addEventListender(..,true)` 添加。

注意此处“事件名”没有 “on” 前缀，应为 "click" 而不是 “onclick”。

例子：
```
var view = {
  Name: 'button',
  '!pointerdown': [
    function(ev): { console.log('pointerdown1');},
    function(ev): { console.log('pointerdown2');}
  ],
  '*pointerdown': function(ev): { console.log('pointerdown3');},
}
```
这个例子中，`pointerdown` 是个[指针事件](https://dvcs.w3.org/hg/pointerevents/raw-file/tip/pointerEvents.html)。因为尚未被浏览器广泛支持，所以我们只能用自定义事件来模拟它。在捕获阶段我们添加了两个监听函数，冒泡阶段添加了一个监听函数。

比起直接使用 `Element::addEventListender()/removeEventListender()`，mbe_ui 的高级事件监听器有一个很好的特性：能确保监听器函数在不需要时总是能被删除——只要下一次渲染时提供的监听器函数与上一次的不是同一对象，
那么上一次提供的监听器函数函数就会被删除，因此可以“无忧使用”。相比之下，调用`removeEventListender()`时传入的函数与调用
`addEventListender()` 时传入的函数必须是同一对象才行。

### SVG, MathML 和命名空间

在 mbe_ui 的虚拟元素中也可以使用 SVG 和 MathML 元素名，例如
```
var ve =
  {
    Name: 'div', // HTML 元素
    Kids:
    [
      {Name: 'span'}, // HTML 元素
      {Name: 'svg', Kids: [{Name: 'line'}]}, // SVG 元素
      {Name: 'math', Kids: [{Name:'mn', Kids: ['2']}]} // MathML 元素
    ]
  };
```

我们知道，如果文档的类型是 XHTML 时，创建元素时要指定命名空间，尤其是不在 XHTML 命名空间中的 SVG 和 MathML 元素。
mbe_ui.Domer 在大多数情况下可以自动推断出合适的命名空间，让 svg 及其子元素采用 SVG 命名空间，让 math 及其子元素采用 MathML 命名空间。
不过，用户必须保证 SVG 元素都在 `<svg>` 之下， MathML 元素都在 `<math>` 之下，并且不带前缀，否则就无法自动推断了。

当 mbe_ui.Domer 的自动命名空间推断无法满足要求时，用户可以提供自定义的命名空间推断方法给它，即替换或覆盖
`Domer::inferNamespace(tagName: string): string` 方法。参数是虚拟元素的 Name，返回值是命名空间。

### `className`，`@class` 和 `.someClass` 属性，`style`，`@style` 和 `-some-style` 属性

在 mbe_ui 中，使用 `{ className: 'a b'}`，`{ '@class': 'a b'}`与 `{ '.a': true, '.b': true }` 大体上是等效的。在底层，它们分别利用
`Element::className`，`Element::setAttribute('class', ...)` 和 `Element::classList` 来实现。那么如何选择呢？

* 在一个虚拟元素上绝对不要混合使用多种方式。如果这样做，多种方式中只有一种会生效，但不保证是哪一种。
* `.someClass` 写法更灵活，尤其适合运行时会动态增减的 class，也适合通过多个步骤创建的虚拟元素，每个步骤都可能添加 class。
* `className` 可以用于明确的、运行时不会改变的 class；`@class` 与之类似。
* 如果不确定，用 `.someClass` 写法比较安全。

`@style` 和 `-some-style` 的关系也是类似的。但是，由于`Element::style` 不可以直接赋值，所以__绝对不要__在虚拟元素中指定 `style` 属性。

### 终点元素

虚拟元素可以设定其 `Terminal` 属性为 true，表示这个元素是终点元素。对于终点元素，Domer 不再处理其子节点，客户代码可自行管理其子节点。
这个特性使得可以在 mbe_ui 的终点元素内部使用其他的界面技术。
当然，如果在虚拟元素中用了 innerHTML, textContent 等可以影响子节点的属性，则一定要设置 Terminal 为 true。


#### by duanyao