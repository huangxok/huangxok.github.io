---
title: "javascript_object"
pubDate: 2017-04-01

tags:
  - prototype
  - object
  - js
---
# JavaScript 的对象

## 作为映射表的 JS 对象
JS 对象的“可见”结构（从客户代码的角度去看）基本上是一个映射表，类似 Map, Dictionay 之类的数据结构。

映射表的键是个字符串，表示属性名，并且可以是任意字符串（包括空），不要求是合法的 JS 标识符。
只有合法的 JS 标识符可以用圆点表示法 `map.fontSize` ，否则只有用下标表示法 `map['font-size']`；如果属性名是个变量，也要用下标表示法 `map[propName]`。

映射表的值的类型是任意的，包括函数、null、undefined。

所有的属性总是公开可访问的。

一些基本操作：
* 创建空映射表或空对象： `var map = Object.create(null)` 或 `var map = {}`（两者的不同在后面解释）。
* 读属性 `var v = map.prop` 或者 `var v = map['prop']`
* 增加/修改属性 `map.prop = value` 或者 `map['prop'] = value`
* 删除属性 `delete map.prop` 或者 `delete map['prop']`
* 取得所有的属性名 `var keys = Object.keys(map)`，返回一个字符串的数组。
* 属性是否存在 `if ('prop' in map)`；不至于混淆时也可以用 `if (map.prop !== undefined)` 或 `if (map.prop)`。
* 遍历 `for (var name in map) { map[name] = ... }`

用类似 Map 的结构来实现 JS 对象，给予了 JS 对象极大的灵活性。

JS 对象可以用字面量来表示，这也来带了很大的便利性。例如，对象字面量可以用来实现”命名参数“：
`createElement({tag: 'img', src: 'a.png', width: 100, height: 100, alt: '...'})`。
这特别适用于参数数量较多，或很多参数是可选的情形。
对象字面量还演变出一种流行的跨平台数据文件格式 - JSON。

ES5 中没有专门的 Map 数据结构，一般都是拿对象来代替。但这也有一些缺点：
* 键不能是字符串以外的类型
* 不支持弱引用，类似 Java 的 WeakHashMap

ES2015(ES6) 有了专门的 [Map、Set、WeakMap 数据结构](http://ju.outofmemory.cn/entry/49982)，解决了上述问题。

## 对象字面量
JS 中很方便的一个特性就是对象字面量，应该大量地使用。
例子：

```js

function createCircle(r) {
  var circle = {
    // 数据成员
    radius: r,
    // 方法
    getArea: function () {
        var radius = this.radius;
        return Math.PI * radius * radius;
    },
    
    // getter 和 setter，ES5
    get area() { return this.getArea(); },

    set area(a) { this.radius = Math.sqrt(a / Math.PI); },

    // 简略的方法语法，ES2015
    scale(s) { this.radius = this.radius * s; }
  };
  return circle;
}

var c1 = createCircle(3);

```

不过，字面量上的方法都是对象的直接属性，会占用不必要的内存。下面会讨论解决的方法。

## 基于原型的面向对象
### 基本特征

什么是基于原型的面向对象？我们按照 JS 中的实现总结如下：

* 没有类的概念，可以直接创建对象（通过字面量或者逐步添加属性）。
* 一个对象可以直接继承另一个对象，后者称为前者的原型。这个过程可以递归，形成原型链。
* 读取某对象的一个属性（包括调用方法）时，如果它本身没有定义，则沿着其原型链向上查找；如果它本身定义了，则会隐藏原型链上的同名属性。
  这样就实现了继承和覆盖。写入一个属性时，不考虑原型，直接写入对象本身。
* 一个对象最多只有一个原型，也就是单继承。但多个对象可以共有一个原型。
* 对象的原型可以在运行时被任意变更。

可以看出，基于原型的面向对象机制非常简单，没有类、构造器、接口等概念；而且也非常灵活，原型中增删的属性会立即反映到到派生的对象上。

JS 本质上只支持基于原型的面向对象，并没有类的概念。JS 最初创建的时候，为了实现起来简单，采用了基于原型的面向对象。
但当时出于营销的考虑，JS 被要求模仿 Java 的语法，因此糅合了一些基于类的面向对象的特征，主要是引入了构造器。
最终的结果是很糟糕的：两种面向对象风格都不完善，用起来都不顺手，造成了长达十几年的混乱。
直到最近，ES5 才完善了基于原型的面向对象，到 ES6 实现了基于类的面向对象。

### 实际的例子
下面我们利用基于原型的面向对象创建一些“圆”对象。

```js
//”圆“的原型
var circle = {
  r : 0, //这其实是不太必要，派生对象总是会覆盖它
  getArea: function () { return this.r * this.r * 3.14; }
};
var c1 = Object.create(circle);
c1.r = 1; //覆盖了circle.r
var c2 = Object.create(circle);
c2.r = 2;
c1.getArea(); //3.14 //getArea 读到的是 c1.r 而不是 circle.r
c2.getArea(); //12.56
```
[Object.create(prototype)](https://developer.mozilla.org/zh-CN/docs/JavaScript/Reference/Global_Objects/Object/create) 函数是 ES5 引入的，根据给定的原型创建一个新对象。在 ES5 之前，这是无法直接做的。

还可以进一步继承：
```js
//positionedCircle 增加了圆心坐标和求原点到圆心距离的方法
var positionedCircle = Object.create(circle);
positionedCircle.x = positionedCircle.y = 0;
positionedCircle.getRange = function () { 
  return Math.sqrt(this.x * this.x + this.y * this.y); 
};
var c3 = Object.create(positionedCircle);
c3.r = c3.x = c3.y = 2; //覆盖 positionedCircle.x/y
c3.getArea(); //12.56 //circle 的方法仍然有效
c3.getRange(); //2.828
```

这样，整体的继承关系可以用缩进表示为：
```
Object.prototype
  circle
    c1
    c2
    positionedCircle
      c3
```

通过字面量创建的对象，如 circle，其原型总是 `Object.prototype`，基本上这就是所有 JS 对象的根原型了。

### 工厂方法
不过，上面的代码还有一个不足：创建对象需要的步骤太多。相比之下，等效的基于类的OO就只要一个表达式 `new Circle(5)`。

所以，基于原型的OO通常会提供“工厂方法”来创建对象，例如

```js
circle.New = function NewCircle(r) {
  var c = Object.create(this);
  c.r = r;
  return c;
};
var c4 = circle.New(4);
c4.r; //4
```
或者建立一种通用的“工厂方法”，利用命名参数：
```js
function newObject(prototype, args) {
  var c = Object.create(prototype);
  for(var key in args) {
    c[key] = args[key];
  }
  return c;
}
var c5 = newObject(positionedCircle, {x:1,y:2,r:3});
c5.getRange(); //2.236
```

### 基于原型的面向对象模式

从上面的例子中可以看出，基于原型的OO有一个模式：行为（即方法）通常定义在原型对象上，而数据则定义在末端的派生对象上；原型对象通常是单例的，而末端的派生对象则可以有许多。用基于类的OO来类比，则前者相当于类，后者相当于实例。

JS 语言的内置对象基本上都应用了这个模式，例如数组的原型是 `Array.prototype` 对象，各种数组方法，如 push, concat, forEach, 都定义在这个对象上。

但是，有一些设计模式将方法也定义在末端派生对象上，例如：
```js
//1.直接创建普通对象
function makeCircle1(r) {
  return {
    r : r,
    getArea: function () { return this.r * this.r * 3.14; }
  };
}
//2.通过闭包封装数据
function makeCircle2(r) {
  return {
    getRadius : function() { return r; },
    getArea: function () { return r * r * 3.14; }
  };
}
```

这样做代码固然是简单，但也有个很大的缺点：对象的内存占用增加了，因为（1）对象要增加几个指向方法的条目（2）每次创建对象都要创建新方法 -- 尤其是闭包模式，这是不可避免的。

通过闭包封装数据还有一个缺点 -- 不易调试，因为闭包捕获的变量对调试器也不可见（除非正好步入了闭包中）。而在 Java 等语言中，私有字段对调试器还是可见的，也可以通过反射获得。

那么怎么解决 JS 对象缺乏私有成员的问题呢？很多人采用命名约定，例如下划线开头的是私有成员。我赞成这种做法。毕竟，私有成员只是一种编码契约，并不提供运行时安全，没必要为此走得太远。

### 运行时类型鉴别（RTTI）

运行时类型鉴别（RTTI）的方法是 `base.isPrototypeOf(derived)`，可以判断 base 是否在 derived 的原型链上。
这有点类似基于类的 Java 中的 `instanceof` 操作符。
```js
circle.isPrototypeOf(c1); //true
circle.isPrototypeOf(c3); //true
positionedCircle.isPrototypeOf(c3); //true
positionedCircle.isPrototypeOf(c1); //false
circle.isPrototypeOf(circle); //false
Object.prototype.isPrototypeOf(circle); //true
```

### 动态修改类型

由于原型也是普通对象，我们可以在运行时给它添加新的方法：
```js
positionedCircle.moveBy = function moveBy(dx, dy) { this.x += dx; this.y += dy;}
c3.moveBy(-1, -1);
c3.x; //1
```
### 属性 `__proto__`
JS 对象的 `__proto__` 属性可用于读、写其原型对象。在 ECMAScript 规范中，对象的原型用`[[Prototype]]` 内部属性来表示，在 `__proto__` 出现之前，没有办法直接操作这个属性。

`__proto__` 在 FF 和 webkit/Chrome 很早就实现，IE11 和 Edge 也实现了，并在 ES6 标准化。
同时，ES6 引入了 [`Object.setPrototypeOf(o, prototype)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf) 和 [`Object.getPrototypeOf(o)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/GetPrototypeOf)，与 `__proto__` 属性等效。

利用它可以动态改变已有对象的原型：
```js
c1.__proto__ = positionedCircle; //动态变更原型
c1.x = c1.y = 1;
c1.getRange(); //1.414
c1.getArea(); //3.14 //circle 的方法仍然有效
```

`__proto__` 还可以用于对象字面量，极大地简化对象创建，很多情况下使工厂方法变得不必要：
```js
var c6 = {__proto__: positionedCircle, x:1, y:1, r:2};
```

### 无原型的对象
几乎所有 JS 对象的原型链的尽头都是 `Object.prototype`，但这不是绝对的，完全可以创建无原型的对象：`Object.create(null)`或`{__proto__: null}`。

无原型对象有什么用呢？我能想到的一个用处是：作为真正的 Map 数据结构。因为普通对象从 `Object.prototype` 继承了许多属性，用做 Map 时会有意想不到的结果。

```js
//从用户 id 到用户信息的 Map
var users = {};
function setUser(user) {
  users[user.id] = user;
}
function getUser(id) {
  return users[id];
}
setUser({id: 'tiger', name: '老虎'});
console.dir(getUser('tiger'));
console.dir(getUser('constructor')); //??? 应该没这个用户
```

`constructor` 正是从 `Object.prototype` 继承的一个属性，我们当然不希望将它误当做用户对象。所以，将 JS 对象用做 Map 数据结构时，最好使用无原型对象。

## 基于类的面向对象
到 ES5 为止，JS 并不真正支持基于类的面向对象，仅仅是在基于原型的体制上做了一点包装，看起来有点像 Java。

### 基本构造
JS 中基于类的面向对象主要靠以下构造来支持：
* `new` 操作符和构造函数

    构造函数也是普通函数，但调用方式不同，即通过 new 来调用：`new ClassName(arg)`，这与其它OO语言类似。调用时，系统创建一个新的空对象，作为 `this` 参数传给构造函数，构造函数负责初始化其属性。构造函数也被称为“伪类”，或简称“类”，但其实与真正的类相去甚远。

* 构造函数的`.prototype` 属性

    调用构造函数时系统创建的新对象，其原型被自动设置为构造函数的`.prototype` 属性（如`ClassName.prototype`）。事实上系统自动为每个函数提供一个`.prototype` 属性，可以在它上面添加属性和方法。当然，也可以将`.prototype`完全替换掉，效果没有什么不同。

* `instanceof` 操作符

    `instanceof` 是 `isPrototypeOf()` 函数以外的另一个 RTTI 工具，明显是模仿 Java。前者作用于构造函数而不是原型，不过两者还是有紧密联系的：当 `ClassName.prototype.isPrototypeOf(obj) === true` 时，`obj instanceof ClassName === true`。

JS 自带的 API 中大量利用了这种方式，例如数组的构造器是 `Array`，原型是 `Array.prototype`，创建数组的语法是`new Array(5)`。

### 实际的例子
下面我们“基于原型的面向对象”中的例子改写为基于类的方式。

```js
//”圆“的构造器
function Circle(r) {
  //new 方式调用时，系统创建对象，并绑定到 this。
  //可以在这里初始化实例的字段。
  this.r = r;
  //尽管也可以在这里将方法直接定义到 this 上，但如前所述，会占用更多内存。
  //构造函数无需返回值
}
//Circle.prototype 是系统提供的属性，自动成为新建对象的原型，
//所以将方法定义在这里。注意 this 不能省略。
Circle.prototype.getArea = function () {
  return this.r * this.r * 3.14; 
};
var c1 = new Circle(5); //
c1.getArea(); //78.5

//RTTI验证
Circle.prototype.isPrototypeOf(c1); //true
//系统提供的.prototype 自动继承 Object.prototype
Object.prototype.isPrototypeOf(Circle.prototype); //true
c1 instanceof Circle; //true

//继承的类，有位置的圆
function PositionedCircle(r, x, y) {
  //调用基类构造器，也就继承了父类的字段
  Circle.call(this, r); 
  //增加子类的字段
  this.x = x;
  this.y = y;
}
//为了继承父类的方法，要让子类的 .prototype 继承父类的 .prototype，
//这里暴露了基于原型的本质。
PositionedCircle.prototype = Object.create(Circle.prototype);
// 修正 .prototype.constructor 的指向。虽然没什么大用。
PositionedCircle.prototype.constructor = PositionedCircle;

//定义子类的方法。
PositionedCircle.prototype.getRange = function() {
  return Math.sqrt(this.x * this.x + this.y * this.y); 
};
var c2 = new PositionedCircle(1,1,2);
c2.getArea(); //3.14
c2.getRange(); //2.236

//RTTI验证
c2 instanceof PositionedCircle; //true
c2 instanceof Circle; //true
Circle.prototype.isPrototypeOf(c2); //true
```

基于类的方式有一个隐患：构造器是普通函数，也可以在没有 `new` 的情况下调用，这时 `this` 就成了全局对象，创建的字段就成了全局变量！所以为了防止误用，一方面应该把构造器首字母大写，其它函数小写，另一方面可以在构造器开头检查 this 是否为全局对象。

### ES2015(ES6) 中的类

```js
//”圆“的构造器
class Circle {
  // r = 0; // 这种类似 Java 的成员初始化方法还是不支持的。
  // 构造器。constructor 在此处是个关键字，而非普通函数。
  constructor(r) {
    //可以在这里初始化实例的字段。
    this.r = r;
  }
  // 方法的定义。自动成为 Circle.prototype 上的属性。
  // 注意不需要 function 关键字，也没有“:”。
  getArea() {
    return this.r * this.r * 3.14; 
  }
}

var c1 = new Circle(5);
c1.getArea(); //78.5

//RTTI验证
Circle.prototype.isPrototypeOf(c1); //true
c1 instanceof Circle; //true

// 继承的类，有位置的圆
class PositionedCircle extends Circle {
  constructor(r, x, y) {
    // 调用基类构造器，必须在访问 this 前调用。super 在此处是个关键字。
    super(r); 
    // 增加子类的字段
    this.x = x;
    this.y = y;
  }

  // 定义子类的方法。
  getRange() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
}

var c2 = new PositionedCircle(1,1,2);
c2.getArea(); //3.14
c2.getRange(); //2.236

//RTTI验证
c2 instanceof PositionedCircle; //true
c2 instanceof Circle; //true
Circle.prototype.isPrototypeOf(c2); //true
```

可以看出，ES2015 中的类和的语法很接近 Java，比 ES5 中模拟类的语法简洁了不少。
不过两者的语义几乎是等效的，所以 Babel 等编译器可以把 ES2015 代码编译为 ES5 的代码。


### 静态成员
直接定义在伪类上的属性就是静态成员。前面讲到的 `.prototype` 属性，`Object.create()`, `Object.keys()`, `Array.isArray()` 等函数都是静态成员。

这与Java等语言的静态（static）成员是类似的。不过有一点不同：JS 类的静态成员不能通过其实例调用（道理应该很简单）。

### 继承内置类型
前面提到的面向对象的做法，并非能适用于一切类型。JS 的内置类型，例如 `Array`, `Function` 等，在 ES5 时期是不可被继承的。
论及整个 Web 平台时，包括 Element 等类型也是无法被继承的。我们只能用一些动态修改 `__proto__` 这样的技巧来间接实现。

如果我们尝试用 ES5 的方法继承 Array 类型：

```js
function ArrayEx(length) {
  Array.call(this, length);
}
ArrayEx.prototype = Object.create(Array.prototype);

var aa = new ArrayEx(3);

// 鉴定类型
aa instanceof Array; // true; 但别高兴太早。
Array.isArray(aa); // false; 不是数组！
aa.length; // 0; 怎么回事？！
aa[0] = 5; // 好吧，写入一个元素试试。
aa[0]; // 5; 似乎成功了！
aa.length; // 0; 不行...
aa.forEach(function (e) { console.log(e) }); // 什么都没有输出。
```

改用 ES2015 的方法：

```js
class ArrayEx6 extends Array {
  constructor(length) {
    super(length);
  }
  // 增加一个方法
  get last() { return this.length ? this[this.length - 1] : undefined; }
}

var aa = new ArrayEx6(3);
Array.isArray(aa); // true;
aa.length; // 3; 成了！
aa[3] = 4;
aa.last; // 4; 很好！
```

目前，继承内置类型的唯一办法就是使用 ES2015 的语法。

### 基于原型还是基于类

可以看出，基于类的方式与基于原型的方式达到的效果类似，但本质还是基于原型。
那么，JS 中到底那种方式更好一些呢？很多人认为[基于原型更好](http://stackoverflow.com/questions/2800964/benefits-of-prototypal-inheritance-over-classical)。

在 ES5 的时代，我会同意基于原型更好。比起纯粹的基于原型，伪类更加复杂，多了不少概念，绕了很大的弯子。
比起真正的基于类的语言，语法又很怪异：没有 class 关键字，定义字段和调用父构造器也很怪，暴露了不少基于原型的细节（prototype 属性）。

而且在 ES5 之前，情况更糟：还没有 `Object.create()`。在基于原型的方向，由于构造函数是唯一可以指定对象原型的方式，所以也离不开构函数，不是纯粹的基于原型；在基于类的方向，实现继承的 `PositionedCircle.prototype = Object.create(Circle.prototype)` 之类的也得改为
`PositionedCircle.prototype = new Circle(0)`，这不但更难理解，还增加了一个不必要的继承层次。
因此，面向对象机制就成为 JS 中被批评最多的问题之一，而且似乎也造成 JS 开发者中面向对象的使用明显不足。

不过，在 ES2015 引入了专门的类语法后，增进了代码的可读性，便于书写文档注释，这就使得基于类的方式更为可行。

### 继承的局限性

尽管继承在一些时候很有用，但是必须强调一点：尽量少用继承！无论是基于类还是基于原型。这是从其它编程语言的发展史中得出的经验教训。

假定我们要实现一个文本编辑器类（`TextEditor`），它要能产生一些事件，供客户代码来监听。为此我们还实现了一个用来发送事件的类 `EventEmitter`：

```js
class EventEmitter {
  // 注册事件处理器
  on(type/*事件类型，string */, handler/* 事件处理函数*/) { /* ... */ }
  // 产生事件
  emit(type/*事件类型，string */, ...args /* 事件的参数 */) { /* ... */ }
}
```

如果用继承的方式，就是这样：

```js
class TextEditor1 extends EventEmitter {
  deleteSelection() {
    //触发事件
    this.emit('change');
  }
}

// 使用
var editor = new TextEditor1();
editor.on('change', function() { /* ... */  });
```

由于 JS 只支持单继承，EventEmitter 这个相对外围的功能就占据了这唯一的机会。
此外，emit 方法也没必要作为公共的 API，因为客户代码并不会直接产生事件。

不用继承，那么用什么呢？方法有多种，针对这里的具体情况，可以选择组合或者覆盖。

#### 组合

```js
class TextEditor2 {
  constructor() {
    // EventEmitter 变成成员。前置下划线表示私有成员，这是个惯例。
    this._em = new EventEmitter();
  }

  deleteSelection() {
    // 触发事件，注意有一层间接
    this._em.emit('change');
  }

  // 注册事件。简单包装一下。
  // 注意，EventEmitter.emit() 方法不再暴露出来。
  on(type, handler) { this._em.on(type, handler); }
}
```

尽管组合会多出少量包装用的代码，但会使得代码更合理、更灵活。

#### 覆盖

如果预料事件处理的代码是相对固定的，不需要动态增删处理器，则可以更简单地使用“覆盖”法。
这是利用了 JS 的“对象的自有属性会覆盖原型上的同名属性”这一规则。

```js
class TextEditor3 {
  deleteSelection() {
    // 触发事件
    this._emitChange();
  }

  // 这是留给客户代码的事件监听器。默认什么也不做。
  // 注意这个方法是定义在原型上的。
  onChange() { }

  // 私有方法。调用事件监听器。
  // 想一想为什么要捕获异常？
  _emitChange() {
    try {
      this.onChange();
    } catch(e) {
      console.log(e);
    }
  }
}

// 客户代码
var editor = new TextEditor3();
// 注册事件监听器。覆盖原型上的方法。
editor.onChange = function() { /* ... */  };

```

在其它语言中也有类似的做法。例如 Android 的 `Activity` 类有 `onTouchEvent()` 方法，子类可以通过覆盖此方法来处理触摸事件。
由于 JS 的动态特性，无需继承就可以达到相同的目的。

## 命名空间和模块模式
JS 运行环境的全局变量（包括函数）太多了，在浏览器中尤其如此（输入`this`看结果），新出现的 web 技术还在不断扩大这个名单：localStorage、Worker、URL、Blob、FileReader... 一些著名JS 库也会创建自己的全局变量，如 jQuery。因此，如果像前面那些例子一样，用英语常用词作为全局变量的名字，那就太冒险了。让我们面对现实：常用词已经被浏览器预定了，简单前缀+常用词已经被其它 JS 库预定了。

幸好，有几种技术可以解决这个问题，包括命名空间、CMD模块、AMD模块等。这里我们只讲命名空间，因为它比较简单，而且在浏览器中工作得很好（不适用node.js，请按其惯例操作）。

JS 并不直接支持命名空间。Java 和 C# 中命名空间都是用 '.' 分隔的标识符，JS 可以用对象来模拟。例如 `java.util.HashMap` 这个 Java 类用 JS 实现的话，`java` 和 `util` 都是普通对象，而 HashMap 是个伪类。

```js
//HashMap.js
//用自执行函数包裹代码是个好习惯，这样其局部变量如 ju、HashMap 不会进入全局作用域。
(function() {
// 仅当 java 和 java.util 不存在时才初始化，这样允许在多个 JS 文件中共同定义一个命名空间
this.java = this.java || {};
var ju = this.java.util = this.java.util || {}; //取个短的别名 ju 方便后面使用

//构造函数。先定义在局部作用域，方便内部引用。
function HashMap() {
  //...
}
ju.HashMap = HashMap; //“导出”了 HashMap 类

HashMap.prototype.get = function get(key) {
}
HashMap.prototype.set = function set(key, value) {
}
//...
})();

//使用的地方, testHashMap.js
(function() {
//JS 没有 Java 的 import 或 C# 的 using，为了便于使用，取一个局部变量作为别名。
//同样放到自执行函数中，否则 HashMap 又成为全局变量了。
var HashMap = java.util.HashMap;
function testHashMap() {
  var map = new HashMap();
  map.set('JS', 'JavaScript');
  console.log(map);
}
})();
```

不过，这样的 JS 的命名空间和 Java、C# 毕竟还是有区别：后者只是一种语法，几乎没有运行时开销；而前者是实际的对象，每个 '.' 都意味着一次属性查找，这是有运行时开销的。所以取别名不只是为了简洁，还有性能的考虑。考虑到命名空间实际上是个整体，我主张用'_'代替'.'，例如 `java_util.HashMap`，这不但提高了性能，还进一步降低了命名冲突的可能。

尽管命名空间模式解决了问题，但还是有些不足：语法有点晦涩，仪式性的代码有点多。我们将会看到，typescript 改善了语法，ES6 也可能做一些改进。

## 类型策略
在设计 API 的时候，如何保证传入的对象的类型符合期望？静态类型语言的编译器/虚拟机会检查类型，我们只需要给参数指定适当的类或接口即可。但 JS 如何呢？有两种常见策略：RTTI 和“鸭子类型”。

### RTTI 策略
该策略利用 `typeof`，`instanceof` 以及 `isPrototypeOf()` 来检查对象是否继承自规定的基类/原型。这是一种较强的检查，效果类似静态类型语言的检查。

但 RTTI 策略也有个很大的缺陷。面向对象设计的一个重要经验是：“要针对接口编程而不是针对实现编程”。不幸的是，JS 并没有接口，也就没有检查“是否实现某接口”的工具，所以使用 RTTI 接近于鼓励“针对实现编程”。因此，只建议在非常必要的情况下使用 RTTI。

### 鸭子类型
JS 动态类型的特点，使得设计类型安全的代码变得很困难，不过这也带来了很大的灵活性。JS 经常采用“[鸭子类型](http://zh.wikipedia.org/zh-cn/Duck_typing)”的策略:
> 在程序设计中，鸭子类型（英语：duck typing）是动态类型的一种风格。在这种风格中，一个对象有效的语义，不是由继承自特定的类或实现特定的接口，而是由当前方法和属性的集合决定。

话虽如此，但是如何判断该对象的方法和属性符合期望，却很不容易，还会带来不小的性能开销。所以实际上流行的做法是：基本不做运行时检查，而是通过API文档给出契约，通过单元测试和实际运行来确认是否符合契约。

可以看出，两种策略都有自己的局限性。实际编程中，可以以鸭子类型为主，RTTI为辅。typescript 则提供了静态类型检查，可以较好地补足 JS 的类型策略。

## 扩展阅读

* [重新介绍 JavaScript（JS 教程）](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/A_re-introduction_to_JavaScript#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%AF%B9%E8%B1%A1)

* [JavaScript 中的继承](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Inheritance)