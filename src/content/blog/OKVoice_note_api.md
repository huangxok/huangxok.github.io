---
title: "okvoiceAPI"
pubDate: 2020-04-29
tags: []
---

# okvoiceAPI

okvoice开发者中心 http://dev.okvoice.com
okvoice在线api    http://dev.okvoice.com/file.php

* 简介
OKVoice TTS REST API为开发者提供一个通用的开发接口，基于该接口，
开发者可以方便的为应用集成TTS功能，本文档描述了使用TTS REST API的方法。
使用API需要以下条件：
  1. 需要申请 API Key 用于验证开发者
  2. 使用过程中应用需要通过互联网连接到OKVoice 云平台

* 访问控制
OKVoice 通过apiKey/apiSecretKey对称加密来验证某个请求的发送者身份，
apiKey用来标示app，apiSecretKey是用来签名加密的密钥，所以apiSecretKey必须保密。
当用户发送一个请求时，首先按照OKVoice指定的格式生成签名字符串，然后使用apiSecretKey对签名字符串进行加密产生验证码。
OKVoice收到请求后会根据apiKey找到对应的apiSecretKey，然后用同样的方式产生验证码，如果计算出来的验证码跟请求的一样则认为请求有效，
否则拒绝这次请求，并返回403错误。
* 申请apiKey/apiSecretKey
    apiKey/apiSecretKey 需要在okvoice开发者平台(http://dev.okvoice.com/)申请账号，然后点击用户名，进入我的账号。
    在我的账号添加app应用，在应用管理中可以查看app应用一个列表。
    每个项都存在一个apiKey(KEY)与apiSecretKey(Secret)。

* API验证机制
  1. signature=HMAC-SHA1(arg1=v1&arg2=v2)
  生成签名字符串
  首先，对整个请求参数列表中的参数按照参数名字典序进行排序。(说明:按参数的字母排序)
  其次，把所有参数对以'&'字符连接起来，最终形成待签名字符串。
  关于参数的签名字符串组装问题:
  如:apiKey=920c657431d374436117b00f9b18be78
     &expires=1446445018&format=MP3
     &speed=0.3
     &text=<py=a1>啊</py>
     &voice=cnfemale
  上面的便是一个参数完整的待签名字符串。
  参数说明如下
      * apiKey : 为app的KEY，即apiKey                        
      * expires: 为过期时间:可以这样处理 Date.now().slice(0,-3)取到当前时间的秒数 然后加上一定的时间 Date.now().slice(0,-3)+3600
      这样设置过期时间为1小时。
      * format : 语音的格式。WVA与MP3 默认为MP3
      * speed  : 语速 取值0.2-5(官方文档为---- 负5到5 -> -5到5 ) 小于1为慢速，大于1为快速，默认为1(正常情况)
      * text   : 需要合成的文本，说明关于多音字的问题 如'啊'是一个多音字，那么需要将'啊'包裹在<py=a1></py>中这里的啊为一声。
      * voice  : 声音类型如下
          - cnmale	     普通话男声
          - cnfemale	   普通话女声
          - cnctmale	   粤语男声
          - cnctfemale	 粤语女声
          - enmale	     英语男声
          - enfemale	   英语女声 
  
  2. 使用hmac-sha1方法签名，其中Key为apiSecretKey
    说明：hmac-sha1方法签名有很多库
    目前MBEditor采用的是CryptoJS进行签名----https://github.com/brix/crypto-js/
    CryptoJS.HmacSHA1(signature, okvoiceapisecretkey)
    签名参数说明第一个为待签名的字符串，第二个为一个KEY。
  这里对参数做下解释：signature为待签名的字符串，okvoiceapisecretkey为对应的apiKey/apiSecretKey中的apiSecretKey的值，即Secret
  3. 把"signature=签名结果字符串"加入请求参数列表
    apiKey=920c657431d374436117b00f9b18be78
    &expires=1446445018
    &speed=0.3
    &text=<py=a1>啊</py>
    &voice=cnfemale
    &signature=CryptoJS.HmacSHA1(signture, okvoiceapisecretkey)
    下面是一个完整okvoice的请求地址
    ttp://api.okvoice.com/tts?apiKey=920c657431d374436117b00f9b18be78&expires=1446445018&speed=0.3&text=<py=a1>啊</py>&voice=cnfemale&signature=d610bae4113e17de24475ab0c06396ab7dae7a74
    说明signature参数后面的字符串是CryptoJS.HmacSHA1(signature, okvoiceapisecretkey)的返回值
    注意：待签名字符串必须是UTF-8编码

* API 接口说明
  1. 请求类型及URL
    接口类型	      输入数据格式	 URL
    HTTP GET/POST	 URL Encoded	 http://api.okvoice.com/tts
  2. 请求参数
    参数	            数据类型	      是否必选	    说明
    apiKey	          String	          是	      Api key
    signature		      String	          是	      签名字符串
    expires		        Int	              是	      请求超时时间，自UTC1970-01-01开始的秒数
    text	            String	          是	      需要合成的文本
    voice	            String	          否	      声音类型，语言+性别，默认cnmale
    format	          String	          否	      音频格式（WAV，MP3），默认MP3
    speed	            Int	              否	      语音速度，-5--5默认1 //实际值为0.2-5 大于1语速加快，小于1语速变慢
    
    Voice参数
    取值	            说明
    cnmale	          普通话男声
    cnfemale		      普通话女声
    cnctmale		      粤语男声
    cnctfemale		    粤语女声
    enmale	          英语男声
    enfemale		      英语女声

  3. 响应结果
    HTTP response	 说明
    200	         成功，返回音频数据
    202	         失败，返回json数据，包含错误码及错误信息
    403	         签名验证失败，禁止访问
  4. 错误码
    错误码	        描述
    1001	        非法请求
    1002	        API key 非法
    1003	        鉴权验证失败
    1004	        转换文本失败
    1005	        非法文本
    1006	        文本超长
    1007	        非法参数
    1008	        不支持的voice类型

目前采用账号为个人账号
apiKey             920c657431d374436117b00f9b18be78
apiSecretKey       fd1993ac9dd85cdb6b8f08a16c30ce8c

应用控件：生字教学 mainbo_wordteaching，
         词语教学 mainbo_vocateaching