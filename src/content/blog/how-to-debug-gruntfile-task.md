---
title: "how-to-debug-gruntfile-task"
pubDate: 2016-11-18

tags:
  - node
  - grunt
  - gruntfile
  - debug
---
# Node Debug
关于node的调试有多种方式
第一种：node 内建调试
如执行命令
```
node debug *.js
```
*(星号)表示文件路径/文件名

help commands：
Commands:
    run (r),
    cont (c),    继续执行
    next (n),    n - step next
    step (s),    s - step in
    out (o),     o - step out
    backtrace (bt) ,  显示当前执行框架的回溯
    setBreakpoint (sb),
      setBreakpoint() or sb() 在当前行设置断点
      setBreakpoint(1) or sb(1) 在指定行设置断点
      setBreakpoint('fn()') or sb(...) 在函数第一句设置断点
      setBreakpoint ('script.js',1) or sb(..)  在 script.js 的第一行设置断点
    clearBreakpoint (cb),   清除断点
    watch,              watch("my_expressin") 开始监视一个表达式
    unwatch,            watch("my_expressin") 移除一个监视器
    watchers,           显示活动监视器
    repl,               在所调试的脚本的上下文中打开调试器的 repl 执行代码
    restart,            重新运行脚本
    kill,               终止脚本
    list,               list(5) 显示脚本源代码的5行上下文 前五后五
    scripts,            列出所有已加载的脚本
    breakOnException,
    breakpoints,
    version，           显示v8版本
    pause,              暂停执行代码（类似开发者工具中的暂停按钮）
    高级使用
    V8 调试器可以从两种方式启用和访问：以 --debug 命令行标志启动 Node；或者向已存在的 Node 进程发送 SIGUSR1 信号
    一旦一个进程进入了调试模式，它便可被 Node 调试器连接。调试器可以通过 pid 或 URI 来连接，语法是
    node debug -p <pid> - 通过 pid 连接进程
    node debug <URI> - 通过类似 localhost:5858 的 URI 连接进程

第二种：各大工具类
如eclipse，visualstudio都有辅助工具插件类。相关的资料请自行网上查找

第三种：基于chrome的调试器
强烈推荐
需要安装 **node-inspector**
```
npm install -g node-inspector
```
node-inspector是通过websocket方式来转向debug输入输出的。
因此，我们在调试前要先启动node-inspector来监听Nodejs的debug调试端口
默认情况下node-inspector的端口是8080，可以通过参数**--web-port=[port]**来设置端口。
在启动**node-inpspector**之后，我们可以通过**--debug**或**--debug-brk**来启动nodejs程序。
通过在浏览器输入http://[ip address]:8080/debug?port=5858
步骤：
  1. -> 打开目录 输入cmd 进入控制台dos
      输入
      ``` 
      node --debug-brk=56666 example.js
      ```
      表示监听 通过56666端口监听 example.js
  2 -> 同1操作一样
      命令换成
      ```
      node-inspector //默认情况为5858端口
      ```
      采用新的端口监听 对应56666端口
      用这个命令
      ```
      node-inspector -web-port 56666
      ```
# Gruntfile Debug

在gruntfile.js所在目录打开一个控制台窗口
```
node-inspector
```
再打开一个控制台窗口
```
node-debug grunt ftp:JHZT
```
ftp:JHZT是grunt 的一个**task**任务

在chrome输入
http://127.0.0.1:8080/?port=5858 会进入调试模式
需要注意的：为了便于调试，最好在Gruntfile.js文件中需要调试地方加入 **debugger;** 关键字