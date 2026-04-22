---
title: "typescript_note"
pubDate: 2016-10-14

tags: []
---
typescript 入门

## 工具

### tsc 命令行编译器
* windows上的两个版本

  一个是官方网站上下载的.msi安装包，一个是通过npm install -g typescript安装的版本。

* 多文件编译及合并

  ts文件之间可以声明静态依赖关系，只要在文件头部给出引用的文件：
  ///<reference path='../core/UndoManager.ts'/>
  tsc可以自动寻找和编译依赖的文件，所以编译时可以只传入一个“根”ts文件，只要从这个文件出发能找到所有需要的文件。
  要小心的是，如果这个引用声明中有任何语法错误，例如引号未闭合、少了结尾的'/'等，编译器会悄悄的忽略这一行，从而产生难以理解的编译错误（也许是个bug）。
  如果文件找不到，则编译器能给出正确的提示。
  虽然一些js文件可以不加修改地作为ts文件编译，但是如果扩展名不改为.ts，则编译器会报错（也许是个bug）。

* 监视文件修改（参考[21]）

  -watch 或 -w <file>

  注意只有npm版本支持此选项。如果windows安装了两个版本，则要从path环境变量中把msi版本的tsc排除掉。

  当使用此选项时，tsc将不会退出。所以它只应该在调试的时候使用。

  另一个办法是利用grunt的监视功能。参考”用grunt编译“。

* sourcemap

  --sourcemap选项
  生成ts和js代码之间的映射关系，这样调试器、console.*、异常就能够定位到ts文件了。
  参考：http://net.tutsplus.com/tutorials/tools-and-tips/source-maps-101/

  chrome 的 dev tool 要打开 "enable source map" 选项。 Firefox 的 dev tool 要打开 "show original source" 选项。

* declaration

  --declaration 用于生成相应的环境声明文件。

### tsc 工程文件 - tsconfig.json [22]
例子[22]：

```
{
    "compilerOptions": {
        "module": "commonjs",
        "noImplicitAny": true,
        "removeComments": true,
        "preserveConstEnums": true,
        "out": "../../built/local/tsc.js",
        "sourceMap": true,
    },
    "files": [
        "core.ts",
        "sys.ts",
    ]
}
```

### 用grunt编译
* grunt

  npm install -g grunt-cli

* package

  在工程根目录下创建 package.json：
  ```
  {
    "name": "projectName",
    "version": "0.1.0",
    "devDependencies": {
      "grunt": "~0.4.1",
      "grunt-exec": "~0.4.0",
      "grunt-contrib-watch": "~0.3.1"
    }
  }
  ```
  grunt-exec 用于执行系统命令，我们用它来执行tsc。
  尽管有一些grunt插件专门用于编译ts（grunt-typescript和grunt-type），但似乎并没有特别的优势，你也可以尝试。

* Gruntfile.js
module.exports = function(grunt) {
grunt.loadNpmTasks('grunt-exec');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.initConfig({
  exec: {
    ts: {
      command: 'tsc --sourcemap --target ES5 --out src/jsgen/main.ts.js src/main/main.ts',
      stdout: true,
      stderr: true
    }
  },
  watch: {
    files: 'src/**/*.ts',
    tasks: ['exec:ts']
  },
});
}

只编译的话，执行
grunt exec
要监视文件修改，自动编译的话，执行
grunt watch

参考：
  http://stackoverflow.com/questions/12725544/how-to-use-the-typescript-compiler-in-the-watch-output-files-mode-tsc-w-on

### atom typescript [23]
这是 atom 编辑器的一个扩展，可以支持 TS 的自动完成、跳转、重构等。以下简称ATS。

#### 安装
apm install atom-typescript

其它推荐的扩展（https://atom.io/packages/）：
line-ending-converter
linter-htmlhint
atom-beautify
jsdoc: Control-Shift-d to add comment templates
save-session

#### 命令/快捷键
跳转到声明：f12
查找引用：shift+f12
重命名符号：f2
格式化代码：ctrl+alt+l。如果有选中，则只格式化选中部分。
Symbols View: ctrl+r
引用文件：输入 "ref" + tab

#### 工程配置
使用 tsconfig.json，ats 相关的选项有（部分）：
```
{
    "compileOnSave": false,
    "formatCodeOptions": {
        "indentSize": 2,
        "tabSize": 3,
        "newLineCharacter": "\r\n",
        "convertTabsToSpaces": true
    }
}
```

### VS 2012
目前（0.8.3）仅当作代码编辑器就好，编译和调试还不好用。
使用命令行编译，用浏览器调试。

* 设置编译目标为ES5
如果代码里使用了ES5特性，则应该这样做，否则编辑器会提示语法错误。
现在(0.8.3)不能在GUI中设置，要修改vs工程文件，将
<TypeScriptTarget>ES3</TypeScriptTarget>
都改为
<TypeScriptTarget>ES5</TypeScriptTarget>

### sublime text2 + sublime-typescript 插件
插件主页：
  https://github.com/raph-amiard/sublime-typescript
在sublime的插件目录（linux下是 ~/.config/sublime-text-2/Packages）中运行
  git clone https://github.com/raph-amiard/sublime-typescript
然后重启sublime。
如果状态栏上一直显示“Loading typescript plugin”，而 ~/.config/sublime-text-2/Packages/sublime-typescript/lib/typescript/ts.zip
的大小一直很小（下载完后应是4MB左右），这说明下载ts源码出问题了。打开
~/.config/sublime-text-2/Packages/sublime-typescript/core/install.py
找到形如 TYPESCRIPT_SOURCE_LINK = ...
的行，将后面的url下载下来，应该是个zip，解压到
~/.config/sublime-text-2/Packages/sublime-typescript/lib/typescript/
下面，应该有
~/.config/sublime-text-2/Packages/sublime-typescript/lib/typescript/bin
等目录。
然后重启sublime。打开控制台（view菜单），这时应该没有错误了。

### 浏览器中调试
编译时tsc需要使用--sourcemap选项，这样会生成.map文件。
用chrome调试ts代码需要保证开发工具设置中“enable source map"选项选中了（默认未选中）。
参考：http://stackoverflow.com/questions/13569192/typescript-source-map-files-dont-work-with-chrome
  http://www.aaron-powell.com/web/typescript-source-maps

firefox(22)和IE(10)目前尚未支持 sourcemap，所以只能调试生成的js文件。
  firefox的进度：https://wiki.mozilla.org/DevTools/Features/SourceMap

### 浏览器中即时编译
  TypeScript Compile automatically transforms your TypeScript code into JavaScript on the fly
  https://github.com/niutech/typescript-compile

## 源码

## 基本语法
### 参考文献
  TypeScript Language Specification.pdf
  Known breaking changes between 0.8 and 0.9 | https://typescript.codeplex.com/wikipage?title=Known%20breaking%20changes%20between%200.8%20and%200.9

### 类型指定和简单类型
对于一般变量、函数参数、对象属性，可在变量名后面加冒号（:）并跟上类型表达式；
对于一般函数、类和接口的方法的返回值，则是在参数表之后加上 '：' 并跟上类型表达式。

例如：
  var a:number = 2;
  function vote(candidate: string)：string { ... }
  var reports: string[] = [];

类型表达式有内置的、自定义的、推导的。内置类型包括 any, number, string，bool（这是0.8的，0.9改为boolean）, void这几个也是保留字。
其中any的含义是“任何类型”，void仅用于函数返回类型。
自定义类型包括：函数类型、对象类型（也就是接口类型）等，后面逐一描述。
一般对象的类型是Object，一般函数的类型是Function，这两个都是接口。
推导类型主要是数组类型，语法是 typename[]，与java类似。

另一种指定类型的方式是让编译器通过初始化表达式进行类型推断，例如
  var i=0; //i具有类型number
  var a=null; //var a:any
  var b=undefined; //var a:any
  var c={x:0, y:null}; //var c:{x:number; y:any;}
  function squr(i:number) { return i*i; } // 返回类型可省略，因为从return语句的类型可以推断出来

如果变量没有被指定类型，则其类型视为any。除了any类型，对其它类型的使用在编译时都要受到类型检查，这与强类型语言类似。

null和undefined虽然也是类型，但不能用于类型指定，只能作为字面量使用。
值null兼容于任何类型，除了void和undefined类型，也就是说这是合法的：
  var b:bool = null;
值undefined兼容于任何类型，包括void。

### 环境声明 （Ambient declare）
使用 declare 关键字：
  declare var document; //浏览器document对象
  declare var $; //jqurey对象
环境声明可用于声明不是由ts实现的结构，例如js类库、浏览器内置对象等。
由于使用未声明变量在ts中是编译错误，所以这是必要的。

* 接口的环境声明
与一般的接口声明没有区别。declare修饰符是可选的。
但是只声明接口，客户代码无法使用new操作符。

* 类的环境声明
如果希望使用 new SomeClass(...)，而SomeClass是js实现的，那么需要用类的环境声明，接口是不够的，例如：

module m{
declare export class {
  field1:type1;
  constructor(...);
  func();
}
}

也就是说，方法体用";"代替，属性不要初始化。declare是可选的。如果类不在模块中，模块声明和export是不需要的（如果有，则是语法错误）。

* 常用js库的环境声明文件
  https://github.com/borisyankov/DefinitelyTyped
  https://github.com/Diullei/tsd

  安装tsd：
  npm install -g tsd
  进入希望放置d.ts文件的目录，安装想要的库：
  tsd install qunit

### 函数类型表达式
* 一般语法
函数类型表达式的一般形式是：
  (param:paremType,param2:paremType2...) => returnType
  TODO：返回类型可以省略吗？
例如：

  function vote(candidate: string, callback: (result: string) => any) {
  // ...
  }

参数callback的类型就是一个函数类型 (result: string) => any

* 注意
与函数相关的语法结构有3种：
（1）函数类型表达式。就是上面讲的。
（2）函数声明。给出函数签名，但没有函数体。
（3）函数定义。给出函数签名和函数体。
函数类型和函数声明、函数实现的语法上的区别，主要在于返回类型的声明上，前者用箭头，后者用冒号。
为什么有这样的区别？因为类型指定表达式中已经有了冒号，所以函数类型表达式要避免在同一层次上使用冒号。
在对象类型/接口（详见对象类型/接口）中，可以看到这样的函数声明：
 funcName(param:paremType,param2:paremType2...):returnType


### 对象类型表达式（匿名接口）

一般形式是：
  {
    fieldName:fieldType;
    fieldName2:fieldType2;
    method1(paramName:paramType...):returnType;
    method2：(paramName:paramType...)=>returnType;
    ...
  }

注意字段之间是分号分割的，而不是像对象字面量的属性那样用逗号分隔，这是两者的关键区别。
对象类型中的字段可以被声明为可选的，只需在fieldName后加上问号。
如果字段的类型是函数（称为方法），则采用“字段名、参数表、冒号、返回类型”的形式，如同method1那样;
或者采用“字段名、冒号、函数类型表达式”的形式，如method2；这两种形式是等效的。
注意，方法前不要加function关键字。
对象类型中的字段可以被声明为可选的，只需在fieldName后加上问号。

例子：
  var MakePoint: () => {
    x: number; y: number;
  };
意思是，变量MakePoint的类型是个函数，该返回值的类型是个对象，该对象有x、y两个number类型的字段。

如果对象本身还是个函数，则可以声明一个匿名函数字段，也就是
{
  (param:paremType,...):returnType;
  ...
}
如果对象类型只有匿名函数字段，则等效于一个函数类型声明。

ts允许对象类型加入多个同名函数字段，只要它们有不同的参数表，也就是说支持函数重载。

如果一个对象提供了比一个对象类型更多的字段，并不会被认为类型不符合。

### 接口
如果给对象类型命名以便复用，就是接口，语法如下：
  interface IterfaceName {fieldName:fieldType; fieldName2:fieldType2;... }
interface也是关键字。
然后可以将IterfaceName用作类型表达式。

* 例子
例1：
  interface Friend {
    name: string;
    favoriteColor?: string;
  }
  function add(friend: Friend) {
    var name = friend.name;
  }
  add({ name: "Fred" }); // Ok
  add({ favoriteColor: "blue" }); // Error, name required
  add({ name: "Jill", favoriteColor: "green" }); // Ok

例2：
  interface JQuery {
    text(content: string);
  }
  interface JQueryStatic {
    get(url: string, callback: (data: string) => any);
    (query: string): JQuery;
    (ready: () => any): any;
  }
  declare var $: JQueryStatic;
  $.get("http://mysite.org/divContent",
    function (data: string) {
      $("div").text(data);
    }
  );


### 类型推断
* 返回类型推断
  function mul(a: number, b: number) {
    return a * b;
  }
ts推断mul的返回类型是number。

* 实参的形参类型推断
如果$.get被声明为类型：
(url:string, (data:string)=>any)=>any
则
$.get("http://mysite.org/divContent",
  function (data) {
    $("div").text(data); // TypeScript infers data is a string
  }
);

* Contextually Typed Expressions
根据被赋值的变量的类型推断赋值表达式中的类型。
var f: (s: string) => string;
f = function(s) { return s.toLowerCase(); } //s inferred as string


### 类
* 语法
class ClassName {
  modifer filed1 = value1;
  constructor(param:type) {...}
  modifer method1(param:type):returnType { ... }
}
其中 class 是关键字。

字段可以给出初始值，类型可以从初始值推断。与接口一样，字段定义以分号结尾。

修饰符modifer是public或private，省略时默认为public。但这只在编译时检查。

constructor 也是关键字，表示构造器。如果没有声明构造器，则会有一个无参数构造器。

方法定义与接口类似，但因为有了函数体，不再需要分号结尾。

注意，方法和构造器前不要加function关键字。

在方法内部，访问字段或其它方法仍然需要用this关键字，这与js相同。

上述代码翻译为js时，会创建一个名为ClassName的伪类，方法都会定义于ClassName.prototype上。

修饰符modifer还可以是static，这时字段成为（伪）类本身的属性，要通过ClassName.filed访问。

类中的方法也支持重载，但是各个重载版本必须共用一个函数体，详见“重载”。

* 在构造器中定义字段
这是一种方便语法。在构造器形式参数前加上访问修饰符，则会在类中定义同名字段，
并自动将该参数赋值给该字段，例如：
constructor(public param:type) {...}

* 类类型
如果变量的类型是一个（伪）类或者是构造函数，则可用如下类型表达式：
  new(param:type...) => ClassOrInterfaceName
new关键字表明，这是个需要通过new语法调用的函数，并返回某个类或接口的对象。

### 继承
语法与java类似，采用extends关键字：

  class CheckingAccount extends BankAccount {
    constructor(balance: number) {
      super(balance);
    }
    writeCheck(debit: number) {
      this.balance -= debit;
    }
  }

调用父类构造器的方法是super(...)。TODO:如果没有显式调用，编译器是否会自动调用super()？
调用父类属性的方法是super.identifier。
在编译器生成的js代码中，子（伪）类的prototype会链接（chain）到父（伪）类的prototype上。

* 实现接口
类也可以用implements关键字指明它实现了哪些接口，与Java的语法相同。
不过，类不必显式的声明它实现了什么接口，在需要该接口的场合，直接使用该类的实例也是正确的。

* 接口之间的继承
接口可以继承接口，用extends关键字，与Java相同。

### 强制类型转换（type assertion）
语法：
<type> expression
也就是将Java/C#中的圆括号改为尖括号。

### 模块
对应js的模块模式。
* 内部模块

语法：
module M { //模块名M
  var var1 = value1; //模块私有变量
  function func1(...) {...}; //模块私有函数
  class C1 {...} //模块私有类
  export var var2 = value2; //导出变量
  export function func2(...) {...}; //导出函数
  export class C1 {...} //导出类
}

这样创建了一个名为M的模块对象（如果是在全局作用域，则M是个全局对象）
导出的结构都可以用M.name访问。

导出类型可以访问非导出类型，但是不能出现在导出的API中，例如public成员不能是非导出类型。
不过当前的tsc（0.8.3）似乎也不接受类的private成员有非导出类型，尽管局部变量使用非导出类型是没问题的。

module 和 export 都是关键字。

如果不在模块内部而使用了export关键字，编译器会报错“Cannot compile dynamic modules when emitting into single file”，这可能是个bug。

例子：
module M {
var s = "hello";
export function f() {
return s;
}
}
M.f();
M.s; // Error, s is not exported

生成的js代码是：

var M;
(function(M) {
var s = "hello";
function f() {
return s;
}
M.f = f;
})(M||(M={}));

* 外部模块
这是为了产生用于CMD、AMD等系统的模块。
语法上，没有module M {} 构造，但是有顶层的 export 和 import 指令。

### 箭头函数表达式（arrow function expressions）
这也是计划中的ES6特性。
(param,...) => {...}
或者
param => {...}

括号和函数体中的return关键字有时是可选的。

例子：
(x) => { return Math.sin(x); }
(x) => Math.sin(x)
x => { return Math.sin(x); }
x => Math.sin(x)

以上都是等效的。

箭头函数表达式并不仅仅是传统函数表达式的简化写法。语义上的区别是，前者重用了上下文的this值，而后者的this值可以是其它值。

## 高级语法
### 参考文献
  TypeScript Language Specification.pdf

### 声明
* 全局模块
ts总是有一个全局模块，对应于js的全局作用域。

* 成员和类型
ts把语法构造分为两类：成员（members）和类型（types）。
成员包括：变量、函数、模块、构造器（即伪类）；
类型包括：模块、类、接口。

可见，成员都是js原有的东西，类型则是ts新增的概念。
其中模块、类同时对成员和类型有贡献。

* 声明空间
声明空间分为成员声明空间和类型声明空间两种，互相不会冲突。也就是说，可以同时声明同名的成员和类型。例如这是合法的：
module M
{
  interface X { }
  var X;
}
但如果X是个类，则出现语法错误，因为class同时对成员和类型有贡献。

模块同时有成员声明空间和类型声明空间；其它大多数构造只有成员声明空间。

* 模块和接口的合并
对于内部模块，同一模块可以被定义多次，可以分散到多个文件中，只要全名相同，则这些模块定义被合并。
接口也是这样。
多个同名内部模块内的局部成员的名字是不会冲突的，但导出的名字可能会冲突。

* 静态成员和非静态成员在不同的声明空间中
这是合法的：
class C
{
x: number;
static x: string;
}

* 嵌套的模块
模块可以嵌套。
内层模块中的名字会隐藏外部模块中相同的名字。

### 对象类型
类、接口、模块、匿名对象类型都产生了对象类型。

仅有类的成员可以声明为私有的，其它都是公有的。

内部成员完全相同的两个类也是不兼容的。不过这只在编译时检查。

模块不能被声明为实现了某个接口。不过仍有可能对模块进行编译时类型检查，参考：
  http://stackoverflow.com/questions/16072471/why-cant-typescript-modules-implement-or-adhere-to-an-interface-can-i-get-arou

* ts的内置接口
ts的内置接口包括 Object、Function、Number、String、Bool 接口 -- 不要和同名的js伪类混淆。
所有的对象都被认为实现了 Object 接口；函数和构造器被认为实现了 Function 接口；
基本类型number、string、bool被认为实现了Number、String、Bool 接口。

### 函数的进一步讨论
* 重载
实现重载函数的例子是：

function attr(name: string): string;
function attr(name: string, value: string): Accessor;
function attr(map: any): Accessor;
function attr(nameOrMap: any, value: string): any {
  if (nameOrMap && typeof nameOrMap === "object") {
  // handle map case
  }
  else {
  // handle string case
  }
}

也就是在函数体前声明多个函数签名，用分号隔开，最后跟上实际的函数实现。
不过，因为只能共用一个函数体，所以必须检查参数的实际类型。

以上实现的attr函数具有以下类型：
{
  (name: string): string;
  (name: string, value: string): Accessor;
  (map: any): Accessor;
}

* 可选参数和默认值
ES5函数支持可选参数和默认值，ts中一样可以用；还可以在参数后加上问号表示可选参数。
例如：
  redo(step?=1) { }
或者
  redo(step=1) { }
以上是等效的。也可以只给出可选参数但不给出默认值：
  redo(step?) { }

* 变长参数表（Rest Parameters）
参考：
http://stackoverflow.com/questions/12739149/typescript-type-signatures-for-functions-with-variable-argument-counts

语法：
function func(...args: type[]) {
  ...
}

例如 （http://stackoverflow.com/questions/12697275/open-ended-function-arguments-with-typescript）：
function sum(...numbers: number[]) {
    var aggregateNumber = 0;
    for (var i = 0; i < numbers.length; i++)
        aggregateNumber += numbers[i];
    return aggregateNumber;
}

This will then type check correctly with

console.log(sum(1, 5, 10, 15, 20));

* 变长参数表函数的重载
通常希望变长参数表也能接受数组作为参数，这就需要一个重载的版本。但是以下做法是语法错误：
    addProperties(...propNames: string[]);
    addProperties(propNames: string[]) {
    //...
    ｝
两个参数表交换位置、propNames: string[] 改为 propNames: any[]也都是语法错误。
只有这样是允许的：
    addProperties(...propNames: string[]);
    addProperties(propNames) {
    //...
    ｝
但是能否正常工作则不清楚。

## 参考资料

[1] [TypeScript 官方网站](http://www.typescriptlang.org/)

[2] [TypeScript 语言规范（英）](http://www.typescriptlang.org/Content/TypeScript%20Language%20Specification.pdf)

[3] [TypeScript 手册（英）](http://www.typescriptlang.org/Handbook)

[4] [TypeScript 源码库（github）](https://github.com/Microsoft/TypeScript)

[5] [TypeScript - codeBelt（一些 typescript 教程（英））](http://www.codebelt.com/category/typescript/)

[6] [TypeScript —— Web前端开发的救赎](http://blog.csdn.net/he_8134/article/details/10954049)

[7] [JavaScript 大师 Nicholas C. Zakas 谈 TypeScript](http://www.csdn.net/article/2012-10-11/2810645-Thoughts-on-TypeScript)

[21] [how to use the typescript compiler in the watch output files]( http://stackoverflow.com/questions/12725544/how-to-use-the-typescript-compiler-in-the-watch-output-files-mode-tsc-w-on)

[22] [tsconfig.json](https://github.com/Microsoft/TypeScript/wiki/tsconfig.json)

[23] [atom-typescript](https://github.com/TypeStrong/atom-typescript)