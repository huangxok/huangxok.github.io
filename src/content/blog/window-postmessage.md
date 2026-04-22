---
title: "window-postmessage"
pubDate: 2016-11-09

tags:
  - postmessage
  - message
  - h5API
  - web通信
---
# window.postMessage 

跨文档通信 API（Cross-document messaging）。

这个API为window对象新增了一个window.postMessage方法，允许跨窗口通信，不论这两个窗口是否同源。

举例来说，父窗口aaa.com向子窗口bbb.com发消息，调用postMessage方法就可以了。

```javascript
  var top = window.open('http://bbb.com', 'title');
  top.postMessage('Hello World!', 'http://bbb.com');
```

postMessage方法的第一个参数是具体的信息内容，第二个参数是接收消息的窗口的源（origin），即“协议 + 域名 + 端口”。
也可以设为*，表示不限制域名，向所有窗口发送。

子窗口向父窗口发送消息的写法类似。
```javascript
  window.opener.postMessage('Nice to see you', 'http://aaa.com'); 
```
父窗口和子窗口都可以通过message事件，监听对方的消息。
```javascript
  window.addEventListener('message', function(e) {
    console.log(e.data);
  },false);
```

**message**事件的事件对象**event**，提供以下三个属性
* event.source：发送消息的窗口
* event.origin: 消息发向的网址
* event.data: 消息内容

下面的例子是，子窗口通过event.source属性引用父窗口，然后发送消息。
```javascript
  window.addEventListener('message', receiveMessage);
  function receiveMessage(event) {
    event.source.postMessage('Nice to see you!', '*');
  }
```
上面代码有几个地方需要注意。
首先，receiveMessage函数里面没有过滤信息的来源，任意网址发来的信息都会被处理。
其次，postMessage方法中指定的目标窗口的网址是一个星号，表示该信息可以向任意网址发送。
通常来说，这两种做法是不推荐的，因为不够安全，可能会被恶意利用。

**event.origin**属性可以过滤不是发给本窗口的消息。

```javascript
  window.addEventListener('message', receiveMessage);
  function receiveMessage(event) {
    if (event.origin !== 'http://aaa.com') return;
    if (event.data === 'Hello World') {
        event.source.postMessage('Hello', event.origin);
    } else {
      console.log(event.data);
    }
  }
```

# postmessage读取LocalStorage

下面是一个例子，主窗口写入iframe子窗口的localStorage。
```javascript
  window.onmessage = function(e) {
    if (e.origin !== 'http://bbb.com') {
      return;
    }
    var payload = JSON.parse(e.data);
    localStorage.setItem(payload.key, JSON.stringify(payload.data));
  };
```
上面代码中，子窗口将父窗口发来的消息，写入自己的LocalStorage。

父窗口发送消息的代码如下。
```javascript
  var win = document.getElementsByTagName('iframe')[0].contentWindow;
  var obj = { name: 'Jack' };
  win.postMessage(JSON.stringify({key: 'storage', data: obj}), 'http://bbb.com')
```

加强版的子窗口接收消息的代码如下。
```javascript
  window.onmessage = function(e) {
    if (e.origin !== 'http://bbb.com') return;
    var payload = JSON.parse(e.data);
    switch (payload.method) {
      case 'set':
        localStorage.setItem(payload.key, JSON.stringify(payload.data));
        break;
      case 'get':
        var parent = window.parent;
        var data = localStorage.getItem(payload.key);
        parent.postMessage(data, 'http://aaa.com');
        break;
      case 'remove':
        localStorage.removeItem(payload.key);
        break;
    }
  };
```
加强版的父窗口发送消息代码如下。
```javascript
  var win = document.getElementsByTagName('iframe')[0].contentWindow;
  var obj = { name: 'Jack' };
  // 存入对象
  win.postMessage(JSON.stringify({key: 'storage', method: 'set', data: obj}), 'http://bbb.com');
  // 读取对象
  win.postMessage(JSON.stringify({key: 'storage', method: "get"}), "*");
  window.onmessage = function(e) {
    if (e.origin != 'http://aaa.com') return;
    // "Jack"
    console.log(JSON.parse(e.data).name);
  };
```

本文摘抄自 [http://javascript.ruanyifeng.com/bom/same-origin.html](http://javascript.ruanyifeng.com/bom/same-origin.html)