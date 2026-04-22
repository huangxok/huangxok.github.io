---
title: "js_prototype"
pubDate: 2017-03-29

tags:
  - 原型
  - prototype
  - __proto__
---
## 原型基础

例子

```javascript
function Foo(){};
console.log(Foo.prototype.constructor === Foo) //true
```

```javascript
function Foo();
var foo = new Foo();
console.log(foo.__proto__ === Foo.prototype) //true
```

```javascript
function Foo(){};
console.log(Foo.prototype.__proto__ === Object.prototype); // true
```

Foo.prototype 是Object预创建的一个对象，是Object创建的一个实例，所以，Foo.prototype.__proto_ 是Object.prototype的引用

原型链：

```javascript
     __proto__                   __proto__                        __proto__
foo  ---------- Foo.prototype --------------- Object.prototype ------------ null

```

在javascript中，函数式特殊对象，所有函数都是构造函数Function的实例

```javascript
function Foo() {};
console.log(Foo.__proto__ === Object.prototype); //false
console.log(Foo.__proto__ === Function.prototype); // true
```

函数Foo.__proto_ 指向到 Function.prototype, 说明函数 Foo 是 Function的一个实例

```javascript
 function Foo(){};
 console.log(Foo.__proto__ === Function.prototype); //true
 console.log(Foo.prototype.__proto__ === Object.prototype);//true
```

Foo.prototype 是Object预定义的对象，构造函数为Object,所以__proto__指向 Object.prototype

```javascript
     __proto__                   __proto__                        __proto__
foo  ---------- Foo.prototype --------------- Object.prototype ------------ null
     __proto__                   __proto__                        __proto__
Foo  ---------- Function.prototype --------------- Object.prototype ------------ null
            __proto__                          __proto__                       __proto__
Function  -------------  Function.prototype --------------- Object.prototype ------------ null
         __proto__                         __proto__                        __proto__
Object  ------------ Function.prototype --------------- Object.prototype ------------ null
```

Object、Function、Array 等这些函数，他们的构造函数都是 Function 的实例


基于原型链的基础

```javascript
function A(){  
  console.log('A init')
}
A.prototype.play = function(){
  console.log('A play');
}
function B(){
  console.log('B init')
}
function C(){}

C.prototype = A.prototype;
B.prototype = new C();
C.constructor = C;
var B = new B();
B.play();
//output B init >> A play
```

## ES6 class

### ES6的写法

```javascript
class Animal {
    // 构造方法，实例化的时候将会被调用，如果不指定，那么会有一个不带参数的默认构造函数.
    constructor(name,color) {
      this.name = name;
      this.color = color;
    }
    // toString 是原型对象上的属性
    toString() {
      console.log('name:' + this.name + ',color:' + this.color);

    }
  }
   
 var animal = new Animal('dog','white');
 animal.toString();

 console.log(animal.hasOwnProperty('name')); //true
 console.log(animal.hasOwnProperty('toString')); // false
 console.log(animal.__proto__.hasOwnProperty('toString')); // true

 class Cat extends Animal {
  constructor(action) {
    // 子类必须要在constructor中指定super 方法，否则在新建实例的时候会报错.
    // 如果没有置顶consructor,默认带super方法的constructor将会被添加、
    super('cat','white');
    this.action = action;
  }
  toString() {
    console.log(super.toString());
  }
 }

 var cat = new Cat('catch')
 cat.toString();
 
 // 实例cat 是 Cat 和 Animal 的实例，和Es5完全一致。
 console.log(cat instanceof Cat); // true
 console.log(cat instanceof Animal); // true

```

### ES5的写法（此处实现为typescript编译)

```javascript
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Animal = (function () {
    // 构造方法，实例化的时候将会被调用，如果不指定，那么会有一个不带参数的默认构造函数.
    function Animal(name, color) {
        this.name = name;
        this.color = color;
    }
    // toString 是原型对象上的属性
    Animal.prototype.toString = function () {
        console.log('name:' + this.name + ',color:' + this.color);
    };
    return Animal;
}());
var Cat = (function (_super) {
    __extends(Cat, _super);
    function Cat(action) {
        var _this = 
        // 子类必须要在constructor中指定super 方法，否则在新建实例的时候会报错.
        // 如果没有置顶consructor,默认带super方法的constructor将会被添加、
        _super.call(this, 'cat', 'white') || this;
        _this.action = action;
        return _this;
    }
    Cat.prototype.toString = function () {
        console.log(_super.prototype.toString.call(this));
    };
    return Cat;
}(Animal));
```

类的**prototype**属性和**__proto__**属性
在 class 中。同时具有 __proto__ 和 prototype 两个属性，存在两条继承链。

* 子类的 __proto__ 属性，表示构造函数的继承，总是指向父类。

* 子类的 prototype 的 __proto__ 属性表示方法的继承，总是指向父类的 prototype 属性

```javascript
class Cat extends Animal {}
console.log(Cat.__proto__ === Animal); // true
console.log(Cat.prototype.__proto__ === Animal.prototype); // true
```

第一条 Cat.__proto__ === Animal 这条原型链

```javascript
class Cat extends Animal {
   construcotr() {
     return Animal.__proto__.call(this);
  }
}
```

第二条对原型链 Cat.prototype.__proto__ === Animal.prototype 完成方法的继承

```javascript
Cat.prototype.__proto__ = Animal.prototype
```

特殊情况：

- 1

```javascript
 class A extends Object {}
 console.log(A.__proto__ === Object); // true
 console.log(A.prototype.__proto__ === Object.prototype); 
```

A继承Object，A的__prototype__ 指向父类Object. A的 prototype.__proto__ 指向父类Object的prototype

- 2

```javascript
class Cat {}
console.log(Cat.__proto__ === Function.prototype); //true
console.log(Cat.prototype.__proto__ === Object.prototype); //true
```

由于Cat不存在任何继承，就相当于一个普通函数，由于函数都是Function 的实例，所以 Cat.__proto__指向 Function.prototype. 第二条继承链指向父类（Function.prototype） 的prototype属性，所以 Cat.prototype.__proto__ === Object.prototype. Cat调用后会返回Object实例，所以 A.prototype.__proto__ 指向构造函数（Object）的prototype

- 3

```javascript
class Cat extends null {};
console.log(Cat.__proto__ === Function.prototype); // true;
console.log(Cat.prototype.__proto__ === null); //true
```

Cat是一个普通函数，所以继承 Function.prototype .第二条继承链不继承任何方法，所以 Cat.prototype.__proto__ == null


原型三角关系 prototype、proto(__proto__)、constructor
(原型三角关系图地址)[https://www.processon.com/embed/579c671de4b0e645bc6a0c10]

```javascript
    -----                   -----
    |对象|                  |函数|
    -----                   ----- 
                                        ------------------------------------------
                                        |代码：function Foo(){};var f1 = new Foo()|
                                        ------------------------------------------
    ----               ----------                         
    |f1| ------------->|Foo(继承)|
    ----               ----------
     |
    proto
     |
     ∨ 
    ---------------  constructor    ---------
    |Foo.prototype| --------------> |  Foo  | ----------------------proto--------------
    |             | <-------------- |       |               |                         |   
    ---------------  prototype      ---------               |                         ∨ 
     |                                 |                 ----------               ---------------------
     |   proto                     constructor --------->|Function|--prototype -->|Function.prototype |
     |                                 |                 |        |<-constructor--|                   |      
     |                                 |                 ----------               ---------------------
     ∨                                 ∨                                              ∧             |
    ------------------ constructor -----------                                        |             |
    |Object.prototype|  -------->  |  Object |                                        |             |
--- |                |  <--------  |         |---------------------proto---------------             |
|   ------------------  prototype  -----------                                                      |
|           ∧                                                                                       |
|           |                                                                                       |
proto       -----------------------------------proto-------------------------------------------------
|
|     -------  
----->| null|
      -------

```

参考链接：
[ECMAScript 6 的新特性](https://segmentfault.com/a/1190000002904199)
[https://github.com/maxzhang/maxzhang.github.com/issues/5](https://github.com/maxzhang/maxzhang.github.com/issues/5)
[http://www.cnblogs.com/xiaohuochai/p/5721552.html](http://www.cnblogs.com/xiaohuochai/p/5721552.html)