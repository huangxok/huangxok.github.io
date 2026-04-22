---
title: "create a blog by hexo"
pubDate: 2016-05-18

tags: []
---
# hexo 建立博客

## 准备环境

第一步：准备好git nodejs
  ```ruby
  [git下载地址](http://git-scm.com/download/)
  [node.js下载地址](http://nodejs.cn/)
  ```
  说明下：如果没有git，在windows下可以用cmd命令行，nodejs是必须安装的，第二步会依赖第一步安装的nodejs
第二步：
  安装全局环境变量----
      * 可以有以下两种
        第一种打开安装好的git命令行工具，然后切换目录
        代码如下
        ```python
          $ npm install -g hexo-cli  
        ```
        第二种就是直接在windows命令行
        ```
         npm install -g hexo-cli
        ```
        PS: "$" 这个符号是git工具命令行自带的
第三步：初始化博客文件夹
        
        ```java
          $ cd d/
          $ mkdir hexoblog
          $ cd /hexoblog 
          $ hexo init
          $ npm install
        ```
  这一步是下载hexo工具，下载完成后的目录结构
  |-_config.yml
  |-package.json
  |-scafolds
  |-source
  | |-_drafts
  | |-_posts
  |-themes
  
第四步：配置_config.yml文件，这个文件是关于站点设置的一些信息

```
        # Hexo Configuration
        ## Docs: http://hexo.io/docs/configuration.html
        ## Source: https://github.com/hexojs/hexo/

        # Site
        title: Hexo ##站点标题 PS：这行的"Hexo ##站点标题"表示注释说明，以下基本都是这样
        subtitle: ##站点副标题
        description: ##站点描述
        author: John Doe ##作者
        language: ##语言包，需要主题自带才可设置。如Jcaman自带简繁英，设置简体中文填入 zh-CN
        timezone:

        # URL
        ## If your site is put in a subdirectory, set url as ‘http://yoursite.com/child‘ and root as ‘/child/‘
        url: http://yoursite.com ##站点域名
        root: /
        permalink: :year/:month/:day/:title/ ##文章永久链接格式，可添加.html后缀，如 :title.html
        permalink_defaults:

        # Directory
        source_dir: source
        public_dir: public
        tag_dir: tags
        archive_dir: archives
        category_dir: categories
        code_dir: downloads/code
        i18n_dir: :lang
        skip_render:

        # Writing
        new_post_name: :title.md # File name of new posts
        default_layout: post
        titlecase: false # Transform title into titlecase
        externallink: true # Open external links in new tab
        filenamecase: 0
        render_drafts: false
        post_asset_folder: false
        relative_link: false
        future: true
        highlight:
        enable: true
        line_number: true
        tab_replace:

        # Category & Tag
        default_category: uncategorized
        category_map:
        tag_map:

        # Date / Time format
        ## Hexo uses Moment.js to parse and display date
        ## You can customize the date format as defined in
        ## http://momentjs.com/docs/#/displaying/format/
        date_format: YYYY-MM-DD
        time_format: HH:mm:ss

        # Pagination
        ## Set per_page to 0 to disable pagination
        per_page: 10
        pagination_dir: page

        # Extensions
        ## Plugins: http://hexo.io/plugins/
        ## Themes: http://hexo.io/themes/
        theme: landscape ##当前主题名称

        # Deployment
        ## Docs: http://hexo.io/docs/deployment.html
        deploy:
        type: git
        repo: git@github.com:iSung/iSung.github.io.git
        branch: master
```
  PS：deploy 这个为github的一些信息
[hexo教程](https://hexo.io/zh-cn/docs/index.html)