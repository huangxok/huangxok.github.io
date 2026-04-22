---
title: "jsonp"
pubDate: 2016-11-09

tags:
  - ajax
  - cros
---
# jsonp介绍

JSONP是服务器与客户端跨源通信的常用方法。最大特点就是简单适用，老式浏览器全部支持，服务器改造非常小。
它的基本思想是，网页通过添加一个&lt;script&gt;元素，向服务器请求JSON数据，这种做法不受同源政策限制。
服务器收到请求后，将数据放在一个指定名字的回调函数里传回来。

首先，网页动态插入&lt;script&gt;元素，由它向跨源网址发出请求。

客户端代码（浏览器发送的请求）

```javascript
  function createScriptTag(src) {
    var script = document.createElement('script');
    script.setAttribute("type","text/javascript");
    script.src = src;
    document.body.appendChild(script);
  }

  window.onload = function () {
    createScriptTag('http://example.com?callback=foo');
  }

  function foo(data) {
    console.log('return server data: ' + data);
  };
```

上面代码通过动态添加&lt;script&gt;元素，向服务器example.com发出请求。
注意，该请求的查询字符串有一个callback参数，用来指定回调函数的名字，这对于JSONP是必需的

服务器返回的代码如下
java：
```javascript
  boolean jsonP = false;
  String cb = request.getParameter("callback");
  if (cb != null) {
      jsonP = true;
      response.setContentType("text/javascript");
  } else {
      response.setContentType("application/x-json");
  }
  Writer out = response.getWriter();
  if (jsonP) {
      out.write(cb + "(");
  }
  out.print(dataBlock.toJsonString());
  if (jsonP) {
      out.write(");");
  } 
```

php:

```javascript
  $callback = $_REQUEST['callback'];

  // Create the output object.
  $output = array('a' => 'Apple', 'b' => 'Banana');

  //start output
  if ($callback) {
      header('Content-Type: text/javascript');
      echo $callback . '(' . json_encode($output) . ');';
  } else {
      header('Content-Type: application/x-json');
      echo json_encode($output);
  }
```

asp.net:

```javascript
String jsonString = "{success: true}";
String cb = Request.Params.Get("callback");
String responseString = "";
if (!String.IsNullOrEmpty(cb)) {
    responseString = cb + "(" + jsonString + ")";
} else {
    responseString = jsonString;
}
Response.Write(responseString);
```