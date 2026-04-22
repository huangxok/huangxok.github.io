---
title: "Xulrunner Gecko Firefox"
pubDate: 2020-04-29
tags: []
---

﻿---
title: xulrunner-gecko-firefox
date: 2017-01-13 10:03:15
tags: [XUL,XULRunner,Firefox]
---

## XULRunner 
### 软件和工具

发行版下载
下载站点

http://ftp.mozilla.org/pub/firefox/

http://download.cdn.mozilla.net/pub/mozilla.org/

xulrunner 在这里：

http://ftp.mozilla.org/pub/mozilla.org/xulrunner/releases/latest/runtimes/ -- 稳定版

http://ftp.mozilla.org/pub/mozilla.org/xulrunner/candidates/ -- beta版

http://ftp.mozilla.org/pub/mozilla.org/xulrunner/nightly/latest-mozilla-aurora/ -- aurora版

http://ftp.mozilla.org/pub/mozilla.org/xulrunner/nightly/latest-mozilla-central/ -- central版

firefox 在这里：

http://ftp.mozilla.org/pub/mozilla.org/firefox/

注意，xulrunner 只提供英文版，而 firefox 则有各种本地化版本，例如

http://ftp.mozilla.org/pub/mozilla.org/firefox/nightly/latest-mozilla-aurora-l10n/

firefox sdk 只在 aurora 里面有，如
http://ftp.mozilla.org/pub/firefox/nightly/latest-mozilla-aurora/firefox-47.0a2.en-US.win32.sdk.zip

可以利用后者的资源文件本地化前者，详见“本地化”。

### XULRunner 参考
Creating Applications with Mozilla
  http://books.mozdev.org/html/index.html

XULRunner in large projects
  https://adblockplus.org/blog/xulrunner-in-large-projects-part-1-what-is-that-xulrunner-thingy-anyway
  https://adblockplus.org/blog/xulrunner-in-large-projects-part-2-why-xulrunner-isn-t-like-java
  https://adblockplus.org/blog/xulrunner-in-large-projects-part-3-bugs-bugs-and-more-bugs
  https://adblockplus.org/blog/xulrunner-in-large-projects-part-4-localization-pitfalls

Getting_started_with_XULRunner
  https://developer.mozilla.org/zh-CN/docs/Getting_started_with_XULRunner
Structure_of_an_installable_bundle
  https://developer.mozilla.org/zh-CN/docs/Structure_of_an_installable_bundle
XULRunner_tips
  https://developer.mozilla.org/en-US/docs/XULRunner_tips
JavaScript code modules
  https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules
Windows_and_menus
  https://developer.mozilla.org/zh-CN/docs/Windows_and_menus_in_XULRunner
Dialogs
  https://developer.mozilla.org/en-US/docs/Dialogs_in_XULRunner
browser
  https://developer.mozilla.org/en-US/docs/XUL/browser
Stream
  https://developer.mozilla.org/en-US/docs/XPCOM_Stream_Guide
Using JavaScript code modules
  https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Using#Importing_CommonJS_modules
nsIDirectoryService
  https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Using_nsIDirectoryService

A Brief Introduction To XULRunner
  http://www.kodewerx.org/wiki/A_Brief_Introduction_To_XULRunner:_Part_1
  http://www.kodewerx.org/wiki/A_Brief_Introduction_To_XULRunner:_Part_2

Mozilla 错误代码表 error codes
  https://developer.mozilla.org/en-US/docs/Table_Of_Errors
  http://james-ross.co.uk/mozilla/misc/nserror_list
  
使用XPCOM:实现高级处理
  http://caoyue.sinaapp.com/?p=430
  
样例代码
  https://github.com/matthewkastor/XULRunner-Examples

Mozilla研究
  Mozilla研究—用户界面的基本要素 http://www.cnblogs.com/faunus/archive/2009/04/12/1434213.html
  Mozilla研究—XUL窗口创建和事件处理 http://www.cnblogs.com/faunus/archive/2009/04/12/1434214.html

Add-ons/Extension Signing
  https://wiki.mozilla.org/Addons/Extension_Signing  

system/child_process
  https://developer.mozilla.org/en-US/Add-ons/SDK/Low-Level_APIs/system_child_process

### XUL 应用结构
+ myapp/
|
+-+ chrome/
| |
| +-+ content/
| | |
| | +-- main.xul
| | |
| | +-- main.js
| |
| +-- chrome.manifest //用于向下兼容，可以没有
|
+-+ defaults/
| |
| +-+ preferences/
|   |
|   +-- prefs.js
|
+-- application.ini
|
+-- chrome.manifest 

与 extension 相比，XUL 应用只是多出了 application.ini 文件，但少了intall.rdf。
其它部分，如 chrome.manifest 与 extension 中的写法相同。

* 默认执行的 xul
The prefs.js file tells XULRunner the name of the XUL file to use as the main window. Here is mine:

pref("toolkit.defaultChromeURI", "chrome://myapp/content/main.xul");

如果没有指定，xulrunner 会试图查找 content （chrome.manifest 中，content 指令指明的目录）中与 package 同名的 xul 文件，例如chrome/content/myapp.xul。

* application.ini
https://developer.mozilla.org/en-US/docs/XUL_Application_Packaging

注意  Profile=MyAppData 可以指定Profile目录。在linux上是 $HOME/.MyAppData。

### Deploying
https://developer.mozilla.org/en-US/docs/Mozilla/Projects/XULRunner/Deploying_XULRunner_1.8

    installdir/
        application.ini
        components/
            ... components which are part of the application
        chrome/
            ... chrome which is part of the application
        ... additional application files such as icons, etc
        myapplicationname.exe (This is the "stub executable"... you should copy and rename this file from xulrunner-stub.exe in your XULRunner installation.)
        xulrunner/
            ... copy xulrunner/ to this directory
            


When deploying with XULRunner 2.0 and above do the following:

    Move chrome.manifest to the root directory, and adjust resource paths inside chrome.manifest accordingly

    With XULRunner 9.0 or 10.0 you may need to copy "mozutils.dll" and/or "mozcrt19.dll" from the xulrunner directory to the root directory. This should be fixed with XULRunner 11.0

    With XULRunner 11.0 you may need to copy "gkmedias.dll" from the xulrunner directory to the root directory

### 运行
linux/windows：
xulrunner <path_to_app>/application.ini

使用firefox:
firefox -app path/to/application.ini

### 全屏/fullscreen
xul 26 可支持全屏，但默认没有打开，mybrowser例子可以在about:config中搜索full-screen打开。
相关选项：
full-screen-api.enabled;true
full-screen-api.allow-trusted-requests-only;true
full-screen-api.approval-required;true
full-screen-api.content-only;false
full-screen-api.pointer-lock.enabled;true

一般只需要改 full-screen-api.enabled 一项。

不过窗口管理似乎需要自己实现，mybrowser例子的全屏只是占满整个viewport。

### 给 xulrunner 安装扩展
* FF 扩展的兼容性
http://stackoverflow.com/questions/18588542/run-firefox-extensions-in-xulrunner
Existing extensions may run, with or without modifications in such a xulrunner app. Well, likely with modifications, as most extensions use APIs specific to Firefox or Thunderbird or ...

The add-on SDK is not generally isn't a good fit for generic xulrunner apps: It is too much tailered against Firefox specifically.
http://stackoverflow.com/questions/8334415/adding-add-on-bar-to-a-custom-xulrunner-application

* 将扩展安装到 xulrunner 本身中
在 xulrunner 目录下建立如下子目录
distribution/bundles/<扩展的名字>
然后将扩展的文件放到<扩展的名字>下面，让install.rdf、chrome.manifest等文件位于<扩展的名字>目录下；如果是xpi文件则要解压。
<扩展的名字> 应该可以随便取。

* 将扩展安装到 xulrunner app 中
在 xulrunner 应用的目录下建立如下子目录：
extensions/<扩展的名字>
将扩展的文件放到<扩展的名字>下面，让install.rdf、chrome.manifest等文件位于<扩展的名字>目录下。
或者将扩展的xpi文件直接放到extensions/下面，例如
extensions/<扩展的名字>.xpi
注意 <扩展的名字> 不可随便取，应当等于 install.rdf 中的 em:id 的值。

* Extension Manager
https://developer.mozilla.org/en-US/docs/XULRunner_tips#Extension_Manager

* 扩展的更新
http://stackoverflow.com/questions/12055985/updating-extensions-in-a-xulrunner-application
可以设置自动更新扩展

### XUL 语法和控件
* 样式表
<?xml-stylesheet href="chrome://global/skin" type="text/css"?>
这个引用的是默认样式表。如果要自定义，可以在自定义样式表中引入，例如
in xul:
<?xml-stylesheet href="chrome://basicapp/skin/main.css" type="text/css"?>
in basicapp/skin/main.css:
@import url(chrome://global/skin/);

html 样式表是怎样的？

* namespace
xmlns:xul ="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul"
xmlns:html="http://www.w3.org/1999/xhtml"
注意 xul 中允许混合 html标签。

* window
这是顶层元素
<xul:window title     ="&mybrowser.title;"
            xmlns:xul ="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul"
            xmlns:html="http://www.w3.org/1999/xhtml"
            id        ="mybrowser"
            width     ="800"
            height    ="600">
* script
<xul:script type="application/javascript"
                src="chrome://myapp/content/mybrowser.js" />
html script 可以吗？

* browser 组件
<xul:browser flex="1"
                 id  ="browser"
                 src =""
                 type="content-primary" />
                 
## profile
http://kb.mozillazine.org/Starting_your_Mozilla_application_with_a_specified_profile#Bypassing_the_Profile_Manager

启动profile管理器来选择一个profile：
  <xul_app> -P
直接选择指定的 profile 名字：
  <xul_app> -P profileName
直接选择指定的 profile 路径。如果是个空目录，则会在该目录中创建新 profile。
  <xul_app> -profile path_to_profile

<xul_app> 可以是 firefox，xulrunner，xulrunner-stub 等。

<xul_app> 最终是调用 XRE_main(argc, argv, ...) 函数，以上参数都是传给这个函数的。
以编程的方式增加 XRE_main() 的参数也可以实现自定义 profile 路径，例如 duanyao/xulrunner-stub。

另一个自定义 profile 路径的方法是使用 nsIDirectoryServiceProvider，自定义 "ProfD"。geckofx 采用此方法。

## extension
### 签名
从 FF 43 起，扩展将被要求有数字签名才能运行。
普通版的 FF 没有可以关闭签名验证的选项，而 developer edition 可以通过修改 xpinstall.signatures.required 偏好来关闭签名验证。
签名的方法见[Add-ons/Extension Signing]。

### Comparing_Extension_Toolchains
https://developer.mozilla.org/en-US/Add-ons/Comparing_Extension_Toolchains

There are three common methods of developing extensions: the Add-on SDK, manually bootstrapped restartless extensions, and legacy, overlay-based restartful extensions.

### 传统 extention
Building_an_Extension
  https://developer.mozilla.org/en-US/docs/Building_an_Extension

Getting_Started_with_Firefox_Extensions
  https://developer.mozilla.org/en-US/Add-ons/Overlay_Extensions/XUL_School/Getting_Started_with_Firefox_Extensions

The_Essentials_of_an_Extension
  https://developer.mozilla.org/en-US/Add-ons/Overlay_Extensions/XUL_School/The_Essentials_of_an_Extension
  install.rdf

Setting_up_extension_development_environment
  https://developer.mozilla.org/en-US/Add-ons/Setting_up_extension_development_environment
  
Install_Manifests (intall.rdf)
  https://developer.mozilla.org/en-US/Add-ons/Install_Manifests
  
Chrome_Registration (chrome.manifest)
  https://developer.mozilla.org/en-US/docs/Chrome_Registration
  
### 设置开发环境
* 新建开发 profile
firefox -no-remote -P dev
-no-remote 是必要的，这样可以同时运行多个ff进程。

* 链接开发中的扩展到 profile
定位到刚才创建的 profile 下的 extensions 目录，创建一个文本文件，名字是你的 extension 的 id （在install.rdf中），
内容是到你的 extension 的全路径，而且要以 /或\结尾。

### Bootstrapped extensions
https://developer.mozilla.org/en-US/Add-ons/Bootstrapped_extensions

https://developer.mozilla.org/en-US/docs/Extensions/bootstrap.js

http://www.oxymoronical.com/blog/2011/01/Playing-with-windows-in-restartless-bootstrapped-extensions

### Add-on SDK

The Add-on SDK consists of two things:

    a command-line tool to help test and package extensions
    a set of JavaScript APIs, built into Firefox, to create extensions, including APIs to build user interfaces, to interact with the browser and to interact with web content

https://developer.mozilla.org/en-US/Add-ons/SDK
https://developer.mozilla.org/en-US/Add-ons/SDK/Tutorials/Installation
https://developer.mozilla.org/en-US/Add-ons/SDK/Tools/cfx
https://developer.mozilla.org/en-US/Add-ons/SDK/Tutorials
https://developer.mozilla.org/en-US/Add-ons/SDK/Guides/XUL_Migration_Guide
https://developer.mozilla.org/en-US/Add-ons/SDK/Tutorials/Add_a_Menu_Item_to_Firefox


* command line tool
If you give --profiledir a path to a nonexistent profile, cfx will create a profile there for you. So you just have to make up a path and name the first time, and keep using it:

cfx run --profiledir="~/addon-dev/profiles/boogaloo"

* resource
属于扩展的资源放在data/目录下，其url的解析要使用
self.data.url() 函数，例如：
var self = require("sdk/self");
var url = self.data.url("content.htm");
得到的结果类似：
resource://jid1-mf8k5xsb2s4vng-at-jetpack/hello/data/content.htm

注意 resource: 协议下的文档默认是没有特权的。

* High/Low-Level APIs
https://developer.mozilla.org/en-US/Add-ons/SDK/High-Level_APIs
https://developer.mozilla.org/en-US/Add-ons/SDK/Low-Level_APIs

* package.json
https://developer.mozilla.org/en-US/Add-ons/SDK/Tools/package_json

* chrome
chrome.manifest 文件默认是没有的，也没有可以用 chrome: 协议访问的资源。
可以在工程根目录下自行建立这些文件，例如
chrome.manifest
chrome/
  content/
  locale/
  skin/

chrome.manifest 的内容是：
content  hello  chrome/content/
...

注意，chrome 目录的名字是固定的，否则 SDK 认不出来（其它情况下不要求）。

* io_file
https://developer.mozilla.org/en-US/Add-ons/SDK/Low-Level_APIs/io_file
https://developer.mozilla.org/en-US/Add-ons/SDK/Low-Level_APIs/io_byte-streams

功能不是很强，不适合高效地处理二进制文件。

### update
https://developer.mozilla.org/en/extension_versioning,_update_and_compatibility

### 打包和安装
https://developer.mozilla.org/en-US/Add-ons/Extension_Packaging

An XPI (XPInstall) file is simply a ZIP file containing the extension files, with the install.rdf file at the root of the ZIP. Users can download and install XPI files off a website or from a local file, by opening it or dragging it into the Extension Manager window.

Install extension files directly

If you know the location of the application (if you are installing an extension as part of the application installer, for example), you can install the extension files directly to <appdir>/extensions/<extensionID>. The extension will be found automatically by the extension manager the next time the application is launched.

### FAQ
https://developer.mozilla.org/en-US/Add-ons/Extension_Frequently_Asked_Questions

## 特殊协议chrome:和resource:
参考：
https://developer.mozilla.org/en-US/docs/Chrome_Registration
https://developer.mozilla.org/en-US/docs/XUL/Tutorial/The_Chrome_URL

两者都可以用 chrome.manifest 文件来注册

### chrome
content

A content package is registered with the line

content packagename uri/to/files/ [flags]

This will register a location to use when resolving the URI chrome://packagename/content/.... The URI may be absolute or relative to the location of the manifest file. Note: it must end with a '/'.

注意包名（packagename）只能用小写字母，否则会引起大小写不一致的问题，因为
FF 会在读取 src/href 等 WebIDL 属性时将包名部分都转化为小写。参考：
https://bugzilla.mozilla.org/show_bug.cgi?id=132183

chrome 协议下的页面有特权，但是不可以访问 DOM storage。详见 DOM Storage。

### resource

### 注册
* chrome.manifest 注册法
在 chrome.manifest 文件中，Aliases can be created using the resource instruction:

resource aliasname uri/to/files/ [flags]

This will create a mapping for resource://<aliasname>/ URIs to the path given.

当前目录的写法是 './'。

chrome.manifest 也可以动态注册、删除，即利用 nsIComponentManager
https://developer.mozilla.org/en-US/docs/XPCOM_Interface_Reference/nsIComponentManager

addBootstrappedManifestLocation((in nsILocalFile aLocation)
  Loads a "bootstrapped" chrome.manifest file from the specified directory or XPI file. A "bootstrapped" chrome manifest supports some of the instructions allowed in a regular chrome manifest, see the Chrome Registration documentation for details.
  
void removeBootstrappedManifestLocation(in interface nsILocalFile aLocation);
  
在 JS 中，可以用 Components.manager 获得实例。
在 geckofx 中，可以通过 Xpcom.ComponentManager 属性得到实例。

* resource 动态注册法
也可以在js代码中注册 resource alias
参考 https://developer.mozilla.org/en/Using_JavaScript_code_modules#Programmatically_adding_aliases
中 Extending resource: URLs 一节。

这个方法也可以注册本地磁盘目录为 resource alias。

用于 bootstrap addon 时（参考 http://starkravingfinkle.org/blog/2011/01/restartless-add-ons-more-resources/）：

function startup(aData, aReason) {
  let resource = Services.io.getProtocolHandler("resource").QueryInterface(Ci.nsIResProtocolHandler);
  let alias = Services.io.newFileURI(aData.installPath);
  if (!aData.installPath.isDirectory())
    alias = Services.io.newURI("jar:" + alias.spec + "!/", null, null);
  resource.setSubstitution("myaddonpackage", alias);
  ...
}

function shutdown(aData, aReason) {
  if (aReason == APP_SHUTDOWN) return;

  let resource = Services.io.getProtocolHandler("resource").QueryInterface(Ci.nsIResProtocolHandler);
  resource.setSubstitution("myaddonpackage", null);
  ...

The isDirectory check is needed because it is possible for add-ons to be installed in folders or XPI bundles, which require the jar: URI syntax. The code adds a resource alias, after which you can use URIs like this:


resource://myaddonpackage/images/someimage.png
resource://myaddonpackage/content/somescript.js

注：可以注册多个 resource: 别名。

* 限制
resource: 映射的路径似乎必须在 addon 的根目录下，否则虽然能注册成功，但访问会失败，xhr访问的时候得到onerror事件，但没有写出原因。

* addon-sdk
注意：addon-sdk开发的扩展不用 chrome.manifest 注册，即使在 chrome.manifest 写了 resource 指令也是无效的。
参考：https://developer.mozilla.org/en-US/Add-ons/SDK/Guides/XUL_Migration_Guide
  https://blog.mozilla.org/addons/2012/01/11/sdk-1-4-known-issue-with-hard-coding-resource-uris/
addon-sdk 的资源总是在 data 目录下，构建的时候复制到 resources 目录下。
addon-sdk 采用动态注册法。

* 权限
resource 协议下的页面没有特权，但是可以访问 DOM storage。详见 DOM Storage。
There are no security restrictions preventing web content from including content at resource: URIs, so take care what you make visible there.
[似乎是说，任意的web页面也可以访问 resource: URIs，所以不要放敏感内容在这里]

## manifest 的其他特性
### chrome
chrome path_to_manifest
chrome 指令可以用来引入另一个 .manifest 文件，这个文件就不一定要叫 chrome.manifest 了。例如
  chrome components.manifest

### locale
  locale branding zh-CN zh-CN/locale/branding/

### override
用来覆盖一个之前（如在omni.ja中）定义的文件，例如
  override chrome://global/locale/dom/dom.properties zh-CN/locale/global/dom/dom.properties

### interfaces
用来引入 JS 的 XPCOM 接口定义文件（.xpt），它决定了 Components.interfaces 的内容。
  interfaces interfaces.xpt

### 使用 jar 协议
manifest 也可以引用位于 zip 包中的位置，这需要在路径部分使用 jar 协议，例如：
  content devtools jar:devtools.zip!/chrome/devtools/content/

"jar:" 后面跟上 zip 文件的相对路径，"!" 后面跟上 zip 内部的路径。
jar 协议适用于 content, resource, locale 等指令，但似乎不适用 chrome 和 interfaces 指令。

## XULRunner .net绑定
### geckofx
- 源码
源码库在此：https://bitbucket.org/geckofx
最新版：https://bitbucket.org/geckofx/geckofx-29.0

已经包含以前的版本，可以导出版本历史：
hg log > log.txt
然后查找版本号“13.0”之类的tag，然后用hg转到该版本：
hg update v13.0-0.1

- 编译

下载XULRunner发行版，解压到PutXulRunnerFolderHere中。
注意geckofx的版本要和xulrunner一致，它没有向下兼容性。

VS /monodevelpe直接编译即可。运行GeckoFxTest工程。

- profile 目录
默认的是在 local application data directory下，例如
C:\Users\duanyao\AppData\Local\Geckofx\DefaultProfile
可以通过 Xpcom.ProfileDirectory 设置和读取。

* 注册xulrunner应用、扩展
geckofx 不会像 xulrunner 可执行程序那样自动注册 xulrunner 应用及其扩展。
如果 xulrunner 自带扩展，则扩展仍要逐一注册，不会自动注册。
注册至少包括以下3个步骤（顺序应该没关系）：

- 注册 chrome: 协议映射
仍用 chrome.manifest 文件来定义映射，然后调用：
Xpcom.ComponentManager.AddBootstrappedManifestLocation(chromeDir)
chromeDir 指向 chrome.manifest 文件所在的目录。

- 注册 XPCOM 组件
仍用 chrome.manifest 文件登记组件。
Xpcom.ComponentRegistrar.AutoRegister(chromeFile);
chromeFile 指向 chrome.manifest 文件（不是目录）。

- 注册 preference
GeckoPreferences.Load(preffile);
preffile 指向包含 pref 调用的 js 文件。

注意，这个方法是有副作用的：将preffile设置为用户的pref文件，这样，当用户通过 about:config 修改偏好后，会把用户设置的偏好都写入该文件。
不过，通过 GeckoPreferences.User[] 设置的偏好则不会触发写入，但写入时会包括GeckoPreferences.User[]设置的值。
为了避免覆盖 preffile，可以多次调用 GeckoPreferences.Load，在最后一次传入一个临时文件。
GeckoPreferences.Load 最终调用 xpcom 接口 nsIPrefService::ReadUserPrefs()，ReadUserPrefs 的这个行为可能是bug。
nsIPrefService::ReadUserPrefs() 的实现在：
http://mxr.mozilla.org/mozilla-central/source/modules/libpref/src/Preferences.cpp#581
  ReadAndOwnUserPrefFile(aFile); //这应该是原因所在，故意的。
虽然文档上说可以给 nsIPrefService::ReadUserPrefs() 传入 null，将读取默认的 pref.js，但实际上会抛出异常。我们注意到在geckofx的profile目录下，没有pref.js，这可能是geckofx的bug。
所以，为了避免麻烦，在geckofx上不要通过 about:config 修改偏好。

* 窗口
- 创建隐藏窗口
AppShellService.CreateHiddenWindow() 

* mozilla IDL 到 C# 的翻译器 IDLImp or IDLImporter
https://bitbucket.org/geckofx/idlimp
如果要使用自定义的 XPCOM 组件，可以用这个工具生成 C# 接口。不过好像有一些错误。

### OpenGeckoSharp
https://github.com/quantum1423/OpenGeckoSharp

## JSM
Using_JavaScript_code_modules https://developer.mozilla.org/en/Using_JavaScript_code_modules
通过Javascript code modules在XUL文件之间使用全局变量  http://blog.csdn.net/forumz/article/details/5719678

var EXPORTED_SYMBOLS = ["foo", "bar"];  
function foo() {  
  return "foo";  
}  
var bar = {  
  name : "bar",  
  size : "3"  
};  
var dummy = "dummy";

注意：对于 xulrunner 应用，如果修改了 jsm 文件，则必需修改 application.ini 中的 BuildID，否则实际加载的总是旧版本！

https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Services.jsm

Services.jsm
In This Article

The Services.jsm JavaScript code module offers a wide assortment of lazy getters that simplify the process of obtaining references to commonly used services.

### 使用 CommonJS 模块
// import require() into your scope.
const { require } = Cu.import("resource://gre/modules/commonjs/toolkit/require.js", {})
// import the SDK's base64 module
var base64 = require("sdk/base64");
base64.encode("hello"); // "aGVsbG8="
// import my module
var myModule = require("resource://path/to/my/module.js");

## preference
https://developer.mozilla.org/en-US/Add-ons/Code_snippets/Preferences
http://stackoverflow.com/questions/3796084/about-config-preferences-and-js

// Get the "accessibility." branch
var prefs = Components.classes["@mozilla.org/preferences-service;1"]
                    .getService(Components.interfaces.nsIPrefService).getBranch("accessibility.");

// prefs is an nsIPrefBranch.
// Look in the above section for examples of getting one.
var value = prefs.getBoolPref("typeaheadfind"); // get a pref (accessibility.typeaheadfind)
prefs.setBoolPref("typeaheadfind", !value); // set a pref (accessibility.typeaheadfind)

preference 条目的文档
http://kb.mozillazine.org/About%3aconfig_entries

defaults/preferences/prefs.js 不支持编程结构，参考
  https://developer.mozilla.org/en-US/docs/Default_Preferences

保存 prefs
var prefService = Components.classes["@mozilla.org/preferences-service;1"]
                               .getService(Components.interfaces.nsIPrefService);
prefService.savePrefFile(null);

## IO
File I/O
  https://developer.mozilla.org/en-US/Add-ons/Code_snippets/File_I_O

nsIFile
  https://developer.mozilla.org/en-US/docs/XPCOM_Interface_Reference/nsIFile

FileUtils.jsm
  https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/FileUtils.jsm?redirectlocale=en-US&redirectslug=JavaScript_code_modules%2FFileUtils.jsm
  
* OS.File
https://developer.mozilla.org/en-US/docs/JavaScript_OS.File

OS.File is a new API designed for efficient, off-main thread, manipulation of files by privileged JavaScript code. This API is intended to replace, in time, most XPCOM-based manipulation of files (nsIFile, subsets of nsIIOService, etc.) by JavaScript code.

https://developer.mozilla.org/en-US/docs/JavaScript_OS.File/OS.File_for_the_main_thread
https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/OSFile.jsm/OS.File.DirectoryIterator_for_the_main_thread
https://developer.mozilla.org/en-US/docs/JavaScript_OS.File/OS.Path

XUL环境下的文件 IO 用这个库应该就足够了，不需要再与 sream 打交道。

OS.File.copy(sourcePath, destPath) 函数可以用于复制文件，不过似乎存在bug，在复制完成前promise就会完成：
https://bugzilla.mozilla.org/show_bug.cgi?id=1166027

一些有用的路径：
  OS.Constants.Path.profileDir profile 的路径。如果在 application.ini 中设置了 Profile=MyAppData，则 OS.Constants.Path.profileDir 为 $HOME/.MyAppData/xxx.default。  
  tmpDir 临时目录
  homeDir 用户主目录
  
* 特殊路径
var iop = Components.classes["@mozilla.org/file/directory_service;1"]
          .getService(Components.interfaces.nsIProperties);
var dir = iop.get("ProfD", Components.interfaces.nsIFile);

其中 ProfD 可以替换为：
CurProcD 	Current working directory (usually the application's installation directory).
ProfD 	The profile directory.
Home 	The user's home directory (for example, /home/username).
更多的值可以参考：
https://developer.mozilla.org/en-US/Add-ons/Code_snippets/File_I_O

* HTML5 File API
https://developer.mozilla.org/en-US/docs/Web/API/File
Gecko notes

    In Gecko, you can use this(File) API from chrome code. See Using the DOM File API in chrome code for details.
    Starting in Gecko 6.0 (Firefox 6.0 / Thunderbird 6.0 / SeaMonkey 2.3), privileged code (such as extensions) can pass an nsIFile object to the DOM File constructor to specify the file to reference.
    Starting in Gecko 8.0 (Firefox 8.0 / Thunderbird 8.0 / SeaMonkey 2.5), you can use new File to create File objects from XPCOM component code instead of having to instantiate the nsIDOMFile object directly.

https://developer.mozilla.org/en-US/docs/Extensions/Using_the_DOM_File_API_in_chrome_code

不过，看来这种用法只适于读文件，而不是写文件。

在特权代码中，File.mozFullPath 属性表示 File 对象的全路径。

* Channel
https://developer.mozilla.org/en-US/docs/XPCOM_Interface_Reference/nsIChannel
This interface allows clients to construct 'GET' requests for specific protocols, and manage them in a uniform way. 

* Stream
Binary Stream
  https://developer.mozilla.org/en-US/docs/XPCOM_Interface_Reference/nsIBinaryOutputStream
  https://developer.mozilla.org/en-US/docs/XPCOM_Interface_Reference/nsIBinaryInputStream
  
Stream_Guide
  https://developer.mozilla.org/en-US/docs/XPCOM_Stream_Guide
ScriptableInputStream
  https://developer.mozilla.org/en-US/docs/XPCOM_Interface_Reference/nsIScriptableInputStream
  
* NetUtil
  https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/NetUtil.jsm
 
 asyncFetch()

The asyncFetch() method opens an input source, asynchronously, and gives an nsIInputStream containing the data obtained to the callback provided. The callback may then consume data from the input stream passed to the callback.
  
readInputStreamToString()

## DOM Storage
chrome: 协议代码中无法使用 localStorage/sessionStorage 等。尽管这些对象是存在的，但访问它们会出现异常。参考：
Can't access localStorage from chrome:// https://bugzilla.mozilla.org/show_bug.cgi?id=495747 未来可能会解决。

注意，也无法将 localStorage 替换为自定义实现，赋值无效。
可能的变通是：
1. 使用 resource: 协议代码。但这种代码没有特权。参考
https://bugzilla.mozilla.org/show_bug.cgi?id=562646
1.1 另一个变体是，使用http等协议，但是拦截请求。

2. 将自定义实现绑定到另一个名字，例如 xxxLocalStorage。
具体的，可以使用 XPCOM 获得一个绑定到普通域的 localStorage，然后绑定到 xxxLocalStorage。参考
http://stackoverflow.com/questions/20195541/html-5-local-storage-in-xul-application

var url = "http://example.com";
var ios = Components.classes["@mozilla.org/network/io-service;1"]
          .getService(Components.interfaces.nsIIOService);
var ssm = Components.classes["@mozilla.org/scriptsecuritymanager;1"]
          .getService(Components.interfaces.nsIScriptSecurityManager);
var dsm = Components.classes["@mozilla.org/dom/storagemanager;1"]
          .getService(Components.interfaces.nsIDOMStorageManager);

var uri = ios.newURI(url, "", null);
var principal = ssm.getCodebasePrincipal(uri);
var storage = dsm.getLocalStorageForPrincipal(principal, "");

storage.setItem("chromekey", "chromevalue");

## Javascript 集成
XPConnect
https://developer.mozilla.org/en-US/docs/Mozilla/XPConnect

mozIJSSubScriptLoader
https://developer.mozilla.org/en-US/docs/XPCOM_Interface_Reference/mozIJSSubScriptLoader
This interface can be used from privileged JavaScript to load and run JavaScript code from the given URL at runtime.
var mozIJSSubScriptLoader = Components.classes["@mozilla.org/moz/jssubscript-loader;1"]
                            .getService(Components.interfaces.mozIJSSubScriptLoader);
                            
### geckofx js and native interop
D:\project\geckofx-29.0.hg\Geckofx-Core\AutoJSContext.cs
D:\project\geckofx-29.0.hg\Geckofx-Core\JQuery\JQueryExecutor.cs
D:\project\geckofx-29.0.hg\Geckofx-Core\Interop\SpiderMonkey\SpiderMonkey.cs

D:\project\geckofx-29.0.hg\GeckofxUnitTests\GeckoWebBrowserTests.cs
D:\project\geckofx-29.0.hg\GeckofxUnitTests\XPConnectTests.cs
D:\project\geckofx-29.0.hg\GeckofxUnitTests\XpComTests.cs

		public void EvaluateScript_SimpleJavascript_ScriptExecutesAndReturnsExpectedResult()
		{
			browser.TestLoadHtml("");

			using (AutoJSContext context = new AutoJSContext(browser.Window.JSContext))
			{				
				string result;
				Assert.IsTrue(context.EvaluateScript("3 + 2;", out result));
				Assert.AreEqual(5, Int32.Parse(result));

				Assert.IsTrue(context.EvaluateScript("'hello' + ' ' + 'world';", out result));
				Assert.AreEqual("hello world", result);
			}				
		}

var instance = Xpcom.CreateInstance<nsISupports>("@mozilla.org/byte-buffer;1");

## 页面加载状态监视和错误处理
https://developer.mozilla.org/en-US/docs/XPCOM_Interface_Reference/nsIWebProgressListener

LOCATION_CHANGE_ERROR_PAGE This flag indicates that aWebProgress redirected from the requested document to an internal page to show error status, such as about:neterror, about:certerror and so on. 

### geckofx
GeckoWebBrowser 有以下.net事件：
browser.Navigating
  开始导航到某个页面。注意这个事件也会在页面内导航、子框架（frame）导航时产生。
  GeckoNavigatingEventArgs.DomWindowTopLevel表示是否是顶层窗口的导航事件, GeckoNavigatingEventArgs.DomWindow 为事件相关的窗口。
  这时可以取消导航，GeckoNavigatingEventArgs 是 CancelEventArgs 的子类。
browser.Navigated
  导航结束，页面将开始解析（如果是新页面）。注意这个事件也会在错误页面、页面内导航、子框架（frame）导航时产生。
  （1）如果是新页面，这时JS上下文已经创建，可以注入和执行JS（AutoJSContext.EvaluateScript）；但页面本身尚未解析，html中的JS都还没有开始执行，
  因此这是注入跨语言交互代码的理想时机。
  （2）如果加载页面时发生网络错误，并且启用了内置错误页面（设置偏好 browser.xul.error_pages.enabled = true），则 GeckoNavigatedEventArgs.IsErrorPage == true；但HTTP错误（4xx, 5xx）不会反映在这里（TODO 如何检测）。顺提，如果没有启用了内置错误页面，则网络错误会通过对话框报告，详见PromptService。
  （3）GeckoNavigatedEventArgs.IsSameDocument 表示结局是否仍为原来的文档（即页面内跳转）；GeckoNavigatedEventArgs.DomWindowTopLevel 表示是否是顶层窗口的导航事件，
    GeckoNavigatedEventArgs.DomWindow 为事件相关的窗口。
browser.Load
  类似于 js window.onload 事件，不过会在 js window.onload 事件之前执行。所以如果有要在网页加载完后做处理，更好的时机是 DocumentCompleted 事件。
browser.ReadyStateChange
  等效于 JS 中的 document 的 readystatechange 事件，可以通过 browser.Window.Document.ReadyState:string 查询状态，有interactive, complete等。
browser.DocumentCompleted
  新页面、无网络错误时，在 Load 和 JS load 事件之后触发。
  如果要对加载完的页面做修改，这是个合适的地方。
  GeckoDocumentCompletedEventArgs 与 GeckoNavigatedEventArgs 类似，注意区分错误页面（无此参数）、页面内导航、子框架导航，HTTP错误。
  注意，如果有网络错误，并加载了错误页面，这个事件会在 Navigated 事件之前发生。
  
总结一下网络错误、并加载了错误页面时的事件：


使用服务器上关闭的端口时，此方法被调用
void nsIWebProgressListener.OnStatusChange(nsIWebProgress aWebProgress, nsIRequest aRequest, int aStatus, string aMessage)
aMessage    aStatus
Looking up www.baidu.com…   -2142568445
Connecting to www.baidu.com…    -2142568441

void nsIWebProgressListener.OnStateChange(nsIWebProgress aWebProgress, nsIRequest aRequest, uint aStateFlags, int aStatus)

PromptService : nsIPromptService2,nsIPrompt

## Clipboard
https://developer.mozilla.org/en-US/docs/Using_the_Clipboard

https://developer.mozilla.org/en-US/docs/Jetpack/docs/System/Clipboard

## Debugging/调试
https://developer.mozilla.org/en-US/docs/Mozilla/Projects/XULRunner/Debugging_XULRunner_applications

### prefs
/* debugging prefs */
pref("browser.dom.window.dump.enabled", true);
pref("javascript.options.showInConsole", true);
pref("javascript.options.strict", true);
pref("nglayout.debug.disable_xul_cache", true);
pref("nglayout.debug.disable_xul_fastload", true);

也可以打开 about:config 来设置。

### 本地控制台
也就是window.dump()方法，打印到操作系统控制台。默认情况下，dump没有启用，要设置偏好：
pref("browser.dom.window.dump.enabled", true);

在windows上，GUI程序默认没有控制台，要采用 -console 参数来启动 FF/xulrunner 才可以打开控制台。
此外，windows 的控制台默认编码不是UTF-8，中文系统上是 GBK，这会导致 dump 输出的中文乱码。

启动控制台编码  重定向文件编码 控制台编码 控制台是否乱码
utf8    utf8  gbk 是
gbk utf8    gbk 是

### debug server
参考
[1] https://developer.mozilla.org/en-US/docs/Tools/Remote_Debugging/Debugging_Firefox_Desktop
[2]（37+已过时） https://developer.mozilla.org/en-US/docs/Mozilla/Projects/XULRunner/Debugging_XULRunner_applications

怎样跟踪 firefox 中调试服务代码的变化？
* 调试服务的源码是 devtools 的一部分，在 devtools/ 目录下；发布后则在 omni.ja!/modules/devtools 中。
* 可以在 mxr 搜索源码中的关键字：start-debugger-server（启动调试服务的命令行参数）, DebuggerServer, 6000 (调试服务的默认端口), \"devtools\", debugger 等。

在xul应用中，要打开DebuggerServer[2]（这个方法对 37+ 就不适用了）：
Components.utils.import('resource://gre/modules/devtools/dbg-server.jsm');
if (!DebuggerServer.initialized) {
  DebuggerServer.init();
  DebuggerServer.addBrowserActors(null);
}
DebuggerServer.openListener(6000);
并设置属性允许远程调试：
pref("devtools.debugger.remote-enabled", true);

对于geckofx来说，每个进程只需要运行这个过程一次即可，不需要在每个窗口中运行。

然后用ff的 web开发者->连接 来进行远程调试。

远程调试 firefox 37+ 时，用
firefox.exe -P a_profile -no-remote -start-debugger-server 6101
启动被调试进程，设定允许chrome调试和远程调试，然后用另一个 firefox 实例连接调试。

或者，在浏览器中打开 chrome://browser/content/browser.xul 直接调试。

对于 xulrunner 37+，可以参考 firefox 的代码：

function startDebugNew() {
//http://mxr.mozilla.org/mozilla-central/search?string=start-debugger-server
//http://mxr.mozilla.org/mozilla-central/source/browser/devtools/devtools-clhandler.js#28
	var portOrPath = 6101;
    let { DevToolsLoader } =
      Cu.import("resource://gre/modules/devtools/Loader.jsm", {});

    try {
      // Create a separate loader instance, so that we can be sure to receive
      // a separate instance of the DebuggingServer from the rest of the
      // devtools.  This allows us to safely use the tools against even the
      // actors and DebuggingServer itself, especially since we can mark
      // serverLoader as invisible to the debugger (unlike the usual loader
      // settings).
      let serverLoader = new DevToolsLoader();
      serverLoader.invisibleToDebugger = true;
      serverLoader.main("devtools/server/main");
      let debuggerServer = serverLoader.DebuggerServer;
      debuggerServer.init();
      debuggerServer.addBrowserActors();
      debuggerServer.allowChromeProcess = true;

      let listener = debuggerServer.createListener();
      listener.portOrPath = portOrPath;
      listener.open();
      dump("startDebugNew:Started debugger server on " + portOrPath + "\n");
    } catch(e) {
      dump("startDebugNew:Unable to start debugger server on " + portOrPath + ": " + e);
    }
}

对于 xulrunner 45+ （实际上是firefox 45+ 伪装的），xulrunner 的 omni.ja 缺少了

### JavaScript Console

To enable the JS console, start XULRunner with the -jsconsole argument.
Note: If you are not using the stub executable to launch the application, the -jsconsole argument is after the application.ini argument: e.g. xulrunner.exe /path/to/application.ini -jsconsole

By default the JS console only shows errors from web content. To show errors in chrome JavaScript, the pref pref("javascript.options.showInConsole", true) must be set.

不过，console.log/error 输出的信息似乎无法显示在 JavaScript Console 中，eval也无法访问执行上下文中的对象，只有未捕获异常才会显示出来。

### 本地js调试器
* Venkman
这个扩展可以弹出一个gui调试器，不过需要在应用中去调用 Venkman 的函数，因此有特权代码可以启动它。
安装到 xulrunner 中的办法参考本文”给 xulrunner 安装扩展“一节。
按照此处的指引安装 Venkman 是可以的（注意装到xulrunner目录下），注意Troubleshooting一节。
https://developer.mozilla.org/en-US/docs/Mozilla/Projects/XULRunner/Debugging_XULRunner_applications

### mozrepl
https://github.com/bard/mozrepl/ -- 原版
https://github.com/duanyao/mozrepl -- 打补丁适配 geckofx 的版本

这个扩展可以安装到FF、xulrunner app 或 xulrunner 本身当中。运行时，它在被调试的进程中开启一个telnet服务（端口4242），用telnet客户端连结上去以后可以执行js表达式和语句。
不过，它目前似乎在 geckofx 中跑不起来。

安装到 xulrunner 中的办法参考本文”给 xulrunner 安装扩展“一节。

运行 app 时，追加 -repl 参数即可启动 mozrepl。
如果要自动启动，设置 pref extensions.mozrepl.autoStart = true（mozrepl/defaults/preferences/mozrepl.js中）。

连接：
localhost 4242

在Windows上，如果没有 telnet 命令，可以安装 netcat 来代替：
http://code.google.com/p/yesanshare/downloads/detail?name=nc111nt.zip&can=2&q=
安装 nc.exe 到 path 中，然后
nc localhost 4242

命令参考：
https://github.com/bard/mozrepl/wiki/Tutorial

* geckofx 适配
在.net代码中，首先要按照geckofx一节中”注册xulrunner应用、扩展“的描述注册 mozrepl，然后启动服务器：
var mozrepl = Xpcom.CreateInstance<MozRepl.nsIMozRepl>("@hyperstruct.net/mozlab/mozrepl;1");
mozrepl.Start(4242, true | false);

geckofx 的一个问题是 nsIWindowMediator 没有包含任何窗口，所以要查询 nsIWindowWatcher 来代替，详见：
https://github.com/duanyao/mozrepl

* 代码分析
mozrepl 监听 profile-after-change 事件（似乎会在程序启动时触发），如果设置了 autoStart = true，则启动服务器。

profile-after-change 监听是在 chrome.manifest 中注册的，参考：
http://stackoverflow.com/questions/3169852/how-to-listen-to-profile-after-change-in-xpcom-component-for-ff4
监听的实现代码在 mozrepl/chrome/content/server.js:observe

服务器是个 XPCOM 组件。
接口：nsIMozRepl（MozRepl.idl）
实现：mozrepl/chrome/content/server.js
CONTRACT_ID = '@hyperstruct.net/mozlab/mozrepl;1'
CLASS_ID = 57f4284b-1f9b-4990-8525-9ed5cbb23e01
启动、停止服务器的方法是
void start(in short port, in boolean loopbackOnly);
void stop();

### 本地代码调试
VS 中设置 Mozilla symbol server
https://developer.mozilla.org/en-US/docs/Using_the_Mozilla_symbol_server

对于 xulrunner 设置 symbol server
http://symbols.mozilla.org/xulrunner

并且只允许加载下面的符号，以免太慢
xul.dll
mozjs.dll
mozglue.dll

以及 Mozilla source server
https://developer.mozilla.org/en-US/docs/Using_the_Mozilla_source_server

也可以下载源码包，解压后，当用VS调试时点击调用栈，VS会询问源文件的位置，选择解压后的源文件即可。
https://developer.mozilla.org/en-US/docs/Mozilla/Developer_guide/Source_Code/Downloading_Source_Archives

## 拦截网络请求
Firefox 扩展可以拦截网络请求和回复，因此可以用特殊的http url表示模拟的本地文件系统。
参考：
  http://stackoverflow.com/questions/2141469/create-firefox-addon-to-watch-and-modify-xhr-requests-reponses
  http://www.softwareishard.com/blog/firebug/nsitraceablechannel-intercept-http-traffic/
  http://stackoverflow.com/questions/7222577/firefox-extension-cancel-requests-and-emit-fake-responses
  https://developer.mozilla.org/en-US/docs/XUL/School_tutorial/Intercepting_Page_Loads
  https://developer.mozilla.org/en-US/docs/Observer_Notifications http-on-opening-request

* The Easy Way: Load Events
监听全局浏览器对象 gBrowser 的 "load" 事件。这个事件类似 web 中的 load 事件，是针对tab中的主文档或iframe中的文档的。
可以趁机修改DOM，但是不能在DOM构建前取消或修改响应。

* HTTP Observers
对每个http请求都发出事件。允许在请求发出前修改头，或者取消请求，或者在收到响应后修改响应。
使用 nsITraceableChannel，可以在收到响应后修改内容，然后再传递给原来的发起者。
相关文档：
https://developer.mozilla.org/en-US/docs/Observer_Notifications
https://developer.mozilla.org/en-US/docs/XPCOM_Interface_Reference/NsITraceableChannel
但是，看起来请求还是会发到原来请求的url，并不能做成完全合成的请求/响应。

* WebProgressListeners
针对每个 xul browser 实例（也就是浏览器tab），每个tab打开关闭的时候要添加删除监听器。

* XPCOM Solutions
Document Loader Service
相当于全局 Web Progress Listener.
nsIDocumentLoader is nothing but a global Web Progress Listener. You can create an XPCOM component that extends nsIWebProgressListener and use the addProgressListener method in the service to include it. 

Content Policy
只能用于取消请求。

## 自定义协议处理器
Firefox 扩展可以添加自定义协议处理器。
  http://mike.kaply.com/2011/01/18/writing-a-firefox-protocol-handler/
  https://developer.mozilla.org/en-US/docs/XPCOM_Interface_Reference/nsIProtocolHandler

## 安全
https://developer.mozilla.org/en-US/docs/Displaying_web_content_in_an_extension_without_security_issues

https://developer.mozilla.org/en-US/Add-ons/Code_snippets/Interaction_between_privileged_and_non-privileged_pages

### 同源规则
mozilla 平台似乎没有 chrome 那样的命令行或API可以关掉同源规则。参考：
http://stackoverflow.com/questions/17711924/disable-cross-domain-web-security-in-firefox
http://stackoverflow.com/questions/17088609/disable-firefox-same-origin-policy
http://stackoverflow.com/questions/330427/can-i-disable-sop-same-origin-policy-on-any-browser-for-development

https://developer.mozilla.org/en-US/docs/Same-origin_policy_for_file:_URIs

Force CORS Firefox Extension
http://www-jo.se/f.pfleger/forcecors

过去的FF，可以修改 profile 目录下的 prefs.js，加入
user_pref("capability.principal.myapp.id", "file:///D:/project/MyHTML/xhrtest.html");
user_pref("capability.principal.myapp.granted", "UniversalBrowserRead");
注意 about:config 不显示这类配置。
但是看起来这个特性被删除了，不起作用，而且FF关闭时会删除这样的配置。

总结起来就是，最近的FF（28+），不支持放开非特权页面的特权，只有 chrome: 协议的页面能绕开同源限制。参考：
https://developer.mozilla.org/en-US/docs/Bypassing_Security_Restrictions_and_Signing_Code

### Socket
navigator.mozTCPSocket 或者 navigator.TCPSocket 是可以用于浏览器环境的 TCP Socket 实现。
W3C正在讨论中，目前只有 mozilla 实现了，只能在特权代码或者特权 web app 中使用。
在 xulrunner 或桌面 firefox 中，目前（40）需要设置 dom.mozTCPSocket.enabled = true 来启用（https://bugzilla.mozilla.org/show_bug.cgi?id=1079648）。

## mozilla 跨不同权限页面的交互
### frame 嵌入
特权页面中可以嵌入非特权页面，但反过来不行，只会显示一个空白页。

### 权限
给非特权页面的 WebIDL 添加的扩展方法，特权页面并不能有效访问，可能是因为安全限制：
https://developer.mozilla.org/en-US/Add-ons/Code_snippets/Interaction_between_privileged_and_non-privileged_pages
Gecko prevents chrome to access custom object properties added by the content, because that can create security holes. 
Never invoke the web page's JavaScript functions from your extension - doing this increases the chance of creating a security hole, where a malicious web page can trick the browser to run its code with extended privileges (just like your extension) with, for example, the ability to delete local files.

### 通信
* web message
特权页面可以给非特权页面发送 web message；但从非特权页面发给特权页面似乎没有效果。


## 进程间通信
### dbus
* mozjs-dbus
https://github.com/codebutler/mozjs-dbus/wiki
makes it possible for Mozilla/Javascript-based applications and extensions to interoperable with
D-Bus, which allows for deep integration with the Linux desktop.
代码相当老了（5年）。

* Browser DBus Bridge
http://sandbox.movial.com/wiki/index.php/Browser_DBus_Bridge
The Browser D-Bus Bridge is a JavaScript D-Bus bindings implementation for web browsers. The Bridge allows privileged JavaScript code to talk to the D-Bus, both session and system bus (if not prohibited by the D-Bus configuration).

The bridge currently supports Gecko-based and WebKit-based browsers. Each of these have their own implementation of the Bridge due to technical differences in the integration, but support the same API on the JavaScript side. 
代码相当老了。

* D-Bus and other Linux desktop integration improvements, DBuzilla
http://zenit.senecac.on.ca/wiki/index.php/D-Bus_and_other_Linux_desktop_integration_improvements
代码相当老了（7年）。

## 嵌入
### 参考
https://developer.mozilla.org/en-US/docs/Gecko/Embedding_Mozilla/API_overview

[Roll your own browser: An embedding how-to](https://developer.mozilla.org/en-US/docs/Gecko/Embedding_Mozilla/Roll_your_own_browser) on MDN. (out dated)


将Mozilla源码里的内嵌Gecko示例winEmbed工程移植到VC (1.9)
  http://blog.csdn.net/mzlogin/article/details/7292310

### 接口
* nsIWebBrowser

This is the primary interface to the WebBrowser component.

* nsIWebBrowserSetup 
SETUP_IS_CHROME_WRAPPER=7
Boolean. Marks whether the browser is a chrome wrapper. A value of PR_TRUE means the browser is a chrome wrapper. The default value is PR_FALSE. 

* nsIWebBrowserChrome

This interface provides access to the window containing an nsWebBrowser instance.

* nsIChromeRegistry
https://developer.mozilla.org/en-US/docs/XPCOM_Interface_Reference/nsIChromeRegistry

* nsIXULAppInfo
In XULRunner applications nsIXULAppInfo obtains app-specific information from application.ini.
https://developer.mozilla.org/en-US/docs/XPCOM_Interface_Reference/nsIXULAppInfo

* nsIXULRuntime
Provides information about the XUL runtime to allow extensions and XUL applications to determine information about the XUL runtime. 

* nsIAppShell
Interface for the native event system layer. This interface is designed to be used on the main application thread only. 

* nsIAppStartup
This interface is intended to be used as application startup service. It also helps in quitting applications as well. 

* nsIAppShellService
Provides the AppShellService. 

* nsIFile/nsILocalFile
创建
var localFile = Components.classes["@mozilla.org/file/local;1"]
                .createInstance(Components.interfaces.nsILocalFile);
或者
Components.utils.import("resource://gre/modules/FileUtils.jsm");

var file = new FileUtils.File("/home");

初始化
localFile.initWithPath(in AString filePath);
  js 中直接传入string，geckofx中传入nsAString对象。

### 应用的解析
* application.ini 的解析
browser/app/nsBrowserApp.cpp 或者
xulrunner/app/nsXULRunnerApp.cpp

http://mxr.mozilla.org/mozilla-central/source/xulrunner/app/nsXULRunnerApp.cpp

277   nsCOMPtr<nsIFile> appDataLF;
278   rv = XRE_GetFileFromPath(appDataFile, getter_AddRefs(appDataLF));
279   if (NS_FAILED(rv)) {
280     Output(true, "Error: unrecognized application.ini path.\n");
281     return 2;
282   }
283 
284   AutoAppData appData(appDataLF);
285   if (!appData) {
286     Output(true, "Error: couldn't parse application.ini.\n");
287     return 2;
288   }
290   return XRE_main(argc, argv, appData, 0);

解析代码的实现在
http://mxr.mozilla.org/mozilla-central/source/toolkit/xre/CreateAppData.cpp#15

nsresult XRE_CreateAppData(nsIFile* aINIFile, nsXREAppData **aAppData)

xul 应用入口函数是 XRE_main
http://mxr.mozilla.org/mozilla-central/source/toolkit/xre/nsAppRunner.cpp#4227
 XRE_main(int argc, char* argv[], const nsXREAppData* aAppData, uint32_t aFlags)
 
http://mxr.mozilla.org/mozilla-central/source/toolkit/xre/nsAppRunner.cpp#2719
2718 // Encapsulates startup and shutdown state for XRE_main
2719 class XREMain


* chrome.manifest 的解析
http://mxr.mozilla.org/mozilla-central/source/xpcom/build/nsXULAppAPI.h#263
240 /**
241  * Register XPCOM components found in an array of files/directories.
242  * This method may be called at any time before or after XRE_main or
243  * XRE_InitEmbedding.
244  *
245  * @param aFiles An array of files or directories.
246  * @param aFileCount the number of items in the aFiles array.
247  * @note appdir/components is registered automatically.
248  *
249  * NS_COMPONENT_LOCATION specifies a location to search for binary XPCOM
250  * components as well as component/chrome manifest files.
251  *
252  * NS_SKIN_LOCATION specifies a location to search for chrome manifest files
253  * which are only allowed to register only skin packages and style overlays.
254  */
255 enum NSLocationType
256 {
257   NS_COMPONENT_LOCATION,
258   NS_SKIN_LOCATION,
259   NS_BOOTSTRAPPED_LOCATION
260 };
261 
262 XRE_API(nsresult,
263         XRE_AddManifestLocation, (NSLocationType aType,
264                                   nsIFile* aLocation))

另一个可能的方法是 nsIComponentManager.addBootstrappedManifestLocation((in nsILocalFile aLocation)
geckofx 中的代码例子：
			var chromeDir = Xpcom.CreateInstance<nsILocalFile> ("@mozilla.org/file/local;1");
			chromeDir.InitWithPath (new nsAString ("D:\\project\\MBEditor.js.git\\mozApp"));
			Xpcom.ComponentManager.AddBootstrappedManifestLocation (chromeDir);
            
## JS 引擎：SpiderMonkey
https://developer.mozilla.org/en-US/docs/SpiderMonkey/JSAPI_User_Guide

### 垃圾回收
JS_AddRoot/JS_RemoveRoot
https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/JSAPI_reference/JS_AddRoot
The JS_Add*Root and functions add a C/C++ variable to the garbage collector's root set, the set of variables used as starting points each time the collector checks to see what memory is reachable. The garbage collector aggressively collects and recycles memory that it deems unreachable, so roots are often necessary to protect data from being prematurely collected.

### mozjs 函数签名

?JS_EvaluateUCScript@@YA_NPAUJSContext@@V?$Handle@PAVJSObject@@@JS@@PB_WIPBDIV?$MutableHandle@VValue@JS@@@3@@Z
?JS_ExecuteScript@@YA_NPAUJSContext@@PAVJSObject@@PAVJSScript@@PAVValue@JS@@@Z

bool JS_EvaluateUCScript(struct JSContext *,class JS::Handle<class JSObject *>,wchar_t const *,unsigned int,char const *,unsigned int,class JS::MutableHandle<class JS::Value>)
bool JS_ExecuteScript(struct JSContext *,class JSObject *,class JSScript *,class JS::Value *)

DomMessageEventArgs

internal string ConvertValueToString(JsVal value)
https://developer.mozilla.org/en-US/docs/SpiderMonkey/JSAPI_Reference/JS_GetStringChars

wchar_t const * JS_GetStringCharsZAndLength(struct JSContext *,class JSString *,unsigned int *)
?JS_GetStringCharsZAndLength@@YAPB_WPAUJSContext@@PAVJSString@@PAI@Z

wchar_t const * JS_GetStringCharsZ(struct JSContext *,class JSString *)
?JS_GetStringCharsZ@@YAPB_WPAUJSContext@@PAVJSString@@@Z

wchar_t const * JS_GetStringCharsAndLength(struct JSContext *,class JSString *,unsigned int *)
?JS_GetStringCharsAndLength@@YAPB_WPAUJSContext@@PAVJSString@@PAI@Z

unsigned int JS_GetStringLength(class JSString *)
?JS_GetStringLength@@YAIPAVJSString@@@Z


?JS_EvaluateUCScript@@YA_NPAUJSContext@@V?$Handle@PAVJSObject@@@JS@@PB_WIPBDIV?$MutableHandle@VValue@JS@@@3@@Z
?JS_ExecuteScript@@YA_NPAUJSContext@@PAVJSObject@@PAVJSScript@@PAVValue@JS@@@Z

bool JS_EvaluateUCScript(struct JSContext *,class JS::Handle<class JSObject *>,wchar_t const *,unsigned int,char const *,unsigned int,class JS::MutableHandle<class JS::Value>)
bool JS_ExecuteScript(struct JSContext *,class JSObject *,class JSScript *,class JS::Value *)

DomMessageEventArgs

internal string ConvertValueToString(JsVal value)
https://developer.mozilla.org/en-US/docs/SpiderMonkey/JSAPI_Reference/JS_GetStringChars

wchar_t const * JS_GetStringCharsZAndLength(struct JSContext *,class JSString *,unsigned int *)
?JS_GetStringCharsZAndLength@@YAPB_WPAUJSContext@@PAVJSString@@PAI@Z

wchar_t const * JS_GetStringCharsZ(struct JSContext *,class JSString *)
?JS_GetStringCharsZ@@YAPB_WPAUJSContext@@PAVJSString@@@Z

wchar_t const * JS_GetStringCharsAndLength(struct JSContext *,class JSString *,unsigned int *)
?JS_GetStringCharsAndLength@@YAPB_WPAUJSContext@@PAVJSString@@PAI@Z

unsigned int JS_GetStringLength(class JSString *)
?JS_GetStringLength@@YAIPAVJSString@@@Z

## omni
omni.ja 文件是个特殊的 zip 文件（windows explorer 可打开，7zip不行），里面包含moz平台的界面的xul/css/js代码，包括调试器(devtools)等。

omni.ja 这个文件名有特殊意义。与 xul.dll (或.so) 同一目录的 omni.ja 会被 xul.dll 自动加载；
与 xul 应用的 application.ini 同一目录的 omni.ja 也会被自动加载。

加载 omni.ja 时，会通过其内部根目录下的 chrome.manifest 来注册。

如果要修改、调试 xulrunner/firefox 的 omni.ja 的代码，可以将它解压在其所在的目录，再把它改名/删除。
正确的压缩命令：zip -qr9XD omni.ja *

firefox 除了在顶层目录（xul.dll所在的目录）有一个 omni.ja，还在 browser/ 目录下有一个 omni.ja。前者与 xulrunner 的相同，后者是只有 firefox 需要的文件。

参考：
[About omni.ja (formerly omni.jar)](https://developer.mozilla.org/en-US/docs/Mozilla/About_omni.ja_%28formerly_omni.jar%29)
[Omnijar. How does it work?](https://blog.mozilla.org/mwu/2010/08/13/omnijar-how-does-it-work/)
[Firefox 4: jar jar jar](https://blog.mozilla.org/tglek/2010/09/14/firefox-4-jar-jar-jar/)

## 本地化（中文化） i18n
xulrunner 的发行版没有中文版，所以有些界面，如错误页面，是英文的。
界面相关的资源在 omni.ja 文件中，这是个特殊的zip文件，参考
https://developer.mozilla.org/zh-CN/docs/Mozilla/About_omni.ja_%28formerly_omni.jar%29

可以用中文版 firefox 的 omni.ja 文件来替换，从而将 xulrunner 改为中文版。要注意选择与 xulrunner 版本号相同的 firefox。

geckofx 中，js alert/prompt 等对话框还是有英文，因为用了自定义的对话框。
解决办法是修改自定义对话框中的文字，或者用xulrunner本身的对话框。参考：
GeckoWebBrowser.UseCustomPrompt() 和 d:\Geckofx-Winforms\PromptService.cs
http://localhost
javascript:confirm('hh')

## 下载 TODO

## 插件/plugin
### 禁用个别插件
http://serverfault.com/questions/340195/disable-certain-firefox-plugins-system-wide-by-default
Disable Certain Firefox Plugins System-wide by Default

The plugins' settings are now integrated partially in about:config as of Firefox 22, and fully in 23+. The key names are plugin.state.* where * denotes the internal naming scheme used by Firefox for the discovered plugins. The values (integer) are 0 for disabled (Never Activate in Firefox Tools (Alt + T) > Add-ons > Plugins), 1 for click-to-play (Ask to Activate), and 2 for enabled (Always Activate). Firefox 22 has 0 and 2, and 23+ includes all the three states. The state Ask to Activate (1) is triggered after toggling plugins.click_to_play to true in about:config.

One way to get the correct names used by Firefox is from a reference/IT PC. Toggle the default states of all the discovered plugins (Firefox Tools (Alt + T) > Add-ons > Plugins) once, to reveal the corresponding plugin.state.* keys in about:config.

VLC:
plugin.state.npvlc

Acrobat:
plugin.state.nppdf
注意这不影响 pdf.js。

Java:
plugin.state.java

Flash:
plugin.state.flash

Silverlight:
plugin.state.npctrl

在禁用后：
object标签如果有替代内容，则显示替代内容；如果没有，firefox 显示一个黑色窗口写着“此插件已被禁用”，xulrunner/geckofx只有一个黑窗，没有提示（可能是bug）。

### 禁用全部插件
"plugin.disable" = true 

## 下载和未知内容的处理
当触发a[download] 或未知类型的链接时，浏览器一般会弹出对话框提示是否用其它应用程序打开，或者下载保存链接。
但xulrunner应用、geckofx则有一些麻烦，有时候会出错（firefox28, xulrunner 29）。

## web控制台
有时firefox的控制台显示“Web 控制台的日志记录API (console.log, console.info, console.warn, console.error) 已被此页面的脚本禁用。”
网页中的console.log是输出不了信息的。这可能是因为某些扩展的问题。尝试禁用一些扩展，看看问题是否解决了。参考：
Firefox的Web控制台禁用？http://codego.net/382392/

## 内存使用，内存泄露 （memory usage & leak）
A better about:memory: stage 1.75
  https://blog.mozilla.org/nnethercote/2011/05/23/a-better-aboutmemory-stage-1-75/

How to read Firefox “about:memory” correctly?
  http://stackoverflow.com/questions/7146108/how-to-read-firefox-aboutmemory-correctly

Zombie compartments
  https://developer.mozilla.org/en-US/docs/Zombie_compartments

Per-class JS object and shape measurements in Firefox’s about:memory
  https://blog.mozilla.org/nnethercote/2014/08/29/per-class-js-object-and-shape-measurements-in-firefoxs-aboutmemory/

MemShrink’s 3rd birthday
  https://blog.mozilla.org/nnethercote/2014/06/16/memshrinks-3rd-birthday/
  
MemShrink progress
  https://blog.mozilla.org/nnethercote/category/aboutcompartments/

Firefox 15 plugs the add-on leaks
  https://blog.mozilla.org/nnethercote/2012/07/19/firefox-15-plugs-the-add-on-leaks/

Leak Monitor Extension
  http://dbaron.org/mozilla/leak-monitor/

Firefox memory leak detection tool
  http://www.squarefree.com/2006/01/13/memory-leak-detection-tool/

Please file good memory leak bugs 
  http://dbaron.org/log/2006-01#e20060110a

System-wide memory measurement for Firefox OS
  https://blog.mozilla.org/nnethercote/2013/12/17/system-wide-memory-measurement-for-firefox-os/

### ghost-windows
What is a "ghost window"?
  http://forum.palemoon.org/viewtopic.php?f=26&t=3476
  
Report number of ghost windows in telemetry
  https://bugzilla.mozilla.org/show_bug.cgi?id=737857

## 直接执行特权js代码
TODO
geckofx 中，不创建 browser 对象，直接创建 AutoJSContext:
 new AutoJSContext()
 new AutoJSContext(GlobalJSContextHolder.BackstageJSContext)
但这样的代码都没有特权，找不到 Components 对象。
 
## 综合代码片段
Code_snippets/Miscellaneous
  https://developer.mozilla.org/en-US/Add-ons/Code_snippets/Miscellaneous
包括：
  Saving an arbitrary URL to a local file
  Operating system detection
  
## 应用
### UcWORK统一桌面系统
http://www.qqtech.com/ucwork.htm

        UcWORK基于桌面应用的设计思想，采用mozilla技术框架，并进行多方面的扩展实现，UcWork是主平台/框架，其它应用可嵌入到UcWork中，这是我们的主推目标。此种情况是“我为主，人为辅”。
        客户或代理商(第三方)可以在界面和服务器层扩展应用。界面和服务层通过UcBUS(即DBUS)交互。在服务层，UcWork除提供DBus接口外，还可提供面向服务层的API接口，供第三方服务层开发调用。

### XULApp StarterKit
https://github.com/racklin/xulapp-starterkit

XULApp StarterKit is a generic framework for XULRunner applications, like Rich Client Platform .

It provides the "plumbing" that, before, every developer had to write themselves—saving state, connecting actions to menu items, toolbar items and keyboard shortcuts; window management, add-ons mechanism, update mechanism and so on.

## 链接/内容处理方式
Document Loading - From Load Start to Finding a Handler
  http://www-archive.mozilla.org/docs/docshell/uri-load-start.html
  https://developer.mozilla.org/en-US/docs/Document_Loading_-_From_Load_Start_to_Finding_a_Handler

nsIContentPolicy
https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Reference/Interface/nsIContentPolicy
Interface for content policy mechanism. Implementations of this interface can be used to control loading of various types of out-of-line content, or processing of certain types of inline content

nsILinkHandler
  an internal interface used for link clicks
  
nsIURIContentListener
  this gives embedders a chance to abort the load if this URI type is something they want to handle in the embedding app. 
  http://www-archive.mozilla.org/projects/embedding/embedapiref/embedapi67.html#1086464
  onStartURIOpen() Gives the original content listener first crack at stopping a load before it happens.
  doContent() Notifies the content listener to hook up an nsIStreamListener capable of consuming the data stream. 
  canHandleContent() Indicates whether the content listener is capable of handling the content. 
  
NS_CONTENT_LISTENER_CATEGORYMANAGER_ENTRY of category manager

nsIStreamListener

nsIExternalHelperAppService
  https://developer.mozilla.org/en-US/docs/Helper_Apps_%28and_a_bit_of_Save_As%29

  nsIHelperAppLauncher

  nsExternalAppHandler details

    Implements nsIStreamListener.
    Gets notifications from Necko as the data comes in.
    Four primary tasks:
        Sets up temporary file and instantiate the nsIHelperAppLauncherDialog in OnStartRequest.
        Puts the data in the file as OnDataAvailable notifications come in.
        Knows how to launch a helper application on the data based on the nsIMIMEInfo.
        Knows how to save the data to disk at a given location if the user decides to do so. 


## 下载download
nsIDownloader
  https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Reference/Interface/nsIDownloader

Downloads.jsm
  https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Downloads.jsm
  
nsIDownloadManager
  https://bitbucket.org/geckofx/geckofx-29.0/issue/73/download-completed-event-the-right-way
  
Gecko.LauncherDialog.Download
  https://bitbucket.org/geckofx/geckofx-29.0/issue/34/how-to-download-files-using-this-engine

base/mozglue/GeckoLoader.java.in:80:    private static void setupDownloadEnviron
ment(Context context)

base/updater/UpdateService.java:212:        int autoDownloadPolicy = getAutoDown
loadPolicy();

chrome/content/downloads.js:90:  handleClickEvent: function dl_handleClickEvent(
aDownload) {


## gecko 事件
https://developer.mozilla.org/en-US/docs/Observer_Notifications

## 特殊协议
### jar 协议
与 java 的 jar 协议没什么区别。语法是 jar:sub-url!/path-to/file-in-zip
注意'!'之后的路径总是以'/'开头，不管zip中的实际条目名是否以'/'开头。
jar协议的效果与file、http等没有本质的不同。不过，目前播放音视频时有个限制：未播放的部分不能seek，而且也不一定能正确显示总时长。
在android版mozilla上，点击jar协议引用的非web文件，例如.doc，也无法调动外部程序来打开（这应该是个bug）。

## + 新的嵌入 API
https://wiki.mozilla.org/Embedding/IPCLiteAPI

## 外部进程的创建和管理

gecko 实现了一套与 node.js child_process 兼容的 API：

https://developer.mozilla.org/en-US/Add-ons/SDK/Low-Level_APIs/system_child_process

// Import SDK Stuff
var COMMONJS_URI = 'resource://gre/modules/commonjs';
var { require } = Components.utils.import(COMMONJS_URI + '/toolkit/require.js', {});
var child_process = require('sdk/system/child_process');

//var ls = child_process.spawn('ls', ['.']);
var ls = child_process.spawn('D:\\software\\UnxUtils\\usr\\local\\wbin\\ls.exe', ['D:\\'], {encoding: 'GBK'});
//var ls = child_process.spawn('C:\\Windows\\System32\\ipconfig.exe', {encoding: null}); // null 得到的是按字节值直接转化的字符串

//ls.stdout.setEncoding('GBK'); //stdout.setEncoding() 目前无效
ls.stdout.on('data', function (data) {
  console.log('stdout(' + data.length + '): ', data);
});

ls.stderr.on('data', function (data) {
  console.log('stderr: ' + data);
});

ls.on('close', function (code) {
  console.log('child process exited with code ' + code);
});

ls.on('error', function (err) {
  console.log('child process error ', err);
});


实现代码的位置在
omni.jar!\modules\commonjs\sdk\system/child_process.js
omni.jar!\jsloader\resource\gre\modules\commonjs\sdk\system/child_process.js

stdout.setEncoding() 目前无效。
child_process.spawn(cmd, args, {encoding: 'GBK'}) 在 Firefox 46 上有效，但 52a2 上无效。
也不能向 stdin 写入非ASCII字符。
参考：https://bugzilla.mozilla.org/show_bug.cgi?id=1180409

## JS-Ctypes
JS 直接调用 C api.
js-ctypes allows application and extension code to call back and forth to native code written in C. C++ support is limited, see bug 505907 for full support. Unlike binary XPCOM components, It allows developers to ship a single binary for use with multiple versions of Firefox.

二进制数据优化-Harmony typed objects (nés binary data)
  https://bugzilla.mozilla.org/show_bug.cgi?id=578700
  http://wiki.ecmascript.org/doku.php?id=harmony:typed_objects
  https://github.com/Yoric/js-js-ctypes

ChromeWorker
  https://developer.mozilla.org/en-US/docs/Web/API/ChromeWorker
  If you're developing privileged code, and would like to create a worker that can use js-ctypes to perform calls to native code, you can do so by using ChromeWorker instead of the standard Worker object. 

## web app
mozilla web app 是运行于 firefox OS, 桌面 firefox，移动 firefox 的 web app，三者具有大致统一的规范。
mozilla web app 是基于 web 标准的，再加上一些希望成为 web 标准的扩展 api。因此与firefox扩展和xulrunner应用不同，不能使用mozilla特有的底层API，包括XPCOM。
事实上，mozilla web app 与 chrome web app 在概念上很相似，互相移植也比较容易。

### packaged app

### 安装
web app 目前似乎只能通过http安装，如果通过file安装会产生invalid url错误。

### desktop web app
安装后会产生一个类似普通应用程序的入口，在windows上就是一个exe文件，例如
"C:\Users\duanyao\AppData\Roaming\xhrcontenttypetest-facc7b2fa7338eec4c5fd305b78b8e71\xhr content type test.exe"
并且也提供了反安装程序。

### android web app
出了从 firefox 中安装，也可以将web app打包为 apk，详见“Open Web Apps for Android”。

mozilla-apk-cli
  npm install -g mozilla-apk-cli
  mozilla-apk-cli ./www my_test_app.apk
  mozilla-apk-cli is only for testing and debugging your new Android app locally.
  
### 参考
Writing your first Firefox OS app
  http://www.adobe.com/devnet/html5/articles/writing-your-first-firefox-os-app.html
Getting Started with Firefox OS: Hosted and Packaged Apps
  http://www.sitepoint.com/getting-started-with-firefox-os-hosted-and-packaged-apps/
Packaged apps
  https://developer.mozilla.org/en-US/Marketplace/Options/Packaged_apps
Open Web Apps for Android
  https://developer.mozilla.org/en-US/Marketplace/Options/Open_web_apps_for_android
  
## firefox.html
  Firefox.html is an experiment: trying to re-implement the Firefox UI in HTML. 
  https://github.com/paulrouget/firefox.html
  
## GeckoView
http://ftp.mozilla.org/pub/mozilla.org/mobile/nightly/latest-mozilla-central-android/

未特别指出时包为 org.mozilla.gecko
### GeckoView
mobile/android/base/GeckoView.java

public Browser addBrowser(String url)
public void removeBrowser(Browser browser)
public void setCurrentBrowser(Browser browser)
public Browser getCurrentBrowser()
public List<Browser> getBrowsers()
public void setChromeDelegate(ChromeDelegate chrome)
public void setContentDelegate(ContentDelegate content)
public static void setGeckoInterface(final BaseGeckoInterface geckoInterface)
public static GeckoAppShell.GeckoInterface getGeckoInterface()

GeckoView.Browser

public void loadUrl(String url)
public void reload()
public void stop()
public boolean canGoBack()
public void goBack()
public boolean canGoForward()
public void goForward()

### interface GeckoView.ContentDelegate
默认空实现 GeckoViewContent
onPageStart
onPageStop
onPageShow
onReceivedTitle

### interface GeckoView.ChromeDelegate
默认实现 GeckoViewChrome
onReady
onAlert
onPrompt
onConfirm
onDebugRequest

### GeckoAppShell
mobile/android/base/GeckoAppShell.java

//Adds a listener for a gecko event. This method is thread-safe and may be called at any time.
public static void registerEventListener(String event, GeckoEventListener listener)
public static void unregisterEventListener(String event, GeckoEventListener listener)

        GeckoAppShell.registerEventListener("Gecko:Ready", this);
        GeckoAppShell.registerEventListener("Content:StateChange", this);
        GeckoAppShell.registerEventListener("Content:LoadError", this);
        GeckoAppShell.registerEventListener("Content:PageShow", this);
        GeckoAppShell.registerEventListener("DOMTitleChanged", this);
        GeckoAppShell.registerEventListener("Link:Favicon", this);
        GeckoAppShell.registerEventListener("Prompt:Show", this);
        GeckoAppShell.registerEventListener("Prompt:ShowTop", this);

base/Tabs.java:87:        registerEventListener("Session:RestoreEnd");
base/Tabs.java:88:        registerEventListener("SessionHistory:New");
base/Tabs.java:89:        registerEventListener("SessionHistory:Back");
base/Tabs.java:90:        registerEventListener("SessionHistory:Forward");
base/Tabs.java:91:        registerEventListener("SessionHistory:Goto");
base/Tabs.java:92:        registerEventListener("SessionHistory:Purge");
base/Tabs.java:93:        registerEventListener("Tab:Added");
base/Tabs.java:94:        registerEventListener("Tab:Close");
base/Tabs.java:95:        registerEventListener("Tab:Select");
base/Tabs.java:96:        registerEventListener("Content:LocationChange");
base/Tabs.java:97:        registerEventListener("Content:SecurityChange");
base/Tabs.java:98:        registerEventListener("Content:ReaderEnabled");
base/Tabs.java:99:        registerEventListener("Content:StateChange");
base/Tabs.java:100:        registerEventListener("Content:LoadError");
base/Tabs.java:101:        registerEventListener("Content:PageShow");
base/Tabs.java:102:        registerEventListener("DOMContentLoaded");
base/Tabs.java:103:        registerEventListener("DOMTitleChanged");
base/Tabs.java:104:        registerEventListener("Link:Favicon");
base/Tabs.java:105:        registerEventListener("Link:Feed");
base/Tabs.java:106:        registerEventListener("Link:OpenSearch");
base/Tabs.java:107:        registerEventListener("DesktopMode:Changed");
base/Tabs.java:108:        registerEventListener("Tab:ViewportMetadata");

base/GeckoApp.java:1517:        registerEventListener("log");
base/GeckoApp.java:1518:        registerEventListener("Reader:ListCountRequest");
base/GeckoApp.java:1519:        registerEventListener("Reader:ListStatusRequest");
base/GeckoApp.java:1520:        registerEventListener("Reader:Added");
base/GeckoApp.java:1521:        registerEventListener("Reader:Removed");
base/GeckoApp.java:1522:        registerEventListener("Reader:Share");
base/GeckoApp.java:1523:        registerEventListener("Reader:FaviconRequest");
base/GeckoApp.java:1524:        registerEventListener("onCameraCapture");
base/GeckoApp.java:1525:        registerEventListener("Menu:Add");
base/GeckoApp.java:1526:        registerEventListener("Menu:Remove");
base/GeckoApp.java:1527:        registerEventListener("Menu:Update");
base/GeckoApp.java:1528:        registerEventListener("Gecko:Ready");
base/GeckoApp.java:1529:        registerEventListener("Gecko:DelayedStartup");
base/GeckoApp.java:1530:        registerEventListener("Toast:Show");
base/GeckoApp.java:1531:        registerEventListener("DOMFullScreen:Start");
base/GeckoApp.java:1532:        registerEventListener("DOMFullScreen:Stop");
base/GeckoApp.java:1533:        registerEventListener("ToggleChrome:Hide");
base/GeckoApp.java:1534:        registerEventListener("ToggleChrome:Show");
base/GeckoApp.java:1535:        registerEventListener("ToggleChrome:Focus");
base/GeckoApp.java:1536:        registerEventListener("Permissions:Data");
base/GeckoApp.java:1537:        registerEventListener("Session:StatePurged");
base/GeckoApp.java:1538:        registerEventListener("Bookmark:Insert");
base/GeckoApp.java:1539:        registerEventListener("Accessibility:Event");
base/GeckoApp.java:1540:        registerEventListener("Accessibility:Ready");
base/GeckoApp.java:1541:        registerEventListener("Shortcut:Remove");
base/GeckoApp.java:1542:        registerEventListener("Share:Text");
base/GeckoApp.java:1543:        registerEventListener("Share:Image");
base/GeckoApp.java:1544:        registerEventListener("Image:SetAs");
base/GeckoApp.java:1545:        registerEventListener("Sanitize:ClearHistory");
base/GeckoApp.java:1546:        registerEventListener("Update:Check");
base/GeckoApp.java:1547:        registerEventListener("Update:Download");
base/GeckoApp.java:1548:        registerEventListener("Update:Install");
base/GeckoApp.java:1549:        registerEventListener("PrivateBrowsing:Data");
base/GeckoApp.java:1550:        registerEventListener("Contact:Add");
base/GeckoApp.java:1551:        registerEventListener("Intent:Open");
base/GeckoApp.java:1552:        registerEventListener("Intent:GetHandlers");
base/GeckoApp.java:1553:        registerEventListener("Locale:Set");
base/GeckoApp.java:1554:        registerEventListener("NativeApp:IsDebuggable");
base/GeckoApp.java:1555:        registerEventListener("SystemUI:Visibility");


### click
chrome/content/browser.js:1709:    Services.obs.addObserver(this, "PageActions:C
licked", false);
chrome/content/browser.js:1710:    Services.obs.addObserver(this, "PageActions:L
ongClicked", false);

### components/HelperAppDialog.js

### HelperApps
mobile/android/chrome/content/HelperApps.js
https://hg.mozilla.org/integration/fx-team/rev/dd3dd64aa432
  getAppsForUri
  
### PrefsHelper
  
## 内存管理/GC/CC
https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Language_Bindings/Components.utils.forceGC
https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Language_Bindings/Components.utils.schedulePreciseGC
https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Interfacing_with_the_XPCOM_cycle_collector

触发 CC:
var domWindowUtils = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
                     .getInterface(Components.interfaces.nsIDOMWindowUtils);
domWindowUtils.cycleCollect()

触发 JS GC:
异步：
Components.utils.schedulePreciseGC(function(){})
同步：
Components.utils.forceGC()