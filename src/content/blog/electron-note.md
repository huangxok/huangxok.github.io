---
title: "electron-note"
pubDate: 2016-11-30

tags: []
---
# electron框架笔记
  1. Electron支持的平台
    * OS X
    * Windows
    * Linux
  2. 标准的electron app包含的结构
    window 或是 linux 中
    electron/resource/app
    |_package.json 
    |_main.js
    |_index.html
  3. electron 程序打包
    一般使用asar进行打包，electron中包含两种API
    Node.js和Chromium提供的Web API
  4. 使用Native Node模块
    - electron-rebuild
    - 使用npm
    - 使用node-gyp
  5. 测试主进程
    window下面的DevTools只能测试渲染进程，为了测试朱经常也可以使用--debug或--debug-brk分支，node-inspector也可以使用
  6. electron 简述
    electron可以让你使用javascript来创建桌面应用，可以将其理解为Node.js的一个变体，它提供了丰富的运行时访问Native的API接口。
    但是electron并不是一个GUI库，相反的，electron使用web页面作为它的GUI，所以可以将它看做是一个小的Chromium浏览器。
    在Electron中运行package.json和main脚本的进程成为主进程，可以在主进程中通过创建Web页面来显示GUI。
    electron使用Chromium的多进程机制来渲染页面，每个页面拥有一个自己的进程，该进程成为渲染进程。
    在electron中用户可以通过Node.js的API跨过网页运行的沙箱去访问更为底层的系统应用。
    主进程通过使用BrowserWindow实例创建页面，每个BrowserWindow都是在自己的渲染进程中运行。
    当一个BrowserWindow实例被销毁的时候对应的渲染进程也被销毁了。
    主进程管理着所有的网页和它们对应的渲染进程，每个渲染进程只关心自己的网页。
    渲染进程若是想访问GUI操作，需要向主进程发出请求。
    在electron中主进程和渲染进程之间有几种交互方式：ipcRenderer和ipcMain来发送messages。
  7. 一个简单完整的electron app
    package.json文件的格式和Node的模块是一样的，main.js是app启动脚本，将会运行在主进程中。
    如果main没有出现在package.json中，electron将会尝试装载index.js
    main.js需要创建window界面并处理系统事件运行electron程序：
    可以先用npm装上electron-prebuilt，进入app的root目录。
    执行 **electron .**。
  8. 桌面环境的整合
    关于Notification通知：
    HTML5的API只能是在渲染进程中使用，Windows，Linux和OS X中都支持通知机制。
    其他的功能看具体的桌面环境进行相应的配置
  9. 在线和离线事件监测
    electron主进程中并不能利用HTML5中的navigator对象进行事件探测，但是可以利用electron中的交互工具将事件监测结果反馈给主进程。
    使用ipcMain和ipcRender进行事件信息的传递
  10. electron中API概要
    electron支持所有的Node.js的内建模块，也支持第三方的node模块，包括native模块。
    electron同时提供了额外的native内建模块可以用于开发原生的桌面应用。
    一些模块只能在主进程中使用，一些模块只能是在渲染进程中使用，而有一些是通用的模块。
    规则为：如果模块是GUI或是和底层系统相关的就是只能在主进程中使用。
    主进程就是main.js而渲染进程是在index.html中运行。     
  11. 进程对象
    进程process对象和一般的node区别在于：
    process.type 进程的类型可以是browser或是renderer
    process.version['electron'] electron的版本
    process.version['chome'] Chromium的版本
    process.resourcesPath Javascript脚本文件的路径
    process.mas 构建Mac应用商店时值为true，其他的为undefined。
  12. 事件
    当electron装载内部初始化脚本的时候，页面和主脚本文件就开始装载
    此时会触发事件。
  13. electron支持的Chromium命令行开关
    --client-certificate=path
    --ignore-connections-limit=domains
    --disable-http-cache
    --remote-debugging-port=port
    --js-flags=flags
    --proxy-server=address:port
    --proxy-bypass-list=hosts
    --proxy-pac-url=url
    --no-proxy-server
    --host-rules=rules
    --host-resolver-rules=runles
    ...
  14. 环境变量
    export ELECTRON_ENABLE_LOGGING=true
    ELECTRON_RUN_AS_NODE
    ELECTRON_ENABLE_LOGGING
  15. 定址DOM元素
    File对象：
    DOM的File接口通过HTML5的API提供了用户操作native文件的方法。
    electron增加了path属性接口可以直接访问文件的真实路径
    标签：
    webview标签在electron app中植入额外的内容，和iframe不同的是webview运行在一个独立的进程中，它并不具有和你的页面相同的权限，所有app和它的交互都是异步进行的，这使得app在使用植入内容的时候更加安全。
    window.open函数：
    当调用window.open的时候会在页面中新创建一个窗口，默认情况下创建的BrowserWindow将会继承父类窗口的options。
  16. 主进程的模块
    1)app模块：
    负责控制应用程序的生命周期如
    const app = require('electron').app;
    app.on('window-all-closed', function(){
    app.quit();
    });
    app对象可以发出以下事件：
    will-finish-launching
    当程序完成基本的启动，类似于ready事件。启动crash事件监听或是自动更新。大多数情况下，需要在ready事件中处理更多的事情。
    ready
    electron完成初始化
    window-all-closed
    当所有的窗口都已经关闭的时候触发，只有在当程序将要推退出的时候触发。当用户调用app.quit()的时候，electron会关闭所有的窗口并
    发出will-quit事件，此时便不会发出window-all-clised事件。
    before-quit
    当程序开始关闭窗口的时候发出,调用event.prevertDefault()将会阻止默认的行为。
    will-quit
    当窗口都已经关闭，程序即将退出的时候发出该事件。
    quit
    程序退出
    ...
    2)autoUpdater模块
    该模块提供了Squirrel自动更新框架一个接口
    3)BrowserWindow模块
    可以用于创建一个新的浏览器窗口
    4)contentTracing模块
    用来收集Chromium内容模块产生的跟踪信息。
    5)dialog模块
    用来显示原生系统对话框，比如打开文件对话框
    6)globalShortcut模块
    用来注册和注销全局的键盘快捷方式。
    7)ipcMain模块
    该模块是EventEmitter的一个实例对象，在主进程中使用，可以发送同步或是异步的message和渲染进程 进行交互。
    8)Menu模块
    用来创建一个原生的菜单，比如上下文菜单。
    9)MenuItem模块
    用来往菜单中添加菜单子项。
    10)powerMonitor模块
    用来显示电池电量变化，只能是在主进程中使用，而且只能是在ready事件已经发出的情况下。
    11)powerSaveBlocker模块
    用来阻止系统进入省电模式，休眠模式。
    12)protocol模块
    用来注册一个定制的协议或是声明使用一个已经存在的协议
    13)session模块
    用来创建新的Session对象，保存本地对象等操作。
    14)webContents模块
    这是一个EventEmitter，负责渲染和控制一个网页，是一个BrowserWindow的属性。
    15)Tray模块
    一个Tray代表着一个操作系统通知区域的一个icon，通常情况下是和一个上下文菜单绑定的。
  17. 渲染进程的模块
    1)desktopCapturer模块
    用来获取可用的资源，可以用getUserMedia来获取。
    2)ipcRenderer对象
    是一个EventEmitter对象的实例，提供了一些方法可以用来和主进程之间进行message交互。
    3)remote模块
    提供了一个简单的跨进程之间通信的方法。GUI相关的模块只能是在主进程中使用像是dialog和menu等，如果想要在渲染进程中使用就需要使用ipc机制向主进程申请。remote模块有点像是java中的RMI
    4)webFrame模块
    用来定制当前网页的渲染。
  18. 两个进程共同的模块
    1)clipboard模块
    提供了执行复制和粘贴操作的方法。
    2)crashReporter模块
    发送程序的奔溃报告。
    3)nativeImage模块
    在electron中获取图片可以通过文件的路径或是使用nativeImage对象。
    4)screen模块
    这是一个EventEmitter，保存了关于屏幕的所有相关信息，像是大小，显示，指针位置等等。直到ready事件触发之后才能使用。
    5)shell模块
    同了和桌面整合相关的函数。
  19. 开发electron相关知识
    1)代码格式
    可以通过运行npm run lint来显示利用cpplint或是eslint获取到的代码风格。
    javascript中：
    文件不要使用空行结尾
    文件必须包含-而不是下划线_
    const和let的使用
    function中=>返回值的声明
    字符串的模板使用，不在使用+，注意$的使用
    API的名称中更倾向于使用setter和getter而不是JQuery中
    的直接.text之类的用法。
    2)源码目录结构
    Electron
    ├── atom - C++ 源码.
    | ├── app - 系统程序入口.
    | ├── browser - 包含了主窗口，UI和所有主进程相关的东西
    | | 
    | | ├── ui - 为不同的平台实现不用的UI界面.
    | | | ├── cocoa - Cocoa指定源码.
    | | | ├── gtk - GTK+ 指定源码.
    | | | └── win - Windows GUI指定源码.
    | | ├── api - 主进程API的实现.
    | | ├── net - 网络相关代码.
    | | ├── mac - Mac指定Objective-C源代码.
    | | └── resources - icon，平台相关的文件等等.
    | ├── renderer - 运行在渲染进程的代码.
    | | └── api - 渲染进程中API的实现代码.
    | └── common - 主进程和渲染进程共同使用的代码,包括一些函数工具，以及整合node的信息到Chromium的message loop中。
    | └── api - 通用的API实现，以及electron内建模块的实现
    | 
    ├── chromium_src - 从Chromium中拷贝的源代码.
    ├── default_app - electron默认显示的页面
    | 
    ├── docs - 文档文件.
    ├── lib - JavaScript的源代码.
    | ├── browser - Javascript主进程初始化代码.
    | | └── api - Javascript API实现代码.
    | ├── common - JavaScript通用的代码
    | | └── api - Javascript通用API实现代码.
    | └── renderer - Javascript渲染进程初始化代码.
    | └── api - Javascript渲染进程API实现代码.
    ├── spec - 自动化测试.
    ├── atom.gyp - electron的构建规则.
    └── common.gypi - 其他的设置和像是node组件或是breakpad组件的构建规则.

    其他的文件夹：
    script - 构建，打包，测试相关的脚本文件
    tools - gyp文件的帮助脚本，不能被用户直接调用的.
    vendor - 第三方依赖库源码.
    node_modules - 构建的时候需要使用的第三方node模块.
    out - ninja输出的临时文件目录.
    dist - 在创建distribution的时候生成的临时目录.
    external_binaries - 下载的第三方不支持gyp的二进制框架.
  20. 构建系统
    1)electron利用gyp来生成项目，利用ninja来构建项目。项目的配置信息是在.gyp或是.gypi文件中。
    gyp文件包含electron项目的构建规则：
    atom.gyp定义了electron本身如何构建
    common.gyp调整Node的构建配置以适应Chromium
    vendor/brightray/brightray.gyp定义了brightray如何创建包含了链接Chromium的默认配置
    vendor/brightray/brightray.gypi包含了通用的构建配置
    2)组件的构建
    由于Chromium是一个大工程，链接的时候需要很长的事件，所以Chromium引进了组件构建：将每个组件作为一个独立的共享库，使得链接的时候文件大小和执行速度得到提升。
    在electron中如果是Debug构建的话，二进制文件会链接到Chromium的共享库版本以提升链接速度。如果是Release构建的话，二进制文件会链接到静态共享库中以获得最佳文件大小和执行效率。
    3)项目的两个阶段生成方式
    Release和Debug构建，可以链接不同的库。electron使用的是R和D作为对应的标示。
['electron笔记原地址'](http://www.2cto.com/kf/201604/499352.html)    


# 调试electron
原文
[http://floatincode.net/post/debugging-electron-application-with-visual-studio-code](http://floatincode.net/post/debugging-electron-application-with-visual-studio-code)

首先需要配置visual studio code的launch.json文件

如原文所示需要配置一个Attach对象

```
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "启动扩展",
      "type": "extensionHost",
      "request": "launch",
      "runtimeExecutable": "${execPath}",
      "args": [
        "--extensionDevelopmentPath=${workspaceRoot}"
      ],
      "sourceMaps": true,
      "outFiles": [
        "${workspaceRoot}/out/**/*.js"
      ],
      "preLaunchTask": "npm"
    },
    // 下面是重点
    {
      "name": "Attach",
      "type": "node",
      "request": "attach",
      "port": 56654,
      "sourceMaps": false,
      "outDir": null,
      "localRoot": "${workspaceRoot}",
      "remoteRoot": null,
      "address": "localhost"
    }
  ]
}
```

然后在运行electron path/to/app --debug=port

本项目根为hulianketang,在此目录下输入cmd命令
electron ./src --debug=56654